'use client'

import { useState } from 'react'

import InquiryDetailModal from './InquiryDetailModal'
import InquiryHeader from './InquiryHeader'
import InquiryList from './InquiryList'
import styles from './InquirySection.module.scss'
import { mockInquiries, type Inquiry } from '../../_mocks/inquiryData'

import { Pagination } from '@/components/ui'
import { useModal } from '@/hooks/useModal'

interface Props {
  className?: string
  sectionId?: string
}

const InquirySection = ({ className, sectionId = 'inquiry' }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { openModal } = useModal()

  // 임시 데이터 - 추후 API 연동 시 props로 전달 예정
  const totalPages = 5

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 추후 API 연동 시 페이지에 맞는 데이터 fetch
  }

  const handleInquiryClick = (inquiry: Inquiry) => {
    openModal(InquiryDetailModal, {
      inquiryId: inquiry.id
    })
  }

  return (
    <section id={sectionId} className={className}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* 헤더 영역 */}
          <InquiryHeader />

          {/* 문의 리스트 영역 */}
          <InquiryList
            inquiries={mockInquiries}
            onInquiryClick={handleInquiryClick}
          />

          {/* 페이지네이션 영역 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default InquirySection
