import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Usuario } from "./types";

export default function Registro() {
  const router = useRouter();
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmar, setConfirmar] = useState<string>("");
  const [errores, setErrores] = useState<Record<string, string>>({});

  const validar = (): boolean => {
    const nuevosErrores: Record<string, string> = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es requerido.";
    if (!email.includes("@")) nuevosErrores.email = "Ingresa un email válido.";
    if (password.length < 6) nuevosErrores.password = "Mínimo 6 caracteres.";
    if (password !== confirmar)
      nuevosErrores.confirmar = "Las contraseñas no coinciden.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const registrar = async (): Promise<void> => {
    if (!validar()) return;
    const raw = await AsyncStorage.getItem("usuarios");
    const usuarios: Usuario[] = raw ? JSON.parse(raw) : [];
    if (usuarios.some((u: Usuario) => u.email === email.trim())) {
      setErrores({ email: "Ese email ya está registrado." });
      return;
    }
    const nuevo: Usuario = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      email: email.trim(),
      password,
      fechaRegistro: new Date().toISOString(),
    };
    await AsyncStorage.setItem(
      "usuarios",
      JSON.stringify([...usuarios, nuevo]),
    );
    Alert.alert("✅ ¡Cuenta creada!", "Ahora puedes iniciar sesión.", [
      { text: "Ir al login", onPress: () => router.replace("/") },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Crear cuenta</Text>
        <Text style={styles.subtitulo}>🏥 MediCitas</Text>

        {(["nombre", "email", "password", "confirmar"] as const).map(
          (campo) => (
            <View key={campo}>
              <Text style={styles.label}>
                {campo === "nombre"
                  ? "Nombre completo"
                  : campo === "email"
                    ? "Email"
                    : campo === "password"
                      ? "Contraseña"
                      : "Confirmar contraseña"}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errores[campo] ? styles.inputError : null,
                ]}
                placeholder={
                  campo === "nombre"
                    ? "Ana García"
                    : campo === "email"
                      ? "tu@email.com"
                      : "••••••"
                }
                value={
                  campo === "nombre"
                    ? nombre
                    : campo === "email"
                      ? email
                      : campo === "password"
                        ? password
                        : confirmar
                }
                onChangeText={(v: string) => {
                  if (campo === "nombre") setNombre(v);
                  else if (campo === "email") setEmail(v);
                  else if (campo === "password") setPassword(v);
                  else setConfirmar(v);
                  setErrores((prev) => ({ ...prev, [campo]: "" }));
                }}
                secureTextEntry={campo === "password" || campo === "confirmar"}
                autoCapitalize={campo === "email" ? "none" : "words"}
                keyboardType={campo === "email" ? "email-address" : "default"}
              />
              {errores[campo] ? (
                <Text style={styles.errorText}>⚠ {errores[campo]}</Text>
              ) : null}
            </View>
          ),
        )}

        <TouchableOpacity style={styles.btnPrimario} onPress={registrar}>
          <Text style={styles.btnPrimarioText}>Crear cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>Ya tengo cuenta · Iniciar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f6f9",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#001f3f",
    marginBottom: 4,
  },
  subtitulo: { fontSize: 13, color: "#5a6a7e", marginBottom: 28 },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5a6a7e",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
    marginTop: 8,
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
  inputError: { borderColor: "#c0392b" },
  errorText: { color: "#c0392b", fontSize: 12, marginBottom: 6 },
  btnPrimario: {
    backgroundColor: "#fdb913",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 20,
  },
  btnPrimarioText: { color: "#001f3f", fontWeight: "800", fontSize: 15 },
  link: {
    textAlign: "center",
    color: "#003f7f",
    fontWeight: "600",
    marginTop: 14,
    fontSize: 13,
  },
});
