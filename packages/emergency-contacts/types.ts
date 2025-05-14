import type { DataMsgResponse, DataResponse, MsgResponse } from '../misc/types'
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
export type GetEmergencyContactResponse = DataResponse<EmergencyContact>
export type GetEmergencyContactsResponse = DataResponse<EmergencyContact[]>
export type CreateEmergencyContactResponse = DataMsgResponse<EmergencyContact>
export type UpdateEmergencyContactResponse = DataMsgResponse<EmergencyContact>
export type DeleteEmergencyContactsResponse = MsgResponse
