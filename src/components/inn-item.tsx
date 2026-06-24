import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import InnSheet from "./inn-sheet";

interface Props {
  Name: string;
}

const InnItem = ({ Name }: Props) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable style={Styles.item} onPress={() => console.log("pressed")}>
      <InnSheet IsPressed={isPressed} Name={Name} />
      <Text>{Name}</Text>
    </Pressable>
  );
};

export default InnItem;

const Styles = StyleSheet.create({
  item: {
    height: 40,
    width: 40,
    marginTop: 40,
  },
});
