// lib/api.ts
import Constants from "expo-constants";
import axios from "axios";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});
