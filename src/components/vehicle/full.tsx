// Resumen: Componente VehicleElement adaptado al esquema VehicleData, consumiendo el endpoint /vehicles/:id con variables locales en inglés y estilos en línea.
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import api from "@/services/axios";
import { VehicleData } from "@/types/vehicle";

interface Props {
    id: string;
}

export default function VehicleElement({ id }: Props) {
    const [vehicle, setVehicle] = useState<VehicleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handlePressDetails = () => {
        router.push({
            pathname: "/detail-screen/vehicle",
            params: { id: id },
        });
    };

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await api.get(`/vehicles/${id}`);
                if (response.data.success) {
                    setVehicle(response.data.data);
                }
            } catch (error) {
                console.error("Error loading vehicle data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVehicleData();
    }, [id]);

    if (isLoading) {
        return (
            <View style={{ padding: 20, alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!vehicle) {
        return (
            <View style={{ padding: 20, alignItems: "center" }}>
                <Text>Vehicle not found</Text>
            </View>
        );
    }

    return (
        <Pressable
            onPress={handlePressDetails}
            style={({ pressed }) => ({
                flexDirection: "row",
                backgroundColor: pressed
                    ? Colors.light.backgroundSelected
                    : Colors.light.backgroundElement,
                flexGrow: 100,
                margin: 10,
                padding: 10,
                borderRadius: 25,
                maxHeight: 250,
            })}
        >
            <Image
                style={{
                    width: 100,
                    height: 100,
                    position: "relative",
                    margin: 2.5,
                    borderRadius: 20,
                }}
                source={{ uri: vehicle.image_url }}
                contentFit="cover"
                transition={1000}
            />

            <View style={{ marginLeft: 10, maxWidth: 200, maxHeight: 100 }}>
                <Text
                    style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: Colors.light.primary,
                    }}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
                    {vehicle.brand} {vehicle.model}
                </Text>
                <View style={{ flexGrow: 100, paddingLeft: 15 }}>
                    <Text>{vehicle.year} - {vehicle.type}</Text>
                    <Text>Price: ${vehicle.price}</Text>
                    <Text numberOfLines={2}>{vehicle.description}</Text>
                </View>
            </View>
        </Pressable>
    );
}