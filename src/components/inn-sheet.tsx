import { BottomSheet } from "@expo/ui";
import { useState } from "react";
import { Text } from "react-native";

interface Props {
  IsPressed: boolean;
  Name: string;
}

const InnSheet = ({ IsPressed, Name }: Props) => {
  const [isPresented, setIsPresented] = useState(IsPressed);
  return (
    <BottomSheet
      isPresented={isPresented}
      onDismiss={() => setIsPresented(false)}
    >
      <Text>{Name}</Text>
    </BottomSheet>
  );
};

export default InnSheet;
