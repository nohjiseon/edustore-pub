'use client'

import styles from './CartSuccessModal.module.scss'

import { Button } from '@/components/ui'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onConfirm?: () => void
  zIndex?: number
}

const CartSuccessModal = ({
  open = false,
  onOpenChange,
  onConfirm,
  zIndex
}: Props) => {
  const handleCancel = () => {
    onOpenChange?.(false)
  }

  const handleConfirm = () => {
    onConfirm?.()
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle hidden>장바구니에 담겼습니다.</DialogTitle>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          <div className={styles.title_wrapper}>
            {/* 제목 */}
            <h2 className={styles.title}>장바구니에 담겼습니다.</h2>

            {/* 설명 */}
            <p className={styles.description}>장바구니로 이동하시겠어요?</p>
          </div>

          {/* 버튼 그룹 */}
          <div className={styles.button_group}>
            <Button
              onClick={handleCancel}
              variant='outline'
              width={200}
              className={styles.cancel_button}
            >
              취소
            </Button>
            <Button onClick={handleConfirm} variant='default' width={200}>
              확인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CartSuccessModal
