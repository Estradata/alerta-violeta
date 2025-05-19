// app/(auth)/index.tsx
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  // FormControlHelper,
  // FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";

import React from "react";
import { loginSchema, LoginSchema } from "@/lib/zodSchemas";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "@/context/AuthContext";
import { Alert, Pressable } from "react-native";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "expo-router";
import { Text } from "@/components/ui/text";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { dirtyFields, isValid, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const allFieldsDirty = dirtyFields.email && dirtyFields.password;

  const { mutate, isPending } = useLogin();
  const { login } = useAuth();

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: (response) => {
        const { token, user } = response.data;
        login(token, user);
      },
      onError: (err) => {
        Alert.alert(
          "Error",
          "Correo o contrasena erroneas, porfavor intenta de nuevo.",
        );
        console.log("++++ ERRR", err);
      },
    });
  };

  return (
    <FormControl>
      <VStack space="xl">
        {/* Email */}
        <VStack space="xs">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl
                  isInvalid={!!errors.email}
                  size="md"
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Correo</FormControlLabelText>
                  </FormControlLabel>
                  <Input isInvalid={!!errors.email}>
                    <InputField
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      placeholder="correo@ejemplo.com"
                      autoCapitalize="none"
                    />
                  </Input>
                  {/* <FormControlHelper>
                    <FormControlHelperText>
                      Must be atleast 6 characters.
                    </FormControlHelperText>
                  </FormControlHelper> */}
                  {errors.email && (
                    <FormControlError>
                      <FormControlErrorText>
                        {errors.email.message}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
              </>
            )}
          />
        </VStack>

        {/* Password */}
        <VStack space="xs">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl
                  isInvalid={!!errors.password}
                  size="md"
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Contrasena</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="text-center">
                    <InputField
                      type={showPassword ? "text" : "password"}
                      value={value}
                      onChangeText={onChange}
                      placeholder="••••••"
                    />
                    <InputSlot
                      className="pr-3"
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                  {/* <FormControlHelper>
                    <FormControlHelperText>
                      Must be atleast 6 characters.
                    </FormControlHelperText>
                  </FormControlHelper> */}
                  {errors.password && (
                    <FormControlError>
                      <FormControlErrorText>
                        {errors.password.message}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
              </>
            )}
          />
          {/* Forgot Pass Link */}
          {/* TODO: Call the API to initialize the Password recovery */}
          <Pressable onPress={() => console.log("Navigate to forgot password")}>
            <Text className="text-primary-600">Olvide mi contrasena</Text>
          </Pressable>
        </VStack>

        {/* Submit Button */}
        <Button
          className="ml-auto"
          onPress={handleSubmit(onSubmit)}
          isDisabled={!allFieldsDirty || !isValid || isPending}
        >
          {isPending ? (
            <Spinner size="small" />
          ) : (
            <ButtonText className="text-typography-0">
              Iniciar sesion
            </ButtonText>
          )}
        </Button>

        {/* SignUp Button */}
        <VStack className="flex flex-row">
          <Text className="text-blue-600">Si aun no tienes cuenta </Text>
          <Link href="/(auth)/signup" className="text-blue-600 underline">
            registrate
          </Link>
        </VStack>
      </VStack>
    </FormControl>
  );
}
