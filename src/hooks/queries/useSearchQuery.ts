/**
 * 검색 API 쿼리 훅
 * TanStack Query를 사용하여 검색 데이터를 관리합니다.
 */

import {
  useSuspenseQuery,
  UseSuspenseQueryOptions
} from '@tanstack/react-query'

import { searchQueryKeys } from '@/constants/query-keys'
import { searchService } from '@/services/search.service'
import type { SearchCommandDto, SearchResultModel } from '@/types/search'

/**
 * 검색 데이터 조회 훅 (Suspense 지원)
 *
 * @param command - 검색 파라미터 (SearchCommandDto)
 * @param options - TanStack Query 옵션 (선택)
 * @returns 검색 결과 모델 쿼리
 *
 * @example
 * ```tsx
 * const { data } = useSearchQuery({
 *   searchKeyword: '수학',
 *   sortType: 'LATEST',
 *   page: 0,
 *   size: 10
 * })
 * ```
 */
const useSearchQuery = (
  command: SearchCommandDto,
  options?: Omit<
    UseSuspenseQueryOptions<SearchResultModel, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery<SearchResultModel, Error>({
    queryKey: searchQueryKeys.list(command),
    queryFn: async () => {
      return searchService.fetchModel(command)
    },
    staleTime: 5 * 60 * 1000, // 5분 캐시
    ...options
  })
}

export default useSearchQuery
