/**
 * Model
 */
export type EmergencyContact = {
  id: string
  name: string
  phone: string
  description: string
}

/**
 * API Responses
 */
export type GetEmergencyContactResponse = {
  data: EmergencyContact
}

export type GetEmergencyContactsResponse = {
  data: EmergencyContact[]
}

export type CreateEmergencyContactResponse = {
  message: string
  data: EmergencyContact
}

export type UpdateEmergencyContactResponse = {
  message: string
  data: EmergencyContact
}

export type DeleteEmergencyContactsResponse = {
  message: string
}
