// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { RegisterSchema } from "@/lib/zodSchemas";

export function useSignup() {
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const response = await api.post("/auth/register", data);
      return response.data;
    },
  });
}
