import type { EmergencyContactData } from '@packages/emergency-contacts/schema'
import type { CreateEmergencyContactResponse } from '@packages/emergency-contacts/types'
import { useMutation } from '@tanstack/react-query'
import { handleSuccess, type MutationConfig } from '@/lib/react-query'
import { axios } from '@/lib/axios'

export function createEmergencyContact(data: EmergencyContactData) {
  return axios.post<CreateEmergencyContactResponse>('/emergency-contacts', data)
}

export function useCreateEmergencyContact(
  opts?: MutationConfig<CreateEmergencyContactResponse>
) {
  return useMutation({
    onSuccess(result) {
      handleSuccess({
        queryKey: 'emergency-contacts',
        result,
        ...opts,
      })
    },
    mutationFn: createEmergencyContact,
  })
}
