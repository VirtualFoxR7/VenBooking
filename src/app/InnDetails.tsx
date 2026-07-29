import InnDatabase from "@/data/staticDatabase.json";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function InnDetails() {
  const { id } = useLocalSearchParams();
  const innId = Array.isArray(id) ? id[0] : id;
  const inn = InnDatabase.find((item) => item.id === innId);
  if (!inn) {
      return console.log(innId),
      console.log(inn) , (
          <Text>ID Not Found</Text>
      )
  }
    console.log(innId, typeof innId)
  return (
    <View>
      <Text>{inn?.city}</Text>
      <Text>{inn?.desc}</Text>
      <Text>{inn?.id}</Text>
      <Text>{inn?.price}</Text>
      <Text>{inn?.state}</Text>
    </View>
  );
}
