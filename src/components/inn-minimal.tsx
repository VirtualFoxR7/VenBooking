import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import api from "../services/axios";
import { GlobalStyles, Images, InnStyles, PressableStyles } from "@/constants/global-styles";
import { InnData } from "@/types/inn";
interface Props {
  id: string;
}

export default function InnElement({ id }: Props) {

  const [inn, setInn] = useState<InnData | null>(null);
  const [cargando, setCargando] = useState(true);

  const Details = () => {
    router.push({
      pathname: "/InnDetails",
      params: { id: id },
    });
  };

  useEffect(() => {
    const innDataId = async () => {
      try {
        const respuesta = await api.get(`/inns/${id}`);
        if (respuesta.data.success) {
          setInn(respuesta.data.data);
        }
      } catch (error) {
        console.error("Error al cargar la posada:", error);
      } finally {
        setCargando(false);
      }
    };

    innDataId();
  }, [id]);

  if (cargando) {
    return (
      <View>
        <Text>Cargando...</Text>
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
      onPress={Details}
      style={({ pressed }) => [
        PressableStyles.notPressed,
        pressed && PressableStyles.pressed
      ]}
    >
      <Pressable onPress={Details}>
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
          adjustsFontSizeToFit>
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