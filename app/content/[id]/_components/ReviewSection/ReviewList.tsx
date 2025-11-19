import ReviewItem from './ReviewItem'
import styles from './ReviewList.module.scss'
import type { Review } from '../../_mocks/reviewData'

interface Props {
  reviews: Review[]
  onReviewClick: (review: Review) => void
}

const ReviewList = ({ reviews, onReviewClick }: Props) => {
  return (
    <div className={styles.container}>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          {...review}
          onImageClick={() => onReviewClick(review)}
        />
      ))}
    </div>
  )
}

export default ReviewList
