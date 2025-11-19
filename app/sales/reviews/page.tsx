'use client'

import Link from 'next/link'
import { useState } from 'react'

import styles from './page.module.scss'

import cardExample from '@/assets/images/contents/card_example.png'
import ReportReceivedModal from '@/components/modal/ReportReceivedModal'
import HelpfulButton from '@/components/ui/HelpfulButton'
import ImageThumbnail from '@/components/ui/ImageThumbnail'
import StarRating from '@/components/ui/StarRating'
import { Icon } from '~/components/Icon'
import { FilterDropdown, DropdownMenu } from '~/components/ui'
import { useModal } from '~/hooks/useModal'

interface ReviewReply {
  id: number
  author: string
  date: string
  content: string
}

interface ReviewItem {
  id: number
  productTitle: string
  productImage: string
  rating: number
  helpfulCount: number
  isHelpful: boolean
  author: string
  date: string
  content: string
  images?: string[]
  imageCount?: number
  replies: ReviewReply[]
}

// Mock 데이터
const mockReviews: ReviewItem[] = [
  {
    id: 1,
    productTitle: '[2023 개정 교육과정] 초등수학 5학년 교육과정 총정리 연수',
    productImage: cardExample.src,
    rating: 4.8,
    helpfulCount: 12,
    isHelpful: false,
    author: '이**',
    date: '2024.11.15',
    content:
      '정말 유익한 강의였습니다. 학생들에게 적용할 수 있는 다양한 예시들이 도움이 많이 되었어요.',
    images: [cardExample.src],
    imageCount: 3,
    replies: [
      {
        id: 101,
        author: '판매자',
        date: '2024.11.16',
        content:
          '좋은 평가 감사합니다. 앞으로도 유익한 콘텐츠로 찾아뵙겠습니다.'
      }
    ]
  },
  {
    id: 2,
    productTitle: '초등 국어 독해력 향상을 위한 실전 워크북',
    productImage: cardExample.src,
    rating: 5.0,
    helpfulCount: 8,
    isHelpful: false,
    author: '김**',
    date: '2024.11.14',
    content: '워크북 구성이 정말 잘 되어있네요. 학생들 반응이 너무 좋습니다!',
    replies: []
  },
  {
    id: 3,
    productTitle: '중학교 영어 문법 기초 다지기',
    productImage: cardExample.src,
    rating: 4.5,
    helpfulCount: 15,
    isHelpful: true,
    author: '박**',
    date: '2024.11.13',
    content: '설명이 쉽고 이해하기 좋았어요. 문제도 적절한 난이도입니다.',
    images: [cardExample.src],
    imageCount: 1,
    replies: [
      {
        id: 102,
        author: '판매자',
        date: '2024.11.14',
        content: '감사합니다. 더 좋은 콘텐츠로 보답하겠습니다.'
      }
    ]
  }
]

