'use client'

import { useEffect, useState } from 'react'

import styles from './Dimmed.module.scss'

import { DIMMED_ANIMATION_DURATION_MS, ZIndex } from '@/constants/style'
import { cn } from '@/lib/utils'
import { useDimmedStore } from '@/stores/dimmed'

const Dimmed = () => {
  const { isVisible, setVisible } = useDimmedStore()
  const [shouldRender, setShouldRender] = useState(false)
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      setIsHiding(false)
    } else if (shouldRender) {
      setIsHiding(true)
      const timer = setTimeout(() => {
        setShouldRender(false)
        setIsHiding(false)
      }, DIMMED_ANIMATION_DURATION_MS)
      return () => clearTimeout(timer)
    }
  }, [isVisible, shouldRender])

  const handleClick = () => {
    setVisible(false)
  }

  if (!shouldRender) return null

  return (
    <div
      className={cn(styles.dimmed, isHiding && styles.dimmed_hidden)}
      style={{ zIndex: ZIndex.OVERLAY }}
      onClick={handleClick}
      aria-hidden='true'
    />
  )
}

export default Dimmed
