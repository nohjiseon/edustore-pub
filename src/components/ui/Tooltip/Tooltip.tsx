'use client'

import React, {
  ReactNode,
  useState,
  useRef,
  useEffect,
  isValidElement,
  cloneElement
} from 'react'

import styles from './Tooltip.module.scss'

import { cn } from '@/lib/utils'
import { Icon } from '~/components/Icon'

interface TooltipProps {
  children: ReactNode
  title?: ReactNode
  content: ReactNode
  className?: string

  // 문자열: % 또는 다른 단위 사용 가능
  top?: string
  bottom?: string
  left?: string
  right?: string
  width?: string
}

const Tooltip = ({
  children,
  title,
  content,
  top,
  left,
  bottom,
  right,
  width,
  className
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false) // 애니메이션용 가시 상태
  const [isMounted, setIsMounted] = useState(false) // 렌더 상태 (언마운트 지연)
  const ANIMATION_MS = 150
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const openTooltip = () => {
    if (!isMounted) {
      setIsMounted(true)
      // 다음 프레임에 visible 추가하여 트랜지션 동작
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(true)
    }
  }

  const closeTooltip = () => {
    setIsVisible(false)
    // 페이드 아웃 후 언마운트
    setTimeout(() => {
      setIsMounted(false)
    }, ANIMATION_MS)
  }

  const toggleTooltip = () => {
    if (!isMounted || !isVisible) {
      openTooltip()
    } else {
      closeTooltip()
    }
  }

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isMounted) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        tooltipRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        closeTooltip()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMounted])

  // 문자열 그대로 사용 (%, px, rem)
  const formatValue = (value: string | undefined): string => {
    if (value === undefined || value === null) {
      return ''
    }
    return value
  }

  // 스타일 객체 생성 (값이 있는 경우만 포함)
  const tooltipStyle: React.CSSProperties = {}

  if (top !== undefined && top !== null) {
    tooltipStyle.top = formatValue(top)
  }
  if (left !== undefined && left !== null) {
    tooltipStyle.left = formatValue(left)
  }
  if (bottom !== undefined && bottom !== null) {
    tooltipStyle.bottom = formatValue(bottom)
  }
  if (right !== undefined && right !== null) {
    tooltipStyle.right = formatValue(right)
  }
  if (width !== undefined && width !== null) {
    const widthFormatted = formatValue(width)
    tooltipStyle.width = widthFormatted || 'auto'
  }

  // children에 클릭 이벤트 추가
  const childrenWithClick = isValidElement(children) ? (
    cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        toggleTooltip()
        const originalOnClick = (children as React.ReactElement<any>).props
          ?.onClick
        if (originalOnClick && typeof originalOnClick === 'function') {
          originalOnClick(e)
        }
      }
    })
  ) : (
    <div onClick={toggleTooltip} style={{ display: 'inline-block' }}>
      {children}
    </div>
  )

  return (
    <div ref={containerRef} className={styles.trigger}>
      {childrenWithClick}
      {isMounted && (
        <div
          ref={tooltipRef}
          className={cn(styles.tooltip, className, isVisible && styles.visible)}
          style={tooltipStyle}
        >
          <button
            className={styles.close_btn}
            onClick={(e) => {
              e.stopPropagation()
              closeTooltip()
            }}
          >
            <Icon name='close' color='#333' size={14} />
          </button>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.content}>{content}</div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
export type { TooltipProps }
