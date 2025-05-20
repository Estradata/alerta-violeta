import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { GetUsersResponse } from '@packages/users/types'

export async function getUsers() {
  const result = await axios.get<GetUsersResponse>('/users')
  return result.data
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
