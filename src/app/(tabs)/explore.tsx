// Resumen del código: Se asigna 'flex: 1' al contenedor contenedor principal y se añade 'contentContainerStyle' con 'paddingBottom' en el FlatList para evitar que la barra inferior oculte los últimos elementos de la lista.
import { View } from "react-native";
import InnElement from "@/components/inn/full";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import FilterChips from "@/components/filters";
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
    <View style={{ flex: 1 }}>
      <FilterChips fieldKey="city" onSelectFilter={(val) => setFilterCity(val)} />
      <FilterChips fieldKey="state" onSelectFilter={(val) => setFilterState(val)} />
      <FlatList
        data={filteredData}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item }: { item: any }) => (
          <InnElement id={item.id.toString()} />
        )}
      />
    </View>
  );
}