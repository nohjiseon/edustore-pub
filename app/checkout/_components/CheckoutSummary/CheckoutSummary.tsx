'use client'

import styles from './CheckoutSummary.module.scss'

import { Button } from '@/components/ui'

interface Props {
  totalAmount: number
  productCount: number
  groupCreditUsed: number
  onCheckout: () => void
}

const CheckoutSummary = ({
  totalAmount,
  productCount,
  groupCreditUsed,
  onCheckout
}: Props) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR')
  }

  const finalAmount = totalAmount - groupCreditUsed

  return (
    <div className={styles.container}>
      {/* 결제 요약 */}
      <div>
        <div className={styles.summary_card}>
          <div className={styles.summary_row}>
            <span className={styles.summary_label}>선택 상품 금액</span>
            <span className={styles.summary_value}>
              {formatPrice(totalAmount)}
            </span>
          </div>

          <div className={styles.summary_row}>
            <span className={styles.summary_label}>선택 상품 수</span>
            <span className={styles.summary_value}>{productCount}</span>
          </div>

          <div className={styles.summary_row}>
            <span className={styles.summary_label}>단체 충전금 사용</span>
            <span className={styles.summary_value}>
              -{formatPrice(groupCreditUsed)}
            </span>
          </div>

          <div className={styles.divider} />

          <div className={styles.total_row}>
            <span className={styles.total_label}>총 결제 금액</span>
            <span className={styles.total_value}>
              {formatPrice(finalAmount)}
            </span>
          </div>
        </div>

        {/* 안내 문구 */}
        <div className={styles.notice_card}>
          <span>
            결제 시 <a href='/'>서비스 이용약관</a> 및{' '}
            <a href='/policy/refund'>취소/환불정책</a>에 동의합니다.
          </span>
          <p className={styles.notice_text}>
            본인은 만 14세 이상이며, 주문 내용을 확인하였습니다.
            <br />
            ㈜수업가게는 통신판매중개자로 거래 당사자가 아니므로, 판매자가
            등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다. <br />
            (단, ㈜수업가게가 판매자로 등록 판매한 상품은 판매자로서 책임을
            부담합니다.)
          </p>
        </div>
      </div>

      {/* 결제하기 버튼 */}
      <Button
        variant='default'
        onClick={onCheckout}
        className={styles.checkout_button}
      >
        결제하기
      </Button>
    </div>
  )
}

export default CheckoutSummary
