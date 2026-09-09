'use client'

import { create } from 'zustand'

interface NavStore {
  isTopNavVisible: boolean
  setIsTopNavVisible: (visible: boolean) => void
}

export const useNavStore = create<NavStore>((set) => ({
  isTopNavVisible: true,
  setIsTopNavVisible: (visible) => set({ isTopNavVisible: visible }),
}))
