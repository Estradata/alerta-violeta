import { create } from 'zustand'
import { type AuthAdminUser } from '@packages/auth-admin/types'

type Store = {
  user: AuthAdminUser | null
  setUser: (user: AuthAdminUser | null) => void
}

export const useGlobalStore = create<Store>()((set) => ({
  user: null,
  setUser(user) {
    set({ user })
  },
}))
