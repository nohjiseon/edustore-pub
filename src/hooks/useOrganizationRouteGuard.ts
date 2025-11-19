'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuthStore } from '@/stores/auth'

/**
 * 기관회원 라우트 가드 Hook
 * - 기관회원 로그인 시 /organization 하위 경로 및 /policy/* 경로 접근 허용
 * - 다른 경로 접근 시 /organization으로 리다이렉트
 */
export const useOrganizationRouteGuard = () => {
  const router = useRouter()
  const pathname = usePathname()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const isOrganization = user?.memberType === 'organization'

  useEffect(() => {
    // 인증 상태가 로딩 중이면 대기
    if (isLoading) {
      return
    }

    // 기관회원이고 로그인 상태일 때만 체크
    if (!isAuthenticated || !isOrganization) {
      return
    }

    // 허용된 경로 목록 (Next.js 내부 경로 및 정적 파일)
    const allowedPaths = [
      '/api', // API 라우트는 허용
      '/_next', // Next.js 내부 경로는 허용
      '/favicon.ico', // 파비콘은 허용
      '/static', // 정적 파일은 허용
      '/policy' // 정책 페이지는 허용
    ]

    // 현재 경로가 /organization 또는 /policy로 시작하는지 확인
    const isOrganizationPath = pathname.startsWith('/organization')
    const isPolicyPath = pathname.startsWith('/policy')
    const isAllowedPath = allowedPaths.some((path) => pathname.startsWith(path))

    // /organization 또는 /policy 하위 경로가 아니고 허용된 경로도 아니면 리다이렉트
    if (!isOrganizationPath && !isPolicyPath && !isAllowedPath) {
      console.log(
        `[Route Guard] 기관회원 접근 제한: ${pathname} -> /organization`
      )
      router.replace('/organization')
    }
  }, [pathname, isAuthenticated, isOrganization, isLoading, router])
}
