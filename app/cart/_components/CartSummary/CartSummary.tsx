'use client'

import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

import styles from './CartSummary.module.scss'
import { EstimateModal } from '../EstimateModal'
import { ProposalModal } from '../ProposalModal'

import { Button } from '@/components/ui'
import { useModal } from '@/hooks/useModal'
import { useCartStore } from '@/stores/cart'

const CartSummary = () => {
  const router = useRouter()
  const cartItems = useCartStore((state) => state.cartItems)
  const selectedIds = useCartStore((state) => state.selectedIds)
  const { openModal } = useModal()

  // 선택된 아이템 요약 계산
  const selectedSummary = useMemo(() => {
    const selectedItems = cartItems.filter((item) =>
      selectedIds.includes(item.id)
    )
    const totalCount = selectedItems.length
    const totalAmount = selectedItems.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    )

    return {
      count: totalCount,
      amount: totalAmount,
      items: selectedItems
    }
  }, [cartItems, selectedIds])

  const { count, amount } = selectedSummary

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR')
  }

  const hasSelectedItems = count > 0

  const handleCheckout = () => {
    router.push('/checkout')
  }

  const handleProposalGenerate = () => {
    openModal(ProposalModal, {
      items: selectedSummary.items
    })
  }

  const handleQuoteView = () => {
    openModal(EstimateModal, {
      items: selectedSummary.items
    })
  }

  return (
    <div className={styles.container}>
      {/* 주문 요약 */}
      <div className={styles.summary_section}>
        <div className={styles.summary_row}>
          <span className={styles.summary_label}>선택 상품 금액</span>
          <span className={styles.summary_value}>{formatPrice(amount)}</span>
        </div>

        <div className={styles.summary_row}>
          <span className={styles.summary_label}>선택 상품 수</span>
          <span className={styles.summary_value}>{count}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.total_row}>
          <span className={styles.total_label}>결제 금액</span>
          <span className={styles.total_value}>{formatPrice(amount)}</span>
        </div>
      </div>

      {/* 결제 버튼 및 안내 */}
      <div className={styles.action_section}>
        <Button
          variant={hasSelectedItems ? 'default' : 'outline'}
          onClick={handleCheckout}
          disabled={!hasSelectedItems}
          className={styles.checkout_button}
        >
          결제하기
        </Button>

        <div className={styles.notice}>
          <p>
            * 장바구니 상품은 기한 없이 보관되며, 50개까지 담을 수 있습니다.
          </p>
          <p>* 보유하신 쿠폰과 충전금은 주문서에서 적용 가능합니다.</p>
        </div>
      </div>

      {/* 품의기안 및 견적서 버튼 */}
      <div className={styles.secondary_buttons_section}>
        <button
          className={styles.secondary_button}
          onClick={handleProposalGenerate}
          disabled={!hasSelectedItems}
        >
          품의기안 자동작성
        </button>
        <button
          className={styles.secondary_button}
          onClick={handleQuoteView}
          disabled={!hasSelectedItems}
        >
          견적서 확인하기
        </button>
      </div>
    </div>
  )
}

export default CartSummary
