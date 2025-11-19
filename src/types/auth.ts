/**
 * 인증 관련 타입 정의
 */

import { z } from 'zod'

/**
 * 회원 유형
 * - individual: 개인회원 (일반인, 선생님 등)
 * - organization: 기관회원 (학교, 유치원, 교육청 등)
 */
export type MemberType = 'individual' | 'organization'

/**
 * 개인회원 로그인 요청 (이메일 사용)
 */
export interface IndividualLoginRequest {
  memberType: 'individual'
  email: string
  password: string
  autoLogin?: boolean
}

/**
 * 기관회원 로그인 요청 (이메일 사용)
 */
export interface OrganizationLoginRequest {
  memberType: 'organization'
  email: string
  password: string
  autoLogin?: boolean
}

/**
 * 로그인 요청 타입 (Union Type)
 */
export type LoginRequest = IndividualLoginRequest | OrganizationLoginRequest

/**
 * 로그인 응답 타입
 */
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  sessionId: string
  expireDt: string
  user: {
    email?: string
    loginId?: string
    name?: string
    memberType: MemberType
    memNo?: string
  }
}

/**
 * 백엔드 로그인 응답 타입 (Swagger 기준)
 */
export interface BackendLoginResponse {
  data: {
    token: {
      sessionId: string
      accessToken: string
      refreshToken: string
      expireDt: string // ISO 8601 datetime
    }
    memberInfo?: {
      memNo: number
      email?: string
      name?: string
      nickname?: string
      mobileNumber?: string
      profileImgUrl?: string
      profileIntro?: string | null
      status?: string
      adAgreeYn?: string
      birthday?: string
      gradeCodeList?: string[]
      subjectCodeList?: string[]
      categoryCodeList?: string[]
    }
    organInfo?: {
      userType?: string
      organNo: number
      loginId?: string | null
      organName?: string
      representativeName?: string
      businessNo?: string
      zipNumber?: string | null
      address?: string
      detailAddress?: string
      email?: string
      managerName?: string | null
      phoneNumber?: string | null
      mobileNumber?: string | null
    }
  }
  status: number
  code: number
  message: string
}

/**
 * 토큰 갱신 요청 타입
 */
export interface RefreshTokenRequest {
  refreshToken: string
}

/**
 * 토큰 갱신 응답 타입
 */
export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  expireDt: string
}

/**
 * 사용자 정보 타입 (Zustand Store용)
 */
export interface User {
  email?: string
  name?: string
  nickname?: string
  memberType: MemberType
  memNo?: string
}

/**
 * User Zod 스키마 (런타임 검증용)
 * - localStorage 데이터 유효성 검증에 사용
 * - XSS 공격으로 인한 악의적 데이터 주입 방어
 */
export const UserSchema = z.object({
  email: z.string().email().optional(),
  loginId: z.string().optional(),
  name: z.string().optional(),
  nickname: z.string().optional(),
  memberType: z.enum(['individual', 'organization']),
  memNo: z.string().optional()
})
