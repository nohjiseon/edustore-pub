'use client'

import styles from './DownloadModal.module.scss'

import downloadIcon from '@/assets/images/modal/download_icon.png'
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

const DownloadModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const handleClose = () => {
    onOpenChange(false)
  }

  const handleDownload = () => {
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={styles.modal_content} zIndex={zIndex}>
          <div className={styles.modal_body}>
            <div className={styles.modal_img_wrap}>
              <img src={downloadIcon.src} alt='sample' />
            </div>
            <div className={styles.modal_title_wrap}>
              <DialogTitle>자료를 다운로드 하시겠어요?</DialogTitle>
              <DialogDescription>
                자료가 정상적으로 다운로드 완료된 이후에는 <br />
                오류의 경우를 제외하고 취소 및 환불이 불가능합니다.
              </DialogDescription>
            </div>

            <div className={styles.modal_button_wrap}>
              <Button variant='outline' onClick={handleClose}>
                뒤로가기
              </Button>
              <Button variant='default' onClick={handleDownload}>
                다운받기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DownloadModal
