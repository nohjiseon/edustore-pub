'use client'

import styles from './StarRating.module.scss'

import { Icon } from '~/components/Icon'

export interface StarRatingProps {
  rating: number
  showScore?: boolean
  onRatingChange?: (rating: number) => void
}

const StarRating = ({
  rating,
  showScore = true,
  onRatingChange
}: StarRatingProps) => {
  // 0.5 단위로 반올림
  const roundedRating = Math.round(rating * 2) / 2
  const clampedRating = Math.max(0, Math.min(5, roundedRating))

  const handleStarClick = (starIndex: number) => {
    if (onRatingChange) {
      onRatingChange(starIndex)
    }
  }

  const stars = []
  for (let i = 1; i <= 5; i++) {
    const starClass =
      i <= clampedRating ? styles.star_filled : styles.star_empty

    stars.push(
      <Icon
        key={i}
        name='star'
        className={starClass}
        onClick={() => handleStarClick(i)}
        style={{ cursor: onRatingChange ? 'pointer' : 'default' }}
      />
    )
  }

  return (
    <div className={styles.star_rating}>
      <div className={styles.stars}>{stars}</div>
      {showScore && (
        <span className={styles.score}>{clampedRating.toFixed(1)}</span>
      )}
    </div>
  )
}

export default StarRating
