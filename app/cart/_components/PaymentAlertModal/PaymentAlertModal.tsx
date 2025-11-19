'use client'

import Image from 'next/image'
import Link from 'next/link'

import styles from './PaymentAlertModal.module.scss'

import errorImage from '@/assets/images/common/error.png'
import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'

interface PaymentAlertModalProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const PaymentAlertModal = ({
  open,
  onOpenChange,
  zIndex
}: PaymentAlertModalProps) => {
  const handleRetry = () => {
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          <div className={styles.img_wrap}>
            <Image
              src={errorImage}
              alt='경고 이미지'
              width={128}
              height={128}
            />
          </div>
          <div className={styles.modal_title_wrap}>
            <DialogTitle className={styles.title}>
              결제가 정상적으로 처리되지 않았습니다
            </DialogTitle>
            <DialogDescription className={styles.description}>
              재시도 후에도 문제가 있다면 고객센터에 문의해 주세요.
            </DialogDescription>
          </div>
          <div className={styles.modal_button_wrap}>
            <Button onClick={handleRetry}>다시 시도하기</Button>
            <Link href='/service'>고객센터 문의하기</Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentAlertModal
