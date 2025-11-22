import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { isMockMode } from '@/services/mocks/api.mock'
import { handleMockRequest } from '@/services/mocks/handler'
import { useAuthStore } from '@/stores/auth'
import Config from '~/constants/config'
import { ErrorResponse } from '~/types/api'

// 환경 변수로 모크 모드 확인
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

// API 클라이언트 생성
const api = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// 더미 데이터 모드일 때 axios adapter를 커스텀하여 모크 핸들러 사용
if (USE_MOCK_DATA || isMockMode()) {
  api.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
    const mockResponse = await handleMockRequest(config)
    return Promise.resolve(mockResponse)
  }
}

// 인증 데이터 타입 정의
interface AuthData {
  accessToken: string
  refreshToken: string
  expireAt: string
  user: {
    email?: string
    loginId?: string
    name?: string
    nickname?: string
    memberType: 'individual' | 'organization'
    memNo?: string
  }
}

// 토큰 관리 유틸리티
const TokenStorage = {
  /**
   * 인증 데이터 저장 (통합 메서드)
   * @param authData 토큰 + 사용자 정보
   * @param autoLogin true: localStorage에 저장 (브라우저 종료 후에도 유지), false: sessionStorage에 저장 (새로고침은 유지, 브라우저 종료 시 삭제)
   */
  saveAuthData: (authData: AuthData, autoLogin = false) => {
    if (typeof window === 'undefined') return

    if (autoLogin) {
      // 자동 로그인 체크: localStorage에 저장 (브라우저 종료 후에도 유지)
      localStorage.setItem('authData', JSON.stringify(authData))
      // sessionStorage는 정리 (중복 방지)
      sessionStorage.removeItem('authData')
    } else {
      // 자동 로그인 미체크: sessionStorage에 저장 (새로고침은 유지, 브라우저 종료 시 삭제)
      sessionStorage.setItem('authData', JSON.stringify(authData))
      // localStorage는 정리 (중복 방지)
      localStorage.removeItem('authData')
    }
  },

  /**
   * 인증 데이터 조회 (통합 메서드)
   * - localStorage 우선 확인 (autoLogin=true)
   * - 없으면 sessionStorage 확인 (autoLogin=false)
   */
  getAuthData: (): AuthData | null => {
    if (typeof window === 'undefined') return null

    // localStorage 우선 확인 (자동 로그인)
    const localData = localStorage.getItem('authData')
    if (localData) {
      try {
        return JSON.parse(localData) as AuthData
      } catch {
        return null
      }
    }

    // sessionStorage 확인 (세션 로그인)
    const sessionData = sessionStorage.getItem('authData')
    if (sessionData) {
      try {
        return JSON.parse(sessionData) as AuthData
      } catch {
        return null
      }
    }

    return null
  },

  /**
   * 인증 데이터 삭제 (통합 메서드)
   * - sessionStorage와 localStorage 모두 정리
   */
  clearAuthData: () => {
    if (typeof window === 'undefined') return

    sessionStorage.removeItem('authData')
    localStorage.removeItem('authData')

    // 레거시 키 정리 (마이그레이션)
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('tokenExpireAt')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokenExpireAt')

    // Zustand persist 레거시 키 정리
    localStorage.removeItem('auth-storage')
  },

  /**
   * Access Token 조회
   * - localStorage 우선 확인 (autoLogin=true)
   * - 없으면 sessionStorage 확인 (autoLogin=false)
   */
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null

    const authData = TokenStorage.getAuthData()
    return authData?.accessToken || null
  },

  /**
   * Refresh Token 조회
   * - localStorage 우선 확인 (autoLogin=true)
   * - 없으면 sessionStorage 확인 (autoLogin=false)
   */
  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null

    const authData = TokenStorage.getAuthData()
    return authData?.refreshToken || null
  },

  /**
   * 현재 autoLogin 상태 확인
   * - localStorage에 인증 데이터가 있으면 true (자동 로그인)
   * - sessionStorage에만 있으면 false (세션 로그인)
   */
  isAutoLogin: (): boolean => {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('authData')
  }
}

// 인증이 필요 없는 경로 체크
function shouldSkipAuth(url?: string): boolean {
  const authPaths = [
    /\/login/,
    /\/signup/,
    /\/register/,
    /\/forgot-password/,
    /\/auth\/v1\/login\/member/, // 개인회원 로그인
    /\/auth\/v1\/login\/organ/ // 기관회원 로그인
  ]
  return authPaths.some((pattern) => pattern.test(url ?? ''))
}

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 더미 데이터 모드일 때 모크 핸들러로 요청 전달
    if (USE_MOCK_DATA || isMockMode()) {
      // 모크 핸들러가 처리하도록 플래그 설정
      ;(config as any).__mockMode = true
      return config
    }

    // 인증 토큰이 있으면 헤더에 추가 (없어도 에러 발생하지 않음)
    // Content-Type과 Accept는 axios 인스턴스 생성 시 기본 헤더로 이미 설정됨
    if (!shouldSkipAuth(config.url)) {
      const token = TokenStorage.getAccessToken()
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`

        // 디버깅: 요청 헤더 확인
        if (
          process.env.NEXT_PUBLIC_DEBUG_API === 'true' ||
          config.url?.includes('/cart/v1/add')
        ) {
          console.log('=== API 요청 인터셉터 ===')
          console.log('URL:', config.url)
          console.log('Bearer Token:', `Bearer ${token}`)
          console.log('요청 헤더 Authorization:', config.headers.Authorization)
          console.log('요청 헤더 Content-Type:', config.headers['Content-Type'])
          console.log('요청 헤더 Accept:', config.headers['Accept'])
          console.log('전체 요청 헤더:', config.headers)
        }
      }
      // 토큰이 없어도 요청은 정상 진행 (에러 발생하지 않음)
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  // 에러 처리 (로그인 관련 확인 로직 제거)
  async function (error: AxiosError<ErrorResponse>) {
    // 특정 URL에 대해 에러를 조용히 처리 (콘솔 에러 방지)
    const silentErrorUrls = ['/auth/v1/login/member/find-email']
    const errorUrl = error.config?.url

    if (errorUrl && silentErrorUrls.some((url) => errorUrl.includes(url))) {
      // 조용히 처리: 에러를 그대로 반환하되 콘솔에 출력하지 않음
      return Promise.reject(error)
    }

    if (process.env.NEXT_PUBLIC_DEBUG_API === 'true') {
      console.error('❌ API 에러:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        data: error.response?.data,
        message: error.message
      })
    }

    // 401 에러 및 토큰 갱신 로직 제거 - 에러를 그대로 반환
    return Promise.reject(error)
  }
)

// 토큰 관리 유틸리티 export
export { TokenStorage }
export type { AuthData }

export default api
