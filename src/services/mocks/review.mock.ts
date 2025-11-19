/**
 * 리뷰 서비스 더미 데이터
 */

import { delay } from './api.mock'
import type { ProductReviewsResponse } from '@/types/review'

/**
 * 상품 리뷰 목록 조회 더미 응답
 */
export async function mockGetProductReviews(
  productNo: number,
  params?: {
    sortType?: 'LATEST' | 'HIGHEST_RATING' | 'LOWEST_RATING'
    page?: number
    size?: number
  }
): Promise<ProductReviewsResponse> {
  await delay(200)

  const mockReviews = [
    {
      reviewNo: 1,
      productNo,
      productNm: '분수의 기초 개념과 활용',
      memNo: 2001,
      rating: 5,
      reviewText:
        '정말 유익한 강의였습니다. 학생들에게 적용할 수 있는 다양한 예시들이 도움이 많이 되었어요.',
      createDt: '2024-01-15T10:00:00',
      mainThumbnailUrl:
        'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=240&fit=crop&auto=format',
      nickname: '리뷰어1',
      profileImgUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    {
      reviewNo: 2,
      productNo,
      productNm: '분수의 기초 개념과 활용',
      memNo: 2002,
      rating: 4,
      reviewText:
        '내용이 체계적으로 잘 정리되어 있어서 좋았습니다. 다만 예제가 조금 더 많았으면 좋겠어요.',
      createDt: '2024-01-14T14:00:00',
      mainThumbnailUrl:
        'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=240&fit=crop&auto=format',
      nickname: '리뷰어2',
      profileImgUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b2e2e005?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    {
      reviewNo: 3,
      productNo,
      productNm: '분수의 기초 개념과 활용',
      memNo: 2003,
      rating: 5,
      reviewText: '학생들이 이해하기 쉽게 설명되어 있어서 강력 추천합니다!',
      createDt: '2024-01-13T09:00:00',
      mainThumbnailUrl:
        'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=240&fit=crop&auto=format',
      nickname: '리뷰어3',
      profileImgUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    {
      reviewNo: 4,
      productNo,
      productNm: '분수의 기초 개념과 활용',
      memNo: 2004,
      rating: 4,
      reviewText: '좋은 자료입니다. 다만 가격이 조금 비싼 것 같아요.',
      createDt: '2024-01-12T16:00:00',
      mainThumbnailUrl:
        'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=240&fit=crop&auto=format',
      nickname: '리뷰어4',
      profileImgUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b2e2e005?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    {
      reviewNo: 5,
      productNo,
      productNm: '분수의 기초 개념과 활용',
      memNo: 2005,
      rating: 5,
      reviewText: '최고의 학습 자료입니다. 꼭 추천하고 싶어요!',
      createDt: '2024-01-11T11:00:00',
      mainThumbnailUrl:
        'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=240&fit=crop&auto=format',
      nickname: '리뷰어5',
      profileImgUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format'
    }
  ]

  // 정렬
  let sortedReviews = [...mockReviews]
  const sortType = params?.sortType || 'LATEST'

  if (sortType === 'HIGHEST_RATING') {
    sortedReviews.sort((a, b) => b.rating - a.rating)
  } else if (sortType === 'LOWEST_RATING') {
    sortedReviews.sort((a, b) => a.rating - b.rating)
  } else {
    // LATEST - 최신순 (이미 시간순으로 정렬되어 있음)
    sortedReviews.sort(
      (a, b) => new Date(b.createDt).getTime() - new Date(a.createDt).getTime()
    )
  }

  // 페이지네이션
  const page = params?.page || 0
  const size = params?.size || 10
  const start = page * size
  const end = start + size
  const paginatedReviews = sortedReviews.slice(start, end)

  // 평균 평점 계산
  const averageRating =
    mockReviews.reduce((sum, review) => sum + review.rating, 0) /
    mockReviews.length

  // 상위 학생 유형 (더미 데이터)
  const topStudentTypes = ['초등학생', '중학생']

  return {
    data: {
      averageRating: Math.round(averageRating * 10) / 10, // 소수점 첫째 자리까지
      totalCount: mockReviews.length,
      topStudentTypes,
      reviews: paginatedReviews
    },
    status: 200,
    code: 200,
    message: '성공'
  }
}
