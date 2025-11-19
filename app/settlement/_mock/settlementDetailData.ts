import { StaticImageData } from 'next/image'

import { mockSettlementItems, type SettlementItem } from './settlementData'

import cardExampleImage from '@/assets/images/contents/card_example.png'

// 정산 상세 데이터 타입
export interface SettlementDetail extends SettlementItem {
  nickname: string // 닉네임
  requestDate: string // 정산 신청일 (YYYY.MM.DD 형식)
  settlementPeriod: string // 정산일 기준 기간
  pgVat: number // PG 부가세
  account: string // 은행 계좌
  accountHolder: string // 예금주
  image: string | StaticImageData // 자료 이미지
}

// 정산 상세 더미 데이터 (기존 목록 데이터를 기반으로 생성)
export const getMockSettlementDetail = (
  id: number
): SettlementDetail | null => {
  const baseItem = mockSettlementItems.find((item) => item.id === id)
  if (!baseItem) return null

  // 기본 더미 데이터
  const dummyData = {
    nickname: '수업가게닉네임',
    requestDate: '2024.01.10',
    settlementPeriod: '2024.01.01 ~ 2024.01.31',
    pgVat: Math.floor(baseItem.pgFee * 0.1), // PG 수수료의 10%를 부가세로 계산
    account: '기업은행 123-456-789012',
    accountHolder: '홍길동',
    image: cardExampleImage
  }

  // 각 ID별로 다른 더미 데이터
  const detailMap: Record<number, Partial<SettlementDetail>> = {
    1: {
      nickname: '수업가게닉네임',
      requestDate: '2024.01.10',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 300,
      account: '기업은행 123-456-789012',
      accountHolder: '홍길동',
      image: cardExampleImage
    },
    2: {
      nickname: '교육자료제작자',
      requestDate: '2024.01.15',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 192,
      account: '국민은행 234-567-890123',
      accountHolder: '김철수',
      image: cardExampleImage
    },
    3: {
      nickname: '학습자료개발자',
      requestDate: '2024.01.10',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 300,
      account: '우리은행 345-678-901234',
      accountHolder: '이영희',
      image: cardExampleImage
    },
    4: {
      nickname: '교육콘텐츠제작',
      requestDate: '2024.01.15',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 192,
      account: '신한은행 456-789-012345',
      accountHolder: '박민수',
      image: cardExampleImage
    },
    5: {
      nickname: '교사자료제작소',
      requestDate: '2024.01.10',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 300,
      account: '하나은행 567-890-123456',
      accountHolder: '최영수',
      image: cardExampleImage
    },
    6: {
      nickname: '교육자료스튜디오',
      requestDate: '2024.01.15',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 192,
      account: '농협은행 678-901-234567',
      accountHolder: '정민호',
      image: cardExampleImage
    },
    7: {
      nickname: '학습자료연구소',
      requestDate: '2024.01.10',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 300,
      account: 'KB국민은행 789-012-345678',
      accountHolder: '강지영',
      image: cardExampleImage
    },
    8: {
      nickname: '교육콘텐츠랩',
      requestDate: '2024.01.15',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 192,
      account: '신한은행 890-123-456789',
      accountHolder: '윤서연',
      image: cardExampleImage
    },
    9: {
      nickname: '수업자료제작소',
      requestDate: '2024.01.10',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 300,
      account: '우리은행 901-234-567890',
      accountHolder: '임재현',
      image: cardExampleImage
    },
    10: {
      nickname: '교육자료공방',
      requestDate: '2024.01.15',
      settlementPeriod: '2024.01.01 ~ 2024.01.31',
      pgVat: 192,
      account: 'IBK기업은행 012-345-678901',
      accountHolder: '송지은',
      image: cardExampleImage
    }
  }

  return {
    ...baseItem,
    ...(detailMap[id] || dummyData)
  } as SettlementDetail
}
