'use client'

import styles from './Checkbox.module.scss'

import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'

export interface CheckboxProps {
  /** 체크 상태 */
  checked: boolean

  /** 값 변경 핸들러 */
  onChange: (checked: boolean) => void

  /** 라벨 텍스트 (optional) */
  label?: string

  /** checkbox input의 id 속성 (optional) */
  id?: string

  /** checkbox input의 name 속성 (optional) */
  name?: string

  /** checkbox input의 value 속성 (optional) */
  value?: string

  /** 비활성화 여부 (optional) */
  disabled?: boolean

  /** 추가 className (optional) */
  className?: string
}

const Checkbox = ({
  checked,
  onChange,
  label,
  id,
  name,
  value,
  disabled = false,
  className
}: CheckboxProps) => {
  const handleChange = (e: React.MouseEvent | React.ChangeEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <label
      className={cn(
        styles.checkbox_label,
        disabled && styles.disabled,
        className
      )}
      onClick={disabled ? undefined : handleChange}
    >
      {/* 접근성을 위한 실제 checkbox input */}
      <input
        type='checkbox'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.hidden_input}
      />

      <Icon
        name={checked ? 'checkbox-fill-s' : 'checkbox-none-s'}
        color={checked ? 'var(--color-primary)' : 'var(--color-neutral-grey-3)'}
      />
      {label && <span className={styles.label_text}>{label}</span>}
    </label>
  )
}

export default Checkbox
