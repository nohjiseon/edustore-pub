'use client'

import { useEffect } from 'react'

import { TokenStorage } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'

/**
 * 앱 시작 시 인증 상태 초기화 Hook
 * - TokenStorage에서 인증 데이터 복원
 * - 토큰 유효성 및 만료 시간 검증
 * - 토큰 만료 시 자동 로그아웃
 *
 * autoLogin 동작 방식:
 * - 체크 O: localStorage 사용 (브라우저 종료 후에도 로그인 유지)
 * - 체크 X: sessionStorage 사용 (브라우저 종료 시 자동 로그아웃)
 *
 * 새로고침은 두 경우 모두 로그인 상태를 유지합니다.
 */
export const useAuthInitializer = () => {
  const initFromStorage = useAuthStore((state) => state.initFromStorage)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    // TokenStorage에서 인증 상태 복원
    initFromStorage()

    // 토큰 만료 시간 검증
    const authData = TokenStorage.getAuthData()

    if (authData) {
      const expireTime = new Date(authData.expireAt).getTime()
      const now = Date.now()

      if (expireTime <= now) {
        console.log('[Auth] 토큰 만료 - 로그아웃 처리')
        logout()
      }
    }
  }, [initFromStorage, logout])
}
