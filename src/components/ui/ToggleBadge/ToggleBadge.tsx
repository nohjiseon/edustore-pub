import React, { ReactNode } from 'react'

import styles from './ToggleBadge.module.scss'

import { cn } from '@/lib/utils'

interface Props {
  size?: 'sm' | 'md'
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  children?: ReactNode
}

const ToggleBadge = ({
  size = 'md',
  selected = false,
  disabled = false,
  onClick,
  children
}: Props) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  return (
    <div
      className={cn(
        styles.wrapper,
        styles[size],
        selected && styles.selected,
        disabled && styles.disabled
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default ToggleBadge
