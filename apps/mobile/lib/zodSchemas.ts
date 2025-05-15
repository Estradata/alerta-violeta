// lib/zodSchemas.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Correo no válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
