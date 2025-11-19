'use client'

import { log } from 'console'

import { useState } from 'react'

import styles from './CancelReportModal.module.scss'

import { Button, Textarea } from '@/components/ui'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { useModal } from '~/hooks/useModal'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const CANCEL_REASONS = [
  '단순 변심',
  '잘 못 구매함',
  '결제 오류',
  '기타(직접 입력)'
]

const CancelReportModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const { openModal } = useModal()
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [detailReason, setDetailReason] = useState<string>('')

  console.log(selectedReason)
  console.log(detailReason)

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleRefund = () => {
    onOpenChange(false)
  }

  const handleReasonChange = (value: string) => {
    setSelectedReason(value)
    // 기타가 아닌 경우 상세 사유 초기화
    if (value !== '기타(직접 입력)') {
      setDetailReason('')
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={styles.modal_content} zIndex={zIndex}>
          <div className={styles.modal_body}>
            <div className={styles.modal_title_wrap}>
              <DialogTitle>취소 사유를 선택해 주세요</DialogTitle>
            </div>

            <div className={styles.reson_wrap}>
              <div className={styles.radio_group}>
                {CANCEL_REASONS.map((reason) => (
                  <label key={reason} className={styles.radio_item}>
                    <input
                      type='radio'
                      name='cancelReason'
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => handleReasonChange(reason)}
                      className={styles.radio_input}
                    />
                    <span className={styles.radio_label}>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.textarea_wrap}>
              <Textarea
                placeholder='상세 사유를 입력해 주세요'
                maxLength={300}
                showCounter
                value={detailReason}
                onChange={(e) => setDetailReason(e.target.value)}
                disabled={selectedReason !== '기타(직접 입력)'}
              />
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

export default CancelReportModal
