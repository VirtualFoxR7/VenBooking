import { Colors } from "@/constants/theme";
import { BottomSheet, Column } from "@expo/ui";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  name: string;
  state: string;
  city: string;
  desc?: string;
}

const InnElement = ({ name, state, city, desc }: Props) => {
  const [isPresented, setIsPresented] = useState(false);
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
        style={[stylesElements.image]}
        source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlHdPPI8C5YxDHDyNMr0jdmUCpXkkPW_bSUA&s"
        //TODO: Cambiar el source
        contentFit="cover"
        transition={1000}
      ></Image>

      <View style={[stylesElements.MainTextView]}>
        <Text
          style={[stylesElements.TitleText]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {name}
        </Text>
        <View style={[stylesElements.InfoView]}>
          <Text>{state}</Text>
          <Text>{city}</Text>
          <Text numberOfLines={3}>{desc}</Text>
        </View>
      </View>

      {/* Bottom Sheet */}

      <BottomSheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        snapPoints={["half", "full"]}
      >
        <Column spacing={12}>
          <Text style={[stylesElements.TitleText]}>{name}</Text>
          <Image
            style={[stylesSheets.image]}
            source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlHdPPI8C5YxDHDyNMr0jdmUCpXkkPW_bSUA&s"
            //TODO: Cambiar el source
            contentFit="cover"
            transition={1000}
          ></Image>
          <View style={[stylesSheets.MainTextView]}>
            <Text>{state}</Text>
            <Text>{city}</Text>
            <Text>{desc}</Text>
          </View>
        </Column>
      </BottomSheet>
    </Pressable>
  );
};

export default InnElement;

const stylesElements = StyleSheet.create({
  MainView: {
    //TODO: Sacar esto al tener los colores listos
    flexGrow: 100,
    flexDirection: "column",
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: Colors.light.background,
    flex: 1,
  },

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
  MainView: {
    //TODO: Sacar esto al tener los colores listos
    flexGrow: 100,
    flexDirection: "column",
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: Colors.light.background,
    flex: 1,
  },

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
