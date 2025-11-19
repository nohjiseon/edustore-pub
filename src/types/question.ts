/**
 * 문의(Question) 관련 타입 정의
 */

/**
 * 문의 답변 정보
 */
export interface QuestionAnswer {
  /** 문의 번호 */
  questionNo: number
  /** 답변 번호 */
  answerNo: number
  /** 답변 내용 */
  content: string
  /** 생성일시 */
  createDt: string
}

/**
 * 문의 정보
 */
export interface QuestionInfo {
  /** 문의 번호 */
  questionNo: number
  /** 상품 번호 */
  productNo: number
  /** 닉네임 */
  nickname: string
  /** 회원명 (마스킹) */
  memberName: string
  /** 제목 */
  title: string
  /** 내용 */
  content: string
  /** 생성일시 */
  createDt: string
  /** 답변 정보 */
  answer?: QuestionAnswer | null
}

/**
 * 문의 목록 데이터
 */
export interface QuestionListData {
  /** 문의 목록 */
  list: QuestionInfo[]
  /** 전체 개수 */
  total: number
  /** 페이지 번호 */
  page: number
  /** 페이지 크기 */
  size: number
}

/**
 * 문의 목록 조회 API 응답 (GET /question/v1)
 */
export interface QuestionListResponse {
  /** 문의 목록 데이터 */
  data: QuestionListData
  /** HTTP 상태 코드 */
  status: number
  /** 응답 코드 */
  code: number
  /** 응답 메시지 */
  message: string
}

/**
 * 문의 목록 조회 파라미터
 */
export interface QuestionQueryParams {
  /** 페이지 번호 (1부터 시작) */
  page?: number
  /** 페이지 크기 */
  size?: number
  /** 상품 번호 */
  productNo?: number
  /** 검색 키워드 (이름, 제목, 내용) */
  keyword?: string
}
