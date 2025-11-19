/**
 * API 모크 핸들러
 * 더미 데이터 모드일 때 API 호출을 가로채서 더미 데이터를 반환합니다.
 */

import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// 환경 변수로 모크 모드 확인
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

/**
 * API 모크 응답 생성
 */
export function createMockResponse<T>(
  data: T,
  status = 200,
  statusText = 'OK'
): AxiosResponse<T> {
  return {
    data,
    status,
    statusText,
    headers: {},
    config: {} as InternalAxiosRequestConfig
  }
}

/**
 * 네트워크 지연 시뮬레이션
 */
export function delay(ms: number = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 모크 모드 활성화 여부 확인
 */
export function isMockMode(): boolean {
  return USE_MOCK_DATA
}

/**
 * URL에서 경로 추출
 */
export function extractPath(url?: string): string {
  if (!url) return ''
  // /api/ 접두사 제거
  return url.replace(/^\/api\//, '').split('?')[0]
}

/**
 * 쿼리 파라미터 파싱
 */
export function parseQueryParams(url?: string): Record<string, string> {
  if (!url || !url.includes('?')) return {}
  const queryString = url.split('?')[1]
  const params: Record<string, string> = {}
  queryString.split('&').forEach((param) => {
    const [key, value] = param.split('=')
    if (key && value) {
      params[decodeURIComponent(key)] = decodeURIComponent(value)
    }
  })
  return params
}
