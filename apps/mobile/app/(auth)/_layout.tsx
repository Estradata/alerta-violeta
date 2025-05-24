// app/(auth)/_layout.tsx
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthLayout() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/(tabs)");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
