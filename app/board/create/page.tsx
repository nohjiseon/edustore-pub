'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import BoardCreateSuccessModal from './_components/BoardCreateSuccessModal/BoardCreateSuccessModal'
import styles from './page.module.scss'

import { Button } from '~/components/ui'
import Textarea from '~/components/ui/Textarea'
import ToggleBadge from '~/components/ui/ToggleBadge'

const BoardCreatePage = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const categories = [
    { label: '전체', value: 'all' },
    { label: '유아', value: 'infant' },
    { label: '초등', value: 'elementary' },
    { label: '중등', value: 'middle' },
    { label: '고등', value: 'high' },
    { label: '특수', value: 'special' },
    { label: '기타', value: 'etc' }
  ]

  const handleCancel = () => {
    router.push('/board')
  }

  const handleSubmit = () => {
    // 유효성 검사
    let isValid = true

    // 제목 검사
    if (!title || title.trim().length === 0) {
      setTitleError('1자 이상 최대 30자 이하 입력하세요.')
      isValid = false
    } else if (title.length > 30) {
      setTitleError('1자 이상 최대 30자 이하 입력하세요.')
      isValid = false
    } else {
      setTitleError('')
    }

    // 내용 검사
    if (!content || content.trim().length === 0) {
      setContentError('1자 이상 최대 300자 이하 입력하세요.')
      isValid = false
    } else if (content.length > 300) {
      setContentError('1자 이상 최대 300자 이하 입력하세요.')
      isValid = false
    } else {
      setContentError('')
    }

    // 모든 조건 만족 시 성공 모달 표시
    if (isValid) {
      setShowSuccessModal(true)
    }
  }

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>자료 요청 게시판</h1>
        <p className={styles.description}>
          필요한 수업 자료가 없나요? 수업가게에 원하는 자료를 요청해 보세요.
          다른 선생님들이 직접 만들어 등록해 주실 수 있어요.
        </p>
      </div>

      <div className={styles.form_wrap}>
        {/* 구분 선택 */}
        <div className={styles.form_group}>
          <label className={styles.label}>
            <span className={styles.required}>*</span>
            내용 구분
          </label>
          <div className={styles.tag_wrap}>
            {categories.map((category) => (
              <ToggleBadge
                key={category.value}
                size='md'
                selected={selectedCategory === category.value}
                onClick={() => handleCategorySelect(category.value)}
              >
                {category.label}
              </ToggleBadge>
            ))}
          </div>
        </div>

        {/* 제목 입력 */}
        <div className={styles.form_group}>
          <label className={styles.label}>
            <span className={styles.required}>*</span>
            제목 입력
          </label>
          <Textarea
            className={styles.title_input}
            placeholder='요청 자료를 한 번에 확인할 수 있도록 제목을 작성해 주세요.'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (titleError) {
                setTitleError('')
              }
            }}
            rows={2}
            maxLength={30}
            showCounter
          />
          {titleError && (
            <div className={styles.error_message}>{titleError}</div>
          )}
        </div>

        {/* 내용 입력 */}
        <div className={styles.form_group}>
          <label className={styles.label}>
            <span className={styles.required}>*</span>
            내용 입력
          </label>
          <Textarea
            placeholder='요청하고 싶은 자료에 대해 작성해 주세요.'
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              if (contentError) {
                setContentError('')
              }
            }}
            rows={17}
            maxLength={300}
            showCounter
          />
          {contentError && (
            <div className={styles.error_message}>{contentError}</div>
          )}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className={styles.btn_wrap}>
        <Button variant='outline' width={355} onClick={handleCancel}>
          취소
        </Button>
        <Button variant='default' width={355} onClick={handleSubmit}>
          등록하기
        </Button>
      </div>

      {/* 성공 모달 */}
      <BoardCreateSuccessModal
        open={showSuccessModal}
        onOpenChange={(open) => {
          setShowSuccessModal(open)
          if (!open) {
            // 작성된 해당 상세페이지로 이동
            router.push('/board/1')
          }
        }}
      />
    </div>
  )
}

export default BoardCreatePage
