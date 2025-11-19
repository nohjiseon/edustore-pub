'use client'

import Image from 'next/image'

import styles from './WithdrawalResultModal.module.scss'

import error from '@/assets/images/common/error.png'
import success from '@/assets/images/common/success.png'
import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  result: 'success' | 'suspended'
}

const WithdrawalResultModal = ({
  open = true,
  onOpenChange,
  zIndex,
  result
}: Props) => {
  const handleClose = () => {
    onOpenChange?.(false)
  }

  const isSuccess = result === 'success'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          <div className={styles.img_wrap}>
            <Image
              src={isSuccess ? success : error}
              alt={isSuccess ? 'success Image' : 'error Image'}
              width={128}
              height={128}
            />
          </div>

          <div className={styles.modal_title_wrap}>
            <DialogTitle>
              {isSuccess
                ? '출금 신청이 완료되었습니다'
                : '출금 신청이 보류되었습니다'}
            </DialogTitle>
            <DialogDescription>
              {isSuccess
                ? '출금신청은 순차적으로 처리될 예정이며\n계정 제재 등 특별한 사유 발생 시 출금이 보류될 수 있습니다.'
                : '저작권 침해로 정지 상태인 계정입니다.'}
            </DialogDescription>
          </div>

          <div className={styles.modal_button_wrap}>
            <Button onClick={handleClose}>확인</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawalResultModal
