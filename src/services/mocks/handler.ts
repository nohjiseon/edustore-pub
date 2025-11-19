/**
 * API 모크 핸들러
 * 더미 데이터 모드일 때 API 요청을 가로채서 더미 데이터를 반환합니다.
 */

import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import {
  extractPath,
  parseQueryParams,
  delay,
  createMockResponse
} from './api.mock'

// Auth 모크
import {
  mockLoginMember,
  mockLoginOrgan,
  mockCheckEmailDuplicate,
  mockCheckNicknameDuplicate,
  mockCheckBusinessNumber,
  mockSendEmailVerification,
  mockVerifyEmail,
  mockSendPasswordResetEmail,
  mockSendFindEmailSMS,
  mockFindEmail,
  mockResetPassword,
  mockSendFindOrganLoginIdEmail,
  mockSignup,
  mockSignupOrganization,
  mockGetMyPage,
  mockCheckPassword
} from './auth.mock'

// Product 모크
import {
  mockGetProduct,
  mockGetProductDetail,
  mockCreateProduct
} from './product.mock'

// Cart 모크
import {
  mockAddToCart,
  mockGetCartItems,
  mockRemoveCartItem
} from './cart.mock'

// Search 모크
import { mockSearch } from './search.mock'

// Question 모크
import { mockGetQuestions } from './question.mock'

// Review 모크
import { mockGetProductReviews } from './review.mock'

// Account 모크
import {
  mockGetBankAccounts,
  mockAddBankAccount,
  mockUpdateBankAccountPrimary,
  mockDeleteBankAccounts
} from './account.mock'

// Organization 모크
import { mockGetOrganAmount } from './organization.mock'

/**
 * 모크 핸들러 - API 요청을 가로채서 더미 데이터 반환
 */
