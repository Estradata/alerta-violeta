// app/(auth)/_layout.tsx
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthLayout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    }
    console.log("AuthLayout loaded");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
