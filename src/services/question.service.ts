/**
 * 문의(Question) API 서비스
 * 백엔드 /question/v1 엔드포인트와 통신하는 함수들을 정의합니다.
 */

import api from '@/lib/api'
import type {
  QuestionListData,
  QuestionListResponse,
  QuestionQueryParams
} from '@/types/question'

/**
 * 문의 서비스 객체
 */
export const questionService = {
  /**
   * 문의 목록 조회 (GET /question/v1)
   *
   * @param params - 쿼리 파라미터 (page, size, productNo, keyword)
   * @returns 문의 목록 응답 (QuestionListResponse)
   * @throws 네트워크 오류나 API 오류 발생 시 에러
   *
   * @example
   * ```typescript
   * const questions = await questionService.getQuestions({
   *   productNo: 133,
   *   page: 1,
   *   size: 10
   * })
   * console.log(questions.data.list) // 문의 목록
   * ```
   */
  getQuestions: async (
    params?: QuestionQueryParams
  ): Promise<QuestionListResponse> => {
    try {
      const response = await api.get<QuestionListResponse>('/question/v1', {
        params: {
          page: params?.page || 1,
          size: params?.size || 10,
          productNo: params?.productNo,
          keyword: params?.keyword
        }
      })
      return response.data
    } catch (error) {
      console.error('문의 목록 조회 실패:', error)
      throw error
    }
  },

  /**
   * 문의 목록 데이터만 반환 (data 필드만 추출)
   *
   * @param params - 쿼리 파라미터 (page, size, productNo, keyword)
   * @returns 문의 목록 데이터 (QuestionListData)
   *
   * @example
   * ```typescript
   * const questionData = await questionService.getQuestionsData({
   *   productNo: 133,
   *   page: 1,
   *   size: 10
   * })
   * console.log(questionData.list) // 문의 목록
   * console.log(questionData.total) // 전체 개수
   * ```
   */
  getQuestionsData: async (
    params?: QuestionQueryParams
  ): Promise<QuestionListData> => {
    const response = await questionService.getQuestions(params)
    return response.data
  }
}

export default questionService
