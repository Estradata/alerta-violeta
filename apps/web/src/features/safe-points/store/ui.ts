import { create } from 'zustand'
import { createUiStore } from '@/lib/zustand'
import type { GetSafePointResponse } from '@packages/safe-points/types'

type SafePoint = GetSafePointResponse['data'][number]

export const useUiStore = create(createUiStore<SafePoint>())
