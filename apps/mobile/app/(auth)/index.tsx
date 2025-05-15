// app/(auth)/index.tsx
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/zodSchemas";
import { useLogin } from "@/features/login/index";
import { useAuth } from "@/context/AuthContext";
import { Alert, View } from "react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();
  const { login } = useAuth();

  const onSubmit = (data: LoginSchema) => {
    console.log("Auth INDEX DATA", data);
    mutate(data, {
      onSuccess: (response) => {
        const { token, user } = response.data;
        login(token, user);
        console.log("Auth INDEX TOKEN USER ----", token, user, response.data);
      },
      onError: () => {
        Alert.alert("Error", "Credenciales inválidas");
      },
    });
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <Heading size="md">Iniciar sesión</Heading>
        <Text>Accede ya para usar la app</Text>
        <Text className="text-4xl font-bold">SignUp</Text>

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormControl isInvalid={!!errors.email}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  value={value}
                  onChangeText={onChange}
                  placeholder="correo@ejemplo.com"
                  autoCapitalize="none"
                />
              </Input>
              {errors.email && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.email.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <FormControl isInvalid={!!errors.password}>
              <FormControlLabel>
                <FormControlLabelText className="mt-4">
                  Contraseña
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  value={value}
                  onChangeText={onChange}
                  placeholder="••••••"
                  secureTextEntry
                />
              </Input>
              {errors.password && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.password.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />

        <Button
          className="mt-4"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          <ButtonText>{isPending ? "Entrando..." : "Entrar"}</ButtonText>
        </Button>
      </Card>
    </View>
  );
}
