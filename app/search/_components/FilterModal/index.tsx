'use client'

import React, { useState, useMemo, useEffect } from 'react'

import styles from './FilterModal.module.scss'
import FilterSection from './FilterSection'

import Button from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/Dialog'
import { SEARCH_FILTER_OPTIONS } from '@/constants/education'
import { useSearchFilterStore } from '@/stores/search-filter'

interface FilterState {
  grade: string[]
  subject: string[]
  resourceType: string[]
  fileExtension: string[]
  price: string[]
}

interface FilterModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  initialFilters?: FilterState
  onApply: (filters: FilterState) => void
  zIndex?: number
}

const FilterModal = ({
  open = false,
  onOpenChange,
  initialFilters,
  onApply,
  zIndex
}: FilterModalProps) => {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      grade: [],
      subject: [],
      resourceType: [],
      fileExtension: [],
      price: []
    }
  )

  // Zustand store 사용 - 직접 selector로 구독
  const setSelectedGrades = useSearchFilterStore(
    (state) => state.setSelectedGrades
  )
  const enabledSubjects = useSearchFilterStore((state) => state.enabledSubjects)
  const disabledSubjects = useSearchFilterStore(
    (state) => state.disabledSubjects
  )

  // 학년 변경 시 store 업데이트
  useEffect(() => {
    setSelectedGrades(filters.grade)
  }, [filters.grade, setSelectedGrades])

  // initialFilters 변경 시 filters 동기화
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters)
    }
  }, [initialFilters])

  // 학년 변경 시 유효하지 않은 교과 선택 제거
  useEffect(() => {
    if (filters.grade.length > 0) {
      setFilters((prev) => ({
        ...prev,
        subject: prev.subject.filter((subject) =>
          enabledSubjects.includes(subject)
        )
      }))
    }
  }, [enabledSubjects])

  const handleToggle = (category: keyof FilterState, option: string) => {
    setFilters((prev) => {
      const currentOptions = prev[category]
      const isSelected = currentOptions.includes(option)

      return {
        ...prev,
        [category]: isSelected
          ? currentOptions.filter((item) => item !== option)
          : [...currentOptions, option]
      }
    })
  }

  const handleReset = () => {
    setFilters({
      grade: [],
      subject: [],
      resourceType: [],
      fileExtension: [],
      price: []
    })
  }

  const handleApply = () => {
    onApply(filters)
    onOpenChange?.(false)
  }

  const handleDialogOpenChange = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className={styles.modal} zIndex={zIndex}>
        <DialogHeader borderHidden className={styles.header}>
          <DialogTitle className={styles.header_content}>
            <span className={styles.title}>상세 필터 선택</span>
            <span className={styles.subtitle}>다중 선택 가능</span>
          </DialogTitle>
        </DialogHeader>

        <div className={styles.content}>
          <div className={styles.scroll_container}>
            <FilterSection
              title='대상 학년'
              options={SEARCH_FILTER_OPTIONS.grade}
              selected={filters.grade}
              onToggle={(option) => handleToggle('grade', option)}
            />

            <FilterSection
              title='대상 교과'
              options={SEARCH_FILTER_OPTIONS.subject}
              selected={filters.subject}
              disabledOptions={disabledSubjects}
              onToggle={(option) => handleToggle('subject', option)}
            />

            <FilterSection
              title='자료 유형'
              options={SEARCH_FILTER_OPTIONS.resourceType}
              selected={filters.resourceType}
              onToggle={(option) => handleToggle('resourceType', option)}
            />

            <FilterSection
              title='자료 확장자'
              options={SEARCH_FILTER_OPTIONS.fileExtension}
              selected={filters.fileExtension}
              onToggle={(option) => handleToggle('fileExtension', option)}
            />

            <FilterSection
              title='자료 가격'
              options={SEARCH_FILTER_OPTIONS.price}
              selected={filters.price}
              onToggle={(option) => handleToggle('price', option)}
            />
          </div>
        </div>

        <div className={styles.bottom_buttons}>
          <Button variant='outline' width={218} onClick={handleReset}>
            초기화
          </Button>
          <Button onClick={handleApply}>선택 완료</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FilterModal
