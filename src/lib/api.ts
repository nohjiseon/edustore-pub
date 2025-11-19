import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { useAuthStore } from '@/stores/auth'
import Config from '~/constants/config'
import { ErrorResponse } from '~/types/api'
import { isMockMode } from '@/services/mocks/api.mock'
import { handleMockRequest } from '@/services/mocks/handler'

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

    // 인증이 필요한 경로인 경우 Authorization 헤더 추가
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
      } else {
        if (config.url?.includes('/cart/v1/add')) {
          console.warn('⚠️ API 요청 인터셉터 - 토큰이 없습니다!')
          console.warn('URL:', config.url)
        }
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  // 요청 단계에서 모크 모드로 처리하기 위해 요청 인터셉터에서 처리
  // 여기서는 실제 에러만 처리
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

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !shouldSkipAuth(originalRequest.url)
    ) {
      originalRequest._retry = true

      console.log('=== 401 에러 발생 - 토큰 갱신 시도 ===')
      console.log('요청 URL:', originalRequest.url)
      console.log('원본 요청 헤더:', originalRequest.headers)

      const refreshToken = TokenStorage.getRefreshToken()
      const currentToken = TokenStorage.getAccessToken()

      console.log(
        '현재 Access Token:',
        currentToken ? `${currentToken.substring(0, 20)}...` : '없음'
      )
      console.log('Refresh Token 존재 여부:', !!refreshToken)

      if (!refreshToken) {
        console.error('❌ Refresh Token이 없습니다. 로그아웃 처리')
        TokenStorage.clearAuthData()
        return Promise.reject(error)
      }

      try {
        console.log('토큰 갱신 API 호출 중...')
        const { data } = await axios.post(
          `${Config.API_BASE_URL}/auth/v1/refresh`,
          { refreshToken }
        )

        const tokenData = data.data || data
        console.log('✅ 토큰 갱신 성공')

        // 기존 인증 데이터에서 user 정보 가져오기
        const existingAuthData = TokenStorage.getAuthData()

        if (existingAuthData) {
          // 토큰만 갱신하고 user 정보는 유지 (autoLogin 상태 유지)
          const isAutoLogin = TokenStorage.isAutoLogin()
          TokenStorage.saveAuthData(
            {
              accessToken: tokenData.accessToken,
              refreshToken: tokenData.refreshToken || refreshToken,
              expireAt: tokenData.expireDt,
              user: existingAuthData.user
            },
            isAutoLogin
          )
          console.log('✅ 새로운 토큰 저장 완료')
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`
          console.log('✅ 원본 요청에 새 토큰 설정 완료')
        }

        console.log('원본 요청 재시도 중...')
        return api.request(originalRequest)
      } catch (refreshError) {
        console.error('❌ 토큰 갱신 실패:', refreshError)
        console.error('에러 상세:', {
          status: (refreshError as any).response?.status,
          data: (refreshError as any).response?.data,
          message: (refreshError as any).message
        })

        TokenStorage.clearAuthData()

        if (typeof window !== 'undefined') {
          useAuthStore.getState().logout()
        }

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// 토큰 관리 유틸리티 export
export { TokenStorage }
export type { AuthData }

export default api
