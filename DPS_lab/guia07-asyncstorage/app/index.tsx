import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Usuario } from "../types";
import React from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [cargando, setCargando] = useState<boolean>(true);

  // Al montar: si ya hay informacion activa, saltar directamente a citas

  useEffect(() => {
    const verificar = async (): Promise<void> => {
      const sesion = await AsyncStorage.getItem("sesionActiva");
      if (sesion) router.replace("/citas");
      else setCargando(false);
    };
    verificar();
  }, []);

  const iniciarSesion = async (): Promise<void> => {
    if (!email.trim() || !password.trim()) {
      setError("Ingrega tu email y contraseña");
      return;
    }
    const raw = await AsyncStorage.getItem("usuarios");
    const usuarios: Usuario[] = raw ? JSON.parse(raw) : [];
    const usuario = usuarios.find(
      (u: Usuario) => u.email === email.trim() && u.password === password,
    );
    if (!usuario) {
      setError("Email o contraseña incorrectos");
      return;
    }
    await AsyncStorage.setItem("sesionActiva", usuario.id);
    router.replace("/citas"); // replace = no agrega el historial
  };

  if (cargando)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#003f7f" />
      </View>
    );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.card}>
        <Text style={styles.titulo}>🏥 MediCitas</Text>
        <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@email.com"
          value={email}
          onChangeText={(v: string) => {
            setEmail(v);
            setError("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••"
          value={password}
          onChangeText={(v: string) => {
            setPassword(v);
            setError("");
          }}
          secureTextEntry
        />
        {error !== "" && <Text style={styles.errorText}>⚠ {error}</Text>}
        <TouchableOpacity style={styles.btnPrimario} onPress={iniciarSesion}>
          <Text style={styles.btnPrimarioText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/registro")}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    justifyContent: "center",
    padding: 20,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    shadowColor: "#003f7f",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#001f3f",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: "#5a6a7e",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5a6a7e",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#f4f6f9",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 14,
    fontFamily: "System",
  },
  errorText: { color: "#c0392b", fontSize: 13, marginBottom: 10 },
  btnPrimario: {
    backgroundColor: "#fdb913",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 6,
  },
  btnPrimarioText: { color: "#001f3f", fontWeight: "800", fontSize: 15 },
  link: {
    textAlign: "center",
    color: "#003f7f",
    fontWeight: "600",
    marginTop: 16,
    fontSize: 13,
  },
});
