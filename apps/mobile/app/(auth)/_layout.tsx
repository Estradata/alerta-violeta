// app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  useEffect(() => {
    console.log("AuthLayout loaded");
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false, // 👈 Hides the header
      }}
    />
  );
}
