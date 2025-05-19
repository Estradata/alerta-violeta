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
import { signupSchema, SignupSchema } from "@/lib/zodSchemas";
import { useSignup } from "../hooks/useSignup";
import { useAuth } from "@/context/AuthContext";
import { Alert } from "react-native";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "expo-router";
import { Text } from "@/components/ui/text";
import { AxiosError } from "axios";

export default function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { dirtyFields, isValid, errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const allFieldsDirty =
    dirtyFields.email &&
    dirtyFields.password &&
    dirtyFields.name &&
    dirtyFields.confirmPassword;

  const { mutate, isPending } = useSignup();
  const { login } = useAuth();

  const onSubmit = (data: SignupSchema) => {
    const dataFormated = {
      accountId: "eba15c59-739a-469c-bf8a-093b40d97a8d",
      name: data.name,
      username: data.name,
      email: data.email,
      password: data.password,
    };
    mutate(dataFormated, {
      onSuccess: (response) => {
        const { token, user } = response.data;
        login(token, user);
      },
      onError: (err) => {
        const axiosError = err as AxiosError<any>;
        const errorResponse = axiosError?.response?.data;
        const emailError = errorResponse?.data?.email;
        const emailAccounId = errorResponse?.data?.accountId;

        Alert.alert(
          "Error",
          emailError ||
            emailAccounId ||
            "Ocurrió un error inesperado. Intenta de nuevo.",
        );

        console.log("++++ ERRR", {
          status: axiosError?.response?.status,
          errorData: errorResponse,
        });
      },
    });
  };

  return (
    <FormControl>
      <VStack space="xl">
        {/* Name */}
        <VStack space="xs">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl
                  isInvalid={!!errors.name}
                  size="md"
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Nombre</FormControlLabelText>
                  </FormControlLabel>
                  <Input isInvalid={!!errors.name}>
                    <InputField
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      placeholder="alertamx"
                      autoCapitalize="words"
                    />
                  </Input>
                  {/* <FormControlHelper>s
                    <FormControlHelperText>
                      Must be atleast 6 characters.
                    </FormControlHelperText>
                  </FormControlHelper> */}
                  {errors.name && (
                    <FormControlError>
                      <FormControlErrorText>
                        {errors.name.message}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
              </>
            )}
          />
        </VStack>

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
        </VStack>

        {/* Confirm Password */}
        <VStack space="xs">
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl isInvalid={!!errors.confirmPassword} size="md">
                  <FormControlLabel>
                    <FormControlLabelText>
                      Confirma tu contraseña
                    </FormControlLabelText>
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
                  {errors.confirmPassword && (
                    <FormControlError>
                      <FormControlErrorText>
                        {errors.confirmPassword.message}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
              </>
            )}
          />
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
            <ButtonText className="text-typography-0">Registrarse</ButtonText>
          )}
        </Button>

        {/* SignUp Button */}
        <VStack className="flex flex-row">
          <Text className="text-blue-600">Si ya tienes cuenta </Text>
          <Link href="/(auth)" className="text-blue-600 underline">
            Inicia sesion
          </Link>
        </VStack>
      </VStack>
    </FormControl>
  );
}
