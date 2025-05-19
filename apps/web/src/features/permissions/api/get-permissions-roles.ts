import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { GetPermissionsRoles } from '@packages/permissions/types'

export async function getPermissionsRoles() {
  const result = await axios.get<GetPermissionsRoles>('/permissions/roles')
  return result.data
}

export function usePermissionsRoles() {
  return useQuery({
    queryKey: ['permissions-roles'],
    queryFn: getPermissionsRoles,
  })
}
