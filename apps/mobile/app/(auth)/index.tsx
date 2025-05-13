// app/(auth)/index.tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { AlertCircleIcon } from "@/components/ui/icon";
import { View } from "react-native";

export default function Login() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = () => {
    console.log("Login clicked:");
    if (inputValue.length < 6) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Card size="md" variant="elevated" className="w-full max-w-md p-6">
        <Heading size="md" className="mb-1">
          Iniciar sesion
        </Heading>
        <Text size="sm">Accede ya para empezar a usar Alerta Violeta</Text>
        <FormControl isInvalid={isInvalid} size="md">
        <FormControlLabel>
            <FormControlLabelText>Correo</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              type="text"
              placeholder="correo"
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Ingresa un correo.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Debe ser un correo valido.
            </FormControlErrorText>
          </FormControlError>

          <FormControlLabel>
            <FormControlLabelText className="mt-4">Contrasena</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              type="password"
              placeholder="contrasena"
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Debe ser al menos 6 caracteres.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Debe ser al menos 6 caracteres.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button
          className="mt-4 w-auto"
          size="sm"
          onPress={handleSubmit}
        >
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Card>
    </View>
  );
}
