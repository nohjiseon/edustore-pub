/**
 * 인증 서비스 더미 데이터
 */

import { delay, createMockResponse } from './api.mock'

import type { LoginRequest, LoginResponse } from '@/types/auth'

/**
 * 개인회원 로그인 더미 응답
 */
export async function mockLoginMember(
  credentials: LoginRequest
): Promise<LoginResponse> {
  await delay(300)

  const mockUser = {
    email: credentials.email || 'test@example.com',
    loginId: undefined as string | undefined,
    memberType: 'individual' as const,
    name: '테스트 사용자',
    nickname: '테스터',
    memNo: '1001'
  }

  const mockToken = {
    accessToken: 'mock-access-token-member-' + Date.now(),
    refreshToken: 'mock-refresh-token-member-' + Date.now(),
    sessionId: 'mock-session-id-' + Date.now(),
    expireDt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24시간 후
  }

  return {
    ...mockToken,
    user: mockUser
  }
}

/**
 * 기관회원 로그인 더미 응답
 */
export async function mockLoginOrgan(
  credentials: LoginRequest
): Promise<LoginResponse> {
  await delay(300)

  const mockUser = {
    email: credentials.email || 'org@example.com',
    loginId: 'ORG001',
    memberType: 'organization' as const,
    name: '테스트 기관',
    nickname: undefined as string | undefined,
    memNo: '2001'
  }

  const mockToken = {
    accessToken: 'mock-access-token-organ-' + Date.now(),
    refreshToken: 'mock-refresh-token-organ-' + Date.now(),
    sessionId: 'mock-session-id-organ-' + Date.now(),
    expireDt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  }

  return {
    ...mockToken,
    user: mockUser
  }
}

/**
 * 이메일 중복확인 더미 응답
 */
export async function mockCheckEmailDuplicate(email: string) {
  await delay(200)
  // test@example.com은 이미 사용 중으로 설정
  return {
    isDuplicate: email === 'test@example.com' || email === 'exist@example.com'
  }
}

/**
 * 닉네임 중복확인 더미 응답
 */
export async function mockCheckNicknameDuplicate(nickname: string) {
  await delay(200)
  // '사용중' 닉네임은 이미 사용 중으로 설정
  return {
    isDuplicate: nickname === '사용중' || nickname === 'exist'
  }
}

/**
 * 사업자 등록번호 인증 더미 응답
 */
export async function mockCheckBusinessNumber(businessNo: string) {
  await delay(500)
  // '123-45-67890'은 유효한 사업자 번호로 설정
  return {
    isSuccess: businessNo === '123-45-67890',
    message:
      businessNo === '123-45-67890'
        ? '인증되었습니다.'
        : '유효하지 않은 사업자 등록번호입니다.',
    code: businessNo === '123-45-67890' ? 200 : 400
  }
}

/**
 * 이메일 인증번호 발송 더미 응답
 */
export async function mockSendEmailVerification(email: string) {
  await delay(500)
  return {
    isSuccess: true,
    message: '인증번호가 발송되었습니다. (더미 모드)'
  }
}

/**
 * 이메일 인증번호 검증 더미 응답
 */
export async function mockVerifyEmail(data: { email: string; code: string }) {
  await delay(300)
  // '123456'은 유효한 인증번호로 설정
  return {
    isSuccess: data.code === '123456',
    message:
      data.code === '123456'
        ? '인증되었습니다.'
        : '인증번호가 일치하지 않습니다.'
  }
}

/**
 * 비밀번호 재설정 메일 발송 더미 응답
 */
export async function mockSendPasswordResetEmail(email: string) {
  await delay(500)
  return {
    isSuccess: true,
    message: '비밀번호 재설정 링크가 발송되었습니다. (더미 모드)'
  }
}

/**
 * SMS 인증번호 발송 더미 응답
 */
export async function mockSendFindEmailSMS(mobileNumber: string) {
  await delay(500)
  return {
    isSuccess: true,
    message: 'SMS 인증번호가 발송되었습니다. (더미 모드)'
  }
}

/**
 * 이메일 찾기 더미 응답
 */
export async function mockFindEmail(data: {
  mobileNumber: string
  code: string
}) {
  await delay(300)
  // '123456'은 유효한 인증번호로 설정
  if (data.code === '123456') {
    return {
      email: 'found@example.com'
    }
  }
  return {}
}

/**
 * 비밀번호 재설정 더미 응답
 */
export async function mockResetPassword(data: {
  code: string
  password: string
  confirmPassword: string
}) {
  await delay(300)
  return {
    isSuccess: true,
    message: '비밀번호가 재설정되었습니다.'
  }
}

/**
 * 기관 아이디 찾기 더미 응답
 */
export async function mockSendFindOrganLoginIdEmail(businessNo: string) {
  await delay(500)
  return {
    isSuccess: true,
    message: '기관 아이디가 이메일로 발송되었습니다. (더미 모드)'
  }
}

/**
 * 회원가입 더미 응답
 */
export async function mockSignup() {
  await delay(500)
  return {
    isSuccess: true,
    message: '회원가입이 완료되었습니다.'
  }
}

/**
 * 기관회원 가입 더미 응답
 */
export async function mockSignupOrganization() {
  await delay(500)
  return {
    data: { organNo: 2001 },
    status: 200,
    code: 200,
    message: '기관회원 가입이 완료되었습니다.',
    isSuccess: true
  }
}

/**
 * 마이페이지 회원 정보 조회 더미 응답
 */
export async function mockGetMyPage() {
  await delay(300)
  return {
    memNo: '1001',
    email: 'test@example.com',
    name: '테스트 사용자',
    nickname: '테스터',
    mobileNumber: '010-1234-5678',
    gradeCodeList: ['E01', 'E02'],
    subjectCodeList: ['S01', 'S02'],
    categoryList: ['C01']
  }
}

/**
 * 비밀번호 검증 더미 응답
 */
export async function mockCheckPassword(password: string) {
  await delay(300)
  // 'password123'은 유효한 비밀번호로 설정
  return {
    isSuccess: password === 'password123',
    message:
      password === 'password123'
        ? '비밀번호가 확인되었습니다.'
        : '비밀번호가 일치하지 않습니다.'
  }
}
