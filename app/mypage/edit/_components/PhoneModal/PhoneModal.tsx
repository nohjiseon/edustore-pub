'use client'

import { useState, type ChangeEvent } from 'react'

import styles from './PhoneModal.module.scss'

import Button from '@/components/ui/Button/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/Dialog'
import { Icon } from '~/components/Icon'
import { Input } from '~/components/ui'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const PhoneModal = ({ open = false, onOpenChange, zIndex }: Props) => {
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
  const [verified, setVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    setPhone(nextValue)

    if (phoneError) {
      setPhoneError(false)
      setPhoneErrorMessage('')
    }

    if (verified) {
      setVerified(false)
      setVerificationCode('')
    }
  }

  const handleSendVerification = () => {
    // 간단한 유효성 검사 (예: 숫자만, 길이 체크)
    const digits = phone.replace(/[^0-9]/g, '')
    if (digits.length < 9 || digits.length > 11) {
      setPhoneError(true)
      setPhoneErrorMessage('유효한 전화번호를 입력해 주세요.')
      return
    }

    // 유효하면 에러 해제, verified 상태로 전환
    setPhoneError(false)
    setPhoneErrorMessage('')
    setVerified(true)

    // 실제로는 인증번호 전송 API 호출 후 처리
    console.log('인증번호 전송:', digits)
  }

  const handleSave = () => {
    // 저장 로직 구현 (예: 번호와 인증 체크 전송)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <DialogHeader className={styles.modal_header} borderHidden>
          <DialogTitle className={styles.modal_title}>휴대폰 번호</DialogTitle>
        </DialogHeader>
        <div className={styles.modal_body}>
          <div className={styles.label}>휴대폰 번호</div>
          <div className={styles.input_group}>
            <Input
              placeholder='예) 01023456789'
              value={phone}
              onChange={handlePhoneChange}
              errorMessage={phoneErrorMessage}
            />
            <button
              type='button'
              className={
                verified ? styles.resend_btn : styles.certification_btn
              }
              onClick={handleSendVerification}
            >
              {verified ? '인증번호 재전송' : '본인인증'}
            </button>
          </div>
          <div className={styles.success_wrap}>
            <Input
              placeholder='인증번호를 입력해 주세요.'
              value={verificationCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setVerificationCode(e.target.value)
              }
              disabled={!verified}
            />
            {verificationCode.trim().length > 0 && <Icon name='check' />}
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
            disabled={verificationCode.trim().length === 0}
            width={195}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PhoneModal
