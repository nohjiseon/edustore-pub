// Query Key 생성 헬퍼 (예시 전용)
// 사용 방법 예시:
// const postsKeys = createQueryKeys('posts')
// postsKeys.list({ page: 1, limit: 10 })

import type { QuestionQueryParams } from '@/types/question'
import type { ReviewQueryParams } from '@/types/review'
import type { SearchCommandDto } from '@/types/search'

export type Filters = Record<string, unknown> | undefined

/**
 * 타입 안전한 필터 제네릭
 * Record<string, unknown>를 상속받아 TanStack Query와 호환성 유지
 */
interface SafeFilters extends Record<string, unknown> {}

export const createQueryKeys = <T extends string>(namespace: T) => ({
  all: () => [namespace] as const,
  lists: () => [namespace, 'list'] as const,
  list: (filters?: Filters) => [namespace, 'list', { filters }] as const,
  details: () => [namespace, 'detail'] as const,
  detail: (id: string | number) => [namespace, 'detail', String(id)] as const
})

export type QueryKeyFactory = ReturnType<typeof createQueryKeys>

// ============================================================================
// 검색 쿼리 키
// ============================================================================

export const searchQueryKeys = {
  all: () => ['search'] as const,
  lists: () => ['search', 'list'] as const,
  /**
   * 검색 목록 쿼리 키 생성
   * SearchCommandDto 객체를 기반으로 쿼리 키를 생성하며, TanStack Query 캐싱을 위해 사용됩니다
   *
   * @param filters - 검색 파라미터 (SearchCommandDto 또는 부분 객체)
   * @returns 쿼리 키 배열
   *
   * @example
   * ```typescript
   * const queryKey = searchQueryKeys.list({
   *   searchKeyword: '수학',
   *   page: 0,
   *   size: 10,
   *   sortType: 'LATEST'
   * })
   * ```
   */
  list: (filters?: Partial<SearchCommandDto> | Filters) =>
    ['search', 'list', { filters }] as const
}

// ============================================================================
// 상품 쿼리 키
// ============================================================================

export const productQueryKeys = {
  all: () => ['product'] as const,
  details: () => ['product', 'detail'] as const,

  /**
   * 상품 기본 정보 쿼리 키 생성 (GET /product/v1/{productNo})
   *
   * @param productNo - 상품 번호
   * @returns 쿼리 키 배열
   *
   * @example
   * ```typescript
   * const queryKey = productQueryKeys.info(123)
   * // ['product', 'detail', '123']
   * ```
   */
  basic: (productNo: number) => ['product', 'info', String(productNo)] as const,

  /**
   * 상품 상세 정보 쿼리 키 생성 (GET /product/v1/detail/{productNo})
   *
   * @param productNo - 상품 번호
   * @returns 쿼리 키 배열
   *
   * @example
   * ```typescript
   * const queryKey = productQueryKeys.detailInfo(123)
   * // ['product', 'detailInfo', '123']
   * ```
   */
  detail: (productNo: number) =>
    ['product', 'detailInfo', String(productNo)] as const
}

// ============================================================================
// 리뷰 쿼리 키
// ============================================================================

export const reviewQueryKeys = {
  all: () => ['review'] as const,
  productReviews: () => ['review', 'product'] as const,
  /**
   * 상품 리뷰 목록 쿼리 키 생성 (GET /reviews/v1/products/{productNo}/reviews)
   *
   * @param productNo - 상품 번호
   * @param params - 쿼리 파라미터 (sortType, page, size)
   * @returns 쿼리 키 배열
   *
   * @example
   * ```typescript
   * const queryKey = reviewQueryKeys.productReviewList(123, { sortType: 'LATEST' })
   * // ['review', 'product', '123', { sortType: 'LATEST' }]
   * ```
   */
  productReviewList: (productNo: number, params?: ReviewQueryParams) =>
    ['review', 'product', String(productNo), { params: params || {} }] as const
}

// ============================================================================
// 문의 쿼리 키
// ============================================================================

export const questionQueryKeys = {
  all: () => ['question'] as const,
  lists: () => ['question', 'list'] as const,
  /**
   * 문의 목록 쿼리 키 생성 (GET /question/v1)
   *
   * @param params - 쿼리 파라미터 (page, size, productNo, keyword)
   * @returns 쿼리 키 배열
   *
   * @example
   * ```typescript
   * const queryKey = questionQueryKeys.list({ productNo: 133, page: 1, size: 10 })
   * // ['question', 'list', { params: { productNo: 133, page: 1, size: 10 } }]
   * ```
   */
  list: (params?: QuestionQueryParams) =>
    ['question', 'list', { params: params || {} }] as const
}