const ReviewsPage = () => {
  const { openModal } = useModal()
  const [filterValue, setFilterValue] = useState<string>('기간 전체')
  const [reviews, setReviews] = useState<ReviewItem[]>(mockReviews)
  const [activeReplyIds, setActiveReplyIds] = useState<number[]>([])
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({})

  const filterOptions = ['기간 전체'] as const

  const handleReply = (reviewId: number) => {
    setActiveReplyIds((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    )
    setReplyDrafts((prev) => ({
      ...prev,
      [reviewId]: prev[reviewId] ?? ''
    }))
  }

  const handleCancelReply = (reviewId: number) => {
    setActiveReplyIds((prev) => prev.filter((id) => id !== reviewId))
    setReplyDrafts((prev) => {
      const { [reviewId]: _, ...rest } = prev
      return rest
    })
  }

  const handleSubmitReply = (reviewId: number) => {
    const draft = replyDrafts[reviewId]?.trim() ?? ''
    if (!draft) return

    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    const newReply: ReviewReply = {
      id: Date.now(),
      author: '판매자',
      date: `${year}.${month}.${day}`,
      content: draft
    }

    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              replies: [newReply, ...(review.replies ?? [])]
            }
          : review
      )
    )

    handleCancelReply(reviewId)
  }

  const handleReport = (reviewId: number) => {
    openModal(ReportReceivedModal)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter_section}>
        <FilterDropdown
          options={filterOptions}
          defaultValue='기간 전체'
          showDefaultOption={false}
          selectedValues={filterValue === '기간 전체' ? [] : [filterValue]}
          onSelect={(values) =>
            setFilterValue(values.length > 0 ? values[0] : '기간 전체')
          }
          singleSelect
        />
        <div className={styles.search_box}>
          <input type='text' placeholder='자료명으로 검색하세요' />
          <button>
            <Icon name='search' />
          </button>
        </div>
      </div>

      <div className={styles.review_list}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.review_item}>
            {/* 상품 정보 */}
            <div className={styles.product_info}>
              <div className={styles.product_status}>
                <span>구매</span>
                <span
                  className={
                    review.replies.length > 0
                      ? styles.completed
                      : styles.waiting
                  }
                >
                  {review.replies.length > 0 ? '답변완료' : '답변대기'}
                </span>
                <span className={styles.product_title}>
                  {review.productTitle}
                </span>
              </div>
              {/* 더보기 드롭다운 */}
              <DropdownMenu
                trigger={
                  <button className={styles.more_button} aria-label='더보기'>
                    <Icon name='kebab-pc' color='var(--color-neutral-grey-1)' />
                  </button>
                }
                items={[
                  {
                    label: '답변하기',
                    action: () => handleReply(review.id)
                  },
                  {
                    label: '신고하기',
                    action: () => handleReport(review.id)
                  }
                ]}
                side='left'
              />
            </div>

            {/* 리뷰 컨테이너 */}
            <div className={styles.review_container}>
              <Link
                href={`/search/${review.id}`}
                className={styles.review_link}
              >
                {/* 좌측 별점 */}
                <div className={styles.rating_section}>
                  <div className={styles.rating_score}>
                    {review.rating.toFixed(1)}
                  </div>
                  <StarRating rating={review.rating} showScore={false} />
                </div>

                {/* 우측 컨텐츠 */}
                <div className={styles.content_section}>
                  {/* 메인 영역 (텍스트 + 썸네일 + 답변) */}
                  <div className={styles.content_main}>
                    {/* 메인 컨텐츠 + 이미지 */}
                    <div className={styles.content_wrapper}>
                      <div className={styles.main_content}>
                        {/* 헤더: 사용자명 + 날짜 */}
                        <div className={styles.header}>
                          <div className={styles.user_info}>
                            <span className={styles.author}>
                              {review.author}
                            </span>
                            <span className={styles.date}>{review.date}</span>
                          </div>
                        </div>

                        {/* 리뷰 내용 */}
                        <p className={styles.review_content}>
                          {review.content}
                        </p>

                        {/* 유용해요 버튼 */}
                        <HelpfulButton
                          count={review.helpfulCount}
                          enabled={review.isHelpful}
                        />
                      </div>

                      {/* 이미지 썸네일 (있을 경우) */}
                      {review.images && review.images.length > 0 && (
                        <ImageThumbnail
                          imageSrc={review.images[0]}
                          imageAlt='리뷰 이미지'
                          imageCount={review.imageCount}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              {/* 답변 입력창 */}
              {activeReplyIds.includes(review.id) && (
                <div className={styles.reply_input_wrap}>
                  <input
                    type='text'
                    className={styles.reply_input}
                    placeholder='답변을 입력하세요'
                    value={replyDrafts[review.id] ?? ''}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({
                        ...prev,
                        [review.id]: e.target.value
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmitReply(review.id)
                      } else if (e.key === 'Escape') {
                        handleCancelReply(review.id)
                      }
                    }}
                    autoFocus
                  />
                </div>
              )}

              {/* 판매자 답변 (있을 경우) */}
              {review.replies.length > 0 && (
                <div className={styles.replies_list}>
                  {review.replies.map((reply) => (
                    <div key={reply.id} className={styles.reply_item}>
                      <p className={styles.reply_content}>{reply.content}</p>
                      <div className={styles.reply_txtbox}>
                        <span className={styles.reply_author}>
                          {reply.author}
                        </span>
                        <span className={styles.reply_date}>{reply.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewsPage
