import type { EmergencyContactData } from '@packages/emergency-contacts/schema'
import type { UpdateEmergencyContactResponse } from '@packages/emergency-contacts/types'
import { useMutation } from '@tanstack/react-query'
import { handleSuccess, type MutationConfig } from '@/lib/react-query'
import { axios } from '@/lib/axios'

export function updateEmergencyContact(data: EmergencyContactData) {
  return axios.put<UpdateEmergencyContactResponse>(`/emergency-contacts/${data.id}`, data)
}

export function useUpdateEmergencyContact(
  opts?: MutationConfig<UpdateEmergencyContactResponse>
) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'emergency-contacts',
        result,
        ...opts,
      })
    },
    mutationFn: updateEmergencyContact,
  })
}
