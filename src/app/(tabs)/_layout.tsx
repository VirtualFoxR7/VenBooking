import { Colors } from "@/constants/theme";
import { Host } from "@expo/ui";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//TODO: Quitar los md por require
export default function TabLayout() {
  return (
    <Host style={Style.global}>
      <GestureHandlerRootView>
        <NativeTabs
          backgroundColor={Colors.light.backgroundElement}
          indicatorColor={Colors.light.secondary}
          rippleColor={Colors.light.secondary}
          shadowColor={Colors.light.backgroundSelected}
          iconColor={Colors.light.primary}
        >
          <NativeTabs.Trigger name="index">
            <NativeTabs.Trigger.Label>home</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon md={"home"} />
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="explore">
            <NativeTabs.Trigger.Label>explore</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon md={"search"} />
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="profile">
            <NativeTabs.Trigger.Label>profile</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon md={"user_attributes"} />
          </NativeTabs.Trigger>
        </NativeTabs>
      </GestureHandlerRootView>
    </Host>
  );
}

const Style = StyleSheet.create({
  global: {
    flex: 1,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
    marginTop: 35,
  },
});
