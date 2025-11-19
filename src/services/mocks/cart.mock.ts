/**
 * 장바구니 서비스 더미 데이터
 */

import { delay } from './api.mock'
import type {
  AddCartResponse,
  GetCartItemsResponse,
  RemoveCartResponse
} from '@/types/cart'
import { mockGetProductDetail } from './product.mock'

/**
 * 장바구니에 상품 추가 더미 응답
 */
export async function mockAddToCart(data: {
  memNo: number
  productNo: number
}): Promise<AddCartResponse> {
  await delay(300)

  const productDetail = await mockGetProductDetail(data.productNo)

  return {
    data: {
      cartNo: Date.now(), // 임시 장바구니 번호
      memNo: data.memNo,
      productNo: data.productNo,
      createDt: new Date().toISOString(),
      product: productDetail.data
    },
    status: 200,
    code: 200,
    message: '장바구니에 추가되었습니다.'
  }
}

/**
 * 장바구니 목록 조회 더미 응답
 */
export async function mockGetCartItems(
  memNo: number
): Promise<GetCartItemsResponse> {
  await delay(200)

  const productDetail1 = await mockGetProductDetail(1)
  const productDetail2 = await mockGetProductDetail(2)

  return {
    data: [
      {
        cartNo: 1,
        memNo,
        productNo: 1,
        createDt: '2024-01-15T10:00:00',
        product: productDetail1.data
      },
      {
        cartNo: 2,
        memNo,
        productNo: 2,
        createDt: '2024-01-16T11:00:00',
        product: productDetail2.data
      }
    ],
    status: 200,
    code: 200,
    message: '성공'
  }
}

/**
 * 장바구니에서 상품 제거 더미 응답
 */
export async function mockRemoveCartItem(
  cartNo: number | string
): Promise<RemoveCartResponse> {
  await delay(200)

  return {
    data: {},
    status: 200,
    code: 200,
    message: '장바구니에서 삭제되었습니다.'
  }
}
