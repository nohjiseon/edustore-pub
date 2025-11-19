'use client'

import { useState, useMemo } from 'react'

import InquiryDetailModal from './InquiryDetailModal'
import InquiryHeader from './InquiryHeader'
import InquiryList from './InquiryList'
import styles from './InquirySection.module.scss'
import type { Inquiry } from '../../_mocks/inquiryData'

import { Pagination } from '@/components/ui'
import { useModal } from '@/hooks/useModal'
import { useQuestions } from '@/hooks/useQuestion'
import type { QuestionInfo } from '@/types/question'

interface Props {
  productNo: number
  className?: string
  sectionId?: string
}

// QuestionInfo(API) -> Inquiry(UI) 변환 함수
const mapQuestionInfoToInquiry = (questionInfo: QuestionInfo): Inquiry => {
  // 날짜 포맷 변환: "2024-12-31 15:30:10" -> "2024.12.31"
  const formatDate = (dateStr: string): string => {
    const [date] = dateStr.split(' ')
    return date.replace(/-/g, '.')
  }

  // 답변 상태 확인
  const hasAnswer = !!questionInfo.answer
  const status = hasAnswer ? '답변완료' : '답변대기'
  const statusColor = hasAnswer ? 'primary' : 'default'

  return {
    id: questionInfo.questionNo,
    category: '구매', // API에서 제공하지 않음 - 기본값 설정
    status,
    statusColor: statusColor as 'primary' | 'default',
    author: questionInfo.memberName,
    date: formatDate(questionInfo.createDt),
    question: questionInfo.title,
    answer: questionInfo.answer
      ? {
          author: '판매자', // API에 판매자 정보가 없음
          date: formatDate(questionInfo.answer.createDt),
          content: questionInfo.answer.content
        }
      : undefined,
    isOpen: false // 기본값: 접힌 상태
  }
}

const INQUIRIES_PER_PAGE = 10

const InquirySection = ({
  productNo,
  className,
  sectionId = 'inquiry'
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { openModal } = useModal()

  // 문의 API 호출
  const {
    data: questionData,
    isLoading,
    error
  } = useQuestions({
    productNo,
    page: currentPage,
    size: INQUIRIES_PER_PAGE
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleInquiryClick = (inquiry: Inquiry) => {
    openModal(InquiryDetailModal, {
      inquiryId: inquiry.id
    })
  }

  // API 데이터를 UI 형식으로 변환
  const inquiries = useMemo(() => {
    if (!questionData?.list) return []
    return questionData.list.map(mapQuestionInfoToInquiry)
  }, [questionData])

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    if (!questionData?.total) return 1
    return Math.ceil(questionData.total / INQUIRIES_PER_PAGE)
  }, [questionData?.total])

  // 로딩 상태
  if (isLoading) {
    return (
      <section id={sectionId} className={className}>
        <div className={styles.container}>
          <div className={styles.content}>
            <InquiryHeader />
            <div>문의를 불러오는 중...</div>
          </div>
        </div>
      </section>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <section id={sectionId} className={className}>
        <div className={styles.container}>
          <div className={styles.content}>
            <InquiryHeader />
            <div>문의를 불러올 수 없습니다</div>
          </div>
        </div>
      </section>
    )
  }

  // 데이터 없음
  if (!questionData) {
    return (
      <section id={sectionId} className={className}>
        <div className={styles.container}>
          <div className={styles.content}>
            <InquiryHeader />
            <div>문의 데이터가 없습니다</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={sectionId} className={className}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* 헤더 영역 */}
          <InquiryHeader />

          {/* 문의 리스트 영역 */}
          {inquiries.length > 0 ? (
            <>
              <InquiryList
                inquiries={inquiries}
                onInquiryClick={handleInquiryClick}
              />

              {/* 페이지네이션 영역 */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div>아직 등록된 문의가 없습니다</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default InquirySection
