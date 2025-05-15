// app/(auth)/index.tsx
import { View } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import LoginForm from "@/features/login/components/LoginForm";

export default function Login() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <Heading size="md">Iniciar sesión</Heading>
        <Text>Accede ya para usar la app</Text>
        <Text className="text-4xl font-bold">SignUp</Text>

        <LoginForm />
      </Card>
    </View>
  );
}
