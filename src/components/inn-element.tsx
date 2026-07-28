import { Colors } from "@/constants/theme";
import { BottomSheet, Column } from "@expo/ui";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import innDatabase from '../data/staticDatabase.json';

interface Props {
  id: string;
}

export default function InnElement({ id }: Props) {
  const [isPresented, setIsPresented] = useState(false);

  // 1. Buscamos el elemento dentro del componente principal
  const inn = innDatabase.find((item) => item.id === id);

  // 2. Si no se encuentra, manejamos el error visualmente aquí mismo
  if (!inn) {
    return (
      <View style={stylesElements.container}>
        <Text>Inn not found</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() => setIsPresented(true)}
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
        source={{ uri: inn.image }}
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
          <Text>{inn.city}</Text>
          <Text numberOfLines={2}>{inn.desc}</Text>
        </View>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        snapPoints={["half", "full"]}
      >
        <Column spacing={12}>
          <Text style={stylesSheets.TitleText}>{inn.name}</Text>
          <Image
            style={stylesSheets.image}
            source={{ uri: inn.image }}
            contentFit="cover"
            transition={1000}
          />
          <View style={stylesSheets.MainTextView}>
            <Text>{inn.state}</Text>
            <Text>{inn.city}</Text>
            <Text>{inn.desc}</Text>
          </View>
        </Column>
      </BottomSheet>
    </Pressable>
  );
}

const stylesElements = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
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

const stylesSheets = StyleSheet.create({
  image: {
    width: 300,
    height: 150,
    alignSelf: "center",
    alignItems: "center",
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
    color: Colors.light.text,
  },
  InfoView: {
    flexGrow: 100,
    paddingLeft: 15,
    flexShrink: 1,
  },
});