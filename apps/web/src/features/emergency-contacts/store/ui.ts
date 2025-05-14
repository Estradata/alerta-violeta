import { create } from 'zustand'
import { createUiStore } from '@/lib/zustand'
import type { GetEmergencyContactsResponse } from '@packages/emergency-contacts/types';

type SafePoint = GetEmergencyContactsResponse['data'][number]

export const useUiStore = create(createUiStore<SafePoint>())
