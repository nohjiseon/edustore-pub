import { mockContentDetail } from '../../_mocks/detailData'
import ClassReviewCard from '../_ui/ClassReviewCard'

interface Props {
  className?: string
  titleClassName?: string
  gridClassName?: string
}

const ClassSection = ({ className, titleClassName, gridClassName }: Props) => {
  return (
    <section id='class' className={className}>
      <h2 className={titleClassName}>이 자료로 이런 수업을 했어요</h2>
      <div className={gridClassName}>
        {mockContentDetail.classReviews.map((review) => (
          <ClassReviewCard
            key={review.id}
            nickname={review.nickname}
            rating={review.rating}
            content={review.content}
          />
        ))}
      </div>
    </section>
  )
}

export default ClassSection
