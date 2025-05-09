import { SafePointData } from './schema'

export type SafePoint = {
  id: string
  accountId: string
  name: string
  address: string
  lat: number
  lng: number
  // autocomplete 'type' but also any other string
  type: SafePointData['type'] | {}
}
