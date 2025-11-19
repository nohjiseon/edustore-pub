'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import {
  parseSearchFilters,
  parseSearchFiltersUI,
  buildSearchParamsFromUI,
  toggleMultiParam,
  setSingleParam,
  type SearchFiltersUI
} from '../_utils/searchParams'

import { labelToSearchParam } from '@/utils/education-mapping'

type MultiKey = 'grade' | 'subject' | 'type' | 'ext'

const useSearchParamControls = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL 기반 필터 (searchParam - 영문)
  const filters = useMemo(
    () => parseSearchFilters(searchParams),
    [searchParams]
  )

  // UI 기반 필터 (label - 한글)
  const filtersUI = useMemo(
    () => parseSearchFiltersUI(searchParams),
    [searchParams]
  )

  const replaceWith = (next: URLSearchParams) => {
    router.replace(`/search?${next.toString()}`)
  }

  const pushWith = (next: URLSearchParams) => {
    router.push(`/search?${next.toString()}`)
  }

  const setKeyword = (value?: string) => {
    const next = setSingleParam(
      new URLSearchParams(searchParams.toString()),
      'keyword',
      value
    )
    pushWith(next)
  }

  const toggleMulti = (key: MultiKey, value: string, enabled: boolean) => {
    const next = toggleMultiParam(
      new URLSearchParams(searchParams.toString()),
      key,
      value,
      enabled
    )
    replaceWith(next)
  }

  const setPrice = (value?: string) => {
    const next = setSingleParam(
      new URLSearchParams(searchParams.toString()),
      'price',
      value
    )
    replaceWith(next)
  }

  /**
   * UI 기반 대량 필터 설정 (label 사용)
   * @example setBulkFilters({ grade: ['초등 1학년'], subject: ['국어'] })
   */
  const setBulkFilters = (newFiltersUI: Partial<SearchFiltersUI>) => {
    const params = buildSearchParamsFromUI({
      ...filtersUI,
      ...newFiltersUI
    })
    replaceWith(params)
  }

  /**
   * 전체 필터 초기화 (키워드는 유지)
   */
  const clearAllFilters = () => {
    const keyword = searchParams.get('keyword')
    if (keyword) {
      router.replace(`/search?keyword=${encodeURIComponent(keyword)}`)
    } else {
      router.replace('/search')
    }
  }

  /**
   * UI 기반 개별 필터 토글 (label 사용)
   * @example toggleFilterUI('grade', '초등 1학년', true)
   */
  const toggleFilterUI = (
    category: 'grade' | 'subject',
    label: string,
    enabled: boolean
  ) => {
    const searchParam = labelToSearchParam(label)
    if (!searchParam) return

    const next = toggleMultiParam(
      new URLSearchParams(searchParams.toString()),
      category,
      searchParam,
      enabled
    )
    replaceWith(next)
  }

  return {
    filters, // URL 기반 (searchParam - 영문)
    filtersUI, // UI 기반 (label - 한글)
    setKeyword,
    toggleMulti, // searchParam 기반 토글
    toggleFilterUI, // label 기반 토글
    setPrice,
    setBulkFilters, // 대량 필터 설정
    clearAllFilters // 전체 초기화
  }
}

export default useSearchParamControls
