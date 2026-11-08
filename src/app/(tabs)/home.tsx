// Resumen: Pantalla principal actualizada para integrar la carga y visualización de vehículos (vehicles) mediante un FlatList horizontal, manteniendo todas las variables locales en inglés.
import FilterChips from "@/components/filters";
import InnElementMinimal from "@/components/inn/minimal";
import RoomElementMinimal from "@/components/room/minimal";
import VehicleElementMinimal from "@/components/vehicle/minimal";
import { useFavorites } from "@/context/favorites-context";
import api from "@/services/axios";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Tab() {
  const [inns, setInns] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [filterState, setFilterState] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState<string | null>(null);

  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const innsResponse = await api.get('/inns');
        if (innsResponse.data.success) {
          setInns(innsResponse.data.data);
        }

        const roomsResponse = await api.get('/rooms');
        if (roomsResponse.data.success) {
          setRooms(roomsResponse.data.data);
        }

        const vehiclesResponse = await api.get('/vehicles');
        if (vehiclesResponse.data.success) {
          setVehicles(vehiclesResponse.data.data);
        }
      } catch (error) {
        console.error("Error loading application data:", error);
      }
    };

    fetchAppData();
  }, []);

  const filteredData = inns.filter((item: any) => {
    const selectedState = filterState ? item.state === filterState : true;
    const selectedCity = filterCity ? item.municipality === filterCity : true;
    return selectedState && selectedCity;
  });

  const favoriteData = inns.filter((item: any) => favorites.includes(item.id.toString()));

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <Text>Zapato</Text>
      <FilterChips fieldKey="city" onSelectFilter={(val) => setFilterCity(val)} />
      <FilterChips fieldKey="state" onSelectFilter={(val) => setFilterState(val)} />

      <Text>Inns</Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item: any) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: any }) => (
          <InnElementMinimal id={item.id.toString()} />
        )}
      />

      <Text>Rooms</Text>
      <FlatList
        data={rooms}
        keyExtractor={(item: any) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: any }) => (
          <RoomElementMinimal id={item.id.toString()} />
        )}
      />

      <Text>Vehicles</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(item: any) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: any }) => (
          <VehicleElementMinimal id={item.id.toString()} />
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
    </ScrollView>
  );
}