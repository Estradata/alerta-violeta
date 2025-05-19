// lib/zodSchemas.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Porfavor ingresa tu correo" })
    .nonempty("Porfavor ingresa tu correo")
    .email("Porfavor ingresa un correo valido (e.g., user@example.com)"),

  password: z
    .string({ required_error: "Porfavor ingresa tu contrasena" })
    .nonempty("Porfavor ingresa tu contrasena")
    .min(8, "La contrasena debe ser de al menos 8 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
