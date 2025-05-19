import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { GetAdminsResponse } from '@packages/admins/types'

export async function getAdmins() {
  const result = await axios.get<GetAdminsResponse>('/admins')
  return result.data
}

export function useAdmins() {
  return useQuery({
    queryKey: ['admins'],
    queryFn: getAdmins,
  })
}
