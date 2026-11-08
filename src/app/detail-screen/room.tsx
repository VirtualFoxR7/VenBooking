// Resumen: Pantalla de detalles de habitación estructurada bajo el mismo diseño robusto, consumiendo la API de habitaciones y utilizando la interfaz RoomData.
import { DetailsStyles } from "@/constants/global-styles";
import api from "@/services/axios";
import { RoomData } from "@/types/room"; // Ajusta la ruta según la ubicación de tu interfaz
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function RoomDetails() {
    const { id } = useLocalSearchParams();
    const roomId = Array.isArray(id) ? id[0] : id;

    const [room, setRoom] = useState<RoomData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            if (!roomId) return;
            try {
                const response = await api.get(`/rooms/${roomId}`);
                if (response.data.success) {
                    setRoom(response.data.data);
                }
            } catch (error) {
                console.error("Error loading room details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    if (isLoading) {
        return (
            <View style={DetailsStyles.General}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!room) {
        return (
            <View style={DetailsStyles.General}>
                <Pressable onPress={router.back}>
                    <Text>Back</Text>
                </Pressable>
                <Text>Room ID Not Found</Text>
            </View>
        );
    }

    return (
        <View style={DetailsStyles.General}>
            <Pressable onPress={router.back}>
                <Text>Back</Text>
            </Pressable>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={DetailsStyles.Title}>Room {room.room_number}</Text>
            </View>

            <Image source={{ uri: room.image_url }} style={DetailsStyles.Image} />
            <Text>{room.description}</Text>
            <Text>ID: {room.id}</Text>
            <Text>Type: {room.type}</Text>
            <Text>Quality: {room.quality}</Text>
            <Text>Price: ${room.price}</Text>
            <Text>Capacity: {room.capacity} persons</Text>
            <Text>Inn ID: {room.inn_id}</Text>
            <Text>Status: {room.status}</Text>
            <Text>Block: {room.block}</Text>
        </View>
    );
}