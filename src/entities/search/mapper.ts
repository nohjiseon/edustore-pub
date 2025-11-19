/**
 * Search Entity Mapper
 * DTO → Model 변환 함수들 (정규화 및 타입 안전성 강화)
 */

import type { StaticImageData } from 'next/image'

import type { SearchApiResponseDtoValidated } from './dto'

import { FALLBACK_VALUES } from '@/constants/search-fallback'
import type {
  ProductDetailViewDto,
  SearchResultItemModel,
  SearchResultModel,
  ValidatedProductViewDto
} from '@/types/search'

/**
 * 썸네일에서 이미지 URL 추출
 * @param dto - ProductDetailViewDto
 * @returns 이미지 URL (문자열) 또는 StaticImageData (폴백)
 */
const extractThumbnailUrl = (
  dto: ProductDetailViewDto
): string | StaticImageData => {
  if (!dto.thumbnails || dto.thumbnails.length === 0) {
    return FALLBACK_VALUES.CARD_IMAGE
  }

  const thumbnail = dto.thumbnails[0]

  return thumbnail.thumbnailUrl || FALLBACK_VALUES.CARD_IMAGE
}

/**
 * 학년/교과목 정보 추출
 */
const extractGradeSubject = (
  dto: ProductDetailViewDto
): { grade: string; subject: string } => {
  if (!dto.gradeSubjects || dto.gradeSubjects.length === 0) {
    return {
      grade: FALLBACK_VALUES.GRADE,
      subject: FALLBACK_VALUES.SUBJECT
    }
  }

  const firstItem = dto.gradeSubjects[0]

  return {
    grade: firstItem.grade || FALLBACK_VALUES.GRADE,
    subject: firstItem.subject || FALLBACK_VALUES.SUBJECT
  }
}

/**
 * 자료 형태 추출
 */
const extractFormat = (dto: ProductDetailViewDto): string => {
  if (!dto.forms || dto.forms.length === 0) {
    return FALLBACK_VALUES.FORMAT
  }

  return dto.forms[0].formName || FALLBACK_VALUES.FORMAT
}

/**
 * 카테고리/타입 추출
 */
const extractType = (dto: ProductDetailViewDto): string => {
  if (!dto.categories || dto.categories.length === 0) {
    return FALLBACK_VALUES.TYPE
  }

  return dto.categories[0].categoryName || FALLBACK_VALUES.TYPE
}

/**
 * ProductDetailViewDto → SearchResultItemModel 변환
 *
 * @param dto - API 응답 DTO
 * @param index - 리스트에서의 인덱스
 * @returns 변환된 Model (실패시 null)
 */
export const toSearchResultItem = (
  dto: ProductDetailViewDto,
  index: number
): SearchResultItemModel | null => {
  try {
    if (!dto.product) {
      return null
    }

    const product = dto.product as ValidatedProductViewDto

    const { grade, subject } = extractGradeSubject(dto)
    const format = extractFormat(dto)
    const type = extractType(dto)
    const imageSrc = extractThumbnailUrl(dto)
    const avatar = dto.memberView?.profileImgUrl

    // title은 productNm에서 우선 추출, 없으면 title 필드 사용
    const title = product.productNm || product.title || '제목 미설정'

    // rating은 reviewAvgRating에서 우선 추출, 없으면 rating 필드 사용
    const rating =
      product.reviewAvgRating ?? product.rating ?? FALLBACK_VALUES.RATING

    // memberView에서 이름 추출: name > nickname > 기본값
    const authorName =
      dto.memberView?.name ||
      dto.memberView?.nickname ||
      FALLBACK_VALUES.AUTHOR_NAME

    return {
      id: product.productNo || product.productId || index,
      title,
      description: product.description,
      price: product.price ?? FALLBACK_VALUES.PRICE,
      rating,
      imageSrc,
      author: {
        name: authorName,
        avatar
      },
      tags: {
        grade,
        subject,
        type,
        format
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error(
      'Failed to map ProductDetailViewDto to SearchResultItemModel:',
      error
    )
    return null
  }
}

/**
 * SearchApiResponseDto → SearchResultModel 변환
 *
 * @param dto - API 응답 DTO
 * @param page - 현재 페이지 번호
 * @param size - 페이지 크기
 * @returns 변환된 Model
 */
export const toSearchResult = (
  dto: SearchApiResponseDtoValidated,
  page: number = 0,
  size: number = 10
): SearchResultModel | null => {
  try {
    // list 또는 data 필드에서 items 추출
    const rawItems = dto.list || dto.data || []

    const items = rawItems
      .map((item, index) => toSearchResultItem(item, index))
      .filter((item): item is SearchResultItemModel => item !== null)

    if (items.length === 0 && rawItems.length > 0) {
      // 모든 아이템 변환 실패
      console.warn('검색 결과 변환 실패: 모든 아이템 매핑 실패')
      return null
    }

    const total = dto.total || rawItems.length || 0
    const totalPages = Math.max(1, Math.ceil(total / size))
    const hasNext = page < totalPages - 1

    return {
      items,
      total,
      page,
      size,
      hasNext,
      totalPages
    }
  } catch (error) {
    console.error(
      'Failed to map SearchApiResponseDto to SearchResultModel:',
      error
    )
    return null
  }
}
