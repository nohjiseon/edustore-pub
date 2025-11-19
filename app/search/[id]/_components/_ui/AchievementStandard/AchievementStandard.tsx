import styles from './AchievementStandard.module.scss'

interface Props {
  code: string
  description: string
}

const AchievementStandard = ({ code, description }: Props) => {
  return (
    <div className={styles.achievement_card}>
      <div className={styles.code}>{code}</div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}

export default AchievementStandard
