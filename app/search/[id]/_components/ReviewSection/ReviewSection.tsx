'use client'

import { useState, useMemo } from 'react'

import ReviewDetailModal from './ReviewDetailModal'
import ReviewHeader from './ReviewHeader'
import ReviewList from './ReviewList'
import styles from './ReviewSection.module.scss'
import { mockReviews, type Review } from '../../_mocks/reviewData'

import { Pagination } from '@/components/ui'
import { useModal } from '@/hooks/useModal'

interface Props {
  className?: string
  sectionId?: string
}

const ReviewSection = ({ className, sectionId = 'review' }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { openModal } = useModal()

  // 임시 데이터 - 추후 API 연동 시 props로 전달 예정
  const totalCount = 20
  const averageRating = 4.5
  const totalPages = 5

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 추후 API 연동 시 페이지에 맞는 데이터 fetch
  }

  const handleReviewClick = (review: Review) => {
    openModal(ReviewDetailModal, {
      reviewId: review.id
    })
  }

  return (
    <section id={sectionId} className={className}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* 헤더 영역 */}
          <ReviewHeader totalCount={totalCount} averageRating={averageRating} />

          {/* 리뷰 리스트 영역 */}
          <ReviewList reviews={mockReviews} onReviewClick={handleReviewClick} />

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

export default ReviewSection
