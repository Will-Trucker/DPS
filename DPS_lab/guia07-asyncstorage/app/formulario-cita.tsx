import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Cita, EstadoCita } from "./types";

export default function FormularioCita() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id?: string }>();
  const esEdicion = !!id;

  const [paciente, setPaciente] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [especialidad, setEspecialidad] = useState<string>("");
  const [motivo, setMotivo] = useState<string>("");
  const [estado, setEstado] = useState<EstadoCita>("pendiente");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [mostrarPicker, setMostrarPicker] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (esEdicion) cargarCita();
  }, [id]);

  const cargarCita = async (): Promise<void> => {
    const raw = await AsyncStorage.getItem("citas");
    const citas: Cita[] = raw ? JSON.parse(raw) : [];
    const cita = citas.find((c: Cita) => c.id === id);
    if (cita) {
      setPaciente(cita.paciente);
      setDoctor(cita.doctor);
      setEspecialidad(cita.especialidad);
      setMotivo(cita.motivo);
      setEstado(cita.estado);
      setFecha(new Date(cita.fechaISO));
    }
  };

  const onCambioFecha = (event: DateTimePickerEvent, date?: Date): void => {
    setMostrarPicker(Platform.OS === "ios");
    if (date) setFecha(date);
  };

  const guardar = async (): Promise<void> => {
    if (
      !paciente.trim() ||
      !doctor.trim() ||
      !especialidad.trim() ||
      !motivo.trim()
    ) {
      setError("Completa todos los campos requeridos.");
      return;
    }
    const sesionId = await AsyncStorage.getItem("sesionActiva");
    if (!sesionId) {
      router.replace("/");
      return;
    }
    const raw = await AsyncStorage.getItem("citas");
    const citas: Cita[] = raw ? JSON.parse(raw) : [];

    if (esEdicion) {
      // EDITAR — map reemplazando la cita por id
      const actualizadas = citas.map((c: Cita) =>
        c.id === id
          ? {
              ...c,
              paciente,
              doctor,
              especialidad,
              motivo,
              estado,
              fechaISO: fecha.toISOString(),
            }
          : c,
      );
      await AsyncStorage.setItem("citas", JSON.stringify(actualizadas));
      Alert.alert("✅ Cita actualizada");
    } else {
      // CREAR — spread operator agrega la nueva cita
      const nueva: Cita = {
        id: Date.now().toString(),
        paciente: paciente.trim(),
        doctor: doctor.trim(),
        especialidad: especialidad.trim(),
        motivo: motivo.trim(),
        estado,
        fechaISO: fecha.toISOString(),
        usuarioId: sesionId,
      };
      await AsyncStorage.setItem("citas", JSON.stringify([...citas, nueva]));
      Alert.alert("✅ Cita creada");
    }
    router.back();
  };

  const formatearFecha = (d: Date): string =>
    d.toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const estados: EstadoCita[] = ["pendiente", "confirmada", "cancelada"];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
        <Text style={styles.btnBackText}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>
        {esEdicion ? "✏️ Editar Cita" : "➕ Nueva Cita"}
      </Text>

      {[
        {
          label: "Paciente",
          value: paciente,
          setter: setPaciente,
          placeholder: "Nombre del paciente",
        },
        {
          label: "Doctor",
          value: doctor,
          setter: setDoctor,
          placeholder: "Dr. Ana Martínez",
        },
        {
          label: "Especialidad",
          value: especialidad,
          setter: setEspecialidad,
          placeholder: "Cardiología, Pediatría...",
        },
        {
          label: "Motivo de consulta",
          value: motivo,
          setter: setMotivo,
          placeholder: "Describe el motivo...",
        },
      ].map(({ label, value, setter, placeholder }) => (
        <View key={label}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={(v: string) => {
              setter(v);
              setError("");
            }}
          />
        </View>
      ))}

      <Text style={styles.label}>Estado de la cita</Text>
      <View style={styles.estadoRow}>
        {estados.map((e: EstadoCita) => (
          <TouchableOpacity
            key={e}
            style={[styles.estadoBtn, estado === e && styles.estadoBtnActivo]}
            onPress={() => setEstado(e)}>
            <Text
              style={[
                styles.estadoBtnText,
                estado === e && styles.estadoBtnTextActivo,
              ]}>
              {e}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Fecha y hora de la cita</Text>
      <TouchableOpacity
        style={styles.fechaBtn}
        onPress={() => setMostrarPicker(true)}>
        <Text style={styles.fechaBtnText}>📅 {formatearFecha(fecha)}</Text>
        <Text style={styles.fechaCambiar}>Cambiar</Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={fecha}
          mode="datetime"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onCambioFecha}
          minimumDate={new Date()}
          locale="es-ES"
        />
      )}

      {error !== "" && <Text style={styles.errorText}>⚠ {error}</Text>}

      <TouchableOpacity style={styles.btnGuardar} onPress={guardar}>
        <Text style={styles.btnGuardarText}>
          {esEdicion ? "Guardar cambios" : "Crear cita"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f9" },
  btnBack: { marginBottom: 16 },
  btnBackText: { color: "#003f7f", fontWeight: "700", fontSize: 14 },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#001f3f",
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5a6a7e",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 2,
  },
  estadoRow: { flexDirection: "row", gap: 8, marginBottom: 4 },
  estadoBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  estadoBtnActivo: { backgroundColor: "#003f7f", borderColor: "#003f7f" },
  estadoBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#5a6a7e",
    textTransform: "capitalize",
  },
  estadoBtnTextActivo: { color: "#fff" },
  fechaBtn: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#003f7f",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  fechaBtnText: { fontSize: 14, color: "#001f3f", fontWeight: "600" },
  fechaCambiar: { fontSize: 12, color: "#003f7f", fontWeight: "600" },
  errorText: { color: "#c0392b", fontSize: 13, marginTop: 8 },
  btnGuardar: {
    backgroundColor: "#fdb913",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  btnGuardarText: { color: "#001f3f", fontWeight: "800", fontSize: 15 },
});
