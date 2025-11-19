'use client'

import { useState, useMemo } from 'react'

import ReviewDetailModal from './ReviewDetailModal'
import ReviewHeader from './ReviewHeader'
import ReviewList from './ReviewList'
import styles from './ReviewSection.module.scss'
import type { Review } from '../../_mocks/reviewData'

import { Pagination } from '@/components/ui'
import { useModal } from '@/hooks/useModal'
import { useProductReviews } from '@/hooks/useProduct'
import type { ReviewInfo } from '@/types/review'

interface Props {
  productNo: number
  className?: string
  sectionId?: string
}

// ReviewInfo(API) -> Review(UI) 변환 함수
const mapReviewInfoToReview = (reviewInfo: ReviewInfo): Review => {
  // 날짜 포맷 변환: "2024-01-15T10:30:00" -> "2025.01.15"
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  }

  return {
    id: reviewInfo.reviewNo,
    rating: reviewInfo.rating,
    author: reviewInfo.nickname,
    date: formatDate(reviewInfo.createDt),
    content: reviewInfo.reviewText,
    helpfulCount: 0, // API에서 제공하지 않음
    isHelpful: false, // API에서 제공하지 않음
    images: reviewInfo.mainThumbnailUrl
      ? [reviewInfo.mainThumbnailUrl]
      : undefined
  }
}

const REVIEWS_PER_PAGE = 10

const ReviewSection = ({
  productNo,
  className,
  sectionId = 'review'
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { openModal } = useModal()

  // 리뷰 API 호출 (0-based page index)
  const {
    data: reviewsData,
    isLoading,
    error
  } = useProductReviews(productNo, {
    sortType: 'LATEST',
    page: currentPage - 1, // API는 0부터 시작, UI는 1부터 시작
    size: REVIEWS_PER_PAGE
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleReviewClick = (review: Review) => {
    openModal(ReviewDetailModal, {
      reviewId: review.id
    })
  }

  // API 데이터를 UI 형식으로 변환
  const reviews = useMemo(() => {
    if (!reviewsData?.reviews) return []
    return reviewsData.reviews.map(mapReviewInfoToReview)
  }, [reviewsData])

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    if (!reviewsData?.totalCount) return 1
    return Math.ceil(reviewsData.totalCount / REVIEWS_PER_PAGE)
  }, [reviewsData?.totalCount])

  // 로딩 상태
  if (isLoading) {
    return (
      <section id={sectionId} className={className}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div>리뷰를 불러오는 중...</div>
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
            <div>리뷰를 불러올 수 없습니다</div>
          </div>
        </div>
      </section>
    )
  }

  // 데이터 없음
  if (!reviewsData) {
    return (
      <section id={sectionId} className={className}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div>리뷰 데이터가 없습니다</div>
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
          <ReviewHeader
            totalCount={reviewsData.totalCount}
            averageRating={reviewsData.averageRating}
          />

          {/* 리뷰 리스트 영역 */}
          {reviews.length > 0 ? (
            <>
              <ReviewList reviews={reviews} onReviewClick={handleReviewClick} />

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
            <div>아직 작성된 리뷰가 없습니다</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ReviewSection
