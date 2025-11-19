'use client'

import styles from './RadioLabel.module.scss'

import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'

export interface RadioLabelProps {
  /** 라벨 텍스트 */
  label: string

  /** 체크 상태 */
  checked: boolean

  /** 값 변경 핸들러 */
  onChange: () => void

  /** radio input의 name 속성 (optional) */
  name?: string

  /** radio input의 value 속성 (optional) */
  value?: string

  /** 비활성화 여부 (optional) */
  disabled?: boolean

  /** 추가 className (optional) */
  className?: string
}

const RadioLabel = ({
  label,
  checked,
  onChange,
  name,
  value,
  disabled = false,
  className
}: RadioLabelProps) => {
  return (
    <label
      className={cn(styles.radio_label, disabled && styles.disabled, className)}
      onClick={disabled ? undefined : onChange}
    >
      {/* 접근성을 위한 숨겨진 실제 radio input */}
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.hidden_input}
      />

      <Icon
        name={checked ? 'radio-on' : 'radio-off'}
        color={checked ? 'var(--color-primary)' : 'var(--color-neutral-grey-3)'}
      />
      <span className={styles.label_text}>{label}</span>
    </label>
  )
}

export default RadioLabel
