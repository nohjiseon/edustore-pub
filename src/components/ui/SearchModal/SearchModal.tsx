'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import styles from './SearchModal.module.scss'

import IcBtn3 from '@/assets/images/main/ic_btn3.png'
import IcClock from '@/assets/images/main/ic_clock.png'
import IcFolder from '@/assets/images/main/ic_folder.png'
import IcNote from '@/assets/images/main/ic_note.png'
import IcPuzzle from '@/assets/images/main/ic_puzzle.png'
import { Icon } from '@/components/Icon'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog'

export interface SearchModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  // 기본 검색어 (placeholder와 동일)
  const DEFAULT_SEARCH_KEYWORD = '새학기 학급운영'

  // 추천검색어 데이터
  const recommendedKeywords = [
    {
      icon: IcClock,
      alt: '시계 아이콘',
      keyword: '새학기 맞이 필수 학급 운영 자료'
    },
    { icon: IcPuzzle, alt: '퍼즐 아이콘', keyword: '방과후 특별수업 자료' },
    { icon: IcBtn3, alt: '책 아이콘', keyword: '독서교육 활동지' },
    {
      icon: IcFolder,
      alt: '폴더 아이콘',
      keyword: '학급 회의록 & 시간표 양식'
    },
    { icon: IcNote, alt: '노트 아이콘', keyword: '가정통신문 양식' }
  ]

  // 인기검색어 데이터
  const popularKeywords = [
    { rank: 1, keyword: '학급 운영 규칙 자료' },
    { rank: 2, keyword: '초등 영어 회화 활동지' },
    { rank: 3, keyword: '고등학교 수학 수행평가' },
    { rank: 4, keyword: 'AI 활용 수업 자료' },
    { rank: 5, keyword: '진로탐색 활동지' }
  ]

  const handleSearch = () => {
    const trimmed = searchValue.trim()
    // 검색어가 비어있으면 기본 검색어 사용
    const keyword = trimmed || DEFAULT_SEARCH_KEYWORD

    // URL 인코딩하여 검색 페이지로 이동 (히스토리 추가)
    const encoded = encodeURIComponent(keyword)
    router.push(`/search?keyword=${encoded}`)

    // 모달 자동 닫기
    onOpenChange?.(false)
  }

  const handleKeywordClick = (keyword: string) => {
    // 추천/인기 검색어 클릭 시 즉시 검색 페이지로 이동
    const encoded = encodeURIComponent(keyword)
    router.push(`/search?keyword=${encoded}`)

    // 모달 자동 닫기
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className={styles.trigger_button} aria-label='검색 열기'>
          <Icon name='search' />
        </button>
      </DialogTrigger>

      <DialogContent className={styles.modal_wrapper}>
        <DialogTitle hidden>검색</DialogTitle>

        <div className={styles.modal_content}>
          {/* 모달 헤더 */}
          <DialogHeader className={styles.modal_header} borderHidden>
            <div className={styles.logo_section}>
              <Icon name='logo-symbol' width={26} height={22} />
              <Icon name='logo-text' width={54} height={16} />
            </div>
          </DialogHeader>

          {/* 모달 바디 */}
          <div className={styles.modal_body}>
            {/* 검색 입력 섹션 */}
            <div className={styles.search_section}>
              <div className={styles.search_input_wrapper}>
                <Icon name='search' className={styles.search_icon} />
                <input
                  type='text'
                  placeholder='필요한 자료를 검색해 보세요.'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className={styles.search_input}
                />
              </div>
              <button onClick={handleSearch} className={styles.search_button}>
                자료 검색
              </button>
            </div>

            {/* 추천검색어 섹션 */}
            <div className={styles.keywords_section}>
              <h3 className={styles.section_title}>추천검색어</h3>
              <div className={styles.recommended_keywords}>
                {recommendedKeywords.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleKeywordClick(item.keyword)}
                    className={styles.keyword_chip}
                  >
                    <Image src={item.icon} alt={item.alt} />
                    <span>{item.keyword}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 인기검색어 섹션 */}
            <div className={styles.keywords_section}>
              <h3 className={styles.section_title}>인기검색어</h3>
              <div className={styles.popular_keywords}>
                {popularKeywords.map((item) => (
                  <button
                    key={item.rank}
                    onClick={() => handleKeywordClick(item.keyword)}
                    className={styles.popular_keyword_item}
                  >
                    <div className={styles.rank_badge}>{item.rank}</div>
                    <span className={styles.keyword_text}>{item.keyword}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal
