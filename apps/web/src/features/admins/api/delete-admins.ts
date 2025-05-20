import { axios } from '@/lib/axios'
import { handleSuccess, type MutationConfig } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import type { DeleteAdminsResponse } from '@packages/admins/types'

export function deleteAdmins(ids: string[]) {
  return axios.delete<DeleteAdminsResponse>('/admins', {
    data: ids,
  })
}

export function useDeleteAdmins(opts?: MutationConfig<DeleteAdminsResponse>) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'admins',
        result,
        ...opts,
      })
    },
    mutationFn: deleteAdmins,
  })
}
