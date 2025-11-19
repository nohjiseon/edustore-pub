'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'

import styles from './SearchContents.module.scss'
import { parseSearchFilters, setSingleParam } from '../_utils/searchParams'

import { Icon } from '@/components/Icon'
import { ContentCard, DropdownMenu, Pagination, TagList } from '@/components/ui'
import useSearchQuery from '@/hooks/queries/useSearchQuery'
import type { SearchCommandDto } from '@/types/search'
import { convertTagDataToTags } from '@/utils/tag'
import EmptyState from '~/components/common/EmptyState'

type SortType = 'ACCURACY' | 'LATEST' | 'PRICE_DESC' | 'PRICE_ASC'

const SORT_OPTIONS: Record<SortType, string> = {
  ACCURACY: '정확도순',
  LATEST: '최신순',
  PRICE_DESC: '높은가격순',
  PRICE_ASC: '낮은가격순'
}

const DEFAULT_PAGE_SIZE = 10

const SearchContents = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sortType, setSortType] = useState<SortType>('LATEST')

  // URL 파라미터 파싱
  const filters = useMemo(
    () => parseSearchFilters(searchParams),
    [searchParams]
  )

  // SearchCommandDto 생성
  const searchCommand: SearchCommandDto = useMemo(
    () => ({
      searchKeyword: filters.keyword || '',
      grade: filters.grade?.[0],
      subject: filters.subject?.[0],
      priceType: filters.price?.[0],
      form: filters.ext?.[0],
      sortType: sortType,
      page: filters.page || 0,
      size: filters.size || DEFAULT_PAGE_SIZE
    }),
    [filters, sortType]
  )

  // Suspense 경계 내에서 data는 항상 존재함
  const { data } = useSearchQuery(searchCommand)

  const handleCardClick = (id: number) => {
    router.push(`/content/${id}`)
  }

  const handleSortChange = (newSortType: SortType) => {
    setSortType(newSortType)
    // URL 파라미터 업데이트 (정렬 옵션만 변경)
    const params = setSingleParam(
      new URLSearchParams(searchParams.toString()),
      'sort',
      newSortType
    )
    router.push(`/search?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    // URL 파라미터 업데이트 (페이지 번호 변경, 0-based index)
    const params = setSingleParam(
      new URLSearchParams(searchParams.toString()),
      'page',
      (page - 1).toString()
    )
    router.push(`/search?${params.toString()}`)
  }

  if (!data || data.items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title_wrapper}>
            <span className={styles.title_bold}>수업자료</span>
            <span className={styles.title_text}>검색 결과</span>
            <span className={styles.title_text}>0개</span>
          </div>
        </div>
        <EmptyState
          title='검색 결과가 없습니다.'
          subtitle='입력하신 내용을 다시 확인하거나 다른 키워드로 검색해 보세요.'
        />

        <div className={styles.pagination_wrapper}>
          <Pagination
            currentPage={1}
            totalPages={1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    )
  }

  const dropdownItems = Object.entries(SORT_OPTIONS).map(([key, label]) => ({
    label,
    action: () => handleSortChange(key as SortType)
  }))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title_wrapper}>
          <span className={styles.title_bold}>수업자료</span>
          <span className={styles.title_text}>검색 결과</span>
          <span className={styles.title_text}>{data.total}개</span>
        </div>

        <DropdownMenu
          trigger={
            <div className={styles.sort_trigger}>
              <span className={styles.sort_label}>
                {SORT_OPTIONS[sortType]}
              </span>
              <Icon name='sort' className={styles.sort_icon} />
            </div>
          }
          items={dropdownItems}
          align='end'
          side='bottom'
        />
      </div>

      <div className={styles.grid}>
        {data.items.map((content) => (
          <ContentCard
            key={content.id}
            id={content.id}
            rating={content.rating}
            tags={<TagList tags={convertTagDataToTags(content.tags)} />}
            title={content.title}
            description={content.description}
            author={content.author}
            price={content.price}
            imageSrc={content.imageSrc}
            onClick={() => handleCardClick(content.id)}
          />
        ))}
      </div>

      <div className={styles.pagination_wrapper}>
        <Pagination
          currentPage={(filters.page || 0) + 1}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default SearchContents
