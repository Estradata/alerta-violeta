import type { DataResponse, MsgResponse } from '../misc/types'

/**
 * Model
 */
export type UserStatus = 'ACTIVE' | 'BLOCKED'
export type User = {
  id: string
  name: string
  email: string
  status: UserStatus
  createdAt: Date
  lastLogin: Date
}

/**
 * API Responses
 */
// export type GetUserResponse = DataResponse<User>
export type GetUsersResponse = DataResponse<User[]>
export type UpdateUserStatusResponse = MsgResponse
// export type CreateUserResponse = DataMsgResponse<User>
// export type UpdateUserResponse = DataMsgResponse<User>
// export type DeleteUsersResponse = MsgResponse
