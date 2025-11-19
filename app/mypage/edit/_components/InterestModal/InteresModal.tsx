'use client'

import { useState } from 'react'

import styles from './InteresModal.module.scss'

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

const InterestModal = ({ open = false, onOpenChange, zIndex }: Props) => {
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
  const [verified, setVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

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
              placeholder='휴대폰 번호를 입력하세요'
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              //   error={phoneError}
              errorMessage={phoneErrorMessage}
            />
            <Button
              variant='outline'
              className={verified ? styles.resend_btn : ''}
              onClick={handleSendVerification}
              width={133}
            >
              {verified ? '인증번호 재전송' : '본인인증'}
            </Button>
          </div>
          <Input
            placeholder='인증번호 입력'
            value={verificationCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setVerificationCode(e.target.value)
            }
            disabled={!verified}
          />
        </div>
        <DialogFooter className={styles.modal_footer}>
          <Button
            variant='outline'
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            취소
          </Button>
          <Button variant='default' onClick={handleSave}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InterestModal
