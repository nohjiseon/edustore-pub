export const GRADE_ITEMS = {
  // 유아
  K_ALL: '유아 전체',
  K01: '만 3세 이하',
  K02: '만 4세',
  K03: '만 5세',
  K04: '만 6세',

  // 초등
  E_ALL: '초등 전체',
  E01: '초등 1학년',
  E02: '초등 2학년',
  E03: '초등 3학년',
  E04: '초등 4학년',
  E05: '초등 5학년',
  E06: '초등 6학년',

  // 중등
  M_ALL: '중등 전체',
  M01: '중등 1학년',
  M02: '중등 2학년',
  M03: '중등 3학년',

  // 고등
  H_ALL: '고등 전체',
  H01: '고등 1학년',
  H02: '고등 2학년',
  H03: '고등 3학년',

  // 성인
  AD01: '성인',

  // 학년무관
  ALL: '학년무관'
} as const

export const SUBJECT_ITEMS = {
  // 유아 누리과정 영역
  KS01: '신체운동·건강',
  KS02: '의사소통',
  KS03: '사회관계',
  KS04: '예술경험',
  KS05: '자연탐구',

  // 초등 교과
  S01: '국어',
  S02: '도덕',
  S03: '사회',
  S04: '수학',
  S05: '과학',
  S06: '실과',
  S07: '음악',
  S08: '미술',
  S09: '체육',
  S10: '영어',
  S11: '통합교과(바/슬/즐)',
  S12: '창의적 체험활동',
  S13: '학교자율시간',
  S14: '교과통합',

  // 중등 추가 교과
  S15: '사회(역사)',
  S16: '기술·가정',
  S17: '정보',
  S18: '선택',

  // 고등 추가 교과
  S19: '사회(역사/도덕)',
  S20: '예술',
  S21: '제2외국어',
  S22: '한문',
  S23: '교양',
  S24: '전문교과'
} as const

export const OTHER_ITEMS = {
  OT01: '독서 교육',
  OT02: '진로 교육',
  OT03: '안전 교육',
  OT04: '놀이 교육',
  OT05: '환경 교육',
  OT06: '영재 교육',
  OT07: '인성 교육',
  OT08: 'SW/AI 교육',
  OT09: '학급 경영',
  OT10: '학급 환경',
  OT99: '기타'
} as const

export const ADMIN_ITEMS = {
  AD01: '교무',
  AD02: '연구',
  AD03: '생활',
  AD04: '안전',
  AD05: '인성',
  AD06: '과학',
  AD07: '체육',
  AD08: '정보',
  AD09: '문화·예술',
  AD10: '놀이',
  AD11: '방과후·돌봄',
  AD99: '기타'
} as const

export const FORM_ITEMS = {
  F01: 'PPT/한쇼/구글프레젠테이션',
  F02: 'Word/한글/구글문서',
  F03: '사진/클립아트',
  F04: 'PDF',
  // F05: '영상',
  F06: '프로그램/앱/웹페이지',
  F07: '음원',
  F08: '기타'
} as const

export const ALL_FILTER_ITEMS = {
  ...GRADE_ITEMS,
  ...SUBJECT_ITEMS,
  ...OTHER_ITEMS,
  ...ADMIN_ITEMS,
  ...FORM_ITEMS
} as const

/**
 * 필터 확장 규칙
 * "전체" searchParam은 URL에는 존재하지만, 실제 필터에는 없음
 * 필터 적용 시 해당 범위의 개별 항목들로 확장됨
 *
 * @see {@link @/utils/education-mapping} expandFilterParam, expandFilterParams 함수
 */
export const FILTER_EXPANSIONS = {
  K_ALL: ['K_ALL', 'K01', 'K02', 'K03', 'K04'],
  E_ALL: ['E_ALL', 'E01', 'E02', 'E03', 'E04', 'E05', 'E06'],
  M_ALL: ['M_ALL', 'M01', 'M02', 'M03'],
  H_ALL: ['H_ALL', 'H01', 'H02', 'H03']
} as const

/**
 * 교과별 학년 제약 조건
 * 정의되지 않은 교과는 해당 학교급의 모든 학년에서 허용됨
 *
 * @example
 * '통합교과(바/슬/즐)'은 초등 1-2학년만 가능
 * '실과'는 초등 5-6학년만 가능
 */
export const SUBJECT_GRADE_RESTRICTIONS: Record<string, string[]> = {
  '통합교과(바/슬/즐)': ['초등 1학년', '초등 2학년'],
  실과: ['초등 5학년', '초등 6학년']
} as const
