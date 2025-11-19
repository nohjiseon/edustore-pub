'use client'

import React, { useMemo, useEffect } from 'react'

import FilterModal from './FilterModal'
import styles from './FiltersPanel.module.scss'
import useSearchParamControls from '../_hooks/useSearchParamControls'

import {
  labelToSearchParam,
  findAllGroupForParam,
  removeFromAllGroup,
  searchParamsToLabels
} from '@/utils/education-mapping'
import { Icon } from '~/components/Icon'
import FilterDropdown from '~/components/ui/FilterDropdown'
import { SEARCH_FILTER_OPTIONS } from '~/constants/education'
import { useModal } from '~/hooks/useModal'
import { useSearchFilterStore } from '~/stores/search-filter'

interface FilterState {
  grade: string[]
  subject: string[]
  resourceType: string[]
  fileExtension: string[]
  price: string[]
}

const FiltersPanel = () => {
  const { openModal } = useModal()
  const { filters, filtersUI, setBulkFilters, clearAllFilters } =
    useSearchParamControls()

  // Zustand store 사용 - 직접 selector로 구독
  const setSelectedGrades = useSearchFilterStore(
    (state) => state.setSelectedGrades
  )
  const enabledSubjects = useSearchFilterStore((state) => state.enabledSubjects)
  const disabledSubjects = useSearchFilterStore(
    (state) => state.disabledSubjects
  )

  const handleOpenModal = () => {
    openModal(FilterModal, {
      initialFilters: {
        grade: filtersUI.grade || [],
        subject: filtersUI.subject || [],
        resourceType: filtersUI.type || [],
        fileExtension: filtersUI.ext || [],
        price: filtersUI.price || []
      },
      onApply: handleApplyFilters
    })
  }

  const handleApplyFilters = (filters: FilterState) => {
    setBulkFilters({
      grade: filters.grade,
      subject: filters.subject,
      type: filters.resourceType,
      ext: filters.fileExtension,
      price: filters.price
    })
  }

  const handleRemoveFilter = (category: keyof FilterState, value: string) => {
    switch (category) {
      case 'grade':
      case 'subject': {
        // label → searchParam 변환
        const searchParam = labelToSearchParam(value)
        if (!searchParam) return

        // URL의 현재 필터 값 가져오기 (searchParam 배열)
        const currentParams =
          category === 'grade' ? filters.grade || [] : filters.subject || []

        // 제거하려는 searchParam이 속한 "-all" 그룹 찾기
        const allGroup = findAllGroupForParam(searchParam)

        let newParams: string[]

        if (allGroup && currentParams.includes(allGroup)) {
          // "-all" 그룹이 URL에 있는 경우
          // 1. "-all" 그룹 제거
          // 2. 해당 그룹의 다른 항목들은 개별적으로 추가
          const remainingParams = removeFromAllGroup(allGroup, searchParam)
          newParams = [
            ...currentParams.filter((p: string) => p !== allGroup),
            ...remainingParams
          ]
        } else {
          // 개별 항목만 제거
          newParams = currentParams.filter((p: string) => p !== searchParam)
        }

        // 중복 제거
        newParams = [...new Set(newParams)]

        // label로 변환하여 setBulkFilters 호출
        const newLabels = searchParamsToLabels(newParams)
        setBulkFilters(
          category === 'grade' ? { grade: newLabels } : { subject: newLabels }
        )
        break
      }

      case 'resourceType':
        // resourceType은 현재 선택된 값에서 제거
        setBulkFilters({
          type: (filtersUI.type || []).filter((item) => item !== value)
        })
        break

      case 'fileExtension':
        // fileExtension도 현재 선택된 값에서 제거
        setBulkFilters({
          ext: (filtersUI.ext || []).filter((item) => item !== value)
        })
        break

      case 'price':
        // price는 배열에서 해당 항목 제거
        setBulkFilters({
          price: (filtersUI.price || []).filter((item) => item !== value)
        })
        break

      default:
        console.warn(`Unknown filter category: ${category}`)
    }
  }

  // 모든 선택된 필터를 평면화 (URL 기반)
  const allSelectedFilters = useMemo(() => {
    const result: Array<{ category: keyof FilterState; value: string }> = []

    filtersUI.grade?.forEach((v) =>
      result.push({ category: 'grade', value: v })
    )
    filtersUI.subject?.forEach((v) =>
      result.push({ category: 'subject', value: v })
    )
    filtersUI.type?.forEach((v) =>
      result.push({ category: 'resourceType', value: v })
    )
    filtersUI.ext?.forEach((v) =>
      result.push({ category: 'fileExtension', value: v })
    )
    filtersUI.price?.forEach((v) =>
      result.push({ category: 'price', value: v })
    )

    return result
  }, [filtersUI])

  // 학년 선택이 변경될 때마다 store 업데이트
  useEffect(() => {
    setSelectedGrades(filtersUI.grade || [])
  }, [filtersUI.grade, setSelectedGrades])

  // 학년 변경 시 비활성화된 교과 자동 제거
  useEffect(() => {
    if (filtersUI.grade && filtersUI.grade.length > 0) {
      const validSubjects = (filtersUI.subject || []).filter((subject) =>
        enabledSubjects.includes(subject)
      )

      // 유효하지 않은 교과가 있으면 자동 제거
      if (
        filtersUI.subject &&
        validSubjects.length !== filtersUI.subject.length
      ) {
        setBulkFilters({ subject: validSubjects })
      }
    }
  }, [filtersUI.grade, filtersUI.subject, enabledSubjects, setBulkFilters])

  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.all_filter_button} onClick={handleOpenModal}>
          <Icon name='filter' />
          전체 필터
        </button>

        <FilterDropdown
          options={SEARCH_FILTER_OPTIONS.grade}
          defaultValue='학년 전체'
          selectedValues={filtersUI.grade || []}
          onSelect={(values) => setBulkFilters({ grade: values })}
        />
        <FilterDropdown
          options={SEARCH_FILTER_OPTIONS.subject}
          defaultValue='교과 전체'
          selectedValues={filtersUI.subject || []}
          disabledOptions={disabledSubjects}
          onSelect={(values) => setBulkFilters({ subject: values })}
        />
        <FilterDropdown
          options={SEARCH_FILTER_OPTIONS.resourceType}
          defaultValue='자료 유형 전체'
          selectedValues={filtersUI.type || []}
          onSelect={(values) => setBulkFilters({ type: values })}
        />
        <FilterDropdown
          options={SEARCH_FILTER_OPTIONS.fileExtension}
          defaultValue='파일 형식 전체'
          selectedValues={filtersUI.ext || []}
          onSelect={(values) => setBulkFilters({ ext: values })}
        />
        <FilterDropdown
          options={SEARCH_FILTER_OPTIONS.price}
          defaultValue='가격 전체'
          selectedValues={filtersUI.price || []}
          onSelect={(values) => setBulkFilters({ price: values })}
        />
      </div>

      {/* 선택된 필터 표시 영역 */}
      {allSelectedFilters.length > 0 && (
        <div className={styles.applied_filters}>
          <div className={styles.filter_items}>
            {allSelectedFilters.map((filter, index) => (
              <div
                key={`${filter.category}-${filter.value}-${index}`}
                className={styles.filter_tag}
              >
                <span>{filter.value}</span>
                <Icon
                  name='close'
                  width={16}
                  height={16}
                  onClick={() =>
                    handleRemoveFilter(filter.category, filter.value)
                  }
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>

          <button
            type='button'
            className={styles.clear_all_button}
            onClick={clearAllFilters}
          >
            <Icon name='reset' width={16} height={16} />
            전체 해제
          </button>
        </div>
      )}
    </>
  )
}

export default FiltersPanel
