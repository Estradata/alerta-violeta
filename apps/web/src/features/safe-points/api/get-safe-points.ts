import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { GetSafePointsResponse } from '@packages/safe-points/types'

export async function getSafePoints() {
  const result = await axios.get<GetSafePointsResponse>('/safe-points')
  return result.data
}

export function useSafePoints() {
  return useQuery({
    queryKey: ['safe-points'],
    queryFn: getSafePoints,
  })
}
