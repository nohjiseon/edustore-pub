import styles from './ClassReviewCard.module.scss'

import StarRating from '@/components/ui/StarRating'

interface Props {
  nickname: string
  rating: number
  content: string
}

const ClassReviewCard = ({ nickname, rating, content }: Props) => {
  return (
    <div className={styles.card}>
      <p className={styles.content}>{content}</p>
      <div className={styles.footer}>
        <span className={styles.nickname}>{nickname}</span>
        <div className={styles.divider} />
        <StarRating rating={rating} showScore={true} />
      </div>
    </div>
  )
}

export default ClassReviewCard
