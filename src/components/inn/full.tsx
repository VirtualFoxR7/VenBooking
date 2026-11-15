import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import api from "@/services/axios";
import { InnData } from "@/types/inn";

interface Props {
  id: string;
}

export default function InnElement({ id }: Props) {
  const [inn, setInn] = useState<InnData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handlePressDetails = () => {
    router.push({
      pathname: "/detail-screen/inn",
      params: { id: id },
    });
  };

  useEffect(() => {
    const fetchInnData = async () => {
      try {
        const response = await api.get(`/inns/${id}`);
        if (response.data.success) {
          setInn(response.data.data);
        }
      } catch (error) {
        console.error("Error loading inn data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInnData();
  }, [id]);

  if (isLoading) {
    return (
      <View style={stylesElements.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!inn) {
    return (
      <View style={stylesElements.container}>
        <Text>Inn not found</Text>
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
        style={stylesElements.image}
        source={{ uri: inn.image_url }}
        contentFit="cover"
        transition={1000}
      />

      <View style={stylesElements.MainTextView}>
        <Text
          style={stylesElements.TitleText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {inn.name}
        </Text>
        <View style={stylesElements.InfoView}>
          <Text>{inn.state}</Text>
          <Text>{inn.municipality}</Text>
          <Text numberOfLines={2}>{inn.description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const stylesElements = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  image: {
    width: 100,
    height: 100,
    position: "relative",
    margin: 2.5,
    borderRadius: 20,
  },
  MainTextView: {
    marginLeft: 10,
    maxWidth: 200,
    maxHeight: 100,
  },
  TitleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  InfoView: {
    flexGrow: 100,
    paddingLeft: 15,
  },
});