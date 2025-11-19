// 정산 대시보드 데이터 타입
export interface SettlementDashboard {
  expectedAmount: number // 정산 예정 금액
  totalAmount: number // 지금까지 받은 정산 금액
}

// 정산 목록 항목 타입
export interface SettlementItem {
  id: number
  status: 'completed' | 'pending' // 정산완료 | 정산대기
  completedDate: string // 정산 완료일 (YYYY.MM.DD 형식)
  contentTitle: string // 자료 정보 (자료명)
  price: number // 금액
  salesCount: number // 판매수
  totalSales: number // 총 매출액
  pgFee: number // PG 수수료
  serviceFee: number // 서비스 수수료
  settlementAmount: number // 정산 금액
}

// 정산 목록 응답 타입 (API 연동 시 사용)
export interface SettlementListResponse {
  dashboard: SettlementDashboard
  items: SettlementItem[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}

// 더미 대시보드 데이터
export const mockSettlementDashboard: SettlementDashboard = {
  expectedAmount: 100000,
  totalAmount: 100000
}

// 더미 정산 목록 데이터
export const mockSettlementItems: SettlementItem[] = [
  {
    id: 1,
    status: 'completed',
    completedDate: '2024.01.15',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 15000,
    salesCount: 10,
    totalSales: 150000,
    pgFee: 3000,
    serviceFee: 4500,
    settlementAmount: 142500
  },
  {
    id: 2,
    status: 'pending',
    completedDate: '2024.01.20',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 12000,
    salesCount: 8,
    totalSales: 96000,
    pgFee: 1920,
    serviceFee: 2880,
    settlementAmount: 91200
  },
  {
    id: 3,
    status: 'completed',
    completedDate: '2024.01.15',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 15000,
    salesCount: 10,
    totalSales: 150000,
    pgFee: 3000,
    serviceFee: 4500,
    settlementAmount: 142500
  },
  {
    id: 4,
    status: 'pending',
    completedDate: '2024.01.20',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 12000,
    salesCount: 8,
    totalSales: 96000,
    pgFee: 1920,
    serviceFee: 2880,
    settlementAmount: 91200
  },
  {
    id: 5,
    status: 'completed',
    completedDate: '2024.01.15',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 15000,
    salesCount: 10,
    totalSales: 150000,
    pgFee: 3000,
    serviceFee: 4500,
    settlementAmount: 142500
  },
  {
    id: 6,
    status: 'pending',
    completedDate: '2024.01.20',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 12000,
    salesCount: 8,
    totalSales: 96000,
    pgFee: 1920,
    serviceFee: 2880,
    settlementAmount: 91200
  },
  {
    id: 7,
    status: 'completed',
    completedDate: '2024.01.15',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 15000,
    salesCount: 10,
    totalSales: 150000,
    pgFee: 3000,
    serviceFee: 4500,
    settlementAmount: 142500
  },
  {
    id: 8,
    status: 'pending',
    completedDate: '2024.01.20',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 12000,
    salesCount: 8,
    totalSales: 96000,
    pgFee: 1920,
    serviceFee: 2880,
    settlementAmount: 91200
  },
  {
    id: 9,
    status: 'completed',
    completedDate: '2024.01.15',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 15000,
    salesCount: 10,
    totalSales: 150000,
    pgFee: 3000,
    serviceFee: 4500,
    settlementAmount: 142500
  },
  {
    id: 10,
    status: 'pending',
    completedDate: '2024.01.20',
    contentTitle: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 12000,
    salesCount: 8,
    totalSales: 96000,
    pgFee: 1920,
    serviceFee: 2880,
    settlementAmount: 91200
  }
]

// 더미 정산 목록 응답 (API 연동 시 이 구조를 참고)
export const mockSettlementListResponse: SettlementListResponse = {
  dashboard: mockSettlementDashboard,
  items: mockSettlementItems,
  pagination: {
    currentPage: 1,
    totalPages: 5,
    totalItems: 50
  }
}

// 페이지네이션 더미데이터 (별도 사용 시)
export const mockPagination = {
  currentPage: 1,
  totalPages: 5,
  totalItems: 50
}

// 출금 내역 항목 타입
export interface WithdrawalItem {
  id: number
  status: '출금신청' | '출금완료' | '출금반려' // 출금 상태
  requestDate: string // 출금 신청일 (YYYY.MM.DD 형식)
  amount: number // 출금 금액
  account: string // 출금 계좌
  accountHolder: string // 예금주
  completedDate: string | null // 출금 완료일 (YYYY.MM.DD 형식, null이면 미완료)
}

// 출금 가능 금액 더미 데이터
export const mockWithdrawableAmount = 2500000 // 출금 가능 금액

// 더미 출금 내역 데이터
export const mockWithdrawalItems: WithdrawalItem[] = [
  {
    id: 1,
    status: '출금신청',
    requestDate: '2024.01.28',
    amount: 500000,
    account: '기업은행 111-111-111111',
    accountHolder: '홍길동',
    completedDate: null
  },
  {
    id: 2,
    status: '출금완료',
    requestDate: '2024.01.15',
    amount: 750000,
    account: '국민은행 222-222-222222',
    accountHolder: '김철수',
    completedDate: '2024.01.16'
  },
  {
    id: 3,
    status: '출금반려',
    requestDate: '2024.01.22',
    amount: 200000,
    account: '우리은행 333-333-333333',
    accountHolder: '이영희',
    completedDate: null
  },
  {
    id: 4,
    status: '출금신청',
    requestDate: '2024.01.25',
    amount: 300000,
    account: '신한은행 444-444-444444',
    accountHolder: '박민수',
    completedDate: null
  },
  {
    id: 5,
    status: '출금완료',
    requestDate: '2024.01.12',
    amount: 400000,
    account: '기업은행 111-111-111111',
    accountHolder: '홍길동',
    completedDate: '2024.01.13'
  },
  {
    id: 6,
    status: '출금반려',
    requestDate: '2024.01.26',
    amount: 150000,
    account: '국민은행 222-222-222222',
    accountHolder: '김철수',
    completedDate: null
  },
  {
    id: 7,
    status: '출금신청',
    requestDate: '2024.01.27',
    amount: 600000,
    account: '우리은행 333-333-333333',
    accountHolder: '이영희',
    completedDate: null
  },
  {
    id: 8,
    status: '출금완료',
    requestDate: '2024.01.10',
    amount: 350000,
    account: '신한은행 444-444-444444',
    accountHolder: '박민수',
    completedDate: '2024.01.11'
  },
  {
    id: 9,
    status: '출금완료',
    requestDate: '2024.01.08',
    amount: 800000,
    account: '기업은행 111-111-111111',
    accountHolder: '홍길동',
    completedDate: '2024.01.09'
  },
  {
    id: 10,
    status: '출금신청',
    requestDate: '2024.01.29',
    amount: 250000,
    account: '국민은행 222-222-222222',
    accountHolder: '김철수',
    completedDate: null
  }
]

// 계좌 항목 타입
export interface AccountItem {
  id: number
  bankName: string // 은행명
  accountNumber: string // 계좌번호
  accountHolder: string // 예금주
  isPrimary: boolean // 대표계좌 여부
}

// 더미 계좌 데이터
export const mockAccountItems: AccountItem[] = [
  {
    id: 1,
    bankName: '국민은행',
    accountNumber: '123-456-789012',
    accountHolder: '홍길동',
    isPrimary: true
  },
  {
    id: 2,
    bankName: '신한은행',
    accountNumber: '456-789-012345',
    accountHolder: '홍길동',
    isPrimary: false
  },
  {
    id: 3,
    bankName: '우리은행',
    accountNumber: '789-012-345678',
    accountHolder: '홍길동',
    isPrimary: false
  }
]
