'use client'

import styles from './ReviewItem.module.scss'

import { Icon } from '@/components/Icon'
import DropdownMenu from '@/components/ui/DropdownMenu'
import HelpfulButton from '@/components/ui/HelpfulButton'
import ImageThumbnail from '@/components/ui/ImageThumbnail'
import StarRating from '@/components/ui/StarRating'

interface ReviewReply {
  author: string
  date: string
  content: string
}

interface Props {
  id: number
  rating: number
  author: string
  date: string
  content: string
  helpfulCount: number
  isHelpful: boolean
  images?: string[]
  imageCount?: number
  showReplyInput?: boolean
  reply?: ReviewReply
  onImageClick?: () => void
}

const ReviewItem = ({
  rating,
  author,
  date,
  content,
  helpfulCount,
  isHelpful,
  images,
  imageCount,
  showReplyInput,
  reply,
  onImageClick
}: Props) => {
  const handleReply = () => {
    console.log('답변하기 클릭')
    // TODO: 답변하기 로직 구현
  }

  const handleReport = () => {
    console.log('신고하기 클릭')
    // TODO: 신고하기 로직 구현
  }

  return (
    <div className={styles.container}>
      {/* 좌측 별점 */}
      <div className={styles.rating_section}>
        <div className={styles.rating_score}>{rating.toFixed(1)}</div>
        <StarRating rating={rating} showScore={false} />
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
                  <span className={styles.author}>{author}</span>
                  <span className={styles.date}>{date}</span>
                </div>
              </div>

              {/* 리뷰 내용 */}
              <p className={styles.review_content}>{content}</p>

              {/* 유용해요 버튼 */}
              <HelpfulButton count={helpfulCount} enabled={isHelpful} />
            </div>

            {/* 이미지 썸네일 (있을 경우) */}
            {images && images.length > 0 && (
              <ImageThumbnail
                imageSrc={images[0]}
                imageAlt='리뷰 이미지'
                imageCount={imageCount}
                onClick={onImageClick}
              />
            )}
          </div>

          {/* 답변 입력란 (표시 여부에 따라) */}
          {showReplyInput && (
            <div className={styles.reply_input}>
              <p className={styles.reply_placeholder}>답변을 입력하세요</p>
            </div>
          )}

          {/* 판매자 답변 (있을 경우) */}
          {reply && (
            <div className={styles.reply_box}>
              <div className={styles.reply_header}>
                <span className={styles.reply_author}>{reply.author}</span>
                <span className={styles.reply_date}>{reply.date}</span>
              </div>
              <p className={styles.reply_content}>{reply.content}</p>
            </div>
          )}
        </div>

        {/* 더보기 드롭다운 */}
        <DropdownMenu
          trigger={
            <button className={styles.more_button} aria-label='더보기'>
              <Icon name='kebab-pc' color='var(--color-neutral-grey-1)' />
            </button>
          }
          items={[
            { label: '답변하기', action: handleReply },
            { label: '신고하기', action: handleReport }
          ]}
          side='left'
        />
      </div>
    </div>
  )
}

export default ReviewItem
