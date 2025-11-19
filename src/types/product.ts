/**
 * 상품(Product) 관련 타입 정의
 * swagger.json의 ProductView 스키마 기반
 */

/**
 * 상품 기본 정보
 */
export interface ProductData {
  /** 상품 번호 */
  productNo: number
  /** 판매자 회원 번호 */
  memNo: number
  /** 상품명 */
  productNm: string
  /** 간단 설명 */
  description: string
  /** 상세 설명 */
  detailDescription: string
  /** 가격 유형 */
  priceType: string
  /** 가격 */
  price: number
  /** 테마 */
  theme: string
  /** 상품 상태 */
  productStatus: string
  /** 조회수 */
  viewCount: number
  /** 생성일시 */
  createDt: string
  /** 수정일시 */
  updateDt: string
  /** 리뷰 수 */
  reviewCount: number
  /** 평균 평점 */
  reviewAvgRating: number
}

/**
 * 상품 기본 조회 API 응답 (ResponseV1ProductView)
 */
export interface ProductResponse {
  /** 상품 데이터 */
  data: ProductData
  /** HTTP 상태 코드 */
  status: number
  /** 응답 코드 */
  code: number
  /** 응답 메시지 */
  message: string
}

/**
 * 카테고리 정보
 */
export interface CategoryInfo {
  /** 카테고리 코드 */
  categoryCode: string
  /** 카테고리 명 */
  categoryNm: string
}

/**
 * 양식 정보
 */
export interface FormInfo {
  /** 양식 코드 */
  formCode: string
  /** 양식 명 */
  formNm: string
}

/**
 * 학년-과목 정보
 */
export interface GradeSubjectInfo {
  /** 학년 코드 */
  gradeCode: string
  /** 학년 명 */
  gradeNm: string
  /** 과목 코드 */
  subjectCode: string
  /** 과목 명 */
  subjectNm: string
}

/**
 * 해시태그 정보
 */
export interface HashtagInfo {
  /** 해시태그 번호 */
  hashtagNo: number
  /** 해시태그 명 */
  hashtagNm: string
}

/**
 * 썸네일 정보
 */
export interface ThumbnailInfo {
  /** 썸네일 번호 */
  thumbnailNo: number
  /** 썸네일 순서 */
  thumbnailOrder: number
  /** 썸네일 URL */
  thumbnailUrl: string
  /** 썸네일 파일명 */
  thumbnailNm: string
  /** 썸네일 확장자 */
  thumnailExtension: string
  /** 썸네일 파일 크기 */
  thumbnailSize: number
  /** MIME 타입 */
  mimeType: string
  /** 메인 썸네일 여부 */
  mainThumbnailYn: 'Y' | 'N'
  /** 생성일시 */
  createDt: string
}

/**
 * 회원 정보
 */
export interface MemberView {
  /** 회원 번호 */
  memNo: number | null
  /** 이름 */
  name: string | null
  /** 이메일 */
  email: string | null
  /** 닉네임 */
  nickname: string | null
  /** 휴대폰 번호 */
  mobileNumber: string | null
  /** 생일 */
  birthday: string | null
  /** 학년-과목 리스트 */
  gradeSubjectList: GradeSubjectInfo[] | null
  /** 카테고리 리스트 */
  categoryList: CategoryInfo[] | null
  /** 상태 */
  status: string | null
  /** 생성일시 */
  createDt: string | null
  /** 프로필 이미지 URL */
  profileImgUrl: string | null
  /** 프로필 소개 */
  profileIntro: string | null
  /** 기관 포인트 */
  organPoint: number | null
  /** 사업자 번호 */
  businessNo: string | null
  /** 기관명 */
  organName: string | null
}

/**
 * 상품 상세 정보 데이터
 */
export interface ProductDetailData {
  /** 상품 기본 정보 */
  product: ProductData
  /** 카테고리 목록 */
  categories: CategoryInfo[]
  /** 양식 목록 */
  forms: FormInfo[]
  /** 학년-과목 목록 */
  gradeSubjects: GradeSubjectInfo[]
  /** 해시태그 목록 */
  hashtags: HashtagInfo[]
  /** 썸네일 목록 */
  thumbnails: ThumbnailInfo[]
  /** 회원 정보 */
  memberView: MemberView
  /** 결제 완료 여부 */
  isPaymentCompleted: boolean
}

/**
 * 상품 상세 정보 조회 API 응답 (GET /product/v1/detail/{productNo})
 */
export interface ProductDetailResponse {
  /** 상품 상세 데이터 */
  data: ProductDetailData
  /** HTTP 상태 코드 */
  status: number
  /** 응답 코드 */
  code: number
  /** 응답 메시지 */
  message: string
}

/**
 * 상품 가격 유형 코드
 */
export type PriceTypeCode = '01' | '02' | '03' | '04'

/**
 * 상품 상태 코드
 */
export type ProductStatusCode = '01' | '02' | '03' | '04'

/**
 * 상품 가격 유형
 */
export type PriceType = 'FREE' | 'PAID'

/**
 * 상품 상태
 */
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'

/**
 * 상품 생성 커맨드
 */
export interface ProductCreateCommand {
  /** 상품명 */
  productNm: string
  /** 한줄 설명 */
  description: string
  /** 상세 설명 */
  detailDescription: string
  /** 가격 유형 (01: 무료, 02: 1000원이하, 03: 1000~10000, 04: 10001~) */
  priceType: PriceTypeCode
  /** 가격 */
  price: number
  /** 주제 */
  theme: string
  /** 상품 상태 (01: 임시저장, 02: 파일업로드중, 03: 판매중, 04: 판매중지) */
  productStatus: ProductStatusCode
  /** 해시태그명 */
  hashtags: string
  /** 학년-과목 코드 (예: E01,S01) */
  gradeSubjects: string
  /** 자료 유형 코드 */
  categories: string
  /** 형태 */
  forms: string
}

/**
 * 상품 생성 요청
 */
export interface ProductCreateRequest {
  /** 상품 생성 커맨드 */
  command: ProductCreateCommand
  /** 메인 썸네일 파일 */
  mainThumbnail: string
  /** 기타 썸네일 파일들 */
  otherThumbnailFiles: string[]
  /** 첨부 파일들 */
  attachmentFiles: string[]
}

/**
 * 상품 생성 API 응답 (POST /product/v1/create)
 */
export interface ProductCreateResponse {
  /** 생성된 상품 번호 */
  data: number
  /** HTTP 상태 코드 */
  status: number
  /** 응답 코드 */
  code: number
  /** 응답 메시지 */
  message: string
}
