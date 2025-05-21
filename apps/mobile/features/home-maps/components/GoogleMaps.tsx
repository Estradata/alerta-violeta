// app/(tab)/index.tsx
import { useEffect, useState } from "react";
import { Platform, Alert, Linking, ViewStyle, View } from "react-native";
import { useSafePoints } from "../hooks/useSafePoints";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

type GoogleMapsProps = {
  styles?: ViewStyle;
};

export default function GoogleMaps({ styles }: GoogleMapsProps) {
  const { data: safetyLocations, isLoading, error } = useSafePoints();
  const [region, setRegion] = useState<Region | null>(null);
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      setLocationGranted(true);
      let loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  console.log(
    "++++++++++++++++ safetyLocations",
    safetyLocations?.data,
    isLoading,
    error,
  );

  if (!region || !locationGranted || isLoading)
    return (
      <View className="h-full w-full flex-1 items-center justify-center bg-gray-100">
        <Spinner size="large" />
        <Text className="text-gray-600">Cargando mapa...</Text>
      </View>
    );

  if (error)
    return (
      <View className="h-full w-full flex-1 items-center justify-center bg-gray-100">
        <Text className="text-gray-600">Error al cargar el Mapa</Text>
      </View>
    );

  console.log("++++++++++++++++", region);

  const openInMaps = (lat: number, lng: number) => {
    const url =
      Platform.OS === "ios"
        ? `http://maps.apple.com/?ll=${lat},${lng}`
        : `geo:${lat},${lng}?q=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <MapView
      style={styles}
      region={region}
      onRegionChangeComplete={setRegion}
      showsUserLocation={locationGranted}
    >
      {!isLoading &&
        safetyLocations?.data.map((point) => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.lat, longitude: point.lng }}
            title={point.name}
            description="Tap to navigate"
            onCalloutPress={() => openInMaps(point.lat, point.lng)}
          >
            <Ionicons name="shield-checkmark" size={32} color="purple" />
          </Marker>
        ))}
    </MapView>
  );
}
