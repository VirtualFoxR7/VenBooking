import { Colors } from "@/constants/theme";
import { styless } from "@/constants/global-styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    Alert,
   // StyleSsheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as z from "zod";

// 1. Esquema de validación estricto con Zod
const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Debes ingresar tu contraseña actual"),
    newPassword: z
      .string()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Debes confirmar la contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // El error se pintará en el input de confirmar
  });

export default function ChangePasswordScreen() {
  const [loading, setLoading] = useState(false);

  // 2. Inicializar el formulario
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  // 3. Lógica del cambio local
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Leer el usuario actual de la "caja fuerte"
      const storedData = await SecureStore.getItemAsync("userData");

      if (storedData) {
        const user = JSON.parse(storedData);

        // Validar si la contraseña actual que ingresó es correcta
        if (data.currentPassword !== user.password) {
          Alert.alert("Error", "La contraseña actual no es correcta.");
          setLoading(false);
          return;
        }

        // Si es correcta, actualizamos la contraseña en el objeto
        user.password = data.newPassword;

        // Guardamos el JSON actualizado de vuelta en el SecureStore
        await SecureStore.setItemAsync("userData", JSON.stringify(user));

        Alert.alert("Éxito", "Contraseña actualizada correctamente.", [
          {
            text: "OK",
            onPress: () => {
              // Limpiamos el formulario y regresamos a la pantalla anterior
              reset();
              router.back();
            },
          },
        ]);
      } else {
        Alert.alert("Error", "No se encontraron datos del usuario.");
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Ocurrió un problema al cambiar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styless.container}>
      <Text style={styless.title}>Cambiar Contraseña</Text>

      {/* Input Contraseña Actual */}
      <Controller
        control={control}
        name="currentPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styless.input, errors.currentPassword && styless.inputError]}
            placeholder="Contraseña actual"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.currentPassword && (
        <Text style={styless.errorText}>{errors.currentPassword.message}</Text>
      )}

      {/* Input Nueva Contraseña */}
      <Controller
        control={control}
        name="newPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styless.input, errors.newPassword && styless.inputError]}
            placeholder="Nueva contraseña"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.newPassword && (
        <Text style={styless.errorText}>{errors.newPassword.message}</Text>
      )}

      {/* Input Confirmar Contraseña */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styless.input, errors.confirmPassword && styless.inputError]}
            placeholder="Confirmar nueva contraseña"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styless.errorText}>{errors.confirmPassword.message}</Text>
      )}

      {/* Botón de guardar */}
      <TouchableOpacity
        style={[styless.button, loading && styless.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styless.buttonText}>Actualizar Contraseña</Text>
        )}
      </TouchableOpacity>

      {/* Botón Cancelar / Volver */}
      <TouchableOpacity
        style={styless.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styless.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}


