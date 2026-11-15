// Resumen: Componente RoomElementMinimal sin estilos internos, consumiendo el endpoint /rooms/:id y adaptado a la interfaz RoomData.
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import api from "@/services/axios";
import { RoomData } from "@/types/room";

interface Props {
    id: string;
}

export default function RoomElementMinimal({ id }: Props) {
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
                source={{ uri: room.image_url }}
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
                    Room {room.room_number}
                </Text>
                <View style={{ flexGrow: 100, paddingLeft: 15 }}>
                    <Text>{room.type}</Text>
                    <Text>Price: ${room.price}</Text>
                    <Text numberOfLines={2}>{room.description}</Text>
                </View>
            </View>
        </Pressable>
    );
}