import Constants from "expo-constants";

const { API_BASE_URL, GOOGLE_MAPS_ANDROID_API_KEY } =
  Constants.expoConfig?.extra || {};

if (!API_BASE_URL || !GOOGLE_MAPS_ANDROID_API_KEY) {
  console.warn("Missing environment variables. Check .env and app.config.ts.");
}

export const AppConstants = {
  API_BASE_URL: API_BASE_URL as string,
  GOOGLE_MAPS_ANDROID_API_KEY: GOOGLE_MAPS_ANDROID_API_KEY as string,
};
