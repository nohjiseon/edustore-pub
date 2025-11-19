'use client'

import { useEffect, useState } from 'react'

import styles from './Toast.module.scss'

import { Icon } from '@/components/Icon'

export interface ToastProps {
  message: string
  icon?: string
  duration?: number
  onClose?: () => void
}

const Toast = ({
  message,
  icon = 'check',
  duration = 3000,
  onClose
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        setIsScrolled(true)
      } else if (event.deltaY < 0) {
        setIsScrolled(false)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  useEffect(() => {
    const checkHeaderHidden = () => {
      const header = document.querySelector('header')
      if (header) {
        setIsHeaderHidden(header.classList.contains('header_hidden'))
      }
    }

    checkHeaderHidden()

    // MutationObserver로 헤더 클래스 변경 감지
    const header = document.querySelector('header')
    if (!header) return

    const observer = new MutationObserver(() => {
      checkHeaderHidden()
    })

    observer.observe(header, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`${styles.toast_wrap} ${
        isScrolled || isHeaderHidden ? '' : styles.toast_scrolled
      }`}
    >
      <span className={styles.icon_wrap}>
        <Icon name={icon as any} size={16} />
      </span>
      <p>{message}</p>
    </div>
  )
}

export default Toast
