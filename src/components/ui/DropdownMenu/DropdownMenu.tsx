'use client'

import React, { useEffect, useRef, useState } from 'react'

import styles from './DropdownMenu.module.scss'

export interface DropdownMenuItem {
  label: string
  action: () => void
}

export interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownMenuItem[]
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const DropdownMenu = ({
  trigger,
  items,
  align = 'start',
  side = 'bottom'
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // ESC 키 감지
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // 휠 이벤트 감지
  useEffect(() => {
    if (!isOpen) return

    const handleWheel = () => {
      setIsOpen(false)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isOpen])

  // 위치 계산
  const getContentPosition = () => {
    if (!triggerRef.current) return {}

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const sideOffset = 0
    let top = 0
    let left = 0

    // side 계산
    switch (side) {
      case 'top':
        top = triggerRect.top - sideOffset
        break
      case 'bottom':
        top = triggerRect.bottom + sideOffset
        break
      case 'left':
        left = triggerRect.left - sideOffset
        break
      case 'right':
        left = triggerRect.right + sideOffset
        break
    }

    // align 계산 (가로)
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          left = triggerRect.left
          break
        case 'center':
          left = triggerRect.left + triggerRect.width / 2
          break
        case 'end':
          left = triggerRect.right
          break
      }
    }

    // align 계산 (세로)
    if (side === 'left' || side === 'right') {
      switch (align) {
        case 'start':
          top = triggerRect.top
          break
        case 'center':
          top = triggerRect.top + triggerRect.height / 2
          break
        case 'end':
          top = triggerRect.bottom
          break
      }
    }

    return { top, left }
  }

  const handleTriggerClick = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  const position = getContentPosition()

  return (
    <div className={styles.root}>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onClick={handleTriggerClick}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={contentRef}
          className={styles.content}
          data-align={align}
          data-side={side}
          style={
            {
              '--dropdown-top': `${position.top}px`,
              '--dropdown-left': `${position.left}px`
            } as React.CSSProperties
          }
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.item}
              onClick={() => handleItemClick(item.action)}
              role='menuitem'
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleItemClick(item.action)
                }
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu
