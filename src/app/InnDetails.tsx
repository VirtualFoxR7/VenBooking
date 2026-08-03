import { DetailsStyles, GlobalStyles } from "@/constants/global-styles";
import InnDatabase from "@/data/staticDatabase.json";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { useFavorites } from "@/context/favorites-context"; // Importación del hook global

export default function InnDetails() {
  const { id } = useLocalSearchParams();
  const innId = Array.isArray(id) ? id[0] : id;
  const inn = InnDatabase.find((item) => item.id === innId);

  // Consumo del estado y acciones de favoritos
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = innId ? isFavorite(innId) : false;

  if (!inn) {
      return console.log(innId),
      console.log(inn) , (
        <Text>ID Not Found</Text>
      )
  }
    console.log(innId, typeof innId)
  return (
    <View style={DetailsStyles.General} >
      <Pressable onPress={router.back}>
        <Text>Atrás</Text>
      </Pressable>

      {/* Contenedor en fila para colocar el título y el botón de favorito lado a lado */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={DetailsStyles.Title} > {inn.name} </Text>
        <Pressable onPress={() => innId && toggleFavorite(innId)}>
          <Text style={{ fontSize: 24 }}>{liked ? '❤️' : '🤍'}</Text>
        </Pressable>
      </View>

      <Image source={{uri: inn.image}} style={DetailsStyles.Image} />
      <Text>{inn?.city}</Text>
      <Text>{inn?.desc}</Text>
      <Text>{inn?.id}</Text>
      <Text>{inn?.price}<Text style={GlobalStyles.Accent}>$/Night</Text></Text>
      <Text>{inn?.state}</Text>
    </View>
  );
}