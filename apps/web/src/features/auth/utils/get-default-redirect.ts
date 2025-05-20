import { navItems } from '@/consts/navigation-items'
import type { AuthAdminUser } from '@packages/auth-admin/types'
import type { FileRoutesByPath } from '@tanstack/react-router'

export function getDefaultRedirect(
  user: AuthAdminUser | null | undefined
): keyof FileRoutesByPath {
  if (!user) return '/login'

  for (const item of navItems) {
    if (!item.module) return item.path

    if (user.permissions.find((p) => p.module === item.module)) {
      return item.path
    }
  }

  return '/login'
}
