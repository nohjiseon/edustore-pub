'use client'

import { useEffect, useState } from 'react'

import styles from './ReviewModal.module.scss'
import ReviewTypeModal from '../ReviewTypeModal'

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

const ReviewModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const [shouldOpenNextModal, setShouldOpenNextModal] = useState(false)
  const { openModal } = useModal()

  const handleComplete = () => {
    setShouldOpenNextModal(true)
  }

  const handleClose = () => {
    onOpenChange?.(false)
  }

  useEffect(() => {
    if (shouldOpenNextModal) {
      openModal(ReviewTypeModal)
      onOpenChange(false)
    }
  }, [open, shouldOpenNextModal])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={styles.modal_content} zIndex={zIndex}>
          <div className={styles.modal_body}>
            <div className={styles.modal_title_wrap}>
              <DialogTitle>이 자료를 사용해 보셨나요?</DialogTitle>
              <DialogDescription>
                자료를 사용해보신 후 후기를 남겨주세요
              </DialogDescription>
            </div>

            <div className={styles.modal_button_wrap}>
              <Button variant='outline' onClick={handleClose}>
                사용 전
              </Button>
              <Button variant='default' onClick={handleComplete}>
                사용 완료
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ReviewModal
