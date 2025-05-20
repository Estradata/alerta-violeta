import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { GetPermissionsResponse } from '@packages/admin-permissions/types';

export async function getPermissions() {
  const result = await axios.get<GetPermissionsResponse>('/permissions')
  return result.data
}

export function usePermissions() {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: getPermissions,
  })
}
