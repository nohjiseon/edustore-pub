'use client'

import BuyerInfo from './_components/BuyerInfo'
import CheckoutSummary from './_components/CheckoutSummary'
import OrderProductList from './_components/OrderProductList'
import PaymentMethod from './_components/PaymentMethod'
import styles from './page.module.scss'

import { BaseLayout, BaseLayoutTitle } from '@/components/layout'
import { useCartStore } from '@/stores/cart'

const CheckoutPage = () => {
  const cartItems = useCartStore((state) => state.cartItems)
  const selectedIds = useCartStore((state) => state.selectedIds)

  // 선택된 상품만 필터링
  const selectedProducts = cartItems
    .filter((item) => selectedIds.includes(item.id))
    .map((item) => ({
      tags: item.tags,
      title: item.title,
      author: item.author,
      price: item.price,
      imageSrc: item.imageSrc
    }))

  // 총 금액 계산
  const totalAmount = selectedProducts.reduce(
    (sum, product) => sum + (product.price || 0),
    0
  )

  // 임시 구매자 정보 (추후 실제 데이터로 교체)
  const buyerInfo = {
    name: '홍길동',
    phone: '000-0000-0000',
    email: '0000@gmail.com'
  }

  const handleCheckout = () => {
    console.log('결제하기 클릭')
    // TODO: 결제 처리 로직 구현
  }

  return (
    <BaseLayout background='linear-gradient(0deg, #F6F7F9 0%, #F6F7F9 100%), #F7F8F8'>
      <BaseLayoutTitle>주문/결제</BaseLayoutTitle>

      <div className={styles.checkout_container}>
        {/* 좌측 섹션 */}
        <div className={styles.left_section}>
          <BuyerInfo
            name={buyerInfo.name}
            phone={buyerInfo.phone}
            email={buyerInfo.email}
          />
          <OrderProductList products={selectedProducts} />
          <PaymentMethod defaultMethod='group' />
        </div>

        {/* 우측 섹션 */}
        <div className={styles.right_section}>
          <CheckoutSummary
            totalAmount={totalAmount}
            productCount={selectedProducts.length}
            groupCreditUsed={0}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </BaseLayout>
  )
}

export default CheckoutPage
