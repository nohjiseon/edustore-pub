'use client'

import { useRef, useState, useEffect, type ChangeEvent } from 'react'

import styles from './SubjectModal.module.scss'

import Button from '@/components/ui/Button/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/Dialog'
import { Icon } from '~/components/Icon'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  initialTopics?: string[]
}

const MAX_TOPICS = 5

const SubjectModal = ({
  open = false,
  onOpenChange,
  zIndex,
  initialTopics = []
}: Props) => {
  const [topic, setTopic] = useState('')
  const [selectedSub, setSelectedSub] = useState<string[]>(initialTopics)
  const inputRef = useRef<HTMLInputElement>(null)

  // 모달이 열릴 때 초기값 설정
  useEffect(() => {
    if (open) {
      setSelectedSub(initialTopics)
      setTopic('')
    }
  }, [open, initialTopics])

  const isTopicValid =
    topic.trim().length >= 2 &&
    topic.trim().length <= 20 &&
    selectedSub.length < MAX_TOPICS

  const isSaveDisabled = selectedSub.length === 0

  const handleAddTopic = () => {
    if (!isTopicValid) return

    const trimmedTopic = topic.trim()

    // 중복 체크
    if (selectedSub.includes(trimmedTopic)) {
      return
    }

    setSelectedSub((prev) => [...prev, trimmedTopic])
    setTopic('')

    inputRef.current?.focus()
  }

  const handleRemoveTopic = (value: string) => {
    setSelectedSub((prev) => prev.filter((v) => v !== value))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTopic()
    }
  }

  const handleTopicChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  const handleSave = () => {
    if (isSaveDisabled) return

    // TODO: 실제 저장 로직 연동 (selectedSub를 전달)
    console.log('저장할 관심 주제:', selectedSub)
    onOpenChange?.(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <DialogHeader className={styles.modal_header} borderHidden>
          <DialogTitle className={styles.modal_title}>
            관심 주제 입력
          </DialogTitle>
        </DialogHeader>
        <div className={styles.modal_body}>
          {/* 관심 주제 타이틀 */}
          <div className={styles.interest_title_wrap}>
            <span className={styles.interest_title}>관심 주제 입력</span>
            <span className={styles.interest_desc}>
              최대 {MAX_TOPICS}개까지 입력 가능
            </span>
          </div>

          {/* 관심 주제 입력창 */}
          <div className={styles.interest_input_wrap}>
            <input
              type='text'
              placeholder='예 : 독도, 어린이날'
              ref={inputRef}
              value={topic}
              onChange={handleTopicChange}
              onKeyPress={handleKeyPress}
              maxLength={20}
              disabled={selectedSub.length >= MAX_TOPICS}
            />
            <Button onClick={handleAddTopic} disabled={!isTopicValid}>
              추가
            </Button>
          </div>

          {/* 선택된 주제 목록 */}
          <div className={styles.topics_ul_wrap}>
            <ul>
              {selectedSub.map((item) => (
                <li key={item}>
                  <span>#{item}</span>
                  <Icon
                    name='close-s'
                    onClick={() => handleRemoveTopic(item)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter className={styles.modal_footer}>
          <Button
            variant='outline'
            onClick={() => onOpenChange && onOpenChange(false)}
            width={195}
          >
            취소
          </Button>
          <Button
            variant='default'
            onClick={handleSave}
            disabled={isSaveDisabled}
            width={195}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SubjectModal
