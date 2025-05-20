import { axios } from '@/lib/axios'
import { handleSuccess, type MutationConfig } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import type { UpdateUserStatusData } from '@packages/users/schema'
import type { UpdateUserStatusResponse } from '@packages/users/types'

export function updateUserStatus(data: UpdateUserStatusData) {
  return axios.post<UpdateUserStatusResponse>(
    `/users/update-status/${data.id}`,
    data
  )
}

export function useUpdateUserStatus(
  opts?: MutationConfig<UpdateUserStatusResponse>
) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'users',
        result,
        ...opts,
      })
    },
    mutationFn: updateUserStatus,
  })
}
