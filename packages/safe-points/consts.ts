import { SafePoint } from './types'
import { SafePointData } from './schema'

export const SAFE_POINT_TYPE_LABEL: Record<SafePointData['type'], string> = {
  ONG: 'ONG',
  PRIVATE: 'Privado',
  PUBLIC: 'Público',
}

export const safePointTypes = Object.entries(SAFE_POINT_TYPE_LABEL).map(
  ([value, label]) => {
    return {
      value: value as SafePointData['type'],
      label,
    }
  }
)
