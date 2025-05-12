import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { GetEmergencyContactsResponse } from '@packages/emergency-contacts/types'

export async function getEmergencyContacts() {
  const result = await axios.get<GetEmergencyContactsResponse>('/emergency-contacts')
  return result.data
}

export function useEmergencyContacts() {
  return useQuery({
    queryKey: ['emergency-contacts'],
    queryFn: getEmergencyContacts,
  })
}
