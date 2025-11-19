/**
 * 상품(Product) API 서비스
 * 백엔드 /product/v1 엔드포인트와 통신하는 함수들을 정의합니다.
 */

import api from '@/lib/api'
import type {
  ProductData,
  ProductResponse,
  ProductDetailData,
  ProductDetailResponse,
  ProductCreateRequest,
  ProductCreateResponse
} from '@/types/product'

/**
 * 상품 서비스 객체
 */
export const productService = {
  /**
   * 상품 상세 조회 (GET /product/v1/{productNo})
   *
   * @param productNo - 상품 번호
   * @returns 상품 상세 정보 (ProductDetailResponse)
   * @throws 네트워크 오류나 API 오류 발생 시 에러
   *
   * @example
   * ```typescript
   * const product = await productService.getInfo(123)
   * console.log(product.data.productNm) // 상품명
   * ```
   */
  getBasic: async (productNo: number): Promise<ProductResponse> => {
    try {
      const response = await api.get<ProductResponse>(
        `/product/v1/${productNo}`
      )
      return response.data
    } catch (error) {
      console.error('상품 상세 조회 실패:', error)
      throw error
    }
  },
  /**
   * 상품 데이터만 반환 (data 필드만 추출)
   *
   * @param productNo - 상품 번호
   * @returns 상품 데이터 (ProductData)
   *
   * @example
   * ```typescript
   * const product = await productService.getInfoData(123)
   * console.log(product.productNm) // 상품명
   * ```
   */
  getBasicData: async (productNo: number): Promise<ProductData> => {
    const response = await productService.getBasic(productNo)
    return response.data
  },

  /**
   * 상품 상세 정보 조회 (GET /product/v1/detail/{productNo})
   *
   * @param productNo - 상품 번호
   * @returns 상품 상세 정보 (ProductDetailResponse)
   * @throws 네트워크 오류나 API 오류 발생 시 에러
   *
   * @example
   * ```typescript
   * const product = await productService.getDetail(123)
   * console.log(product.data.productNm) // 상품명
   * ```
   */
  getDetail: async (productNo: number): Promise<ProductDetailResponse> => {
    try {
      const response = await api.get<ProductDetailResponse>(
        `/product/v1/detail/${productNo}`
      )
      return response.data
    } catch (error) {
      console.error('상품 상세 정보 조회 실패:', error)
      throw error
    }
  },
  /**
   * 상품 상세 데이터만 반환 (data 필드만 추출)
   *
   * @param productNo - 상품 번호
   * @returns 상품 상세 데이터 (ProductDetailData)
   *
   * @example
   * ```typescript
   * const productDetail = await productService.getDetailData(123)
   * console.log(productDetail.product.productNm) // 상품명
   * console.log(productDetail.categories) // 카테고리 목록
   * console.log(productDetail.thumbnails) // 썸네일 목록
   * ```
   */
  getDetailData: async (productNo: number): Promise<ProductDetailData> => {
    const response = await productService.getDetail(productNo)
    return response.data
  },

  /**
   * 상품 생성 (POST /product/v1/create)
   *
   * @param request - 상품 생성 요청 데이터
   * @returns 생성된 상품 번호 (ProductCreateResponse)
   * @throws 네트워크 오류나 API 오류 발생 시 에러
   *
   * @example
   * ```typescript
   * const response = await productService.create({
   *   command: {
   *     productNm: '초등 3학년 국어 자료',
   *     description: '한줄 설명',
   *     detailDescription: '상세 설명',
   *     priceType: '01',
   *     price: 0,
   *     theme: '국어',
   *     productStatus: '03',
   *     hashtags: '국어,3학년',
   *     gradeSubjects: 'E01,S01',
   *     categories: 'C01',
   *     forms: 'F01'
   *   },
   *   mainThumbnail: 'thumbnail.jpg',
   *   otherThumbnailFiles: [],
   *   attachmentFiles: ['file1.pdf', 'file2.pdf']
   * })
   * console.log(response.data) // 생성된 상품 번호
   * ```
   */
  create: async (
    request: ProductCreateRequest
  ): Promise<ProductCreateResponse> => {
    try {
      const response = await api.post<ProductCreateResponse>(
        '/product/v1/create',
        request
      )
      return response.data
    } catch (error) {
      console.error('상품 생성 실패:', error)
      throw error
    }
  }
}

export default productService
