// Componente adaptado para obtener el listado dinámico de posadas desde el servidor mediante Axios, eliminando la dependencia del archivo JSON estático.
import { View } from "react-native";
import InnElementMinimal from "@/components/inn-minimal";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import FilterChips from "@/components/Filters";
import api from "@/services/axios";

export default function Tab() {
  const [inns, setInns] = useState<any[]>([]);
  const [filterState, setFilterState] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchInns = async () => {
      try {
        const response = await api.get('/inns');
        if (response.data.success) {
          setInns(response.data.data);
        }
      } catch (error) {
        console.error("Error al cargar las posadas:", error);
      }
    };

    fetchInns();
  }, []);

  const filteredData = inns.filter((item: any) => {
    const selectedState = filterState ? item.state === filterState : true;
    const selectedCity = filterCity ? item.municipality === filterCity : true;
    return selectedState && selectedCity;
  });

  return (
    <View>
      <FilterChips fieldKey="city" onSelectFilter={(val) => setFilterCity(val)} />
      <FilterChips fieldKey="state" onSelectFilter={(val) => setFilterState(val)} />
      <FlatList
        data={filteredData}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: { item: any }) => (
          <InnElementMinimal id={item.id.toString()} />
        )}
      />
    </View>
  );
}