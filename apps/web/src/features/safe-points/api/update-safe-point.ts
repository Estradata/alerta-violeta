import type { SafePointData } from '@packages/safe-points/schema'
import type { UpdateSafePointResponse } from '@packages/safe-points/types'
import { useMutation } from '@tanstack/react-query'
import { handleSuccess, type MutationConfig } from '@/lib/react-query'
import { axios } from '@/lib/axios'

export function updateSafePoint(data: SafePointData) {
  return axios.post<UpdateSafePointResponse>(`/safe-points/${data.id}`, data)
}

export function useUpdateSafePoint(
  opts?: MutationConfig<UpdateSafePointResponse>
) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'safe-points',
        result,
        ...opts,
      })
    },
    mutationFn: updateSafePoint,
  })
}
