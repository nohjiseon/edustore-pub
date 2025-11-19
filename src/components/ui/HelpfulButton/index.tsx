import styles from './HelpfulButton.module.scss'

import { Icon } from '~/components/Icon'

interface Props {
  count: number
  enabled: boolean
  text?: string
  onClick?: () => void
  className?: string
}

const HelpfulButton = ({
  count,
  enabled,
  text = '유용해요',
  onClick,
  className
}: Props) => {
  return (
    <button
      className={`${styles.button} ${enabled ? styles.active : ''} ${
        className || ''
      }`}
      onClick={onClick}
      type='button'
    >
      <Icon
        name='thumb'
        color={enabled ? 'var(--color-primary)' : 'var(--color-neutral-grey-1)'}
      />
      <span className={styles.text}>{text}</span>
      <span className={styles.count}>{count}</span>
    </button>
  )
}

export default HelpfulButton
