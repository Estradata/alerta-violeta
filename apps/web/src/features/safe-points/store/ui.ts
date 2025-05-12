import { create } from 'zustand'
import { createUiStore } from '@/lib/zustand'
import type { GetSafePointsResponse } from '@packages/safe-points/types'

type SafePoint = GetSafePointsResponse['data'][number]

export const useUiStore = create(createUiStore<SafePoint>())
