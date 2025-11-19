import styles from './EmptyState.module.scss'

interface EmptyStateProps {
  /** 빈 상태 제목 (필수) */
  title: string
  /** 빈 상태 서브 제목 (선택) */
  subtitle?: string
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <div className={styles.empty_state}>
      <strong>{title}</strong>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

export default EmptyState
