// lib/zodSchemas.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Porfavor ingresa tu correo" })
    .nonempty("Porfavor ingresa tu correo")
    .email("Porfabvor ingresa un correo valido (e.g., user@example.com)"),

  password: z
    .string({ required_error: "Porfavor ingresa tu contrasena" })
    .nonempty("Porfavor ingresa tu contrasena")
    .min(8, "La contrasena debe ser de al menos 8 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string({ required_error: "Ingresa tu nombre" })
      .nonempty("Ingresa tu nombre")
      .min(2, "El nombre debe ser de al menos 2 caracteres")
      .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: "Solo letras y espacios permitidos",
      }),
    email: z
      .string({ required_error: "Ingresa tu correo" })
      .email("Correo inválido"),
    password: z
      .string({ required_error: "Ingresa tu contraseña" })
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string({ required_error: "Confirma tu contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type SignupSchema = z.infer<typeof signupSchema>;

export type RegisterSchema = {
  accountId: string;
  name: string;
  username: string;
  email: string;
  password: string;
};
