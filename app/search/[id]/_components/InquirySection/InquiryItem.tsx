'use client'

import { useState } from 'react'

import styles from './InquiryItem.module.scss'
import type { Inquiry } from '../../_mocks/inquiryData'

import { Icon } from '@/components/Icon'
import DropdownMenu from '@/components/ui/DropdownMenu'
import ImageThumbnail from '@/components/ui/ImageThumbnail'

interface Props {
  inquiry: Inquiry
  onImageClick: () => void
}

const InquiryItem = ({ inquiry, onImageClick }: Props) => {
  const handleReport = () => {
    console.log('신고하기 클릭')
    // TODO: 신고하기 로직 구현
  }

  return (
    <div className={styles.container}>
      {/* 헤더: 상태 + 토글 버튼 */}
      <div className={styles.header}>
        <div className={styles.status_wrapper}>
          <span className={styles.category}>{inquiry.category}</span>
          <div className={styles.divider} />
          <span
            className={`${styles.status} ${
              inquiry.statusColor === 'primary' ? styles.primary : ''
            }`}
          >
            {inquiry.status}
          </span>
        </div>
        <DropdownMenu
          trigger={
            <button className={styles.toggle_button} aria-label='더보기'>
              <Icon name='kebab-pc' color='var(--color-neutral-grey-2)' />
            </button>
          }
          items={[{ label: '신고하기', action: handleReport }]}
          side='left'
        />
      </div>

      {/* 질문 영역 */}
      <div className={styles.question_wrapper}>
        <div className={styles.question_content}>
          <div className={styles.question_meta}>
            <span className={styles.author}>{inquiry.author}</span>
            <span className={styles.date}>{inquiry.date}</span>
          </div>
          <div className={styles.question_text}>
            <div className={styles.q_badge}>Q</div>
            <p className={styles.question}>{inquiry.question}</p>
          </div>
        </div>

        {/* 이미지 썸네일 */}
        {inquiry.images && inquiry.images.length > 0 && (
          <ImageThumbnail
            imageSrc={inquiry.images[0]}
            imageAlt='문의 첨부 이미지'
            imageCount={inquiry.imageCount}
            className={styles.image_thumbnail_spacing}
            onClick={onImageClick}
          />
        )}
      </div>

      {/* 답변 영역 (답변이 있고 열려있을 때만 표시) */}
      {inquiry.answer && (
        <div className={styles.answer_wrapper}>
          <div className={styles.a_badge}>A</div>
          <div className={styles.answer_content}>
            <div className={styles.answer_meta}>
              <span className={styles.author}>{inquiry.answer.author}</span>
              <span className={styles.date}>{inquiry.answer.date}</span>
            </div>
            <p className={styles.answer_text}>{inquiry.answer.content}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default InquiryItem
