// app/(auth)/index.tsx
import { View } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import SignupForm from "@/features/signup/components/SignupForm";

export default function Login() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <Heading className="text-4xl font-bold">Registrarse</Heading>
        <Text className="pb-4">Crea una cuenta para usar la app</Text>

        <SignupForm />
      </Card>
    </View>
  );
}
