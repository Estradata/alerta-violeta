// lib/api.ts
import { AppConstants } from "@/constants/constants";
import axios from "axios";

const API_BASE_URL = AppConstants.API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});
