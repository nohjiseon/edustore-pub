'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth'
import type { LoginRequest, LoginResponse } from '@/types/auth'

/**
 * 로그인 Mutation 훅
 * - 로그인 성공 시 Zustand 스토어에 사용자 정보 저장
 * - 메인 페이지로 리다이렉트
 */
export const useLoginMutation = () => {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const setLoading = useAuthStore((state) => state.setLoading)

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (data: LoginResponse) => {
      login(data.user)

      // 기관회원인 경우 /organization으로 이동, 개인회원은 메인 페이지로
      if (data.user.memberType === 'organization') {
        router.replace('/organization')
      } else {
        router.replace('/')
      }
    },
    onError: (error: any) => {
      setLoading(false)
    },
    onSettled: () => {
      setLoading(false)
    }
  })
}

/**
 * 로그아웃 Mutation 훅
 * - 로그아웃 API 호출
 * - Zustand 스토어 초기화
 * - 쿼리 무효화하여 UI 즉시 갱신
 * - 기관회원인 경우 메인 페이지로 리다이렉트
 */
export const useLogoutMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      const wasOrganization = user?.memberType === 'organization'
      logout()

      // 기관회원이었던 경우 메인 페이지로 리다이렉트
      if (wasOrganization) {
        router.replace('/')
      }
    },
    onError: (error) => {
      // 에러 발생 시에도 클라이언트 상태 초기화
      const wasOrganization = user?.memberType === 'organization'
      logout()

      // 기관회원이었던 경우 메인 페이지로 리다이렉트
      if (wasOrganization) {
        router.replace('/')
      }
    }
  })
}
