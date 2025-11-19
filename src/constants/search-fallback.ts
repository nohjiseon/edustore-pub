import defaultCardImage from '@/assets/images/contents/card_example.png'

export const FALLBACK_VALUES = {
  CARD_IMAGE: defaultCardImage,
  RATING: 5.0,
  PRICE: 0,
  GRADE: '학년',
  SUBJECT: '교과목',
  FORMAT: '형태',
  TYPE: '유형',
  AUTHOR_NAME: '강사'
} as const

export type FallbackValuesType = typeof FALLBACK_VALUES
