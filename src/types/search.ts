import type { StaticImageData } from 'next/image'

import { PaginationModel } from './common'

// ============================================================================
// UI 타입
// ============================================================================

export interface TagData {
  grade?: string
  subject?: string
  type?: string
  format?: string
}

export interface AuthorData {
  name: string
  avatar?: string
}

export interface ContentCardData {
  id: number
  rating: number
  tags: TagData
  title: string
  description: string
  author: AuthorData
  price: number
  imageSrc?: string | StaticImageData
}

export interface SearchFilters {
  grade?: string[]
  subject?: string[]
  type?: string[]
  format?: string[]
  priceRange?: [number, number]
}

// ============================================================================
// Model 타입 (Entity 내부용)
// ============================================================================

export interface SearchResultItemModel {
  id: number
  title: string
  description: string
  price: number
  rating: number
  imageSrc: string | StaticImageData
  author: {
    name: string
    avatar?: string
  }
  tags: {
    grade?: string
    subject?: string
    type?: string
    format?: string
  }
  createdAt: string
  updatedAt: string
}

export interface SearchResultModel extends PaginationModel {
  items: SearchResultItemModel[]
}

// ============================================================================
// DTO 타입 - API 요청
// ============================================================================

export interface SearchCommandDto {
  searchKeyword: string
  grade?: string
  subject?: string
  priceType?: string
  form?: string
  sortType: 'LATEST' | 'ACCURACY' | 'PRICE_DESC' | 'PRICE_ASC' | 'RATING_DESC'
  page: number
  size: number
}

// ============================================================================
// DTO 타입 - API 응답
// ============================================================================

export interface ProductViewDto {
  productNo?: number
  productId?: number
  productNm: string
  title?: string // 호환성용
  description: string
  price: number | string // API 응답 그대로
  reviewAvgRating?: number
  rating?: number // 호환성용
}

/**
 * Zod 검증 후 정규화된 ProductViewDto
 * price는 항상 number로 보장됨
 */
export type ValidatedProductViewDto = Omit<ProductViewDto, 'price'> & {
  price: number
}

export interface ProductCategoryViewDto {
  categoryId?: number
  categoryName?: string
}

export interface ProductFormViewDto {
  formId?: number
  formName?: string
}

export interface ProductGradeSubjectViewDto {
  gradeSubjectId?: number
  grade?: string
  subject?: string
  gradeSubjectName?: string
}

export interface ProductHashtagViewDto {
  hashtagId?: number
  hashtagName?: string
}

export interface ProductThumbnailViewDto {
  thumbnailId?: number
  thumbnailUrl?: string
  thumbnailOrder?: number
}

export interface MemberViewDto {
  memNo?: number
  memberId?: number
  memberNo?: number
  name?: string
  nickname?: string
  email?: string
  loginId?: string
  profileImgUrl?: string
}

export interface ProductDetailViewDto {
  product?: ProductViewDto
  categories?: ProductCategoryViewDto[]
  forms?: ProductFormViewDto[]
  gradeSubjects?: ProductGradeSubjectViewDto[]
  hashtags?: ProductHashtagViewDto[]
  thumbnails?: ProductThumbnailViewDto[]
  memberView?: MemberViewDto
  isPaymentCompleted?: boolean
}

export interface SearchApiResponseDto {
  list?: ProductDetailViewDto[]
  data?: ProductDetailViewDto[]
  total?: number
}
