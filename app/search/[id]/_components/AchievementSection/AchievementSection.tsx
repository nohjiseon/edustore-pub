import type { AchievementStandard as AchievementStandardType } from '../../_mocks/detailData'
import AchievementStandard from '../_ui/AchievementStandard'

interface Props {
  standards: AchievementStandardType[]
  className?: string
  titleClassName?: string
  listClassName?: string
}

const AchievementSection = ({
  standards,
  className,
  titleClassName,
  listClassName
}: Props) => {
  return (
    <section id='standard' className={className}>
      <h2 className={titleClassName}>성취기준 안내</h2>
      <div className={listClassName}>
        {standards.map((standard) => (
          <AchievementStandard
            key={standard.id}
            code={standard.code}
            description={standard.description}
          />
        ))}
      </div>
    </section>
  )
}

export default AchievementSection
