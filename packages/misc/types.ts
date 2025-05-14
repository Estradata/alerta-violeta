export type DataResponse<T> = {
  data: T
}

export type MsgResponse = {
  message: string
}

export type DataMsgResponse<T> = {
  message: string
  data: T
}
