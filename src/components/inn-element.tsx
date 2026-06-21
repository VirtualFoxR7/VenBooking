import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  name: string;
  state: string;
  city: string;
  desc?: string;
}

const InnElement = ({ name, state, city, desc }: Props) => {
  return (
    <View style={[styles.MainView]}>
      <Pressable
        style={({ pressed }) => ({
          flexDirection: "row",
          backgroundColor: pressed ? "#00000044" : "#fff",
          flexGrow: 100,
          margin: 10,
          padding: 10,
          borderRadius: 25,
        })}
      >
        <Image
          style={[styles.image]}
          source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlHdPPI8C5YxDHDyNMr0jdmUCpXkkPW_bSUA&s"
          //TODO: Cambiar el source
          contentFit="cover"
          transition={1000}
        ></Image>

        <View style={[styles.MainTextView]}>
          <Text
            style={[styles.TitleText]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {name}
          </Text>
          <View style={[styles.InfoView]}>
            <Text>{state}</Text>
            <Text>{city}</Text>
            <Text numberOfLines={3} adjustsFontSizeToFit>
              {desc}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default InnElement;

const styles = StyleSheet.create({
  MainView: {
    borderWidth: 1, //TODO: Sacar esto al tener los colores listos
    flexGrow: 100,
    flexDirection: "column",
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: "#fff",
  },

  image: {
    width: 100,
    height: 100,
    position: "relative",
    margin: 2.5,
    borderRadius: 20,

    borderWidth: 1,
  },

  MainTextView: {
    marginLeft: 10,
    maxWidth: 200,
    maxHeight: 100,
    borderWidth: 1,
  },

  TitleText: {
    fontSize: 25,
    fontWeight: "bold",
    borderWidth: 1,
  },

  InfoView: {
    flexGrow: 100,
    paddingLeft: 15,
    borderWidth: 1,
  },
});
