import api from '@/lib/api'

/**
 * 기관 관련 API 응답 타입
 */
export interface OrganAmountResponse {
  data: number
  status: number
  code: number
  message: string
}

/**
 * 기관 서비스
 */
export const organizationService = {
  /**
   * 기관 충전금 조회
   * @param organNo 기관 번호
   * @returns 기관 충전금 조회 응답
   */
  getOrganAmount: async (organNo: number): Promise<OrganAmountResponse> => {
    const response = await api.get<OrganAmountResponse>(
      `/point/v1/${organNo}/amount`
    )
    return response.data
  }
}
