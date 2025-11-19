'use client'

import { useMemo, useState, type ChangeEvent } from 'react'

import styles from './EmailModal.module.scss'

import Button from '@/components/ui/Button/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/Dialog'
import { Input } from '~/components/ui'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const EmailModal = ({ open = false, onOpenChange, zIndex }: Props) => {
  const [email, setEmail] = useState('')
  const [helperMessage, setHelperMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)

  const isSaveDisabled = useMemo(
    () => !email.trim() || !isDuplicateChecked || !isAvailable,
    [email, isAvailable, isDuplicateChecked]
  )

  const resetValidation = () => {
    setHelperMessage('')
    setErrorMessage('')
    setIsDuplicateChecked(false)
    setIsAvailable(null)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    setEmail(nextValue)
    resetValidation()
  }

  const validateEmail = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) {
      setErrorMessage('이메일을 입력해 주세요.')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      setErrorMessage('올바른 이메일 형식을 입력해 주세요.')
      return false
    }

    return true
  }

  const handleDuplicationCheck = () => {
    resetValidation()

    if (!validateEmail(email)) {
      return
    }

    // TODO: 실제 API 연동으로 중복 여부 확인
    const mockIsAvailable = true

    setIsDuplicateChecked(true)
    setIsAvailable(mockIsAvailable)

    if (mockIsAvailable) {
      setHelperMessage('사용 가능한 이메일입니다.')
    } else {
      setErrorMessage('이미 사용 중인 이메일입니다.')
    }
  }

  const handleSave = () => {
    if (isSaveDisabled) return

    // TODO: 실제 저장 로직 연동
    onOpenChange?.(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <DialogHeader className={styles.modal_header} borderHidden>
          <DialogTitle className={styles.modal_title}>이메일 수정</DialogTitle>
        </DialogHeader>
        <div className={styles.modal_body}>
          <div className={styles.label}>이메일</div>
          <div
            className={`${styles.input_group} ${
              isDuplicateChecked && isAvailable === true ? styles.success : ''
            }`}
          >
            <Input
              placeholder='이메일을 입력해 주세요.'
              value={email}
              onChange={handleEmailChange}
              errorMessage={errorMessage}
              className={
                isDuplicateChecked && isAvailable === true
                  ? styles.input_success
                  : ''
              }
            />
            <button
              type='button'
              className={`${styles.duplication_btn} ${
                isDuplicateChecked && isAvailable === true ? styles.success : ''
              }`}
              onClick={handleDuplicationCheck}
            >
              중복확인
            </button>
          </div>
          {helperMessage && !errorMessage && (
            <p className={styles.success_message}>{helperMessage}</p>
          )}
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

export default EmailModal
