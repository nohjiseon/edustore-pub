import React from 'react'

import CartList from './_components/CartList'
import CartSummary from './_components/CartSummary'
import styles from './page.module.scss'

import { BaseLayout, BaseLayoutTitle } from '@/components/layout'

const CartPage = () => {
  return (
    <BaseLayout background='linear-gradient(0deg, #F6F7F9 0%, #F6F7F9 100%), #F7F8F8'>
      <BaseLayoutTitle>장바구니</BaseLayoutTitle>

      <div className={styles.cart_container}>
        <CartList />
        <CartSummary />
      </div>
    </BaseLayout>
  )
}

export default CartPage
