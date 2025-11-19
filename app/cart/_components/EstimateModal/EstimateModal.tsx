'use client'

import { useState } from 'react'

import styles from './EstimateModal.module.scss'

import { Button, Input, RadioLabel } from '@/components/ui'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { CartItem } from '@/stores/cart'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  items: CartItem[]
  zIndex?: number
}

const EstimateModal = ({
  open = false,
  onOpenChange,
  items,
  zIndex
}: Props) => {
  const [recipientName, setRecipientName] = useState('')
  const [appliedRecipientName, setAppliedRecipientName] = useState('')
  const [paymentType, setPaymentType] = useState<'group' | 'individual'>(
    'group'
  )

  // 금액 계산
  const totalOriginalPrice = items.reduce((sum, item) => sum + item.price, 0)
  const totalDiscount = 0 // TODO: 할인 로직 구현
  const finalPrice = totalOriginalPrice - totalDiscount

  // 현재 날짜 (YYYY-MM-DD 형식)
  const currentDate = new Date().toISOString().split('T')[0]

  // 공급받는 자 이름 적용
  const handleApplyRecipient = () => {
    setAppliedRecipientName(recipientName)
  }

  // 출력 기능
  const handlePrint = () => {
    window.print()
  }

  // 다운로드 기능
  const handleDownload = () => {
    // TODO: 다운로드 기능 구현
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle hidden>견적서 확인</DialogTitle>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          <div className={styles.top_section}>
            <div className={styles.input_wrapper}>
              <Input
                type='text'
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder='공급받는 분 성함을 입력하면 아래 입력란에 적용됩니다'
              />
              <button
                onClick={handleApplyRecipient}
                className={styles.apply_button}
              >
                적용
              </button>
            </div>

            <div className={styles.payment_type_wrapper}>
              <RadioLabel
                label='단체 충전금 결제'
                checked={paymentType === 'group'}
                onChange={() => setPaymentType('group')}
                name='paymentType'
                value='group'
              />

              <RadioLabel
                label='개인 결제'
                checked={paymentType === 'individual'}
                onChange={() => setPaymentType('individual')}
                name='paymentType'
                value='individual'
              />
            </div>
          </div>

          {/* 제목 */}
          <h2 className={styles.estimate_title}>견적서</h2>

          {/* 견적 정보 섹션 */}
          <div className={styles.info_section}>
            {/* 왼쪽: 견적일자 및 공급자 정보 */}
            <div className={styles.left_info}>
              {/* 견적일자 */}
              <table className={styles.table_form}>
                <tbody>
                  <tr>
                    <th style={{ width: '14.75rem' }}>견적일자</th>
                    <td style={{ width: '10rem' }}>{currentDate}</td>
                    <th style={{ width: '6.875rem' }}>공급 받는 자</th>
                    <td>{appliedRecipientName || '귀하'}</td>
                  </tr>
                </tbody>
              </table>

              {/* 공급자 정보 */}
              <table className={styles.table_form}>
                <tbody>
                  <tr>
                    <th rowSpan={3}>공급자</th>
                    <th>사업자번호</th>
                    <td colSpan={3}>409-88-03110</td>
                  </tr>
                  <tr>
                    <th>상호(법인)명</th>
                    <td style={{ width: '10rem' }}>(주)수업가게</td>
                    <th style={{ width: '8.75rem' }}>성명</th>
                    <td>남태현</td>
                  </tr>
                  <tr>
                    <th>사업장주소</th>
                    <td colSpan={3}>
                      세종특별자치시 국세청로 45, 309동 1305호 (나성동,
                      나릿재마을 3단지)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 오른쪽: 견적 정보 */}
            <div className={styles.right_info}>
              <table className={styles.table_form}>
                <thead>
                  <tr>
                    <th colSpan={3} className={styles.estimate_info_header}>
                      견적 정보
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>구분</th>
                    <th>상품가격</th>
                    <th>합계금액</th>
                  </tr>
                  <tr>
                    <th>원금액</th>
                    <td>{totalOriginalPrice.toLocaleString()}</td>
                    <td>{totalOriginalPrice.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>할인금액</th>
                    <td>-{totalDiscount.toLocaleString()}</td>
                    <td>-{totalDiscount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>최종견적금액</th>
                    <td>{finalPrice.toLocaleString()}</td>
                    <td>{finalPrice.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 상품정보 테이블 */}
          <div className={styles.product_section}>
            <div className={styles.product_header}>상품정보</div>
            <table className={styles.product_table}>
              <thead>
                <tr>
                  <th>순번</th>
                  <th>판매자</th>
                  <th>상품명</th>
                  <th>1개당 금액</th>
                  <th>업체 할인금액</th>
                  <th>쿠폰 할인금액</th>
                  <th>할인적용금액</th>
                  <th>수량</th>
                  <th>합계금액</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>판매자명</td>
                    <td className={styles.product_name}>{item.title}</td>
                    <td className={styles.align_right}>
                      {item.price.toLocaleString()}
                    </td>
                    <td className={styles.align_right}>0</td>
                    <td className={styles.align_right}>0</td>
                    <td className={styles.align_right}>
                      {item.price.toLocaleString()}
                    </td>
                    <td className={styles.align_right}>1</td>
                    <td className={styles.align_right}>
                      {item.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={7} className={styles.total_label}>
                    합계
                  </td>
                  <td className={styles.align_right}>{items.length}</td>
                  <td className={styles.align_right}>
                    {totalOriginalPrice.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className={styles.modal_footer}>
          <Button onClick={handlePrint} variant='outline'>
            출력
          </Button>
          <Button onClick={handleDownload} variant='default'>
            다운로드
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EstimateModal
