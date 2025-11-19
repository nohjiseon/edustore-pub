import styles from './ReviewHeader.module.scss'

import StarRating from '@/components/ui/StarRating'

interface Props {
  totalCount: number
  averageRating: number
}

const ReviewHeader = ({ totalCount, averageRating }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.title}>자료 후기</h2>
        <span className={styles.count}>{totalCount}</span>
      </div>

      <div className={styles.right}>
        <div className={styles.rating_container}>
          <StarRating rating={averageRating} showScore={false} />
          <span className={styles.rating_text}>
            {averageRating.toFixed(1)} / 5.0
          </span>
        </div>
      </div>
    </div>
  )
}

export default ReviewHeader
