'use client'

import { useState } from 'react'

import styles from './WithdrawalRequestModal.module.scss'
import WithdrawalResultModal from '../WithdrawalResultModal/WithdrawalResultModal'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { useModal } from '@/hooks/useModal'
import { Button } from '~/components/ui'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  withdrawableAmount?: number
}

const WithdrawalRequestModal = ({
  open = true,
  onOpenChange,
  zIndex,
  withdrawableAmount = 0
}: Props) => {
  const { openModal } = useModal()

  const [requestAmount, setRequestAmount] = useState<string>('')
  const [amountError, setAmountError] = useState(false)

  // TODO: API 연동 시 실제 계좌 정보로 교체
  const accountNumber = '00은행 111-111-111111'
  const accountHolder = '홍길동'

  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()}`
  }

  const handleClose = () => {
    onOpenChange?.(false)
    // 폼 초기화
    setRequestAmount('')
    setAmountError(false)
  }

  const handleSubmit = () => {
    const amount = Number(requestAmount.replace(/,/g, ''))

    // 유효성 검사
    if (!requestAmount || amount < 10000) {
      setAmountError(true)
      return
    }

    setAmountError(false)

    // API에서 받아올 값 (테스트용: true로 변경하면 정지 상태 확인 가능)
    const isSuspended = false

    handleClose()

    // 결과 모달 표시
    openModal(WithdrawalResultModal, {
      result: isSuspended ? 'suspended' : 'success'
    })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value) {
      setRequestAmount(Number(value).toLocaleString())
    } else {
      setRequestAmount('')
    }
    setAmountError(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_title_wrap}>
          <DialogTitle>출금 신청</DialogTitle>
        </div>

        <div className={styles.form_wrap}>
          <strong className={styles.inp_tit}>출금 가능 금액</strong>
          <div className={styles.input_box}>
            <input
              type='text'
              value={formatCurrency(withdrawableAmount)}
              readOnly
              tabIndex={-1}
              onFocus={(e) => e.target.blur()}
            />
            <span className={styles.unit}>원</span>
          </div>

          <strong className={styles.inp_tit}>출금 신청 금액</strong>
          <div className={styles.input_box}>
            <input
              type='text'
              value={requestAmount}
              onChange={handleAmountChange}
              placeholder='출금 신청 금액을 입력하세요'
            />
            <span className={styles.unit}>원</span>
          </div>

          {/* 에러 메세지 */}
          {amountError && (
            <p className={styles.error_txt}>
              출금 신청액은 최소 10,000원부터 가능합니다.
            </p>
          )}

          <strong className={styles.inp_tit}>출금 계좌 선택</strong>
          <div className={styles.account_select_wrap}>
            <input
              type='text'
              value={accountNumber}
              readOnly
              className={styles.account_inp}
            />
            <input
              type='text'
              value={accountHolder}
              readOnly
              className={styles.holder_inp}
            />
          </div>

          <ul className={styles.info_list}>
            <li>
              신청하신 출금은 영업일 기준 2~3일 내 순차적으로 처리될 예정입니다.
            </li>
            <li>최소 출금 가능 금액은 10,000원입니다.</li>
            <li>계정 제재 등 특별한 사유 발생 시 출금이 보류될 수 있습니다.</li>
          </ul>
        </div>

        <div className={styles.button_wrap}>
          <Button variant='outline' onClick={handleClose}>
            취소
          </Button>
          <Button variant='default' onClick={handleSubmit}>
            출금 신청
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawalRequestModal
