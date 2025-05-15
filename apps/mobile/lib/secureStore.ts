// lib/secureStore.ts
import * as SecureStore from "expo-secure-store";

export async function saveToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}

export async function getToken() {
  return await SecureStore.getItemAsync("token");
}

export async function deleteToken() {
  return await SecureStore.deleteItemAsync("token");
}
