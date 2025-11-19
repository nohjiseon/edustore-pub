'use client'

import { useRouter } from 'next/navigation'

import styles from './RefundModal.module.scss'
import DownloadModal from '../DownloadModal'

import refundIcon from '@/assets/images/modal/refund_icon.png'
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

const RefundModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const { openModal } = useModal()
  const router = useRouter()

  const handleRefund = () => {
    onOpenChange(false)
    router.push('/purchase/refund')
  }

  const handleDownload = () => {
    onOpenChange(false)
    openModal(DownloadModal)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={styles.modal_content} zIndex={zIndex}>
          <div className={styles.modal_body}>
            <div className={styles.modal_img_wrap}>
              <img src={refundIcon.src} alt='sample' />
            </div>
            <div className={styles.modal_title_wrap}>
              <DialogTitle>구매한 자료를 환불하시겠어요?</DialogTitle>
              <DialogDescription>
                자료에 오류가 있는 경우에만 환불이 가능하며 <br />
                판매자 승인 후에 환불이 처리됩니다.
              </DialogDescription>
            </div>

            <div className={styles.modal_button_wrap}>
              <Button variant='default' onClick={handleRefund}>
                환불 요청
              </Button>
              <Button variant='outline' onClick={handleDownload}>
                자료 다운 받고 이용하기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RefundModal
