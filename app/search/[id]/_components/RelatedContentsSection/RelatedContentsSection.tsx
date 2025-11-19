'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import styles from './RelatedContents.module.scss'
import { mockRelatedContents } from '../../_mocks/relatedContents'

import { ContentCard, TagList } from '@/components/ui'
import { convertTagDataToTags } from '@/utils/tag'
import { Icon } from '~/components/Icon'

interface Props {
  className?: string
}

const RelatedContentsSection = ({ className }: Props) => {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 366 // 카드 너비(342px) + 간격(24px)
    const newScrollLeft =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })

    // 스크롤 후 버튼 상태 업데이트
    setTimeout(updateScrollButtons, 300)
  }

  const handleCardClick = (id: number) => {
    router.push(`/search/${id}`)
  }

  return (
    <section className={className}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>이 자료와 함께보면 좋은 자료</h2>
          <div className={styles.navigation}>
            <button
              className={`${styles.nav_button} ${
                !canScrollLeft && styles.disabled
              }`}
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label='이전 자료 보기'
            >
              <Icon name='chevron-left-s' color='var(--color-neutral-grey-3)' />
            </button>
            <button
              className={`${styles.nav_button} ${
                !canScrollRight && styles.disabled
              }`}
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label='다음 자료 보기'
            >
              <Icon
                name='chevron-right-s'
                color='var(--color-neutral-grey-3)'
              />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className={styles.cards_wrapper}
          onScroll={updateScrollButtons}
        >
          <div className={styles.cards_container}>
            {mockRelatedContents.map((content) => (
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
                maxWidth={342}
                onClick={() => handleCardClick(content.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RelatedContentsSection
