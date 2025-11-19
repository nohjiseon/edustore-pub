/**
 * 일반회원 장바구니 관련 타입 정의
 */

import type { ProductDetailData } from './product'

/**
 * 장바구니 추가 요청 타입
 */
export interface AddCartRequest {
  /**
   * 회원 번호 (memNo)
   * @minimum 1
   */
  memNo: number

  /**
   * 상품 번호 (productNo)
   * @minimum 1
   */
  productNo: number
}

/**
 * 장바구니 응답 타입
 */
export interface CartView {
  /**
   * 장바구니 번호
   */
  cartNo: number

  /**
   * 회원 번호
   */
  memNo: number

  /**
   * 상품 번호
   */
  productNo: number

  /**
   * 생성 일시
   */
  createDt: string

  /**
   * 상품 상세 정보
   */
  product: ProductDetailData
}

/**
 * 장바구니 추가 응답 타입
 */
export interface AddCartResponse {
  data: CartView
  status: number
  code: number
  message: string
}

/**
 * 장바구니 목록 조회 응답 타입
 */
export interface GetCartItemsResponse {
  data: CartView[]
  status: number
  code: number
  message: string
}

/**
 * 장바구니 삭제 요청 타입
 */
export interface RemoveCartRequest {
  /**
   * 장바구니 번호 (cartNo)
   * @minimum 1
   */
  cartNo: number
}

/**
 * 장바구니 삭제 응답 타입
 */
export interface RemoveCartResponse {
  data?: any
  status: number
  code: number
  message: string
}
