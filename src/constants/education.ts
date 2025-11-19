// ========================================
// 학년 관련 상수
// ========================================

import { PRICE_ITEMS } from './search-filter-options'

export const GRADE_OPTIONS = [
  '만 3세 이하',
  '만 4세',
  '만 5세',
  '만 6세',
  '초등 1학년',
  '초등 2학년',
  '초등 3학년',
  '초등 4학년',
  '초등 5학년',
  '초등 6학년',
  '중등 1학년',
  '중등 2학년',
  '중등 3학년',
  '고등 1학년',
  '고등 2학년',
  '고등 3학년',
  '특수교육',
  '성인교육',
  '학년무관'
] as const

export type GradeOption = (typeof GRADE_OPTIONS)[number]

// 카테고리별 학년 그룹
export const GRADE_CATEGORY_MAP = {
  유아: ['만 3세 이하', '만 4세', '만 5세', '만 6세'],
  초등: [
    '초등 1학년',
    '초등 2학년',
    '초등 3학년',
    '초등 4학년',
    '초등 5학년',
    '초등 6학년'
  ],
  중등: ['중등 1학년', '중등 2학년', '중등 3학년'],
  고등: ['고등 1학년', '고등 2학년', '고등 3학년'],
  기타: ['특수교육', '성인교육', '학년무관']
} as const

// ========================================
// 교과 관련 상수
// ========================================

// 대상 교과 선택 옵션 (카테고리별)
export const SUBJECT_OPTIONS = {
  유아: ['신체운동·건강', '의사소통', '사회관계', '예술경험', '자연탐구'],
  초등: [
    '국어',
    '도덕',
    '수학',
    '사회',
    '과학',
    '실과',
    '음악',
    '미술',
    '체육',
    '영어',
    '통합교과(바/슬/즐)',
    '창의적 체험활동',
    '학교자율시간',
    '교과통합'
  ],
  중등: [
    '국어',
    '도덕',
    '수학',
    '사회',
    '과학',
    '기술·가정',
    '정보',
    '선택',
    '음악',
    '미술',
    '체육',
    '영어',
    '창의적 체험활동',
    '학교자율시간',
    '교과통합'
  ],
  고등: [
    '국어',
    '수학',
    '사회',
    '과학',
    '기술·가정',
    '정보',
    '예술',
    '제2외국어',
    '한문',
    '교양',
    '전문교과',
    '체육',
    '영어',
    '창의적 체험활동',
    '학교자율시간',
    '교과통합'
  ],
  기타: ['교과무관']
} as const

export type SubjectCategory = keyof typeof SUBJECT_OPTIONS
export type SubjectOption = (typeof SUBJECT_OPTIONS)[SubjectCategory][number]

// 평탄화된 전체 교과 목록 (검색 필터용)
// SUBJECT_OPTIONS에서 자동으로 생성하여 중복 제거
const allSubjectsSet = new Set([
  ...SUBJECT_OPTIONS.유아,
  ...SUBJECT_OPTIONS.초등,
  ...SUBJECT_OPTIONS.중등,
  ...SUBJECT_OPTIONS.고등,
  ...SUBJECT_OPTIONS.기타
])

export const ALL_SUBJECTS = Array.from(allSubjectsSet) as readonly string[]

// ========================================
// 자료 유형 관련 상수
// ========================================

// 자료 유형 선택 옵션
export const MATERIAL_TYPE_OPTIONS = [
  '독서 교육',
  '진로 교육',
  '안전 교육',
  '놀이 교육',
  '환경 교육',
  '영재 교육',
  '인성 교육',
  'SW/AI 교육',
  '학급 경영',
  '학급 환경',
  '교무',
  '연구',
  '생활',
  '안전',
  '인성',
  '과학',
  '체육',
  '정보',
  '문화·예술',
  '늘봄',
  '방과후·돌봄',
  '기타'
] as const

export type MaterialTypeOption = (typeof MATERIAL_TYPE_OPTIONS)[number]

// ========================================
// 가격 관련 상수
// ========================================

// 가격 유형
export const PRICE_TYPES = {
  FREE: 'free',
  PAID: 'paid'
} as const

export type PriceType = (typeof PRICE_TYPES)[keyof typeof PRICE_TYPES]

// ========================================
// 검색 필터 옵션 (통합)
// ========================================

export const SEARCH_FILTER_OPTIONS = {
  grade: GRADE_OPTIONS,
  subject: ALL_SUBJECTS,
  resourceType: MATERIAL_TYPE_OPTIONS,
  fileExtension: ['한글', 'MS 오피스', 'PDF', '이미지', '음원', '프레젠테이션'],
  price: Object.values(PRICE_ITEMS)
} as const

export type SearchFilterOptionKey = keyof typeof SEARCH_FILTER_OPTIONS

export type SearchFilterOptions =
  (typeof SEARCH_FILTER_OPTIONS)[SearchFilterOptionKey][number]
