/**
 * Search Entity DTO Schemas
 * Zod를 사용한 DTO 검증 스키마만 정의
 * (타입 정의는 src/types/search.ts 참조)
 */

import { z } from 'zod'

import type {
  SearchCommandDto,
  ProductViewDto,
  ProductCategoryViewDto,
  ProductFormViewDto,
  ProductGradeSubjectViewDto,
  ProductHashtagViewDto,
  ProductThumbnailViewDto,
  MemberViewDto,
  ProductDetailViewDto,
  SearchApiResponseDto
} from '@/types/search'

// ============================================================================
// Zod Schemas for DTO - API Request
// ============================================================================

export const SearchCommandDtoSchema = z.object({
  searchKeyword: z.string().min(1, '검색어는 필수입니다'),
  grade: z.string().optional().default(''),
  subject: z.string().optional().default(''),
  priceType: z.string().optional().default(''),
  form: z.string().optional().default(''),
  sortType: z.enum([
    'LATEST',
    'ACCURACY',
    'PRICE_DESC',
    'PRICE_ASC',
    'RATING_DESC'
  ]),
  page: z.number().int().min(0),
  size: z.number().int().min(1).default(10)
})

// ============================================================================
// Zod Schemas for DTO - API Response
// ============================================================================

export const ProductViewDtoSchema = z.object({
  productNo: z.number().optional(),
  productId: z.number().optional(),
  productNm: z.string(),
  title: z.string().optional(),
  description: z.string().default('설명 미설정'),
  price: z
    .union([z.number(), z.string()])
    .transform((val) => {
      if (typeof val === 'string') {
        return parseInt(val, 10) || 0
      }
      return val
    })
    .default(0),
  reviewAvgRating: z.number().optional(),
  rating: z.number().optional().default(5.0)
})

export const ProductCategoryViewDtoSchema = z.object({
  categoryId: z.number().optional(),
  categoryName: z.string().optional()
})

export const ProductFormViewDtoSchema = z.object({
  formId: z.number().optional(),
  formName: z.string().optional()
})

export const ProductGradeSubjectViewDtoSchema = z.object({
  gradeSubjectId: z.number().optional(),
  grade: z.string().optional(),
  subject: z.string().optional(),
  gradeSubjectName: z.string().optional()
})

export const ProductHashtagViewDtoSchema = z.object({
  hashtagId: z.number().optional(),
  hashtagName: z.string().optional()
})

export const ProductThumbnailViewDtoSchema = z.object({
  thumbnailId: z.number().optional(),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  thumbnailOrder: z.number().optional()
})

export const MemberViewDtoSchema = z
  .object({
    memNo: z.number().nullable().optional(),
    memberId: z.number().nullable().optional(),
    memberNo: z.number().nullable().optional(),
    name: z.string().nullable().optional(),
    nickname: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    loginId: z.string().nullable().optional(),
    profileImage: z.string().nullable().optional(),
    profileImageUrl: z.string().nullable().optional(),
    profileImgUrl: z.string().nullable().optional(),
    avatar: z.string().nullable().optional()
  })
  .passthrough() // 예상치 못한 필드도 통과

export const ProductDetailViewDtoSchema = z.object({
  product: ProductViewDtoSchema.optional(),
  categories: z.array(ProductCategoryViewDtoSchema).optional().default([]),
  forms: z.array(ProductFormViewDtoSchema).optional().default([]),
  gradeSubjects: z
    .array(ProductGradeSubjectViewDtoSchema)
    .optional()
    .default([]),
  hashtags: z.array(ProductHashtagViewDtoSchema).optional().default([]),
  thumbnails: z.array(ProductThumbnailViewDtoSchema).optional().default([]),
  memberView: MemberViewDtoSchema.optional(),
  isPaymentCompleted: z.boolean().optional().default(false)
})

export const SearchApiResponseDtoSchema = z.object({
  list: z.array(ProductDetailViewDtoSchema).optional(),
  data: z.array(ProductDetailViewDtoSchema).optional(),
  total: z.number().int().min(0).optional()
})

// ============================================================================
// Helper Functions for Validation
// ============================================================================

/**
 * SearchCommandDto 검증 함수
 * @param params - 검증할 객체
 * @returns 검증된 SearchCommandDto 또는 유효성 검사 오류
 */
export const validateSearchCommand = (params: unknown) => {
  return SearchCommandDtoSchema.safeParse(params)
}

/**
 * SearchApiResponseDto 검증 함수
 * @param data - 검증할 객체
 * @returns 검증된 SearchApiResponseDto 또는 유효성 검사 오류
 */
export const validateSearchResponse = (data: unknown) => {
  return SearchApiResponseDtoSchema.safeParse(data)
}

export type SearchApiResponseDtoValidated = z.infer<
  typeof SearchApiResponseDtoSchema
>

// Re-export for convenience
export type {
  MemberViewDto,
  ProductCategoryViewDto,
  ProductDetailViewDto,
  ProductFormViewDto,
  ProductGradeSubjectViewDto,
  ProductHashtagViewDto,
  ProductThumbnailViewDto,
  ProductViewDto,
  SearchApiResponseDto,
  SearchCommandDto
}
