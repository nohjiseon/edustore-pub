'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import styles from './header.module.scss'

import { useModal } from '@/hooks/useModal'
import BellIcon from '@/icons/generated/Bell'
import MenuIcon from '@/icons/generated/Menu'
import SearchIcon from '@/icons/generated/Search'
import ShoppingCartIcon from '@/icons/generated/ShoppingCart'
import { useAuthStore } from '@/stores/auth'
import AsyncBoundary from '~/components/common/AsyncBoundary'
import AuthSection from '~/components/layout/header/AuthSection'
import { SearchModal } from '~/components/ui'
import { useCartStore } from '~/stores/cart'

const HeaderActions = () => {
  const cartItems = useCartStore((state) => state.cartItems)
  const cartCount = cartItems.length
  const user = useAuthStore((state) => state.user)
  const isOrganization = user?.memberType === 'organization'

  const { openModal } = useModal()

  const [notificationCount, setNotificationCount] = useState<number>(0)

  const router = useRouter()

  const handleSearchClick = () => {
    openModal(SearchModal)
  }

  const handleCartClick = () => {
    router.push('/cart')
  }

  const handleNotificationClick = () => {
    // TODO: 알림 기능 구현
  }

  return (
    <>
      <div className={styles.action_section}>
        <div className={styles.icon_group}>
          {/* 검색 아이콘 - 기관회원일 때 숨김 */}
          {!isOrganization && (
            <button
              className={`${styles.icon_button} pc`}
              onClick={handleSearchClick}
              aria-label='검색'
              type='button'
            >
              <SearchIcon
                className={styles.icon}
                aria-hidden='true'
                focusable={false}
              />
            </button>
          )}

          {/* 장바구니 아이콘 - 기관회원일 때 숨김 */}
          {!isOrganization && (
            <button
              className={styles.icon_button}
              onClick={handleCartClick}
              aria-label={`장바구니 (${cartCount}개 상품)`}
              type='button'
            >
              <div className={styles.icon_wrapper}>
                <ShoppingCartIcon
                  className={styles.icon}
                  aria-hidden='true'
                  focusable={false}
                />
                {cartCount > 0 && (
                  <div className={styles.badge} aria-hidden='true'>
                    {cartCount}
                  </div>
                )}
              </div>
            </button>
          )}

          {/* 알림 아이콘 - 항상 표시 */}
          <button
            className={styles.icon_button}
            onClick={handleNotificationClick}
            aria-label={`알림 (${notificationCount}개)`}
            type='button'
          >
            <div className={styles.icon_wrapper}>
              <BellIcon
                className={styles.icon}
                aria-hidden='true'
                focusable={false}
              />
              {notificationCount > 0 && (
                <div className={styles.badge} aria-hidden='true'>
                  {notificationCount}
                </div>
              )}
            </div>
          </button>

          {/* 모바일 메뉴 아이콘 - 기관회원일 때 숨김 */}
          {!isOrganization && (
            <button
              className={`${styles.icon_button} mo`}
              onClick={handleSearchClick}
              aria-label='검색'
              type='button'
            >
              <MenuIcon
                className={styles.icon}
                aria-hidden='true'
                focusable={false}
              />
            </button>
          )}
        </div>

        <AsyncBoundary>
          <AuthSection />
        </AsyncBoundary>
      </div>
    </>
  )
}

export default HeaderActions
