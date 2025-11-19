/**
 * 기관 서비스 더미 데이터
 */

import { delay } from './api.mock'
import type { OrganAmountResponse } from '@/services/organization'

/**
 * 기관 충전금 조회 더미 응답
 */
export async function mockGetOrganAmount(
  organNo: number
): Promise<OrganAmountResponse> {
  await delay(200)

  // 더미 충전금 데이터 (예: 100만원)
  return {
    data: 1000000,
    status: 200,
    code: 200,
    message: '성공'
  }
}
