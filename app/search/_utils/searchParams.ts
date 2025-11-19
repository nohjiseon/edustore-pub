import type { ReadonlyURLSearchParams } from 'next/navigation'

import { FORM_ITEMS } from '@/constants/education-filter-options'
import { PRICE_ITEMS } from '@/constants/search-filter-options'
import {
  expandFilterParams,
  labelsToSearchParams,
  searchParamsToLabels
} from '@/utils/education-mapping'

/**
 * 가격 헬퍼 함수: 코드 → 이름
 */
const getPriceName = (id: string): string | undefined => {
  return PRICE_ITEMS[id as keyof typeof PRICE_ITEMS]
}

/**
 * 가격 헬퍼 함수: 이름 → 코드
 * 공백을 무시하고 비교 (UI에서 공백이 추가될 수 있음)
 */
const getPriceId = (name: string): string | undefined => {
  const normalizedName = name.replace(/\s+/g, '')
  const entry = Object.entries(PRICE_ITEMS).find(([, value]) => {
    const normalizedValue = value.replace(/\s+/g, '')
    return normalizedValue === normalizedName
  })
  return entry ? entry[0] : undefined
}

/**
 * 확장자 헬퍼 함수: 코드 → 이름
 */
const getFormName = (id: string): string | undefined => {
  return FORM_ITEMS[id as keyof typeof FORM_ITEMS]
}

/**
 * 확장자 헬퍼 함수: 이름 → 코드
 */
const getFormId = (name: string): string | undefined => {
  const entry = Object.entries(FORM_ITEMS).find(([, value]) => value === name)
  return entry ? entry[0] : undefined
}

// URL 파라미터용 타입 (searchParam 기반 - 영문)
export type SearchFilters = {
  keyword?: string
  grade?: string[]
  subject?: string[]
  type?: string[]
  ext?: string[]
  price?: string[] // UI는 배열로 처리, API 전송 시에만 마지막 값 사용
  page?: number
  size?: number
  sort?: string
}

// UI 표시용 타입 (label 기반 - 한글)
export type SearchFiltersUI = {
  keyword?: string
  grade?: string[] // label 배열 (예: ['초등 1학년', '초등 2학년'])
  subject?: string[] // label 배열 (예: ['국어', '수학'])
  type?: string[]
  ext?: string[]
  price?: string[] // UI는 다중 선택 지원 (API 연동 시 마지막 값만 전송)
  page?: number
  size?: number
  sort?: string
}

type InputParams =
  | URLSearchParams
  | ReadonlyURLSearchParams
  | Record<string, string | string[] | undefined>

/**
 * 배열 파라미터 읽기 (콤마 구분 및 다중 파라미터 모두 지원)
 * @example
 * ?grade=elementary-1,elementary-2 → ['elementary-1', 'elementary-2']
 * ?grade=elementary-1&grade=elementary-2 → ['elementary-1', 'elementary-2']
 */
const getAll = (src: InputParams, key: string): string[] => {
  let values: string[] = []

  if (src instanceof URLSearchParams) {
    values = src.getAll(key)
  } else if (typeof (src as any).getAll === 'function') {
    values = (src as any).getAll(key)
  } else {
    const v = (src as Record<string, string | string[] | undefined>)[key]
    if (Array.isArray(v)) values = v
    else if (typeof v === 'string') values = [v]
  }

  // 콤마로 구분된 값들을 분리 (예: "a,b,c" → ["a", "b", "c"])
  const result: string[] = []
  for (const value of values) {
    if (value.includes(',')) {
      result.push(
        ...value
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean)
      )
    } else {
      result.push(value)
    }
  }

  return result
}

const getOne = (src: InputParams, key: string): string | undefined => {
  if (src instanceof URLSearchParams) return src.get(key) ?? undefined
  if (typeof (src as any).get === 'function')
    return (src as any).get(key) ?? undefined
  const v = (src as Record<string, string | string[] | undefined>)[key]
  if (Array.isArray(v)) return v[0]
  if (typeof v === 'string') return v
  return undefined
}

export const parseSearchFilters = (src: InputParams): SearchFilters => {
  const keyword = getOne(src, 'keyword')
  const grade = getAll(src, 'grade')
  const subject = getAll(src, 'subject')
  const type = getAll(src, 'type')
  const ext = getAll(src, 'ext')
  const price = getAll(src, 'price') // UI는 배열로 처리

  const pageRaw = getOne(src, 'page')
  const sizeRaw = getOne(src, 'size')
  const sort = getOne(src, 'sort')

  const page = pageRaw ? Number(pageRaw) || undefined : undefined
  const size = sizeRaw ? Number(sizeRaw) || undefined : undefined

  return {
    keyword: keyword?.trim() ? keyword : undefined,
    grade: grade.length ? grade : undefined,
    subject: subject.length ? subject : undefined,
    type: type.length ? type : undefined,
    ext: ext.length ? ext : undefined,
    price: price.length ? price : undefined,
    page,
    size,
    sort: sort?.trim() ? sort : undefined
  }
}

