import type { UserStatus } from './types'

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  ACTIVE: 'Activo',
  BLOCKED: 'Bloqueado',
}

export const statuses = Object.entries(USER_STATUS_LABELS).map(
  ([value, label]) => {
    return {
      value: value as UserStatus,
      label,
    }
  }
)
