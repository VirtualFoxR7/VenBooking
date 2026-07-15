import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const profile = () => {
  const [email, setEmail] = useState<string>("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const storedData = await SecureStore.getItemAsync("userData");
        if (storedData) {
          const user = JSON.parse(storedData);
          setEmail(user.email);
        }
      } catch (e) {
        console.error("error al leer el dato", e);
      } finally {
        setCargando(false);
      }
    }
    loadData();
  }, []);

  if (cargando) {
    return <ActivityIndicator />;
  }

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/login");
  };

  return (
    <View style={ProfileStyle.global}>
      <Image
        style={[ProfileStyle.image]}
        source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlHdPPI8C5YxDHDyNMr0jdmUCpXkkPW_bSUA&s"
        //TODO: Cambiar el source
        contentFit="cover"
        transition={1000}
      ></Image>
      <View style={ProfileStyle.userInfo}>
        <View style={{ flexDirection: "row", flexGrow: 100 }}>
          <Text style={ProfileStyle.Name} numberOfLines={1} allowFontScaling>
            {email}
          </Text>
        </View>
        <View>
          <Text style={ProfileStyle.GeneralText}>Username</Text>
          <Text style={ProfileStyle.GeneralText}>Email</Text>
        </View>
        <Pressable style={ProfileStyle.pressable} onPress={handleLogout}>
          <Text style={ProfileStyle.GeneralText}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default profile;

const borderWith = 2;
const ProfileStyle = StyleSheet.create({
  global: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  GeneralText: {
    color: Colors.light.primary,
  },

  Name: {
    fontWeight: "black",
    fontSize: 30,
    color: Colors.light.primary,
  },

  image: {
    width: 100,
    height: 100,
    position: "relative",
    margin: 2.5,
    borderRadius: 100,
  },

  userInfo: {
    backgroundColor: Colors.light.backgroundElement,

    borderTopWidth: borderWith,
    borderRightWidth: borderWith,
    borderLeftWidth: borderWith,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    borderColor: Colors.light.backgroundSelected,

    paddingBottom: 1000,
    paddingLeft: 10,
  },

  pressable: {
    color: Colors.light.tertiary,
    backgroundColor: Colors.light.secondary,

    height: 25,
    width: 100,
    borderRadius: 100,

    alignItems: "center",
    alignSelf: "center",
    marginLeft: 140,
  },
});
