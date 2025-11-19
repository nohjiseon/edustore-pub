import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PurchaseStore {
  // 탭 상태
  tabValue: 'purchase' | 'review' | 'inquire'
  setTabValue: (value: 'purchase' | 'review' | 'inquire') => void

  // 필터 상태
  purchaseFilter: string
  setPurchaseFilter: (value: string) => void

  termFilter: string
  setTermFilter: (value: string) => void

  downloadFilter: string
  setDownloadFilter: (value: string) => void

  // 검색어
  searchKeyword: string
  setSearchKeyword: (value: string) => void

  // 리셋
  resetFilters: () => void
}

export const usePurchaseStore = create<PurchaseStore>()(
  persist(
    (set) => ({
      // 초기값
      tabValue: 'purchase',
      purchaseFilter: '상태 전체',
      termFilter: '기간 전체',
      downloadFilter: '다운로드 전체',
      searchKeyword: '',

      // 액션
      setTabValue: (value) => set({ tabValue: value }),
      setPurchaseFilter: (value) => set({ purchaseFilter: value }),
      setTermFilter: (value) => set({ termFilter: value }),
      setDownloadFilter: (value) => set({ downloadFilter: value }),
      setSearchKeyword: (value) => set({ searchKeyword: value }),

      // 필터 리셋
      resetFilters: () =>
        set({
          purchaseFilter: '상태 전체',
          termFilter: '기간 전체',
          downloadFilter: '다운로드 전체',
          searchKeyword: ''
        })
    }),
    {
      name: 'purchase-storage'
    }
  )
)
