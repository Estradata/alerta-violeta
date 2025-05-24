import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveSafePoints(data: string) {
  await AsyncStorage.setItem("safePoints", JSON.stringify(data));
}

export async function getSafePoints() {
  return await AsyncStorage.getItem("safePoints");
}

export async function deleteSafePoints() {
  return await AsyncStorage.removeItem("safePoints");
}
