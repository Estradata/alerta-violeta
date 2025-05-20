import type { DataMsgResponse, DataResponse, MsgResponse } from '../misc/types'

/**
 * Model
 */
export type Alert = {
  id: string
  userId: string
  lat: number
  lng: number
  createdAt: Date
}

/**
 * API Responses
 */
export type GetAlertResponse = DataResponse<Alert>
export type GetAlertsResponse = DataResponse<Alert[]>
export type CreateAlertResponse = DataMsgResponse<Alert>
export type UpdateAlertResponse = DataMsgResponse<Alert>
export type DeleteAlertsResponse = MsgResponse
