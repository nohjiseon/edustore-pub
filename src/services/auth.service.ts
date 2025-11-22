import api, { TokenStorage } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import type {
  LoginRequest,
  LoginResponse,
  BackendLoginResponse
} from '@/types/auth'

/**
 * 인증 서비스
 */
export const authService = {
  /**
   * 로그인
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // memberType에 따라 엔드포인트와 body 구조 결정
    let endpoint: string
    let requestBody: Record<string, string>

    if (credentials.memberType === 'individual') {
      // 개인회원: /auth/v1/login/member 사용, email 필드
      endpoint = '/auth/v1/login/member'
      requestBody = {
        email: credentials.email,
        password: credentials.password
      }
    } else {
      // 기관회원: /auth/v1/login/organ 사용, email 필드
      endpoint = '/auth/v1/login/organ'
      requestBody = {
        email: credentials.email,
        password: credentials.password
      }
    }

    const response = await api.post<BackendLoginResponse>(endpoint, requestBody)

    // 백엔드 응답 구조에 따라 data 추출 (Swagger 스펙: { data: {...} })
    const data = response.data.data
    const token = data.token

    // 회원 유형에 따라 다른 정보 구조 사용
    let user: {
      email?: string
      loginId?: string
      memberType: 'individual' | 'organization'
      name?: string
      nickname?: string
      memNo?: string
    }

    if (credentials.memberType === 'individual') {
      // 개인회원: memberInfo 사용
      const memberInfo = data.memberInfo
      if (!memberInfo) {
        throw new Error('개인회원 정보를 찾을 수 없습니다.')
      }

      user = {
        email: memberInfo.email || credentials.email,
        loginId: undefined as string | undefined,
        memberType: 'individual',
        name: memberInfo.name,
        nickname: memberInfo.nickname,
        memNo: memberInfo.memNo ? String(memberInfo.memNo) : undefined
      }
    } else {
      // 기관회원: organInfo 사용
      const organInfo = data.organInfo
      if (!organInfo) {
        throw new Error('기관회원 정보를 찾을 수 없습니다.')
      }

      user = {
        email: organInfo.email || credentials.email,
        loginId: organInfo.loginId || undefined,
        memberType: 'organization',
        name: organInfo.organName || organInfo.representativeName,
        nickname: undefined,
        memNo: organInfo.organNo ? String(organInfo.organNo) : undefined
      }
    }

    // 토큰 값 콘솔 출력
    console.log('=== 로그인 토큰 정보 ===')
    console.log('accessToken:', token.accessToken)
    console.log('========================')

    // 인증 데이터 저장 (토큰 + 사용자 정보, autoLogin에 따라 localStorage 또는 sessionStorage 사용)
    TokenStorage.saveAuthData(
      {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expireAt: token.expireDt,
        user
      },
      credentials.autoLogin ?? false
    )

    // Zustand store에 로그인 정보 저장 (클라이언트 사이드에서만)
    if (typeof window !== 'undefined') {
      useAuthStore.getState().login(user)
    }

    // 응답 구성
    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      sessionId: token.sessionId,
      expireDt: token.expireDt,
      user
    }
  },

  /**
   * 로그아웃
   */
  logout: async () => {
    try {
      await api.delete('/auth/v1/logout')
    } catch (error) {
      console.error('로그아웃 API 에러:', error)
    } finally {
      // 인증 데이터 삭제는 항상 실행
      TokenStorage.clearAuthData()
    }
  },

  /**
   * 토큰 갱신
   */
  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/v1/refresh', { refreshToken })

    // 백엔드 응답 구조에 따라 data 추출
    const data = response.data.data || response.data

    // 기존 인증 데이터에서 user 정보 가져오기
    const existingAuthData = TokenStorage.getAuthData()

    if (existingAuthData) {
      // 토큰만 갱신하고 user 정보는 유지
      TokenStorage.saveAuthData(
        {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken || refreshToken,
          expireAt: data.expireDt,
          user: existingAuthData.user
        },
        TokenStorage.isAutoLogin()
      )
    }

    return data
  },

  /**
   * 이메일 중복확인
   */
  checkEmailDuplicate: async (
    email: string
  ): Promise<{ isDuplicate: boolean }> => {
    const response = await api.post('/auth/v1/join/member/email', { email })
    return response.data.data || response.data
  },

  /**
   * 닉네임 중복확인
   */
  checkNicknameDuplicate: async (
    nickname: string
  ): Promise<{ isDuplicate: boolean }> => {
    const response = await api.post('/auth/v1/join/member/nickname', {
      nickname
    })
    return response.data.data || response.data
  },

  /**
   * 사업자 등록번호 인증
   */
  checkBusinessNumber: async (
    businessNo: string
  ): Promise<{ isSuccess: boolean; message?: string; code?: number }> => {
    const response = await api.post('/auth/v1/join/organ/business', {
      businessNo
    })
    return response.data.data || response.data
  },

  /**
   * 기관회원 이메일 인증번호 발송
   */
  sendOrganizationEmailVerification: async (
    email: string
  ): Promise<{ isSuccess: boolean; message?: string }> => {
    const response = await api.post('/auth/v1/join/organ/send-mail', {
      email
    })
    return response.data.data || response.data
  },

  /**
   * 기관회원 이메일 인증번호 검증
   */
  verifyOrganizationEmail: async (data: {
    email: string
    code: string
  }): Promise<{ isSuccess: boolean; message?: string }> => {
    const response = await api.post('/auth/v1/join/organ/verify-email', {
      email: data.email,
      code: data.code
    })
    return response.data.data || response.data
  },

  /**
   * 개인회원 비밀번호 재설정 메일 발송
   */
  sendPasswordResetEmail: async (
    email: string
  ): Promise<{ isSuccess: boolean; message?: string }> => {
    const response = await api.post(
      '/auth/v2/login/member/reset-password/send-mail',
      {
        email
      }
    )
    return response.data.data || response.data
  },

  /**
   * 기관회원 비밀번호 재설정 메일 발송
   */
  sendOrganizationPasswordResetEmail: async (
    email: string
  ): Promise<{ isSuccess: boolean; message?: string }> => {
    const response = await api.post(
      '/auth/v2/login/organ/reset-password/send-mail',
      {
        email
      }
    )
    return response.data.data || response.data
  },

  /**
   * 개인회원 이메일 찾기 SMS 인증번호 발송
   */
  sendFindEmailSMS: async (
    mobileNumber: string
  ): Promise<{ isSuccess: boolean; message?: string }> => {
    const response = await api.post(
      '/auth/v1/login/member/find-email/send-sms',
      {
        mobileNumber
      }
    )
    return response.data.data || response.data
  },

  /**
   * 개인회원 이메일 찾기 SMS 인증
   */
  findEmail: async (data: {
    mobileNumber: string
    code: string
  }): Promise<{ email?: string; [key: string]: unknown }> => {
    const response = await api.post('/auth/v1/login/member/find-email', {
      mobileNumber: data.mobileNumber,
      code: data.code
    })
    return response.data.data || response.data
  },

  /**
   * 개인회원 비밀번호 재설정
   */
  resetPassword: async (data: {
    code: string
    password: string
    confirmPassword: string
  }): Promise<{ isSuccess: boolean; message?: string }> => {
    const response = await api.post('/auth/v1/login/member/reset-password', {
      code: data.code,
      password: data.password,
      confirmPassword: data.confirmPassword
    })
    return response.data.data || response.data
  },

  /**
   * 기관회원 비밀번호 재설정
   */
  resetOrganizationPassword: async (data: {
    code: string
    password: string
    confirmPassword: string
  }): Promise<{ isSuccess: boolean; message?: string }> => {
    const response = await api.post('/auth/v1/login/organ/reset-password', {
      code: data.code,
      password: data.password,
      confirmPassword: data.confirmPassword
    })
    return response.data.data || response.data
  },

  /**
   * 기관회원 아이디 찾기 (이메일 발송)
   */
  sendFindOrganLoginIdEmail: async (
    businessNo: string
  ): Promise<{ isSuccess: boolean; message?: string }> => {
    const response = await api.post('/auth/v1/login/organ/find-login-id', {
      businessNo
    })
    return response.data.data || response.data
  },

  /**
   * 회원가입 (개인회원)
   */
  signup: async (signupData: {
    idVerifyReqNo?: string
    ci?: string
    name: string
    nickname: string
    email: string
    mobileNumber: string
    birthday?: string
    password: string
    confirmPassword: string
    gradeCodeList: string[]
    subjectCodeList: string[]
    categoryList: string[]
  }): Promise<{ isSuccess: boolean; message?: string }> => {
    const response = await api.post('/auth/v1/join/member', {
      idVerifyReqNo: signupData.idVerifyReqNo,
      ci: signupData.ci,
      name: signupData.name,
      nickname: signupData.nickname,
      email: signupData.email,
      mobileNumber: signupData.mobileNumber,
      birthday: signupData.birthday,
      password: signupData.password,
      confirmPassword: signupData.confirmPassword,
      gradeCodeList: signupData.gradeCodeList,
      subjectCodeList: signupData.subjectCodeList,
      categoryList: signupData.categoryList
    })
    return response.data.data || response.data
  },

  /**
   * 기관회원 가입
   */
  signupOrganization: async (signupData: {
    organName: string
    representativeName: string
    businessNo: string
    address: string
    detailAddress: string
    email: string
    code: string
    password: string
    confirmPassword: string
  }): Promise<{
    data?: unknown
    status?: number
    code?: number
    message?: string
    isSuccess?: boolean
  }> => {
    const response = await api.post('/auth/v1/join/organ', {
      organName: signupData.organName,
      representativeName: signupData.representativeName,
      businessNo: signupData.businessNo,
      address: signupData.address,
      detailAddress: signupData.detailAddress,
      email: signupData.email,
      code: signupData.code,
      password: signupData.password,
      confirmPassword: signupData.confirmPassword
    })
    // 전체 응답 객체 반환
    return response.data
  },

  /**
   * 마이페이지 회원 정보 조회
   * ⚠️ 현재 목업 모드로 동작: 실제 API 호출 대신 목업 데이터 반환
   */
  getMyPage: async (): Promise<any> => {
    // 목업 모드: 실제 API 호출 대신 목업 데이터 반환
    const { mockGetMyPage } = await import('@/services/mocks/auth.mock')
    return mockGetMyPage()

    /* 실제 API 호출 코드 (목업 모드로 비활성화)
    const response = await api.get('/member/v1/my-page')
    return response.data.data || response.data
    */
  },

  /**
   * 마이페이지 비밀번호 검증
   */
  checkPassword: async (
    password: string
  ): Promise<{ isSuccess: boolean; message?: string }> => {
    // 토큰 확인
    const token = TokenStorage.getAccessToken()
    const authData = TokenStorage.getAuthData()

    // 디버깅: 토큰 상태 확인
    console.log('=== 비밀번호 검증 API 호출 ===')
    console.log('토큰 존재 여부:', !!token)
    console.log('토큰 값:', token ? `${token.substring(0, 20)}...` : '없음')
    console.log('인증 데이터 존재 여부:', !!authData)
    console.log('토큰 만료 시간:', authData?.expireAt)
    console.log('============================')

    if (!token) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.')
    }

    // Bearer Token 헤더 명시적으로 설정
    const bearerToken = `Bearer ${token}`

    try {
      const response = await api.post(
        '/member/v1/my-page/check-password',
        {
          password
        },
        {
          headers: {
            Authorization: bearerToken
          }
        }
      )
      return response.data.data || response.data
    } catch (error: any) {
      // 401 에러 상세 로그
      if (error.response?.status === 401) {
        console.error('=== 401 에러 발생 ===')
        console.error('에러 응답:', error.response?.data)
        console.error('요청 URL:', error.config?.url)
        console.error('요청 헤더:', error.config?.headers)
        console.error(
          '현재 토큰:',
          token ? `${token.substring(0, 20)}...` : '없음'
        )
        console.error('==================')
      }
      throw error
    }
  }
}
