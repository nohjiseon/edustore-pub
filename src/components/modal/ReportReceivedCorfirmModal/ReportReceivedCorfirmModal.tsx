'use client'

import Image from 'next/image'

import styles from './ReportReceivedCorfirmModal.module.scss'

import successImage from '@/assets/images/common/success.png'
import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'

interface ReportReceivedCorfirmModalProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  onConfirm?: () => void | Promise<void>
}

const ReportReceivedCorfirmModal = ({
  open,
  onOpenChange,
  zIndex,
  onConfirm
}: ReportReceivedCorfirmModalProps) => {
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm()
    }
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          <div className={styles.img_wrap}>
            <Image
              src={successImage}
              alt='success image'
              width={128}
              height={128}
            />
          </div>
          <div className={styles.modal_title_wrap}>
            <DialogTitle className={styles.title}>
              신고가 접수되었습니다
            </DialogTitle>
            <DialogDescription className={styles.description}>
              신고된 내역은 관리자 승인 후 규정에 맞게 처리됩니다.
            </DialogDescription>
          </div>
          <div className={styles.modal_button_wrap}>
            <Button onClick={handleConfirm}>확인</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReportReceivedCorfirmModal
