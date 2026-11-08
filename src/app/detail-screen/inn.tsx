// Resumen: Pantalla de detalles actualizada con las variables locales traducidas al inglés y adaptada para usar el tipo global InnData.
import { DetailsStyles } from "@/constants/global-styles";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { useFavorites } from "@/context/favorites-context";
import { useEffect, useState } from "react";
import api from "@/services/axios";
import { InnData } from "@/types/inn";

export default function InnDetails() {
  const { id } = useLocalSearchParams();
  const innId = Array.isArray(id) ? id[0] : id;

  const [inn, setInn] = useState<InnData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = innId ? isFavorite(innId) : false;

  useEffect(() => {
    const fetchInnDetails = async () => {
      if (!innId) return;
      try {
        const response = await api.get(`/inns/${innId}`);
        if (response.data.success) {
          setInn(response.data.data);
        }
      } catch (error) {
        console.error("Error loading inn details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInnDetails();
  }, [innId]);

  if (isLoading) {
    return (
      <View style={DetailsStyles.General}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!inn) {
    return (
      <View style={DetailsStyles.General}>
        <Pressable onPress={router.back}>
          <Text>Back</Text>
        </Pressable>
        <Text>ID Not Found</Text>
      </View>
    );
  }

  return (
    <View style={DetailsStyles.General}>
      <Pressable onPress={router.back}>
        <Text>Back</Text>
      </Pressable>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={DetailsStyles.Title}>{inn.name}</Text>
        <Pressable onPress={() => innId && toggleFavorite(innId)}>
          <Text style={{ fontSize: 24 }}>{liked ? '❤️' : '🤍'}</Text>
        </Pressable>
      </View>

      <Image source={{ uri: inn.image_url }} style={DetailsStyles.Image} />
      <Text>{inn.description}</Text>
      <Text>ID: {inn.id}</Text>
      <Text>State: {inn.state}</Text>
      <Text>Municipality: {inn.municipality}</Text>
      <Text>Parish: {inn.parish}</Text>
      <Text>Category: {inn.category}</Text>
      <Text>Email: {inn.email}</Text>
      <Text>Phone: {inn.phone}</Text>
      <Text>Status: {inn.status}</Text>
    </View>
  );
}