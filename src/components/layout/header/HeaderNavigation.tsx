'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'

import DropdownItem from './DropdownItem'
import styles from './header.module.scss'

import {
  DROPDOWN_CATEGORIES,
  NAVIGATION_ITEMS
} from '@/constants/education-categories'
import { useDimmedStore } from '@/stores/dimmed'

interface Props {
  onNavigationClick?: (item: {
    id: string
    label: string
    href: string
  }) => void
  onCategorySelect?: (
    category: string,
    subcategory?: string,
    gradeLevel?: string
  ) => void
  activeItem?: string
  onElevationChange?: (elevated: boolean) => void
}

const HeaderNavigation = ({
  onNavigationClick,
  onCategorySelect,
  activeItem,
  onElevationChange
}: Props) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [closingDropdown, setClosingDropdown] = useState<string | null>(null)
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const router = useRouter()
  const { isVisible, setVisible } = useDimmedStore()

  // 통합검색 페이지 URL 생성 유틸리티
  // - 학년별: grade=<선택 항목 값>
  // - 유아/초등/중등/고등: subject=<선택 항목 값> + grade=<해당 전체 학년>
  // - 나머지: 파라미터 없이 /search
  const createSearchUrl = (
    itemId: string,
    _category?: string,
    subcategory?: string
  ): string => {
    const params = new URLSearchParams()
    const gradeAllMap: Record<string, string> = {
      kindergarten: 'kindergarten-all',
      elementary: 'elementary-all',
      middle: 'middle-all',
      high: 'high-all'
    }

    if (itemId === 'grade') {
      if (subcategory) params.append('grade', subcategory)
    } else if (
      itemId === 'kindergarten' ||
      itemId === 'elementary' ||
      itemId === 'middle' ||
      itemId === 'high'
    ) {
      if (subcategory) params.append('subject', subcategory)
      // 해당 대분류의 전체 학년 추가
      const gradeAll = gradeAllMap[itemId]
      if (gradeAll) params.append('grade', gradeAll)
    } else {
      // others: no params
    }

    const qs = params.toString()
    return qs ? `/search?${qs}` : '/search'
  }

  const handleNavClick = (item: (typeof NAVIGATION_ITEMS)[0]) => {
    onNavigationClick?.(item)
    // 상단 메뉴 클릭 시: 유아/초등/중등/고등은 해당 전체 학년으로 검색, 그 외는 /search
    if (
      item.id === 'kindergarten' ||
      item.id === 'elementary' ||
      item.id === 'middle' ||
      item.id === 'high'
    ) {
      const gradeAllMap: Record<string, string> = {
        kindergarten: 'kindergarten-all',
        elementary: 'elementary-all',
        middle: 'middle-all',
        high: 'high-all'
      }
      const gradeAll = gradeAllMap[item.id]
      const url = gradeAll
        ? `/search?grade=${encodeURIComponent(gradeAll)}`
        : '/search'
      router.push(url)
    } else {
      router.push('/search')
    }
  }

  const closeDropdown = () => {
    // 현재 열린 드롭다운이 있으면 닫기 애니메이션 시작
    if (openDropdown) {
      setClosingDropdown(openDropdown)
      setTimeout(() => {
        setOpenDropdown(null)
        setClosingDropdown(null)
      }, 150) // 애니메이션 duration과 일치
    }

    // Dimmed 닫기 (elevation은 useEffect에서 자동 처리)
    setVisible(false)
  }

  const handleCategoryClick = (
    itemId: string,
    category?: string,
    subcategory?: string,
    gradeLevel?: string
  ) => {
    const searchUrl = createSearchUrl(itemId, category, subcategory)
    onCategorySelect?.(category ?? '', subcategory, gradeLevel)
    closeDropdown()
    router.push(searchUrl)
  }

  const handleMouseEnter = (itemId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (DROPDOWN_CATEGORIES[itemId]) {
      setOpenDropdown(itemId)
      setVisible(true) // elevation은 useEffect에서 자동 처리
    }
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      closeDropdown()
    }, 150)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    item: (typeof NAVIGATION_ITEMS)[0]
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleNavClick(item)
    } else if (e.key === 'Escape') {
      closeDropdown()
    }
  }

  const renderDropdownContent = (itemId: string) => {
    const category = DROPDOWN_CATEGORIES[itemId]
    if (!category) return null
    return (
      <DropdownItem
        category={category}
        onSelect={(category, subcategory, gradeLevel) =>
          handleCategoryClick(itemId, category, subcategory, gradeLevel)
        }
      />
    )
  }

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isInsideDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(target)
      )

      if (!isInsideDropdown) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [openDropdown])

  // isVisible 변화에 따라 elevation 자동 조정
  useEffect(() => {
    if (isVisible) {
      onElevationChange?.(true)
    } else {
      const timer = setTimeout(() => onElevationChange?.(false), 150)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onElevationChange])

  // 마우스 휠 아래로 스크롤 시 드롭다운 닫기
  useEffect(() => {
    if (!openDropdown) return

    const handleWheel = (event: WheelEvent) => {
      // 아래로 스크롤 (deltaY > 0)
      if (event.deltaY > 0) {
        closeDropdown()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [openDropdown])

  return (
    <nav
      className={`${styles.navigation} pc`}
      role='navigation'
      aria-label='메인 네비게이션'
    >
      {NAVIGATION_ITEMS.map((item) => (
        <div
          key={item.id}
          className={`${styles.nav_item} ${
            activeItem === item.id ? styles.active : ''
          }`}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
          ref={(el) => {
            dropdownRefs.current[item.id] = el
          }}
        >
          <div
            className={styles.nav_button}
            onClick={() => handleNavClick(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
            role='button'
            tabIndex={0}
            aria-label={`${item.label} 카테고리로 이동`}
            aria-expanded={openDropdown === item.id}
            aria-haspopup={DROPDOWN_CATEGORIES[item.id] ? 'menu' : 'false'}
          >
            <span className={styles.nav_label}>{item.label}</span>
          </div>

          {/* 드롭다운 메뉴 */}
          {(openDropdown === item.id || closingDropdown === item.id) && (
            <div
              className={`${styles.dropdown_container} ${
                item.id === 'grade' ? styles.dropdown_container_grade : ''
              } ${
                item.id === 'kindergarten' ||
                item.id === 'other' ||
                item.id === 'admin'
                  ? styles.one_line
                  : ''
              } ${
                closingDropdown === item.id ? styles.dropdown_closing : ''
              } pc`}
            >
              {renderDropdownContent(item.id)}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

export default HeaderNavigation
