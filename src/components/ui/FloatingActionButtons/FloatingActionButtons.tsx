import { ReactNode } from 'react'

import styles from './FloatingActionButtons.module.scss'

import { Icon } from '~/components/Icon'

interface Props {
  onDisplayClick?: () => void
  onTopClick?: () => void
  displayLabel?: string
  topLabel?: string
}

const FloatingActionButtons = ({
  onDisplayClick,
  onTopClick,
  displayLabel = '진열',
  topLabel = 'Top'
}: Props) => {
  return (
    <div className={styles.fab_container}>
      <button
        className={`${styles.fab_button} ${styles.primary}`}
        onClick={onDisplayClick}
      >
        <span className={styles.label}>{displayLabel}</span>
        <Icon name='upload' />
      </button>
      <button
        className={`${styles.fab_button} ${styles.secondary}`}
        onClick={onTopClick}
      >
        <span className={styles.label}>{topLabel}</span>
        <Icon name='arrow-up' className={styles.icon} />
      </button>
    </div>
  )
}

export default FloatingActionButtons
