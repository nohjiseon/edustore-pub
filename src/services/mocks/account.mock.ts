/**
 * 계좌 서비스 더미 데이터
 */

import { delay } from './api.mock'

import type {
  BankAccountListResponse,
  AddBankAccountResponse,
  UpdatePrimaryAccountResponse,
  DeleteBankAccountResponse,
  BankAccount
} from '@/services/account.service'

/**
 * 계좌 목록 조회 더미 응답
 */
export async function mockGetBankAccounts(params?: {
  page?: number
  size?: number
}): Promise<{
  data: {
    list: BankAccount[]
    total: number
    page: number
    size: number
  }
  status: number
  code: number
  message: string
}> {
  await delay(200)

  const page = params?.page || 1
  const size = params?.size || 10

  const mockAccounts: BankAccount[] = [
    {
      bankAccountNo: 1,
      bankCode: '004',
      bankName: 'KB국민은행',
      accountNumber: '123-456-789012',
      accountHolderName: '홍길동',
      isPrimary: true
    },
    {
      bankAccountNo: 2,
      bankCode: '088',
      bankName: '신한은행',
      accountNumber: '110-123-456789',
      accountHolderName: '홍길동',
      isPrimary: false
    },
    {
      bankAccountNo: 3,
      bankCode: '020',
      bankName: '우리은행',
      accountNumber: '1002-123-456789',
      accountHolderName: '홍길동',
      isPrimary: false
    }
  ]

  // 페이지네이션
  const start = (page - 1) * size
  const end = start + size
  const paginatedAccounts = mockAccounts.slice(start, end)

  return {
    data: {
      list: paginatedAccounts,
      total: mockAccounts.length,
      page,
      size
    },
    status: 200,
    code: 200,
    message: '성공'
  }
}

/**
 * 계좌 추가 더미 응답
 */
export async function mockAddBankAccount(): Promise<AddBankAccountResponse> {
  await delay(300)
  return {
    data: { bankAccountNo: Date.now() },
    status: 200,
    code: 200,
    message: '계좌가 추가되었습니다.'
  }
}

/**
 * 계좌 대표계좌 설정 변경 더미 응답
 */
export async function mockUpdateBankAccountPrimary(): Promise<UpdatePrimaryAccountResponse> {
  await delay(200)
  return {
    data: {},
    status: 200,
    code: 200,
    message: '대표계좌가 변경되었습니다.'
  }
}

/**
 * 계좌 삭제 더미 응답
 */
export async function mockDeleteBankAccounts(): Promise<DeleteBankAccountResponse> {
  await delay(200)
  return {
    data: {},
    status: 200,
    code: 200,
    message: '계좌가 삭제되었습니다.'
  }
}
