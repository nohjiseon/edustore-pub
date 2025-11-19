'use client'

import { useState } from 'react'

import styles from './ReportReceivedModal.module.scss'

import ReportReceivedCorfirmModal from '@/components/modal/ReportReceivedCorfirmModal'
import { Button, Textarea } from '@/components/ui'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { useModal } from '~/hooks/useModal'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const REPORT_REASONS = [
  '욕설/비방 표현',
  '허위 사실 또는 명예훼손',
  '홍보성/상업성 내용 포함',
  '자료와 무관한 내용',
  '기타(직접 입력)'
]

const ReportReceivedModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const { openModal } = useModal()
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [detailReason, setDetailReason] = useState<string>('')

  const handleClose = () => {
    onOpenChange?.(false)
  }

  const handleReport = () => {
    // 신고 사유가 선택되지 않았으면 리턴
    if (!selectedReason) {
      return
    }

    // 기타인 경우 상세 사유 확인
    if (selectedReason === '기타(직접 입력)' && !detailReason.trim()) {
      return
    }

    // 현재 모달 닫기
    onOpenChange?.(false)

    // 신고 접수 확인 모달 띄우기
    openModal(ReportReceivedCorfirmModal, {
      onConfirm: async () => {
        // TODO: 신고 API 호출
        console.log('신고 사유:', selectedReason)
        console.log('상세 사유:', detailReason)
      }
    })
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
              <DialogTitle>신고 사유를 선택해 주세요</DialogTitle>
            </div>

            <div className={styles.reson_wrap}>
              <div className={styles.radio_group}>
                {REPORT_REASONS.map((reason) => (
                  <label key={reason} className={styles.radio_item}>
                    <input
                      type='radio'
                      name='reportReason'
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
              <Button
                variant='default'
                onClick={handleReport}
                disabled={
                  !selectedReason ||
                  (selectedReason === '기타(직접 입력)' && !detailReason.trim())
                }
              >
                신고하기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ReportReceivedModal
