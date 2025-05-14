import { create } from 'zustand'
import { type AuthUser } from '@packages/auth/types'

type Store = {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
}

export const useGlobalStore = create<Store>()((set) => ({
  user: null,
  setUser(user) {
    set({ user })
  },
}))
