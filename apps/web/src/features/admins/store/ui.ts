import { create } from 'zustand'
import { createUiStore } from '@/lib/zustand'
import type { GetAdminsResponse } from '@packages/admins/types'

type Admin = GetAdminsResponse['data'][number]

export const useUiStore = create(createUiStore<Admin>())
