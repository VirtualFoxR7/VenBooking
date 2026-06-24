import InnItem from "@/components/inn-item";
import { Host } from "@expo/ui";
export default function Tab() {
  return (
    <Host
      style={{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <InnItem Name="PlaceHolder" />
    </Host>
  );
}
