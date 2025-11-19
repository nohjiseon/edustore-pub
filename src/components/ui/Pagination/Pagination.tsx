'use client'

import styles from './Pagination.module.scss'

import { Icon } from '~/components/Icon'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisiblePages?: number
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5
}: Props) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // 표시할 페이지 번호 계산
  const getVisiblePages = () => {
    const pages: number[] = []
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // 끝에 도달했을 때 시작 페이지 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        {/* 이전 버튼 */}
        <button
          className={`${styles.nav_button} ${
            currentPage === 1 ? styles.disabled : ''
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label='이전 페이지'
        >
          <Icon name='chevron-left-l' color='var(--color-neutral-black-2)' />
        </button>

        {/* 페이지 번호들 */}
        <div className={styles.pages}>
          {visiblePages.map((page) => (
            <button
              key={page}
              className={`${styles.page_button} ${
                page === currentPage ? styles.active : ''
              }`}
              onClick={() => onPageChange(page)}
              aria-label={`${page}페이지`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        {/* 다음 버튼 */}
        <button
          className={`${styles.nav_button} ${styles.next} ${
            currentPage === totalPages ? styles.disabled : ''
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label='다음 페이지'
        >
          <Icon name='chevron-left-l' color='var(--color-neutral-black-2)' />
        </button>
      </div>
    </div>
  )
}

export default Pagination
