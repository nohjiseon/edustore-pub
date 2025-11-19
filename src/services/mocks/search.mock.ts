/**
 * 검색 서비스 더미 데이터
 */

import { delay } from './api.mock'
import type { SearchApiResponseDto } from '@/types/search'

/**
 * 검색 더미 응답
 */
export async function mockSearch(command: any): Promise<SearchApiResponseDto> {
  await delay(300)

  const mockProducts: any[] = [
    {
      product: {
        productNo: 1,
        productNm: '분수의 기초 개념과 활용',
        description:
          '분수의 개념을 쉽게 이해하고 실생활에 적용할 수 있는 학습 자료입니다.',
        price: 12000,
        reviewAvgRating: 4.8,
        rating: 4.8
      },
      categories: [{ categoryId: 1, categoryName: '학습자료' }],
      forms: [{ formId: 1, formName: 'PDF' }],
      gradeSubjects: [
        {
          gradeSubjectId: 1,
          grade: '초등 3학년',
          subject: '수학',
          gradeSubjectName: '초등 3학년 수학'
        }
      ],
      hashtags: [
        { hashtagId: 1, hashtagName: '분수' },
        { hashtagId: 2, hashtagName: '기초' }
      ],
      thumbnails: [
        {
          thumbnailId: 1,
          thumbnailUrl:
            'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=240&fit=crop&auto=format',
          thumbnailOrder: 1
        }
      ],
      memberView: {
        memNo: 1001,
        name: '김수학',
        nickname: '수학선생님',
        email: 'teacher@example.com',
        profileImgUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format'
      },
      isPaymentCompleted: false
    },
    {
      product: {
        productNo: 2,
        productNm: '영어 현재완료 시제 완벽 정리',
        description:
          '현재완료 시제의 세 가지 용법을 예문과 함께 자세히 설명하고, 실제 문제 풀이까지 포함된 완벽한 학습 자료입니다.',
        price: 15000,
        reviewAvgRating: 4.6,
        rating: 4.6
      },
      categories: [{ categoryId: 2, categoryName: '워크북' }],
      forms: [{ formId: 2, formName: '동영상' }],
      gradeSubjects: [
        {
          gradeSubjectId: 2,
          grade: '중학 1학년',
          subject: '영어',
          gradeSubjectName: '중학 1학년 영어'
        }
      ],
      hashtags: [
        { hashtagId: 3, hashtagName: '문법' },
        { hashtagId: 4, hashtagName: '현재완료' }
      ],
      thumbnails: [
        {
          thumbnailId: 2,
          thumbnailUrl:
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=240&fit=crop&auto=format',
          thumbnailOrder: 1
        }
      ],
      memberView: {
        memNo: 1002,
        name: '이영어',
        nickname: '영어선생님',
        email: 'english@example.com',
        profileImgUrl:
          'https://images.unsplash.com/photo-1494790108755-2616b2e2e005?w=64&h=64&fit=crop&crop=face&auto=format'
      },
      isPaymentCompleted: false
    },
    {
      product: {
        productNo: 3,
        productNm: '국어 독해력 향상을 위한 실전 워크북',
        description:
          '초등학생을 위한 국어 독해력 향상 워크북입니다. 다양한 문학 작품과 설명문을 읽고 이해하는 능력을 기를 수 있습니다.',
        price: 18000,
        reviewAvgRating: 4.9,
        rating: 4.9
      },
      categories: [{ categoryId: 1, categoryName: '학습자료' }],
      forms: [{ formId: 1, formName: 'PDF' }],
      gradeSubjects: [
        {
          gradeSubjectId: 3,
          grade: '초등 4학년',
          subject: '국어',
          gradeSubjectName: '초등 4학년 국어'
        }
      ],
      hashtags: [
        { hashtagId: 5, hashtagName: '독해력' },
        { hashtagId: 6, hashtagName: '워크북' }
      ],
      thumbnails: [
        {
          thumbnailId: 3,
          thumbnailUrl:
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=240&fit=crop&auto=format',
          thumbnailOrder: 1
        }
      ],
      memberView: {
        memNo: 1003,
        name: '박국어',
        nickname: '국어선생님',
        email: 'korean@example.com',
        profileImgUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format'
      },
      isPaymentCompleted: false
    }
  ]

  // 검색어에 따라 필터링 (간단한 예시)
  let filteredProducts = mockProducts
  if (command.searchKeyword) {
    const keyword = command.searchKeyword.toLowerCase()
    filteredProducts = mockProducts.filter(
      (p) =>
        p.product.productNm.toLowerCase().includes(keyword) ||
        p.product.description.toLowerCase().includes(keyword)
    )
  }

  return {
    list: filteredProducts,
    total: filteredProducts.length
  }
}
