import { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { View, ActivityIndicator } from "react-native";
import { FavoritesProvider } from "@/context/favorites-context";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function setupInitialData() {
      const existingUser = await SecureStore.getItemAsync('userData');
      
      if (!existingUser) {
        const demoUser = {
          email: "admin@app.com",
          password: "123456"
        };
        await SecureStore.setItemAsync('userData', JSON.stringify(demoUser));
      }
    }
    setupInitialData();
  }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await SecureStore.getItemAsync("userToken");

        if (token) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/login");
        }
      } catch (e) {
        console.error("Error al verificar autenticación", e);
      } finally {
        setIsReady(true);
      }
    }
    checkAuth();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </FavoritesProvider>
  );
}