/**
 * 상품 서비스 더미 데이터
 */

import { delay } from './api.mock'

import type {
  ProductResponse,
  ProductDetailResponse,
  ProductCreateResponse
} from '@/types/product'

/**
 * 상품 기본 조회 더미 응답
 */
export async function mockGetProduct(
  productNo: number
): Promise<ProductResponse> {
  await delay(200)

  const mockProduct = {
    productNo,
    memNo: 1001,
    productNm: '분수의 기초 개념과 활용',
    description:
      '분수의 개념을 쉽게 이해하고 실생활에 적용할 수 있는 학습 자료입니다.',
    detailDescription:
      '이 강의는 분수의 기본 개념부터 시작하여 분수의 덧셈, 뺄셈, 곱셈, 나눗셈까지 체계적으로 학습할 수 있도록 구성되어 있습니다.',
    priceType: '03',
    price: 12000,
    theme: '수학',
    productStatus: '03',
    viewCount: 1234,
    createDt: '2024-01-15T10:00:00',
    updateDt: '2024-01-20T14:30:00',
    reviewCount: 324,
    reviewAvgRating: 4.8
  }

  return {
    data: mockProduct,
    status: 200,
    code: 200,
    message: '성공'
  }
}

/**
 * 상품 상세 조회 더미 응답
 */
export async function mockGetProductDetail(
  productNo: number
): Promise<ProductDetailResponse> {
  await delay(300)

  const mockProduct = {
    productNo,
    memNo: 1001,
    productNm: '분수의 기초 개념과 활용',
    description:
      '분수의 개념을 쉽게 이해하고 실생활에 적용할 수 있는 학습 자료입니다.',
    detailDescription:
      '이 강의는 분수의 기본 개념부터 시작하여 분수의 덧셈, 뺄셈, 곱셈, 나눗셈까지 체계적으로 학습할 수 있도록 구성되어 있습니다.',
    priceType: '03',
    price: 12000,
    theme: '수학',
    productStatus: '03',
    viewCount: 1234,
    createDt: '2024-01-15T10:00:00',
    updateDt: '2024-01-20T14:30:00',
    reviewCount: 324,
    reviewAvgRating: 4.8
  }

  const mockCategories = [
    { categoryCode: 'C01', categoryNm: '학습자료' },
    { categoryCode: 'C02', categoryNm: '워크북' }
  ]

  const mockForms = [
    { formCode: 'F01', formNm: 'PDF' },
    { formCode: 'F02', formNm: '동영상' }
  ]

  const mockGradeSubjects = [
    {
      gradeCode: 'E01',
      gradeNm: '초등 3학년',
      subjectCode: 'S01',
      subjectNm: '수학'
    },
    {
      gradeCode: 'E02',
      gradeNm: '초등 4학년',
      subjectCode: 'S01',
      subjectNm: '수학'
    }
  ]

  const mockHashtags = [
    { hashtagNo: 1, hashtagNm: '분수' },
    { hashtagNo: 2, hashtagNm: '기초' },
    { hashtagNo: 3, hashtagNm: '실생활활용' }
  ]

  const mockThumbnails = [
    {
      thumbnailNo: 1,
      thumbnailOrder: 1,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=240&fit=crop&auto=format',
      thumbnailNm: 'thumbnail1.jpg',
      thumnailExtension: 'jpg',
      thumbnailSize: 102400,
      mimeType: 'image/jpeg',
      mainThumbnailYn: 'Y' as const,
      createDt: '2024-01-15T10:00:00'
    },
    {
      thumbnailNo: 2,
      thumbnailOrder: 2,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=240&fit=crop&auto=format',
      thumbnailNm: 'thumbnail2.jpg',
      thumnailExtension: 'jpg',
      thumbnailSize: 98304,
      mimeType: 'image/jpeg',
      mainThumbnailYn: 'N' as const,
      createDt: '2024-01-15T10:00:00'
    }
  ]

  const mockMemberView = {
    memNo: 1001,
    name: '김수학',
    email: 'teacher@example.com',
    nickname: '수학선생님',
    mobileNumber: '010-1234-5678',
    birthday: null as string | null,
    gradeSubjectList: mockGradeSubjects,
    categoryList: mockCategories,
    status: 'ACTIVE',
    createDt: '2023-06-01T00:00:00',
    profileImgUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format',
    profileIntro: '수학 전문 강사입니다.',
    organPoint: null as number | null,
    businessNo: null as string | null,
    organName: null as string | null
  }

  return {
    data: {
      product: mockProduct,
      categories: mockCategories,
      forms: mockForms,
      gradeSubjects: mockGradeSubjects,
      hashtags: mockHashtags,
      thumbnails: mockThumbnails,
      memberView: mockMemberView,
      isPaymentCompleted: false
    },
    status: 200,
    code: 200,
    message: '성공'
  }
}

/**
 * 상품 생성 더미 응답
 */
export async function mockCreateProduct(): Promise<ProductCreateResponse> {
  await delay(500)
  return {
    data: 12345, // 생성된 상품 번호
    status: 200,
    code: 200,
    message: '상품이 생성되었습니다.'
  }
}