export async function handleMockRequest(
  config: InternalAxiosRequestConfig
): Promise<AxiosResponse> {
  const method = config.method?.toUpperCase() || 'GET'
  const path = extractPath(config.url)
  const queryParams = parseQueryParams(config.url)
  const body = config.data

  // 네트워크 지연 시뮬레이션 (일부 빠른 응답은 생략)
  const fastPaths = ['/auth/v1/refresh']
  if (!fastPaths.some((p) => path.includes(p))) {
    await delay(200)
  }

  console.log(`[MOCK] ${method} ${path}`, { queryParams, body })

  try {
    // Auth API
    if (path === 'auth/v1/login/member' && method === 'POST') {
      const response = await mockLoginMember(body)
      return createMockResponse({
        data: { token: response, memberInfo: response.user }
      })
    }
    if (path === 'auth/v1/login/organ' && method === 'POST') {
      const response = await mockLoginOrgan(body)
      return createMockResponse({
        data: { token: response, organInfo: response.user }
      })
    }
    if (path === 'auth/v1/join/member/email' && method === 'POST') {
      const response = await mockCheckEmailDuplicate(body?.email)
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/join/member/nickname' && method === 'POST') {
      const response = await mockCheckNicknameDuplicate(body?.nickname)
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/join/organ/business' && method === 'POST') {
      const response = await mockCheckBusinessNumber(body?.businessNo)
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/join/organ/send-mail' && method === 'POST') {
      const response = await mockSendEmailVerification(body?.email)
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/join/organ/verify-email' && method === 'POST') {
      const response = await mockVerifyEmail(body)
      return createMockResponse({ data: response })
    }
    if (path.includes('reset-password/send-mail') && method === 'POST') {
      const response = await mockSendPasswordResetEmail(body?.email)
      return createMockResponse({ data: response })
    }
    if (
      path === 'auth/v1/login/member/find-email/send-sms' &&
      method === 'POST'
    ) {
      const response = await mockSendFindEmailSMS(body?.mobileNumber)
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/login/member/find-email' && method === 'POST') {
      const response = await mockFindEmail(body)
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/login/member/reset-password' && method === 'POST') {
      const response = await mockResetPassword(body)
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/login/organ/reset-password' && method === 'POST') {
      const response = await mockResetPassword(body)
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/login/organ/find-login-id' && method === 'POST') {
      const response = await mockSendFindOrganLoginIdEmail(body?.businessNo)
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/join/member' && method === 'POST') {
      const response = await mockSignup()
      return createMockResponse({ data: response })
    }
    if (path === 'auth/v1/join/organ' && method === 'POST') {
      const response = await mockSignupOrganization()
      return createMockResponse(response)
    }
    if (path === 'auth/v1/refresh' && method === 'POST') {
      // 토큰 갱신은 기존 토큰에 시간만 추가
      const newToken = {
        accessToken: 'mock-refreshed-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expireDt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
      return createMockResponse({ data: newToken })
    }
    if (path === 'auth/v1/logout' && method === 'DELETE') {
      return createMockResponse({ data: { isSuccess: true } })
    }
    if (path === 'member/v1/my-page' && method === 'GET') {
      const response = await mockGetMyPage()
      return createMockResponse({ data: response })
    }
    if (path === 'member/v1/my-page/check-password' && method === 'POST') {
      const response = await mockCheckPassword(body?.password)
      return createMockResponse({ data: response })
    }

    // Product API
    if (path.match(/^product\/v1\/(\d+)$/) && method === 'GET') {
      const match = path.match(/^product\/v1\/(\d+)$/)
      const productNo = parseInt(match![1], 10)
      const response = await mockGetProduct(productNo)
      return createMockResponse(response)
    }
    if (path.match(/^product\/v1\/detail\/(\d+)$/) && method === 'GET') {
      const match = path.match(/^product\/v1\/detail\/(\d+)$/)
      const productNo = parseInt(match![1], 10)
      const response = await mockGetProductDetail(productNo)
      return createMockResponse(response)
    }
    if (path === 'product/v1/create' && method === 'POST') {
      const response = await mockCreateProduct()
      return createMockResponse(response)
    }

    // Cart API
    if (path === 'cart/v1/add' && method === 'POST') {
      const response = await mockAddToCart(body)
      return createMockResponse(response)
    }
    if (path === 'cart/v1/items' && method === 'GET') {
      const memNo = parseInt(queryParams.memNo || '1001', 10)
      const response = await mockGetCartItems(memNo)
      return createMockResponse(response)
    }
    if (path === 'cart/v1/remove' && method === 'DELETE') {
      const cartNo = queryParams.cartNo || '1'
      const response = await mockRemoveCartItem(cartNo)
      return createMockResponse(response)
    }

    // Search API
    if (path === 'search/v1/search' && method === 'POST') {
      const response = await mockSearch(body)
      return createMockResponse(response)
    }

    // Question API
    if (path === 'question/v1' && method === 'GET') {
      const params = {
        page: queryParams.page ? parseInt(queryParams.page, 10) : undefined,
        size: queryParams.size ? parseInt(queryParams.size, 10) : undefined,
        productNo: queryParams.productNo
          ? parseInt(queryParams.productNo, 10)
          : undefined,
        keyword: queryParams.keyword
      }
      const response = await mockGetQuestions(params)
      return createMockResponse(response)
    }

    // Review API
    if (
      path.match(/^reviews\/v1\/products\/(\d+)\/reviews$/) &&
      method === 'GET'
    ) {
      const match = path.match(/^reviews\/v1\/products\/(\d+)\/reviews$/)
      const productNo = parseInt(match![1], 10)
      const params = {
        sortType: queryParams.sortType as any,
        page: queryParams.page ? parseInt(queryParams.page, 10) : undefined,
        size: queryParams.size ? parseInt(queryParams.size, 10) : undefined
      }
      const response = await mockGetProductReviews(productNo, params)
      return createMockResponse(response)
    }

    // Account API
    if (path === 'bank-account/v1' && method === 'GET') {
      const params = {
        page: queryParams.page ? parseInt(queryParams.page, 10) : undefined,
        size: queryParams.size ? parseInt(queryParams.size, 10) : undefined
      }
      const response = await mockGetBankAccounts(params)
      return createMockResponse(response)
    }
    if (path === 'bank-account/v1' && method === 'POST') {
      const response = await mockAddBankAccount()
      return createMockResponse(response)
    }
    if (path.match(/^bank-account\/v1\/(\d+)$/) && method === 'PUT') {
      const response = await mockUpdateBankAccountPrimary()
      return createMockResponse(response)
    }
    if (path === 'bank-account/v1' && method === 'DELETE') {
      const response = await mockDeleteBankAccounts()
      return createMockResponse(response)
    }

    // Organization API
    if (path.match(/^point\/v1\/(\d+)\/amount$/) && method === 'GET') {
      const match = path.match(/^point\/v1\/(\d+)\/amount$/)
      const organNo = parseInt(match![1], 10)
      const response = await mockGetOrganAmount(organNo)
      return createMockResponse(response)
    }

    // 기본 404 응답
    console.warn(`[MOCK] 경로를 찾을 수 없습니다: ${method} ${path}`)
    return createMockResponse(
      { error: '모크 핸들러에서 경로를 찾을 수 없습니다.', path, method },
      404,
      'Not Found'
    )
  } catch (error: any) {
    console.error(`[MOCK] 에러 발생: ${method} ${path}`, error)
    return createMockResponse(
      { error: error.message || '모크 핸들러 에러', path, method },
      500,
      'Internal Server Error'
    )
  }
}
