// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { LoginSchema } from "@/lib/zodSchemas";

export function useSignup() {
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
  });
}
