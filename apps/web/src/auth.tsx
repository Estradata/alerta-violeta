import type { AuthUser } from '@packages/auth/types'
import { useGlobalStore } from '@/store/global-store'
import { storagePrefix } from '@/config'
import { useRouter } from '@tanstack/react-router'

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

export function getRedirectPath(role: AuthUser['role']) {
  switch (role) {
    case 'ADMIN':
      return '/app/dashboard'

    case 'MEMBER':
      return '/app/dashboard'
  }
}

export function useAuth() {
  const router = useRouter()
  const user = useGlobalStore((s) => s.user)
  const setUser = useGlobalStore((s) => s.setUser)

  function login(user: AuthUser, token: string) {
    setUser(user)
    setStoredToken(token)
    router.navigate({ to: getRedirectPath(user.role) })
  }

  function logout() {
    setUser(null)
    setStoredToken(null)
    router.navigate({ to: '/' })
  }

  return {
    isAuthenticated: Boolean(user),
    user,
    login,
    logout,
  }
}
