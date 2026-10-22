import { View } from "react-native";
import InnElementMinimal from "@/components/inn-minimal";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import FilterChips from "@/components/Filters";
import { useFavorites } from "@/context/favorites-context";
import api from "@/services/axios";

export default function Tab() {
  const [inns, setInns] = useState([]);
  const [filterState, setFilterState] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState<string | null>(null);

  const { favorites } = useFavorites();

  useEffect(() => {
    const obtenerInns = async () => {
      try {
        const respuesta = await api.get('/inns');
        // Cambiado de 'exito' a 'success' para que coincida con el backend
        if (respuesta.data.success) {
          setInns(respuesta.data.data);
        }
      } catch (error) {
        console.error("Error al cargar las posadas:", error);
      }
    };

    obtenerInns();
  }, []);

  const filteredData = inns.filter((item: any) => {
    const selectedState = filterState ? item.state === filterState : true;
    const selectedCity = filterCity ? item.municipality === filterCity : true;
    return selectedState && selectedCity;
  });

  const favoriteData = inns.filter((item: any) => favorites.includes(item.id.toString()));

  return (
    <View>
      <Text>Zapato</Text>
      <FilterChips fieldKey="city" onSelectFilter={(val) => setFilterCity(val)} />
      <FilterChips fieldKey="state" onSelectFilter={(val) => setFilterState(val)}/>
      
      <FlatList
        data={filteredData}
        keyExtractor={(item: any) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false} 
        renderItem={({ item }: { item: any }) => (
          <InnElementMinimal id={item.id.toString()} />
        )}
      />

      <Text>Mis Favoritos</Text>
      <FlatList
        data={favoriteData}
        keyExtractor={(item: any) => `fav-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false} 
        renderItem={({ item }: { item: any }) => (
          <InnElementMinimal id={item.id.toString()} />
        )}
      />
    </View>
  );
}