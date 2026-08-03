import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import innDatabase from "../data/staticDatabase.json";
import { GlobalStyles, Images, InnStyles, PressableStyles } from "@/constants/global-styles";

interface Props {
  id: string;
}

export default function InnElement({ id }: Props) {
  const Details = () => {
    router.push({
      pathname: "/InnDetails",
      params: { id: id },
    });
  };

  const [isPresented, setIsPresented] = useState(false);

  const inn = innDatabase.find((item) => item.id === id);

  if (!inn) {
    return (
      <View>
        <Text>Inn not found</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() => setIsPresented(true)}
      style={({ pressed }) => [
        PressableStyles.notPressed,
        pressed && PressableStyles.pressed
      ]}
    >
      <Pressable onPress={Details}>
        <Image
          style={Images.InnMinimal}
          source={{ uri: inn.image }}
          contentFit="cover"
          transition={1000}
        />
      </Pressable>

      <View style={InnStyles.MinimalContainer}>
        <Text
          style={InnStyles.MinimalTitle}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {inn.name}
        </Text>
        <View>
          <Text>{inn.state}</Text>
          <Text>{inn.city}</Text>
        </View>
      </View>

      {/* Bottom Sheet */}
    </Pressable>
  );
}
