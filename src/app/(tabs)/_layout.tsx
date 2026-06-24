import { Host } from "@expo/ui";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//TODO: Quitar los md por require
export default function TabLayout() {
  return (
    <Host style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <NativeTabs>
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
