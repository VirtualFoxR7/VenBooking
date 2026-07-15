import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as z from "zod";
import { Colors } from "../constants/theme";

// 1. Definimos las reglas (el esquema)
const loginSchema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export default function LoginScreen() {
  // 2. Inicializamos el hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 3. Función que se ejecuta si todo está bien
  const onSubmit = async (data: any) => {
    const storedData = await SecureStore.getItemAsync("userData");

    if (storedData) {
      const user = JSON.parse(storedData);

      if (data.email === user.email && data.password === user.password) {
        await SecureStore.setItemAsync("userToken", "UserTokenPlaceholder");
        router.replace("/(tabs)/home");
      } else {
        Alert.alert("Error", "Credenciales incorrectas");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Input Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Correo electrónico"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* Input Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Contraseña"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.recoveryButton}
        onPress={() => router.push("/passChange")}
      >
        <Text style={styles.recoveryButtonText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 10 },
  button: {
    backgroundColor: Colors.light.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },

  recoveryButton: {
    marginTop: 15,
    alignItems: "center",
  },
  recoveryButtonText: {
    color: Colors.light.tertiary,
    fontSize: 14,
    fontWeight: "500",
  },
});
