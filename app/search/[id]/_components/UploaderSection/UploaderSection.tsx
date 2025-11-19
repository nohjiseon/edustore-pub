import type { UploaderInfo as UploaderInfoType } from '../../_mocks/detailData'
import UploaderInfo from '../_ui/UploaderInfo'

interface Props {
  info: UploaderInfoType
  className?: string
  titleClassName?: string
}

const UploaderSection = ({ info, className, titleClassName }: Props) => {
  return (
    <section id='uploader' className={className}>
      <h2 className={titleClassName}>업로더 정보</h2>
      <UploaderInfo
        profileImage={info.profileImage}
        name={info.name}
        introduction={info.introduction}
        likeCount={info.likeCount}
        rating={info.rating}
        reviewCount={info.reviewCount}
      />
    </section>
  )
}

export default UploaderSection
