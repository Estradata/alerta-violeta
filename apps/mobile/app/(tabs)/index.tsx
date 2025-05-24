// tabs/index.tsx
import { StyleSheet, Dimensions } from "react-native";
import GoogleMaps from "@/features/home-maps/components/GoogleMaps";

export default function HomeScreen() {
  return <GoogleMaps styles={styles.map} />;
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    marginBottom: "20%",
  },
});
