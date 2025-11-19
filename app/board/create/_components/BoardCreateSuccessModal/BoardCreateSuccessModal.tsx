'use client'

import Image from 'next/image'

import styles from './BoardCreateSuccessModal.module.scss'

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
}

const BoardCreateSuccessModal = ({
  open = true,
  onOpenChange,
  zIndex
}: Props) => {
  const handleClose = () => {
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          <div className={styles.img_wrap}>
            <Image src={success} alt='success Image' width={128} height={128} />
          </div>

          <div className={styles.modal_title_wrap}>
            <DialogTitle>등록이 완료되었습니다.</DialogTitle>
          </div>

          <div className={styles.modal_button_wrap}>
            <Button onClick={handleClose}>확인</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BoardCreateSuccessModal
