// Resumen: Pantalla de detalles refactorizada utilizando el tipo global importado para mantener el código limpio y sin duplicaciones.
import { DetailsStyles, GlobalStyles } from "@/constants/global-styles";
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
  const [cargando, setCargando] = useState(true);

  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = innId ? isFavorite(innId) : false;

  useEffect(() => {
    const fetchInnDetails = async () => {
      if (!innId) return;
      try {
        const respuesta = await api.get(`/inns/${innId}`);
        if (respuesta.data.success) {
          setInn(respuesta.data.data);
        }
      } catch (error) {
        console.error("Error al cargar los detalles de la posada:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchInnDetails();
  }, [innId]);

  if (cargando) {
    return (
      <View style={DetailsStyles.General}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!inn) {
    return (
      <View style={DetailsStyles.General}>
        <Pressable onPress={router.back}>
          <Text>Atrás</Text>
        </Pressable>
        <Text>ID Not Found</Text>
      </View>
    );
  }

  return (
    <View style={DetailsStyles.General}>
      <Pressable onPress={router.back}>
        <Text>Atrás</Text>
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
      <Text>Estado: {inn.state}</Text>
      <Text>Municipio: {inn.municipality}</Text>
      <Text>Parroquia: {inn.parish}</Text>
      <Text>Categoría: {inn.category}</Text>
      <Text>Correo: {inn.email}</Text>
      <Text>Teléfono: {inn.phone}</Text>
      <Text>Estatus: {inn.status}</Text>
    </View>
  );
}