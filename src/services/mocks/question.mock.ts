/**
 * 문의 서비스 더미 데이터
 */

import { delay } from './api.mock'
import type { QuestionListResponse } from '@/types/question'

/**
 * 문의 목록 조회 더미 응답
 */
export async function mockGetQuestions(params?: {
  page?: number
  size?: number
  productNo?: number
  keyword?: string
}): Promise<QuestionListResponse> {
  await delay(200)

  const page = params?.page || 1
  const size = params?.size || 10

  const mockQuestions = [
    {
      questionNo: 1,
      productNo: params?.productNo || 1,
      nickname: '구매자1',
      memberName: '김**',
      title: '상품 문의드립니다.',
      content: '이 상품은 어떤 학년에 적합한가요?',
      createDt: '2024-01-15T10:00:00',
      answer: {
        questionNo: 1,
        answerNo: 1,
        content: '초등 3~4학년에 적합한 상품입니다.',
        createDt: '2024-01-16T14:00:00'
      }
    },
    {
      questionNo: 2,
      productNo: params?.productNo || 1,
      nickname: '구매자2',
      memberName: '이**',
      title: '파일 형식 문의',
      content: '어떤 파일 형식으로 제공되나요?',
      createDt: '2024-01-14T09:00:00',
      answer: null
    },
    {
      questionNo: 3,
      productNo: params?.productNo || 1,
      nickname: '구매자3',
      memberName: '박**',
      title: '재고 문의',
      content: '언제까지 구매 가능한가요?',
      createDt: '2024-01-13T15:00:00',
      answer: {
        questionNo: 3,
        answerNo: 2,
        content: '상시 구매 가능합니다.',
        createDt: '2024-01-14T10:00:00'
      }
    }
  ]

  // 키워드 필터링
  let filteredQuestions = mockQuestions
  if (params?.keyword) {
    const keyword = params.keyword.toLowerCase()
    filteredQuestions = mockQuestions.filter(
      (q) =>
        q.title.toLowerCase().includes(keyword) ||
        q.content.toLowerCase().includes(keyword) ||
        q.nickname.toLowerCase().includes(keyword)
    )
  }

  // 페이지네이션
  const start = (page - 1) * size
  const end = start + size
  const paginatedQuestions = filteredQuestions.slice(start, end)

  return {
    data: {
      list: paginatedQuestions,
      total: filteredQuestions.length,
      page,
      size
    },
    status: 200,
    code: 200,
    message: '성공'
  }
}