/**
 * 필터를 URL 파라미터로 변환 (콤마 구분 방식 사용)
 * @example
 * { grade: ['elementary-1', 'elementary-2'] } → ?grade=elementary-1,elementary-2
 */
export const buildSearchParams = (
  filters: Partial<SearchFilters>
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.keyword) params.set('keyword', filters.keyword)

  // 배열은 콤마로 구분하여 단일 파라미터로 저장
  if (filters.grade?.length) params.set('grade', filters.grade.join(','))
  if (filters.subject?.length) params.set('subject', filters.subject.join(','))
  if (filters.type?.length) params.set('type', filters.type.join(','))
  if (filters.ext?.length) params.set('ext', filters.ext.join(','))

  // UI는 배열이지만 API는 마지막 선택값만 전송
  if (filters.price?.length) {
    const lastPrice = filters.price[filters.price.length - 1]
    params.set('price', lastPrice)
  }
  // TODO: API 다중 선택 지원 시 아래 코드로 변경
  // if (filters.price?.length) params.set('price', filters.price.join(','))

  if (filters.page) params.set('page', String(filters.page))
  if (filters.size) params.set('size', String(filters.size))
  if (filters.sort) params.set('sort', filters.sort)

  return params
}

/**
 * 다중 선택 파라미터 토글 (콤마 구분 방식 사용)
 * @example toggleMultiParam(params, 'grade', 'elementary-1', true)
 * → ?grade=elementary-1 또는 ?grade=existing,elementary-1
 */
export const toggleMultiParam = (
  current: URLSearchParams,
  key: 'grade' | 'subject' | 'type' | 'ext',
  value: string,
  enabled: boolean
): URLSearchParams => {
  const next = new URLSearchParams(current.toString())

  // 현재 값들을 가져와서 Set으로 관리 (중복 제거)
  const currentValue = next.get(key)
  const values = new Set(
    currentValue ? currentValue.split(',').map((v) => v.trim()) : []
  )

  if (enabled) {
    values.add(value)
  } else {
    values.delete(value)
  }

  // 값이 있으면 콤마로 연결, 없으면 삭제
  next.delete(key)
  if (values.size > 0) {
    next.set(key, Array.from(values).join(','))
  }

  return next
}

export const setSingleParam = (
  current: URLSearchParams,
  key: 'keyword' | 'price' | 'page' | 'size' | 'sort',
  value?: string
): URLSearchParams => {
  const next = new URLSearchParams(current.toString())
  if (value == null || value === '') next.delete(key)
  else next.set(key, value)
  return next
}

/**
 * URL 파라미터를 UI용 필터로 변환 (searchParam → label)
 * "전체" 옵션은 개별 항목으로 확장하여 표시
 * @example parseSearchFiltersUI(params) → { grade: ['초등 1학년'], subject: ['국어'], price: ['무료'], ext: ['PDF', '이미지'] }
 */
export const parseSearchFiltersUI = (src: InputParams): SearchFiltersUI => {
  const urlFilters = parseSearchFilters(src)

  return {
    ...urlFilters,
    grade: urlFilters.grade
      ? searchParamsToLabels(expandFilterParams(urlFilters.grade))
      : undefined,
    subject: urlFilters.subject
      ? searchParamsToLabels(expandFilterParams(urlFilters.subject))
      : undefined,
    price: urlFilters.price?.map((code) => getPriceName(code) ?? code),
    ext: urlFilters.ext?.map((code) => getFormName(code) ?? code)
  }
}

/**
 * UI 필터를 URL 파라미터로 변환 (label → searchParam)
 * @example buildSearchParamsFromUI({ grade: ['초등 1학년'], price: ['무료'], ext: ['PDF'] }) → URLSearchParams with grade=E01&price=01&ext=F04
 */
export const buildSearchParamsFromUI = (
  filtersUI: Partial<SearchFiltersUI>
): URLSearchParams => {
  const urlFilters: Partial<SearchFilters> = {
    keyword: filtersUI.keyword,
    grade: filtersUI.grade ? labelsToSearchParams(filtersUI.grade) : undefined,
    subject: filtersUI.subject
      ? labelsToSearchParams(filtersUI.subject)
      : undefined,
    type: filtersUI.type,
    price: filtersUI.price?.map((name) => getPriceId(name) ?? name),
    ext: filtersUI.ext?.map((name) => getFormId(name) ?? name),
    page: filtersUI.page,
    size: filtersUI.size,
    sort: filtersUI.sort
  }

  return buildSearchParams(urlFilters)
}
