// app/(tab)/index.tsx
import { useEffect, useState } from "react";
import {
  Platform,
  Alert,
  Linking,
  ViewStyle,
  View,
  FlatList,
} from "react-native";
import { useSafePoints } from "../hooks/useSafePoints";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { Input, InputField, Pressable } from "@gluestack-ui/themed";
import { findNearestSafePoint } from "../index";

type GoogleMapsProps = {
  styles?: ViewStyle;
};

export default function GoogleMaps({ styles }: GoogleMapsProps) {
  const { data: safetyLocations, isLoading, error } = useSafePoints();
  const [region, setRegion] = useState<Region | null>(null);
  const [locationGranted, setLocationGranted] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = safetyLocations?.data ?? [];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Permiso de ubicacion es necesario.");
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

  // console.log("++++++++++++++++", query, region, filtered);
  console.log(
    "%%%%%%%%%%%%%% NEAR SAFE POINT %%%",
    findNearestSafePoint(region, filtered),
  );

  const openInMaps = (lat: number, lng: number) => {
    const url =
      Platform.OS === "ios"
        ? `http://maps.apple.com/?ll=${lat},${lng}`
        : `geo:${lat},${lng}?q=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Map underneath everything */}
      <MapView
        style={styles}
        region={region}
        onRegionChangeComplete={(region, gesture) => {
          if (!gesture.isGesture) return;
          setRegion(region);
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={locationGranted}
        showsMyLocationButton
      >
        {safetyLocations?.data.map((point) => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.lat, longitude: point.lng }}
            title={point.name}
            description="Tap para navegar"
            onCalloutPress={() => openInMaps(point.lat, point.lng)}
          >
            <Ionicons name="shield-sharp" size={42} color="purple" />
          </Marker>
        ))}
      </MapView>

      {/* Overlay */}
      <View
        style={{
          position: "absolute",
          top: "6%",
          width: "95%",
          alignSelf: "center",
          zIndex: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
        }}
      >
        <Input
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="search" size={28} color="gray" />
          <InputField
            placeholder="Buscar ubicación segura..."
            value={query}
            onChangeText={setQuery}
            style={{ height: 50, fontSize: 20 }}
          />
        </Input>
      </View>

      {/* Suggestions */}
      {query.length > 0 && (
        <View
          style={{
            position: "absolute",
            top: "13%",
            width: "95%",
            alignSelf: "center",
            backgroundColor: "#fff",
            borderRadius: 20,
            maxHeight: 200,
            zIndex: 3,
            elevation: 5, // For Android shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
          }}
        >
          <FlatList
            data={filtered.filter(
              (point) =>
                point.name.toLowerCase().includes(query.toLowerCase()) ||
                point.address.toLowerCase().includes(query.toLowerCase()),
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  padding: 8,
                  borderColor: "#eee",
                }}
                onPress={() => {
                  setRegion({
                    latitude: item.lat,
                    longitude: item.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  });
                  setQuery(""); // Optional: clear search on select
                }}
              >
                <Text style={{ fontSize: 18, color: "#000" }}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: "#888" }}>
                  {item.address}
                </Text>
                <Text
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                    width: "99%",
                  }}
                ></Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}
