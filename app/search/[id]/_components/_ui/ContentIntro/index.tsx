'use client'

import Image from 'next/image'
import { useState } from 'react'

import styles from './ContentIntro.module.scss'
import type { ContentIntroSection } from '../../../_mocks/detailData'

import { TipTapViewer } from '~/components/ui'

interface Props {
  data: ContentIntroSection
}

const ContentIntro = ({ data }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={styles.container}>
      <div className={styles.image_wrapper}>
        <Image
          src={data.images.primary}
          alt='자료 소개 이미지 1'
          width={952}
          height={440}
          className={styles.image}
        />
      </div>

      <div
        className={`${styles.text_content} ${
          !isExpanded ? styles.collapsed : ''
        }`}
      >
        <TipTapViewer content={data.shortText} />
      </div>

      <div className={styles.image_wrapper}>
        <Image
          src={data.images.secondary}
          alt='자료 소개 이미지 2'
          width={952}
          height={796}
          className={styles.image}
        />
      </div>

      <div
        className={`${styles.text_content} ${
          !isExpanded ? styles.collapsed : ''
        } ${!isExpanded ? styles.long_text : ''}`}
      >
        <TipTapViewer content={isExpanded ? data.fullText : data.longText} />
      </div>

      <button
        type='button'
        className={styles.toggle_button}
        onClick={handleToggle}
      >
        <span className={styles.button_text}>
          {isExpanded ? '접기' : '더보기'}
        </span>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          className={`${styles.icon} ${isExpanded ? styles.icon_rotated : ''}`}
        >
          <path
            d='M7 10L12 15L17 10'
            stroke='#333333'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  )
}

export default ContentIntro
