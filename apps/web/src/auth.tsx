import type { AuthAdminUser } from '@packages/auth-admin/types'
import { useGlobalStore } from '@/store/global-store'
import { storagePrefix } from '@/config'
import { useRouter } from '@tanstack/react-router'
import { useCallback } from 'react'
import type {
  PermissionAction,
  PermissionModule,
} from '@packages/admin-permissions/schema'
import { hasAuthorization } from '@packages/admin-permissions/has-authorization'

const key = `${storagePrefix}_token`

export function getStoredToken() {
  return localStorage.getItem(key)
}

function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem(key, token)
  } else {
    localStorage.removeItem(key)
  }
}

export function useAuth(): AuthContext {
  const router = useRouter()
  const user = useGlobalStore((s) => s.user)
  const setUser = useGlobalStore((s) => s.setUser)

  const login = useCallback(
    (user: AuthAdminUser, token: string) => {
      setUser(user)
      setStoredToken(token)
      // TODO:
      router?.navigate({ to: '/app/safe-points' })
    },
    [router, setUser]
  )

  const logout = useCallback(() => {
    setUser(null)
    setStoredToken(null)
    router?.navigate({ to: '/' })
  }, [router, setUser])

  return {
    isAuthenticated: Boolean(user),
    user,
    login,
    logout,
  }
}

export type AuthContext = {
  isAuthenticated: boolean
  user: AuthAdminUser | null
  login: (user: AuthAdminUser, token: string) => void
  logout: () => void
}

export function Auth({
  children,
  fallback = null,
  module,
  action = 'VIEW',
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  module: PermissionModule
  action?: PermissionAction
}) {
  const user = useAuth().user

  if (!hasAuthorization(user?.permissions, module, action)) {
    return fallback
  }

  return children
}
