import type { SafePointData } from '@packages/safe-points/schema'
import type { CreateSafePointResponse } from '@packages/safe-points/types'
import { useMutation } from '@tanstack/react-query'
import { handleSuccess, type MutationConfig } from '@/lib/react-query'
import { axios } from '@/lib/axios'

export function createSafePoint(data: SafePointData) {
  return axios.post<CreateSafePointResponse>('/safe-points', data)
}

export function useCreateSafePoint(
  opts?: MutationConfig<CreateSafePointResponse>
) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'safe-points',
        result,
        ...opts,
      })
    },
    mutationFn: createSafePoint,
  })
}
