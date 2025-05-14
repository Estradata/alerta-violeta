import { axios } from '@/lib/axios'
import { handleSuccess, type MutationConfig } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import type { DeleteEmergencyContactsResponse } from '@packages/emergency-contacts/types'

export function deleteEmergencyContacts(ids: string[]) {
  return axios.delete<DeleteEmergencyContactsResponse>('/emergency-contacts', {
    data: ids,
  })
}

export function useDeleteEmergencyContacts(
  opts?: MutationConfig<DeleteEmergencyContactsResponse>
) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'emergency-contacts',
        result,
        ...opts,
      })
    },
    mutationFn: deleteEmergencyContacts,
  })
}
