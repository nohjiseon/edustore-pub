'use client'

import styles from './ReviewDetailModal.module.scss'
import { mockReviews } from '../../../_mocks/reviewData'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/Dialog'
import HelpfulButton from '@/components/ui/HelpfulButton'
import StarRating from '@/components/ui/StarRating'

interface Props {
  open?: boolean
  reviewId: number | null
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const ReviewDetailModal = ({
  open = false,
  reviewId,
  onOpenChange,
  zIndex
}: Props) => {
  const review = mockReviews.find((item) => item.id === reviewId)

  if (!review) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal} zIndex={zIndex}>
        <div className={styles.modal_inner}>
          <DialogHeader>
            <DialogTitle>자료 후기</DialogTitle>
          </DialogHeader>

          <div className={styles.content}>
            <div className={styles.review_section}>
              <StarRating rating={review.rating} showScore={true} />

              <div className={styles.user_info}>
                <span className={styles.author}>{review.author}</span>
                <span className={styles.date}>{review.date}</span>
              </div>
            </div>

            <div className={styles.review_detail}>
              <p className={styles.review_content}>{review.content}</p>

              {review.images && review.images.length > 0 && (
                <div className={styles.image_gallery}>
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`리뷰 이미지 ${index + 1}`}
                      className={styles.image}
                    />
                  ))}
                </div>
              )}
            </div>

            <HelpfulButton
              count={review.helpfulCount}
              enabled={review.isHelpful}
              text='유용해요'
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDetailModal
