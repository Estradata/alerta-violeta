import { useMutation } from '@tanstack/react-query'
import {
  handleError,
  handleSuccess,
  type MutationConfig,
} from '@/lib/react-query'
import { axios } from '@/lib/axios'
import type { CreateAdminResponse } from '@packages/admins/types'
import type { AdminData } from '@packages/admins/schema'

export function createAdmin(data: AdminData) {
  return axios.post<CreateAdminResponse>('/admins', data)
}

export function useCreateAdmin(opts?: MutationConfig<CreateAdminResponse>) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'admins',
        result,
        ...opts,
      })
    },
    onError(error) {
      handleError({
        error,
        ...opts,
      })
    },
    mutationFn: createAdmin,
  })
}
