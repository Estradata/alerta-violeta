// lib/api.ts
import { AppConstants } from "@/constants/constants";
import axios from "axios";
import { getToken } from "./secureStore";

const API_BASE_URL = AppConstants.API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
