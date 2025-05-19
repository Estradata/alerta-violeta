import type { Permission } from './types'
import type { PermissionModule, PermissionAction } from './schema'

type R = {
  module: PermissionModule
  actions: {
    id: string
    action: PermissionAction
  }[]
}[]

export function groupByModule(permissions: Permission[]): R {
  const map = new Map<
    PermissionModule,
    { id: string; action: PermissionAction }[]
  >()

  permissions.forEach(({ module, id, action }) => {
    if (!map.has(module)) {
      map.set(module, [])
    }
    map.get(module)!.push({ id, action })
  })

  const result: R = []

  map.forEach((perms, module) => {
    result.push({ module, actions: perms })
  })

  return result
}
