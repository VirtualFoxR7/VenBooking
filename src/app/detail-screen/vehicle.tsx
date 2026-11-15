// Resumen: Pantalla de detalles de vehículo estructurada con la interfaz VehicleData, consumiendo la API de vehículos y con variables locales en inglés.
import { DetailsStyles } from "@/constants/global-styles";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import api from "@/services/axios";
import { VehicleData } from "@/types/vehicle";

export default function VehicleDetails() {
    const { id } = useLocalSearchParams();
    const vehicleId = Array.isArray(id) ? id[0] : id;

    const [vehicle, setVehicle] = useState<VehicleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            if (!vehicleId) return;
            try {
                const response = await api.get(`/vehicles/${vehicleId}`);
                if (response.data.success) {
                    setVehicle(response.data.data);
                }
            } catch (error) {
                console.error("Error loading vehicle details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVehicleDetails();
    }, [vehicleId]);

    if (isLoading) {
        return (
            <View style={DetailsStyles.General}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!vehicle) {
        return (
            <View style={DetailsStyles.General}>
                <Pressable onPress={router.back}>
                    <Text>Back</Text>
                </Pressable>
                <Text>Vehicle ID Not Found</Text>
            </View>
        );
    }

    return (
        <View style={DetailsStyles.General}>
            <Pressable onPress={router.back}>
                <Text>Back</Text>
            </Pressable>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={DetailsStyles.Title}>{vehicle.brand} {vehicle.model}</Text>
            </View>

            <Image source={{ uri: vehicle.image_url }} style={DetailsStyles.Image} />
            <Text>{vehicle.description}</Text>
            <Text>ID: {vehicle.id}</Text>
            <Text>Type: {vehicle.type}</Text>
            <Text>Year: {vehicle.year}</Text>
            <Text>Plate: {vehicle.registration_plate}</Text>
            <Text>Price: ${vehicle.price}</Text>
            <Text>Capacity: {vehicle.capacity} passengers</Text>
            <Text>Inn ID: {vehicle.inn_id}</Text>
            <Text>Status: {vehicle.status}</Text>
        </View>
    );
}