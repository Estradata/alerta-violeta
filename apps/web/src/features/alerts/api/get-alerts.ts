import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { GetAlertsResponse } from '@packages/alerts/types';

export async function getAlerts() {
  const result = await axios.get<GetAlertsResponse>('/alerts')
  return result.data
}

export function useAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: getAlerts,
  })
}
