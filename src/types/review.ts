/**
 * 리뷰(Review) 관련 타입 정의
 */

/**
 * 리뷰 정렬 타입
 */
export type ReviewSortType = 'LATEST' | 'HIGHEST_RATING' | 'LOWEST_RATING'

/**
 * 학생 유형 정보
 */
export interface StudentTypeInfo {
  /** 학생 유형 코드 */
  studentType: string
  /** 학생 유형 수 */
  count: number
}

/**
 * 리뷰 상세 정보
 */
export interface ReviewInfo {
  /** 리뷰 번호 */
  reviewNo: number
  /** 상품 번호 */
  productNo: number
  /** 상품명 */
  productNm: string
  /** 회원 번호 */
  memNo: number
  /** 평점 (1-5) */
  rating: number
  /** 리뷰 내용 */
  reviewText: string
  /** 작성일시 */
  createDt: string
  /** 메인 썸네일 URL */
  mainThumbnailUrl: string
  /** 작성자 닉네임 */
  nickname: string
  /** 작성자 프로필 이미지 URL */
  profileImgUrl: string
}

/**
 * 상품 리뷰 목록 데이터
 */
export interface ProductReviewsData {
  /** 평균 평점 */
  averageRating: number
  /** 전체 리뷰 수 */
  totalCount: number
  /** 상위 학생 유형 (문자열 배열) */
  topStudentTypes: string[]
  /** 리뷰 목록 */
  reviews: ReviewInfo[]
}

/**
 * 상품 리뷰 목록 조회 API 응답 (GET /reviews/v1/products/{productNo}/reviews)
 */
export interface ProductReviewsResponse {
  /** 리뷰 데이터 */
  data: ProductReviewsData
  /** HTTP 상태 코드 */
  status: number
  /** 응답 코드 */
  code: number
  /** 응답 메시지 */
  message: string
}

/**
 * 리뷰 목록 조회 파라미터
 */
export interface ReviewQueryParams {
  /** 정렬 타입 (기본값: LATEST) */
  sortType?: ReviewSortType
  /** 페이지 번호 (0부터 시작) */
  page?: number
  /** 페이지 크기 */
  size?: number
}
