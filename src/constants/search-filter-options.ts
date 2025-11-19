/**
 * 가격 필터 데이터
 * 01: 무료, 02: 1,000원 이하, 03: 1,000~10,000원, 04: 10,001원~
 */
export const PRICE_ITEMS = {
  '01': '무료',
  '02': '1,000원 이하',
  '03': '1,000~10,000원',
  '04': '10,000원 이상'
} as const

export const SEARCH_FILTER_OPTIONS = {
  grade: [
    '학년 전체',
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
    '성인교육'
  ],
  subject: [
    '교과 전체',
    '신체운동·건강',
    '의사소통',
    '사회관계',
    '예술경험',
    '자연탐구',
    '국어',
    '도덕',
    '사회',
    '수학',
    '과학',
    '실과',
    '음악',
    '미술',
    '체육',
    '영어',
    '고3',
    '통합(바/슬/즐)',
    '창의적 체험활동',
    '학교자율시간',
    '교과통합',
    '기술·가정',
    '정보',
    '선택',
    '예술',
    '제2외국어',
    '한문',
    '교양',
    '전문교과'
  ],
  resourceType: [
    '유형 전체',
    '활동지',
    '평가자료',
    '유인물',
    '수업계획',
    '교육과정 재구성',
    '상담',
    '놀이',
    '업무',
    '단원계획',
    '프레젠테이션',
    '수업도구',
    '음악',
    '프로젝트',
    '서식/양식',
    '환경',
    '기타'
  ],
  fileExtension: [
    '확장자 전체',
    'MS 오피스',
    'PDF',
    '이미지',
    '음원',
    '프레젠테이션'
  ],
  price: ['가격 전체', ...Object.values(PRICE_ITEMS)],
  inquiryPeriod: ['기간 전체']
} as const

export type SearchFilterOptionKey = keyof typeof SEARCH_FILTER_OPTIONS

export type SearchFilterOptions =
  (typeof SEARCH_FILTER_OPTIONS)[SearchFilterOptionKey][number]
