import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { stylesl } from "@/constants/global-styles";
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
import TestButton from "@/components/test-button";

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
    <View style={stylesl.container}>
      <Text style={stylesl.title}>Iniciar Sesión</Text>

      {/* Input Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[stylesl.input, errors.email && stylesl.inputError]}
            placeholder="Correo electrónico"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && (
        <Text style={stylesl.errorText}>{errors.email.message}</Text>
      )}

      {/* Input Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[stylesl.input, errors.password && stylesl.inputError]}
            placeholder="Contraseña"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={stylesl.errorText}>{errors.password.message}</Text>
      )}

      <TouchableOpacity style={stylesl.button} onPress={handleSubmit(onSubmit)}>
        <Text style={stylesl.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={stylesl.recoveryButton}
        onPress={() => router.push("/passChange")}
      >
        <Text style={stylesl.recoveryButtonText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TestButton/>
    </View>
  );
}


