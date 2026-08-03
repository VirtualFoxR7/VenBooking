import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import innDatabase from "../data/staticDatabase.json";
import { PressableStyles } from "@/constants/global-styles";

interface Props {

  fieldKey: keyof (typeof innDatabase)[0];
  onSelectFilter: (value: string | null) => void;
}

export default function FilterChips({ fieldKey, onSelectFilter }: Props) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const uniqueValues = [
    "Todos",
    ...Array.from(new Set(innDatabase.map((item) => String(item[fieldKey])))),
  ];

  const handlePress = (item: string) => {
    const valueToPass = item === "Todos" ? null : item;
    setSelectedItem(valueToPass);
    onSelectFilter(valueToPass);
  };

  return (
    <View>
      <FlatList
        data={uniqueValues}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected =
            selectedItem === item ||
            (item === "Todos" && selectedItem === null);
          return (
            <Pressable
              style={({ pressed }) => [
                PressableStyles.FilterChipsS,
                pressed && PressableStyles.FilterChipsUnS
              ]}
              onPress={() => handlePress(item)}>
              <Text>{item}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
