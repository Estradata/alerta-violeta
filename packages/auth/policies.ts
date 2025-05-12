import { AuthUser as User } from './types'

type Role = User['role']

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]['dataType']) => boolean)

export type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>
    }>
  }>
}

/**
 * List Resources
 */
type List = 'list'

/**
 * View an Specific Resource
 */
type View = 'view'

/**
 * Create Resource
 */
type Create = 'create'

/**
 * Update Resource
 */
type Update = 'update'

/**
 * Delete Resource
 */
type Delete = 'delete'

type Action = List | View | Create | Update | Delete

export type Permissions = {
  'emergency-contacts': {
    dataType: { accountId: string }
    action: Action
  }
}

export type Resource = keyof Permissions

export const POLICIES = {
  ADMIN: {
    'emergency-contacts': {
      list: true,
      view: (user, contact) => user.accountId === contact.accountId,
      create: true,
      update: (user, contact) => user.accountId === contact.accountId,
      delete: (user, contact) => user.accountId === contact.accountId,
    },
  },
  MEMBER: {},
} as const satisfies RolesWithPermissions
