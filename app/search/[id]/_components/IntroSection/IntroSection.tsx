import type { ContentIntroSection as ContentIntroSectionType } from '../../_mocks/detailData'
import ContentIntro from '../_ui/ContentIntro'

interface Props {
  data: ContentIntroSectionType
  className?: string
  titleClassName?: string
}

const IntroSection = ({ data, className, titleClassName }: Props) => {
  return (
    <section id='intro' className={className}>
      <h2 className={titleClassName}>자료소개</h2>
      <ContentIntro data={data} />
    </section>
  )
}

export default IntroSection
