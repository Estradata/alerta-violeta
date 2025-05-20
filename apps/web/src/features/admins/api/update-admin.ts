import { axios } from '@/lib/axios'
import { handleSuccess, type MutationConfig } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import type { AdminData } from '@packages/admins/schema'
import type { UpdateAdminResponse } from '@packages/admins/types'

export function updateAdmin(data: AdminData) {
  return axios.post<UpdateAdminResponse>(`/admins/${data.id}`, data)
}

export function useUpdateAdmin(opts?: MutationConfig<UpdateAdminResponse>) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'admins',
        result,
        ...opts,
      })
    },
    mutationFn: updateAdmin,
  })
}
