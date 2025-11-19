'use client'

import styles from './CancelModal.module.scss'
import CancelReportModal from '../CancelReportModal'

import warnIcon from '@/assets/images/modal/warn_icon.png'
import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'
import { useModal } from '~/hooks/useModal'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const CancelModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const { openModal } = useModal()

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleRefund = () => {
    onOpenChange(false)
    openModal(CancelReportModal)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={styles.modal_content} zIndex={zIndex}>
          <div className={styles.modal_body}>
            <div className={styles.modal_img_wrap}>
              <img src={warnIcon.src} alt='sample' />
            </div>
            <div className={styles.modal_title_wrap}>
              <DialogTitle>구매를 취소하시겠어요?</DialogTitle>
              <DialogDescription>
                다운로드 하지 않은 상태에서 구매를 취소하실 경우 <br />
                구매 시 사용된 결제 수단으로 환불됩니다.
              </DialogDescription>
            </div>

            <div className={styles.modal_button_wrap}>
              <Button variant='outline' onClick={handleClose}>
                뒤로가기
              </Button>
              <Button variant='default' onClick={handleRefund}>
                구매취소
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CancelModal
