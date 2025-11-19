/**
 * 은행 코드 및 정보 상수
 */

export interface BankInfo {
  code: string
  name: string
}

/**
 * 은행 목록 (코드값 포함)
 */
export const BANKS: BankInfo[] = [
  { code: '004', name: '국민은행' },
  { code: '088', name: '신한은행' },
  { code: '020', name: '우리은행' },
  { code: '081', name: '하나은행' },
  { code: '011', name: '농협은행' },
  { code: '003', name: '기업은행' },
  { code: '023', name: 'SC제일은행' },
  { code: '032', name: '부산은행' },
  { code: '031', name: '대구은행' },
  { code: '034', name: '광주은행' },
  { code: '037', name: '전북은행' },
  { code: '039', name: '경남은행' },
  { code: '035', name: '제주은행' },
  { code: '002', name: '산업은행' },
  { code: '007', name: '수협은행' },
  { code: '027', name: '씨티은행' },
  { code: '090', name: '카카오뱅크' },
  { code: '089', name: '케이뱅크' },
  { code: '092', name: '토스뱅크' }
] as const

/**
 * 은행 코드로 은행명 찾기
 */
export const getBankNameByCode = (code: string): string | undefined => {
  return BANKS.find((bank) => bank.code === code)?.name
}

/**
 * 은행명으로 은행 코드 찾기
 */
export const getBankCodeByName = (name: string): string | undefined => {
  return BANKS.find((bank) => bank.name === name)?.code
}

/**
 * 은행명 목록만 추출
 */
export const BANK_NAMES = BANKS.map((bank) => bank.name)
