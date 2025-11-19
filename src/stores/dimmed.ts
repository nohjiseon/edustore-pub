import { create } from 'zustand'

interface DimmedStore {
  isVisible: boolean
  setVisible: (visible: boolean) => void
}

export const useDimmedStore = create<DimmedStore>((set) => ({
  isVisible: false,
  setVisible: (visible) => set({ isVisible: visible })
}))
