'use client'

import Link from 'next/link'

import styles from './RefundRejectModal.module.scss'

import { Button } from '@/components/ui'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const RefundRejectModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={styles.modal_content} zIndex={zIndex}>
          <div className={styles.modal_body}>
            <div className={styles.modal_title_wrap}>
              <DialogTitle>환불 요청이 반려되었습니다.</DialogTitle>
            </div>

            <div className={styles.reject_wrap}>
              <span>환불 사유</span>
              <p>자료 파일 오류/파일 깨짐/누락</p>
            </div>

            <div className={styles.reject_desc_wrap}>
              <p>
                환불 요청에 대해 자료 검수를 진행한 결과, 문의주신 자료가
                정상적으로 업로드된 것으로 확인하였습니다. <br />
                동일 현상이 지속될 경우 다른 기기에서 재시도하거나 고객센터에
                문의해 주세요.
              </p>
            </div>

            <div className={styles.modal_button_wrap}>
              <Button variant='default' onClick={handleClose}>
                확인
              </Button>
            </div>

            <div className={styles.link_wrap}>
              <Link href='/service'>고객센터 문의하기</Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RefundRejectModal
