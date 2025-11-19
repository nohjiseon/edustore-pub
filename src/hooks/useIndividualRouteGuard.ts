'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuthStore } from '@/stores/auth'

/**
 * 개인회원 라우트 가드 Hook
 * - 개인회원 로그인 시 /organization 하위 경로 접근 차단
 * - /organization 접근 시 메인 페이지로 리다이렉트
 */
export const useIndividualRouteGuard = () => {
  const router = useRouter()
  const pathname = usePathname()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const isIndividual = user?.memberType === 'individual'

  useEffect(() => {
    // 인증 상태가 로딩 중이면 대기
    if (isLoading) {
      return
    }

    // 개인회원이고 로그인 상태일 때만 체크
    if (!isAuthenticated || !isIndividual) {
      return
    }

    // /organization으로 시작하는 경로에 접근 시 메인 페이지로 리다이렉트
    if (pathname.startsWith('/organization')) {
      console.log(`[Route Guard] 개인회원 접근 제한: ${pathname} -> /`)
      router.replace('/')
    }
  }, [pathname, isAuthenticated, isIndividual, isLoading, router])
}
