import api from '@/lib/api'

/**
 * 계좌 정보 타입 (API 응답 구조)
 */
export interface BankAccountResponse {
  bankAccountNo: number
  bankCode: string
  bankName: string
  accountNumber: string
  accountHolderName: string
  primaryYn: 'Y' | 'N'
}

/**
 * 계좌 정보 타입 (컴포넌트에서 사용)
 */
export interface BankAccount {
  bankAccountNo: number
  bankCode: string
  bankName: string
  accountNumber: string
  accountHolderName: string
  isPrimary: boolean // primaryYn을 boolean으로 변환
}

/**
 * 계좌 목록 조회 응답 타입
 */
export interface BankAccountListResponse {
  data: {
    list: BankAccountResponse[]
    total: number
    page: number
    size: number
  }
  status: number
  code: number
  message: string
}

/**
 * 계좌 조회 요청 파라미터
 */
export interface GetBankAccountsParams {
  page?: number
  size?: number
}

/**
 * 계좌 추가 요청 타입
 */
export interface AddBankAccountRequest {
  bankCode: string
  accountNumber: string
  accountHolderName: string
  primaryYn: 'Y' | 'N'
}

/**
 * 계좌 추가 응답 타입
 */
export interface AddBankAccountResponse {
  data?: any
  status: number
  code: number
  message: string
}

/**
 * 계좌 대표계좌 설정 요청 타입
 */
export interface UpdatePrimaryAccountRequest {
  primaryYn: 'Y' | 'N'
}

/**
 * 계좌 대표계좌 설정 응답 타입
 */
export interface UpdatePrimaryAccountResponse {
  data?: any
  status: number
  code: number
  message: string
}

/**
 * 계좌 삭제 응답 타입
 */
export interface DeleteBankAccountResponse {
  data?: any
  status: number
  code: number
  message: string
}

/**
 * 계좌 서비스
 */
export const accountService = {
  /**
   * 계좌 목록 조회
   * @param params 페이지네이션 파라미터
   * @returns 계좌 목록 응답
   */
  getBankAccounts: async (
    params?: GetBankAccountsParams
  ): Promise<{
    data: {
      list: BankAccount[]
      total: number
      page: number
      size: number
    }
    status: number
    code: number
    message: string
  }> => {
    const queryParams = new URLSearchParams()
    if (params?.page) {
      queryParams.append('page', params.page.toString())
    }
    if (params?.size) {
      queryParams.append('size', params.size.toString())
    }

    const queryString = queryParams.toString()
    const endpoint = `/bank-account/v1${queryString ? `?${queryString}` : ''}`

    const response = await api.get<BankAccountListResponse>(endpoint)

    // API 응답을 컴포넌트에서 사용할 형태로 변환
    const transformedList: BankAccount[] = (response.data.data.list || []).map(
      (item) => ({
        bankAccountNo: item.bankAccountNo,
        bankCode: item.bankCode,
        bankName: item.bankName,
        accountNumber: item.accountNumber,
        accountHolderName: item.accountHolderName,
        isPrimary: item.primaryYn === 'Y'
      })
    )

    return {
      ...response.data,
      data: {
        ...response.data.data,
        list: transformedList
      }
    }
  },

  /**
   * 계좌 추가
   * @param data 계좌 정보
   * @returns 계좌 추가 응답
   */
  addBankAccount: async (
    data: AddBankAccountRequest
  ): Promise<AddBankAccountResponse> => {
    const response = await api.post<AddBankAccountResponse>(
      '/bank-account/v1',
      data
    )
    return response.data
  },

  /**
   * 계좌 대표계좌 설정 변경
   * @param bankAccountNo 계좌 번호
   * @param data 대표계좌 설정 정보
   * @returns 계좌 업데이트 응답
   */
  updateBankAccountPrimary: async (
    bankAccountNo: number,
    data: UpdatePrimaryAccountRequest
  ): Promise<UpdatePrimaryAccountResponse> => {
    const response = await api.put<UpdatePrimaryAccountResponse>(
      `/bank-account/v1/${bankAccountNo}`,
      data
    )
    return response.data
  },

  /**
   * 계좌 삭제 (개별 또는 다중)
   * @param bankAccountNos 삭제할 계좌 번호 배열 (다중 삭제 시 콤마로 구분된 문자열로 전달)
   * @returns 계좌 삭제 응답
   */
  deleteBankAccounts: async (
    bankAccountNos: number[]
  ): Promise<DeleteBankAccountResponse> => {
    // 다중 삭제 시 콤마와 공백으로 구분된 문자열로 변환 (예: "321, 321")
    const bankAccountNosString = bankAccountNos.join(', ')
    const response = await api.delete<DeleteBankAccountResponse>(
      `/bank-account/v1?bankAccountNos=${encodeURIComponent(
        bankAccountNosString
      )}`
    )
    return response.data
  }
}
