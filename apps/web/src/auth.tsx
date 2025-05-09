import { storagePrefix } from '@/config'
import { useGlobalStore } from '@/store/global-store'
import type { AuthUser } from '@packages/auth/types'

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

export function useAuth() {
  const user = useGlobalStore((s) => s.user)
  const setUser = useGlobalStore((s) => s.setUser)

  function login(user: AuthUser, token: string) {
    setUser(user)
    setStoredToken(token)
  }

  function logout() {
    setUser(null)
    setStoredToken(null)
  }

  return {
    isAuthenticated: Boolean(user),
    user,
    login,
    logout,
  }
}

export type AuthContext = ReturnType<typeof useAuth>
