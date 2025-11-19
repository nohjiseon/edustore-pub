'use client'

import styles from './InquiryDetailModal.module.scss'
import { mockInquiries } from '../../../_mocks/inquiryData'

import { Icon } from '@/components/Icon'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/Dialog'

interface Props {
  open?: boolean
  inquiryId: number | null
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const InquiryDetailModal = ({
  open = false,
  inquiryId,
  onOpenChange,
  zIndex
}: Props) => {
  const inquiry = mockInquiries.find((item) => item.id === inquiryId)

  if (!inquiry) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal} zIndex={zIndex}>
        <div className={styles.modal_inner}>
          <DialogHeader>
            <DialogTitle>자료 문의</DialogTitle>
          </DialogHeader>

          <div className={styles.content}>
            {/* 질문 섹션 */}
            <div className={styles.question_section}>
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

              <div className={styles.user_info}>
                <span className={styles.author}>{inquiry.author}</span>
                <span className={styles.date}>{inquiry.date}</span>
              </div>

              <div className={styles.question_wrapper}>
                <Icon name='question' />
                <p className={styles.question_text}>{inquiry.question}</p>
              </div>
            </div>

            {inquiry.images && inquiry.images.length > 0 && (
              <div className={styles.image_gallery}>
                {inquiry.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`문의 첨부 이미지 ${index + 1}`}
                    className={styles.image}
                  />
                ))}
              </div>
            )}

            {/* 답변 섹션 (있을 경우) */}
            {inquiry.answer && (
              <div className={styles.answer_section}>
                <Icon name='answer' />
                <div className={styles.answer_content}>
                  <div className={styles.answer_meta}>
                    <span className={styles.author}>
                      {inquiry.answer.author}
                    </span>
                    <span className={styles.date}>{inquiry.answer.date}</span>
                  </div>
                  <p className={styles.answer_text}>{inquiry.answer.content}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InquiryDetailModal
