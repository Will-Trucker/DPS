import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { Cita, Usuario } from "../types";

export default function Citas() {
  const router = useRouter();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [busqueda, setBusqueda] = useState<string>("");
  const [filtroEstado, setFiltroEstado] = useState<string>("todas");

  // useFocusEffect recarga datos cada vez que la pantalla gana el foco
  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, []),
  );

  const cargarDatos = async (): Promise<void> => {
    const sesionId = await AsyncStorage.getItem("sesionActiva");
    if (!sesionId) {
      router.replace("/");
      return;
    }
    const rawUsuarios = await AsyncStorage.getItem("usuarios");
    const usuarios: Usuario[] = rawUsuarios ? JSON.parse(rawUsuarios) : [];
    const u = usuarios.find((x: Usuario) => x.id === sesionId) || null;
    setUsuario(u);
    const rawCitas = await AsyncStorage.getItem("citas");
    const todasCitas: Cita[] = rawCitas ? JSON.parse(rawCitas) : [];
    const misCitas = todasCitas
      .filter((c: Cita) => c.usuarioId === sesionId)
      .sort(
        (a: Cita, b: Cita) =>
          new Date(a.fechaISO).getTime() - new Date(b.fechaISO).getTime(),
      );
    setCitas(misCitas);
  };

  const eliminarCita = (id: string): void => {
    Alert.alert(
      "Eliminar cita",
      "¿Estás seguro de que deseas eliminar esta cita?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const raw = await AsyncStorage.getItem("citas");
            const todas: Cita[] = raw ? JSON.parse(raw) : [];
            const actualizadas = todas.filter((c: Cita) => c.id !== id);
            await AsyncStorage.setItem("citas", JSON.stringify(actualizadas));
            cargarDatos();
          },
        },
      ],
    );
  };

  const cerrarSesion = async (): Promise<void> => {
    await AsyncStorage.removeItem("sesionActiva");
    router.replace("/");
  };

  const citasFiltradas = citas.filter((c: Cita) => {
    const coincideBusqueda =
      c.paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.doctor.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado =
      filtroEstado === "todas" || c.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const formatearFecha = (iso: string): string => {
    return new Date(iso).toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const colorEstado: Record<string, string> = {
    pendiente: "#e67e22",
    confirmada: "#00a651",
    cancelada: "#c0392b",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitulo}>🏥 MediCitas</Text>
          <Text style={styles.headerSub}>
            Bienvenido, {usuario?.nombre || ""}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnSalir} onPress={cerrarSesion}>
          <Text style={styles.btnSalirText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Buscar paciente o doctor..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={styles.filtros}>
        {["todas", "pendiente", "confirmada", "cancelada"].map((estado) => (
          <TouchableOpacity
            key={estado}
            style={[
              styles.filtroBtn,
              filtroEstado === estado && styles.filtroBtnActivo,
            ]}
            onPress={() => setFiltroEstado(estado)}>
            <Text
              style={[
                styles.filtroBtnText,
                filtroEstado === estado && styles.filtroBtnTextActivo,
              ]}>
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={citasFiltradas}
        keyExtractor={(item: Cita) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 90 }}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.vacioText}>
              📋 No hay citas{busqueda ? " que coincidan" : ""}.
            </Text>
            <Text style={styles.vacioSub}>
              Toca + para registrar una nueva cita.
            </Text>
          </View>
        }
        renderItem={({ item }: { item: Cita }) => (
          <View style={styles.citaCard}>
            <View style={styles.citaRow}>
              <Text style={styles.citaPaciente}>{item.paciente}</Text>
              <View
                style={[
                  styles.estadoBadge,
                  {
                    backgroundColor: colorEstado[item.estado] + "20",
                    borderColor: colorEstado[item.estado],
                  },
                ]}>
                <Text
                  style={[
                    styles.estadoText,
                    { color: colorEstado[item.estado] },
                  ]}>
                  {item.estado}
                </Text>
              </View>
            </View>
            <Text style={styles.citaDoctor}>
              👨‍⚕️ {item.doctor} · {item.especialidad}
            </Text>
            <Text style={styles.citaFecha}>
              📅 {formatearFecha(item.fechaISO)}
            </Text>
            <Text style={styles.citaMotivo}>📝 {item.motivo}</Text>
            <View style={styles.citaAcciones}>
              <TouchableOpacity
                style={styles.btnEditar}
                onPress={() =>
                  router.push({
                    pathname: "/formulario-cita",
                    params: { id: item.id },
                  })
                }>
                <Text style={styles.btnEditarText}>✏️ Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnEliminar}
                onPress={() => eliminarCita(item.id)}>
                <Text style={styles.btnEliminarText}>🗑️ Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/formulario-cita")}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f9" },
  header: {
    backgroundColor: "#003f7f",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitulo: { fontSize: 20, fontWeight: "800", color: "#fff" },
  headerSub: { fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 },
  btnSalir: {
    backgroundColor: "rgba(255,255,255,.15)",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  btnSalirText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  searchRow: { padding: 12, paddingBottom: 0 },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
  },
  filtros: { flexDirection: "row", padding: 12, gap: 8 },
  filtroBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  filtroBtnActivo: { backgroundColor: "#003f7f", borderColor: "#003f7f" },
  filtroBtnText: { fontSize: 11, fontWeight: "600", color: "#5a6a7e" },
  filtroBtnTextActivo: { color: "#fff" },
  citaCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#003f7f",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  citaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  citaPaciente: { fontSize: 15, fontWeight: "800", color: "#001f3f" },
  estadoBadge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  estadoText: { fontSize: 11, fontWeight: "700" },
  citaDoctor: { fontSize: 12, color: "#5a6a7e", marginBottom: 3 },
  citaFecha: { fontSize: 12, color: "#5a6a7e", marginBottom: 3 },
  citaMotivo: { fontSize: 12, color: "#5a6a7e", marginBottom: 10 },
  citaAcciones: { flexDirection: "row", gap: 8 },
  btnEditar: {
    backgroundColor: "#e6f1fb",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  btnEditarText: { color: "#003f7f", fontWeight: "600", fontSize: 12 },
  btnEliminar: {
    backgroundColor: "#fdf0ee",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  btnEliminarText: { color: "#c0392b", fontWeight: "600", fontSize: 12 },
  vacio: { alignItems: "center", paddingTop: 60 },
  vacioText: { fontSize: 15, fontWeight: "700", color: "#5a6a7e" },
  vacioSub: { fontSize: 12, color: "#8a9ab0", marginTop: 6 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fdb913",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#001f3f",
    lineHeight: 32,
  },
});
