/**
 * 검색 API 서비스
 * 백엔드 /search/v1/search 엔드포인트와 통신하는 함수들을 정의합니다.
 */

import { validateSearchResponse } from '@/entities/search/dto'
import type { SearchApiResponseDtoValidated } from '@/entities/search/dto'
import { toSearchResult } from '@/entities/search/mapper'
import { SearchResultModelSchema } from '@/entities/search/model'
import api from '@/lib/api'
import type { SearchCommandDto, SearchResultModel } from '@/types/search'

type SearchApiResponseDtoResult = SearchApiResponseDtoValidated

/**
 * 검색 서비스 객체
 */
export const searchService = {
  /**
   * 상품 검색 (POST /search/v1/search)
   *
   * @param command - 검색 파라미터 (SearchCommandDto)
   * @returns 검색 결과 (SearchApiResponseDto)
   * @throws 네트워크 오류나 검증 실패시 에러 발생
   */
  search: async (
    command: SearchCommandDto
  ): Promise<SearchApiResponseDtoResult> => {
    try {
      const response = await api.post('/search/v1/search', command)
      const apiData = response.data

      // Step 1: API 응답 구조 정규화 (list/data 필드 모두 지원)
      let rawItems: unknown[] = []
      let rawTotal: number = 0

      if (Array.isArray(apiData)) {
        // 응답이 배열 형태인 경우
        rawItems = apiData
        rawTotal = apiData.length
      } else if (apiData && typeof apiData === 'object') {
        // 응답이 객체 형태인 경우 (list 또는 data 필드 확인)
        rawItems = apiData.list || apiData.data || []
        // API에서 제공한 total 값이 있으면 사용, 없으면 items 길이 사용
        rawTotal =
          typeof apiData.total === 'number'
            ? apiData.total
            : Array.isArray(rawItems)
            ? rawItems.length
            : 0
      }

      // Step 2: Zod 검증 및 정규화
      const validationResult = validateSearchResponse({
        list: rawItems,
        total: rawTotal
      })

      if (!validationResult.success) {
        console.error('API 응답 검증 실패:', {
          errors: validationResult.error.issues,
          receivedData: apiData
        })
        throw new Error('API 응답 검증 실패')
      }

      return validationResult.data
    } catch (error) {
      console.error('검색 API 호출 실패:', error)
      throw error
    }
  },

  /**
   * 검색 결과 Model 반환
   *
   * @param command - 검색 파라미터 (SearchCommandDto)
   * @returns SearchResultModel (검증 완료)
   */
  fetchModel: async (command: SearchCommandDto): Promise<SearchResultModel> => {
    const dto = await searchService.search(command)
    const model = toSearchResult(dto, command.page, command.size)

    if (!model) {
      throw new Error('검색 결과 매핑에 실패했습니다.')
    }

    return SearchResultModelSchema.parse(model) as SearchResultModel
  }
}

export default searchService
