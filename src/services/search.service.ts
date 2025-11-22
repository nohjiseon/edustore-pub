/**
 * 검색 API 서비스
 * 백엔드 /search/v1/search 엔드포인트와 통신하는 함수들을 정의합니다.
 */

import { validateSearchResponse } from '@/entities/search/dto'
import type { SearchApiResponseDtoValidated } from '@/entities/search/dto'
import { toSearchResult } from '@/entities/search/mapper'
import { SearchResultModelSchema } from '@/entities/search/model'
import api from '@/lib/api'
import { createMockSearchResult } from '@/services/mocks/search.mock'
import type { SearchCommandDto, SearchResultModel } from '@/types/search'

type SearchApiResponseDtoResult = SearchApiResponseDtoValidated

/**
 * 검색 서비스 객체
 */
export const searchService = {
  /**
   * 상품 검색 (POST /search/v1/search)
   *
   * ⚠️ 현재 목업 모드로 동작: 실제 API 호출 대신 목업 데이터 반환
   *
   * @param command - 검색 파라미터 (SearchCommandDto)
   * @returns 검색 결과 (SearchApiResponseDto)
   * @throws 네트워크 오류나 검증 실패시 에러 발생
   */
  search: async (
    command: SearchCommandDto
  ): Promise<SearchApiResponseDtoResult> => {
    // 목업 모드: 실제 API 호출 대신 목업 데이터 반환
    const mockResult = createMockSearchResult(command)

    // SearchResultModel을 SearchApiResponseDto 형식으로 변환
    return {
      list: mockResult.items.map((item) => ({
        product: {
          productNo: item.id,
          productNm: item.title,
          title: item.title,
          description: item.description,
          price: item.price,
          reviewAvgRating: item.rating,
          rating: item.rating
        },
        categories: item.tags.type
          ? [{ categoryId: 1, categoryName: item.tags.type }]
          : [],
        forms: item.tags.format
          ? [{ formId: 1, formName: item.tags.format }]
          : [],
        gradeSubjects: [
          {
            gradeSubjectId: 1,
            grade: item.tags.grade || '',
            subject: item.tags.subject || '',
            gradeSubjectName: `${item.tags.grade || ''} ${
              item.tags.subject || ''
            }`.trim()
          }
        ],
        hashtags: [] as { hashtagId?: number; hashtagName?: string }[],
        thumbnails: [
          {
            thumbnailId: item.id,
            thumbnailUrl:
              typeof item.imageSrc === 'string'
                ? item.imageSrc
                : item.imageSrc?.src || '',
            thumbnailOrder: 1
          }
        ],
        memberView: {
          memNo: 1001,
          name: item.author.name,
          nickname: item.author.name,
          email: '',
          profileImgUrl: item.author.avatar || ''
        },
        isPaymentCompleted: false
      })),
      total: mockResult.total
    }

    /* 실제 API 호출 코드 (목업 모드로 비활성화)
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
    */
  },

  /**
   * 검색 결과 Model 반환
   *
   * ⚠️ 현재 목업 모드로 동작: 실제 API 호출 대신 목업 데이터 반환
   *
   * @param command - 검색 파라미터 (SearchCommandDto)
   * @returns SearchResultModel (검증 완료)
   */
  fetchModel: async (command: SearchCommandDto): Promise<SearchResultModel> => {
    // 목업 모드: 직접 목업 데이터 생성 및 반환
    return createMockSearchResult(command)

    /* 실제 API 호출 코드 (목업 모드로 비활성화)
    const dto = await searchService.search(command)
    const model = toSearchResult(dto, command.page, command.size)

    if (!model) {
      throw new Error('검색 결과 매핑에 실패했습니다.')
    }

    return SearchResultModelSchema.parse(model) as SearchResultModel
    */
  }
}

export default searchService
