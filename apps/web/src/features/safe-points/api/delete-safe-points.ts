import { axios } from '@/lib/axios'
import { handleSuccess, type MutationConfig } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import type { DeleteSafePointsResponse } from '@packages/safe-points/types'

export function deleteSafePoints(ids: string[]) {
  return axios.delete<DeleteSafePointsResponse>('/safe-points', {
    data: ids,
  })
}

export function useDeleteSafePoints(
  opts?: MutationConfig<DeleteSafePointsResponse>
) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'safe-points',
        result,
        ...opts,
      })
    },
    mutationFn: deleteSafePoints,
  })
}
