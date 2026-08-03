import { View } from "react-native";
import InnElementMinimal from "@/components/inn-minimal"
import innDatabase from '@/data/staticDatabase.json';
import { FlatList } from "react-native-gesture-handler";
import { Text, Button } from "react-native";
import { useEffect, useState } from "react";
import FilterChips from "@/components/Filters";
import { useFavorites } from "@/context/favorites-context"; // Importación del hook global

export default function Tab() {

  const [filterState, setFilterState] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState<string | null>(null);

  // Consumo de los favoritos desde el contexto
  const { favorites } = useFavorites();

  console.log("Estado seleccionado actualmente:", filterState);

  const filteredData = innDatabase.filter((item) => {
    const selectedState = filterState ? item.state === filterState : true;
    const selectedCity = filterCity ? item.city === filterCity : true;
    return selectedState && selectedCity;
  });

  // Filtrado exclusivo para los elementos que están en el arreglo de favoritos
  const favoriteData = innDatabase.filter((item) => favorites.includes(item.id));

  return (
    <View>
      <Text>Zapato</Text>
      <FilterChips fieldKey="city" onSelectFilter={(val) => setFilterCity(val)} />
      <FilterChips fieldKey="state" onSelectFilter={(val) => setFilterState(val)}/>
      
      {/* FlatList principal con filtros */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false} 
        renderItem={({ item }) => (
          <InnElementMinimal id={item.id} />
        )}
      />

      {/* Nueva FlatList que muestra únicamente los favoritos */}
      <Text>Mis Favoritos</Text>
      <FlatList
        data={favoriteData}
        keyExtractor={(item) => `fav-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false} 
        renderItem={({ item }) => (
          <InnElementMinimal id={item.id} />
        )}
      />
    </View>
  );
}