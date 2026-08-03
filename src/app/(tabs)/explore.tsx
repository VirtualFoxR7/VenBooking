import { View } from "react-native";
import InnElementMinimal from "@/components/inn-minimal"
import innDatabase from '@/data/staticDatabase.json';
import { FlatList } from "react-native-gesture-handler";
import { Text, Button } from "react-native";
import { useEffect, useState } from "react";
import FilterChips from "@/components/Filters";

export default function Tab() {

  const [filterState, setFilterState] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState<string | null>(null);

  console.log("Estado seleccionado actualmente:", filterState);

  const filteredData = innDatabase.filter((item) => {
    const selectedState = filterState ? item.state === filterState : true;
    const selectedCity = filterCity ? item.city === filterCity : true;
    return selectedState && selectedCity;
  })

  return (
    <View>
      <FilterChips fieldKey="city" onSelectFilter={(val) => setFilterCity(val)} />
      <FilterChips fieldKey="state" onSelectFilter={(val) => setFilterState(val)}/>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InnElementMinimal id={item.id} />
        )}
      />
    </View>
  );
}
