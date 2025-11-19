'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import styles from './CartSummary.module.scss'
import { EstimateModal } from '../EstimateModal'
import { ProposalModal } from '../ProposalModal'

import { Button } from '@/components/ui'
import { useModal } from '@/hooks/useModal'
import { TokenStorage } from '@/lib/api'
import { cartService } from '@/services/cart.service'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import type { CartView } from '@/types/cart'

const CartSummary = () => {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const selectedIds = useCartStore((state) => state.selectedIds)
  const { openModal } = useModal()
  const [cartItems, setCartItems] = useState<CartView[]>([])

  // 장바구니 목록 조회
  useEffect(() => {
    if (!user || !isAuthenticated || user.memberType !== 'individual') {
      return
    }

    const fetchCartItems = async () => {
      try {
        const token = TokenStorage.getAccessToken()
        if (!token || !user.memNo) {
          return
        }

        const response = await cartService.getCartItems(Number(user.memNo))
        setCartItems(response.data)
      } catch (error: any) {
        console.error('장바구니 목록 조회 실패:', error)
      }
    }

    fetchCartItems()
  }, [user, isAuthenticated])

  // 선택된 아이템 요약 계산
  const selectedSummary = useMemo(() => {
    // selectedIds는 productNo를 문자열로 저장하고 있음
    const selectedItems = cartItems.filter((item) =>
      selectedIds.includes(String(item.productNo))
    )
    const totalCount = selectedItems.length
    const totalAmount = selectedItems.reduce(
      (sum, item) => sum + (item.product.product.price || 0),
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
