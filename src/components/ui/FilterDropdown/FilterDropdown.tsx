'use client'

import React, { useState, useRef, useEffect } from 'react'

import styles from './FilterDropdown.module.scss'

import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'

interface FilterDropdownProps {
  options: readonly string[]
  defaultValue?: string
  placeholder?: string
  selectedValues?: string[]
  disabledOptions?: string[]
  onSelect?: (values: string[]) => void
  className?: string
  showDefaultOption?: boolean
  singleSelect?: boolean
  // default: 기본 필터 타원형
  // expand: 계좌선택 expand 아이콘 타입
  // inquiry: 1:1문의 모달 출금 문의 선택 타입
  type?: 'default' | 'expand' | 'inquiry'
}

const FilterDropdown = ({
  options,
  defaultValue = '학년 전체',
  placeholder = '선택하세요',
  selectedValues = [],
  disabledOptions = [],
  onSelect,
  className,
  showDefaultOption = true,
  singleSelect = false,
  type = 'default'
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionToggle = (option: string) => {
    // 비활성화된 옵션은 무시
    if (disabledOptions.includes(option)) {
      return
    }

    // 단일 선택 모드
    if (singleSelect) {
      if (option === defaultValue) {
        onSelect?.([])
      } else {
        onSelect?.([option])
      }
      setIsOpen(false)
      return
    }

    // "전체" 옵션인 경우 모든 선택 해제
    if (option === defaultValue) {
      onSelect?.([])
      return
    }

    // 이미 선택된 항목이면 제거, 아니면 추가
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option]

    onSelect?.(newValues)
  }

  // 버튼에 표시할 텍스트 계산
  const getButtonText = () => {
    if (selectedValues.length === 0) {
      return defaultValue
    }
    if (singleSelect) {
      return selectedValues[0]
    }
    return `${defaultValue.replace(' 전체', '')} (${selectedValues.length})`
  }

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 타입별 클래스 매핑
  const typeClasses = {
    default: styles.default,
    expand: styles.expand,
    inquiry: styles.inquiry
  }

  const typeClass = typeClasses[type]

  return (
    <div
      className={cn(styles.dropdown_container, className, typeClass)}
      ref={dropdownRef}
    >
      {/* 메인 드롭다운 버튼 */}
      <button
        onClick={handleToggle}
        className={cn(
          styles.dropdown_button,
          isOpen && styles.dropdown_button_open
        )}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        {/* <div className={styles.dropdown_border} /> */}

        <div className={styles.dropdown_text}>
          <p className={styles.dropdown_label}>
            {getButtonText() || placeholder}
          </p>
        </div>

        <div
          className={cn(
            styles.dropdown_icon,
            isOpen && styles.dropdown_icon_rotated
          )}
        >
          {(type === 'default' || type === 'inquiry') && (
            <Icon name='dropdown' />
          )}
          {type === 'expand' && <Icon name='expand' />}
        </div>
      </button>

      {/* 드롭다운 옵션 목록 */}
      {isOpen && (
        <div className={styles.dropdown_menu}>
          {/* 전체 옵션 (토글 가능) */}
          {showDefaultOption && (
            <button
              onClick={() => handleOptionToggle(defaultValue)}
              className={cn(
                styles.dropdown_option,
                (type === 'default' || type === 'inquiry') &&
                  styles.dropdown_option_with_checkbox,
                selectedValues.length === 0 && styles.dropdown_option_selected
              )}
              role='option'
              aria-selected={selectedValues.length === 0}
            >
              {(type === 'default' || type === 'inquiry') && (
                <span
                  className={cn(
                    styles.checkbox,
                    selectedValues.length !== 0 && styles.checkbox_hidden
                  )}
                >
                  <Icon name='check' color='var(--color-primary)' />
                </span>
              )}
              <span>{defaultValue}</span>
            </button>
          )}

          {/* 개별 옵션들 */}
          {options.map((option, index) => {
            const isDisabled = disabledOptions.includes(option)
            return (
              <button
                key={index}
                onClick={() => handleOptionToggle(option)}
                disabled={isDisabled}
                className={cn(
                  styles.dropdown_option,
                  (type === 'default' || type === 'inquiry') &&
                    styles.dropdown_option_with_checkbox,
                  selectedValues.includes(option) &&
                    styles.dropdown_option_selected,
                  isDisabled && styles.dropdown_option_disabled
                )}
                role='option'
                aria-selected={selectedValues.includes(option)}
                aria-disabled={isDisabled}
              >
                {(type === 'default' || type === 'inquiry') && (
                  <span
                    className={cn(
                      styles.checkbox,
                      !selectedValues.includes(option) && styles.checkbox_hidden
                    )}
                  >
                    <Icon name='check' color='var(--color-primary)' />
                  </span>
                )}
                <span>{option}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
