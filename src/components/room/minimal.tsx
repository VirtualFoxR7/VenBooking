// Resumen: Componente RoomElement para listar habitaciones consumiendo el endpoint /rooms/:id, con variables locales en inglés y estilos adaptados a la interfaz RoomData.
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import api from "@/services/axios";
import { Images, InnStyles, PressableStyles } from "@/constants/global-styles";
import { RoomData } from "@/types/room"; // Asegúrate de ajustar la ruta de tu interfaz

interface Props {
    id: string;
}

export default function RoomElement({ id }: Props) {
    const [room, setRoom] = useState<RoomData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handlePressDetails = () => {
        router.push({
            pathname: "/detail-screen/room",
            params: { id: id },
        });
    };

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await api.get(`/rooms/${id}`);
                if (response.data.success) {
                    setRoom(response.data.data);
                }
            } catch (error) {
                console.error("Error loading room data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoomData();
    }, [id]);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!room) {
        return (
            <View>
                <Text>Room not found</Text>
            </View>
        );
    }

    return (
        <Pressable
            onPress={handlePressDetails}
            style={({ pressed }) => [
                PressableStyles.notPressed,
                pressed && PressableStyles.pressed,
            ]}
        >
            <Pressable onPress={handlePressDetails}>
                <Image
                    style={Images.InnMinimal}
                    source={{ uri: room.image_url }}
                    contentFit="cover"
                    transition={1000}
                />
            </Pressable>

            <View style={InnStyles.MinimalContainer}>
                <Text
                    style={InnStyles.MinimalTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
                    Room {room.room_number} - {room.type}
                </Text>
                <View>
                    <Text>Quality: {room.quality}</Text>
                    <Text>Price: ${room.price}</Text>
                </View>
            </View>
        </Pressable>
    );
}