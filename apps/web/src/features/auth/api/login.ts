import type { LoginResponse } from '@packages/auth/types'
import type { LoginData } from '@packages/auth/schema'
import { useMutation } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { UseFormReturn } from 'react-hook-form'
import { useAuth } from '@/auth'

export async function login(body: LoginData) {
  return axios.post<LoginResponse>('/auth/login', body)
}

export function useLogin(form: UseFormReturn<LoginData>) {
  const auth = useAuth()
  return useMutation({
    onSuccess(result) {
      auth.login(result.data.data.user, result.data.data.token)
    },
    onError() {
      form.setError('email', { message: 'Credenciales inválidas' })
      form.setError('password', { message: 'Credenciales inválidas' })
    },
    mutationFn: login,
  })
}
