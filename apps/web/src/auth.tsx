import type { AuthUser } from '@packages/auth/types'
import { useGlobalStore } from '@/store/global-store'
import { storagePrefix } from '@/config'
import { useRouter } from '@tanstack/react-router'
import { useCallback } from 'react'

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
    (user: AuthUser, token: string) => {
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
  user: AuthUser | null
  login: (user: AuthUser, token: string) => void
  logout: () => void
}
