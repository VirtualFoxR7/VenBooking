// Resumen: Componente InnElement actualizado con todas las variables locales traducidas al inglés.
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import api from "@/services/axios";
import { Images, InnStyles, PressableStyles } from "@/constants/global-styles";
import { InnData } from "@/types/inn";

interface Props {
  id: string;
}

export default function InnElement({ id }: Props) {
  const [inn, setInn] = useState<InnData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handlePressDetails = () => {
    router.push({
      pathname: "/detail-screen/inn",
      params: { id: id },
    });
  };

  useEffect(() => {
    const fetchInnData = async () => {
      try {
        const response = await api.get(`/inns/${id}`);
        if (response.data.success) {
          setInn(response.data.data);
        }
      } catch (error) {
        console.error("Error loading inn data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInnData();
  }, [id]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!inn) {
    return (
      <View>
        <Text>Inn not found</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={handlePressDetails}
      style={({ pressed }) => [
        PressableStyles.notPressed,
        pressed && PressableStyles.pressed,
      ]}
    >
      <Pressable onPress={handlePressDetails}>
        <Image
          style={Images.InnMinimal}
          source={{ uri: inn.image_url }}
          contentFit="cover"
          transition={1000}
        />
      </Pressable>

      <View style={InnStyles.MinimalContainer}>
        <Text
          style={InnStyles.MinimalTitle}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {inn.name}
        </Text>
        <View>
          <Text>{inn.state}</Text>
          <Text>{inn.municipality}</Text>
        </View>
      </View>
    </Pressable>
  );
}