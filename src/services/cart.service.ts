import api, { TokenStorage } from '@/lib/api'
import type {
  AddCartRequest,
  AddCartResponse,
  GetCartItemsResponse,
  RemoveCartRequest,
  RemoveCartResponse
} from '~/types/cart'

/**
 * 장바구니 서비스
 */
export const cartService = {
  /**
   * 장바구니에 상품 추가
   * @param data 장바구니 추가 요청 데이터
   * @returns 장바구니 추가 응답
   */
  addToCart: async (data: AddCartRequest): Promise<AddCartResponse> => {
    // 토큰 확인
    const token = TokenStorage.getAccessToken()
    // Bearer Token 헤더 명시적으로 설정
    const bearerToken = `Bearer ${token}`

    // 헤더에 Bearer Token과 Content-Type 명시적으로 추가
    // 참고: api.ts의 인터셉터에서도 자동으로 Authorization 헤더를 추가하지만,
    // 명시적으로 설정하여 확실하게 전송되도록 함
    const response = await api.post<AddCartResponse>(
      '/cart/v1/add',
      {
        memNo: data.memNo,
        productNo: data.productNo
      },
      {
        headers: {
          Authorization: bearerToken
        }
      }
    )

    return response.data
  },

  /**
   * 장바구니 목록 조회
   * @param memNo 회원 번호
   * @returns 장바구니 목록 응답
   */
  getCartItems: async (memNo: number): Promise<GetCartItemsResponse> => {
    const response = await api.get<GetCartItemsResponse>('/cart/v1/items', {
      params: {
        memNo
      }
    })
    return response.data
  },

  /**
   * 장바구니에서 상품 제거
   * @param cartNo 장바구니 번호 (단일 또는 쉼표로 구분된 여러 번호, 예: "1" 또는 "1,2,3")
   * @returns 장바구니 삭제 응답
   */
  removeCartItem: async (
    cartNo: number | string
  ): Promise<RemoveCartResponse> => {
    const response = await api.delete<RemoveCartResponse>('/cart/v1/remove', {
      params: {
        cartNo
      }
    })
    return response.data
  }
}
