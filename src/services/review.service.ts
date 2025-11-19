/**
 * 리뷰(Review) API 서비스
 * 백엔드 /reviews/v1 엔드포인트와 통신하는 함수들을 정의합니다.
 */

import api from '@/lib/api'
import type {
  ProductReviewsData,
  ProductReviewsResponse,
  ReviewQueryParams
} from '@/types/review'

/**
 * 리뷰 서비스 객체
 */
export const reviewService = {
  /**
   * 상품 리뷰 목록 조회 (GET /reviews/v1/products/{productNo}/reviews)
   *
   * @param productNo - 상품 번호
   * @param params - 쿼리 파라미터 (sortType, page, size)
   * @returns 상품 리뷰 목록 (ProductReviewsResponse)
   * @throws 네트워크 오류나 API 오류 발생 시 에러
   *
   * @example
   * ```typescript
   * const reviews = await reviewService.getProductReviews(123, { sortType: 'LATEST' })
   * console.log(reviews.data.averageRating) // 평균 평점
   * console.log(reviews.data.reviews) // 리뷰 목록
   * ```
   */
  getProductReviews: async (
    productNo: number,
    params?: ReviewQueryParams
  ): Promise<ProductReviewsResponse> => {
    try {
      const response = await api.get<ProductReviewsResponse>(
        `/reviews/v1/products/${productNo}/reviews`,
        {
          params: {
            sortType: params?.sortType || 'LATEST',
            page: params?.page,
            size: params?.size
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('상품 리뷰 조회 실패:', error)
      throw error
    }
  },

  /**
   * 상품 리뷰 데이터만 반환 (data 필드만 추출)
   *
   * @param productNo - 상품 번호
   * @param params - 쿼리 파라미터 (sortType, page, size)
   * @returns 상품 리뷰 데이터 (ProductReviewsData)
   *
   * @example
   * ```typescript
   * const reviewsData = await reviewService.getProductReviewsData(123, { sortType: 'LATEST' })
   * console.log(reviewsData.averageRating) // 평균 평점
   * console.log(reviewsData.totalCount) // 전체 리뷰 수
   * console.log(reviewsData.reviews) // 리뷰 목록
   * ```
   */
  getProductReviewsData: async (
    productNo: number,
    params?: ReviewQueryParams
  ): Promise<ProductReviewsData> => {
    const response = await reviewService.getProductReviews(productNo, params)
    return response.data
  }
}

export default reviewService
