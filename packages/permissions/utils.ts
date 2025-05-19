import type { Permission } from './types'
import type { PermissionModule, PermissionAction } from './schema'

type Group = {
  module: PermissionModule
  permissions: {
    id: string
    action: PermissionAction
  }[]
}[]

export function groupByModule(permissions: Permission[]): Group {
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

  const result: Group = []

  map.forEach((permissions, module) => {
    result.push({ module, permissions })
  })

  return result
}
