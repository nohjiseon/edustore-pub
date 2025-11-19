'use client'

import styles from './InquiryHeader.module.scss'

import InquiryModal from '@/components/modal/InquireFormModal/InquireFormModal'
import { useModal } from '@/hooks/useModal'

const InquiryHeader = () => {
  const { openModal } = useModal()

  const handleInquiryClick = () => {
    openModal(InquiryModal)
  }

  return (
    <div className={styles.header}>
      {/* 제목 + 문의하기 버튼 */}
      <div className={styles.title_wrapper}>
        <h2 className={styles.title}>자료 문의</h2>
        <button className={styles.inquiry_button} onClick={handleInquiryClick}>
          문의하기
        </button>
      </div>

      {/* 안내 문구 */}
      <div className={styles.notice}>
        <h3 className={styles.notice_title}>콘텐츠 문의</h3>
        <p className={styles.notice_description}>
          자료 관련 문의 이외의 글(광고, 욕설, 비방 등)은 사전 예고 없이 노출이
          제한되거나 삭제될 수 있습니다. 또한 공개 게시판이므로 연락처, 이메일
          등 개인정보는 작성하지 않도록 주의해 주시기 바랍니다.
        </p>
      </div>
    </div>
  )
}

export default InquiryHeader
