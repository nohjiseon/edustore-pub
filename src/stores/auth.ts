import { create } from 'zustand'

import { TokenStorage } from '@/lib/api'
import type { User } from '@/types/auth'

// User 타입 재export
export type { User } from '@/types/auth'

/**
 * 인증 스토어 상태
 */
interface AuthStore {
  user: User | null
  nickname: string | null
  isAuthenticated: boolean
  isLoading: boolean

  setUser: (user: User) => void
  setLoading: (isLoading: boolean) => void
  login: (user: User) => void
  logout: () => void
  checkAuth: () => boolean
  initFromStorage: () => void
}

/**
 * 인증 상태 관리 스토어
 * - 로그인/로그아웃 상태 관리
 * - 사용자 정보는 메모리에만 저장 (순수 상태 관리)
 * - 실제 데이터는 TokenStorage에서 관리
 */
export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  nickname: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => set({ user, isAuthenticated: true }),

  setLoading: (isLoading) => set({ isLoading }),

  login: (user) => {
    set({
      user,
      isAuthenticated: true,
      isLoading: false
    })
  },

  logout: () => {
    TokenStorage.clearAuthData()
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  },

  checkAuth: () => {
    const authData = TokenStorage.getAuthData()
    const hasUser = get().user !== null
    const isValid = !!authData && hasUser

    if (!isValid && get().isAuthenticated) {
      get().logout()
    }

    return isValid
  },

  /**
   * TokenStorage에서 인증 상태 복원
   * - 앱 시작 시 useAuthInitializer에서 호출
   */
  initFromStorage: () => {
    const authData = TokenStorage.getAuthData()

    if (authData) {
      set({
        user: authData.user,
        isAuthenticated: true,
        isLoading: false
      })
    } else {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  }
}))
