import "dotenv/config";

export default {
  expo: {
    name: "Alerta Violeta",
    slug: "alerta-violeta",
    version: "1.0.0",
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
    userInterfaceStyle: "automatic",
    scheme: "alertavioleta",
    plugins: ["expo-router"],
  },
};
