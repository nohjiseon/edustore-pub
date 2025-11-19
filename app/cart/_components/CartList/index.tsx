'use client'

import React, { useEffect, useState } from 'react'

import styles from './CartList.module.scss'

import { Icon } from '@/components/Icon'
import ContentInfo from '@/components/ui/ContentInfo/ContentInfo'
import { Tag } from '@/components/ui/TagList/TagList'
import { TAG_COLOR_MAP } from '@/constants/tag'
import { TokenStorage } from '@/lib/api'
import { cartService } from '@/services/cart.service'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import type { CartView } from '@/types/cart'
import EmptyState from '~/components/common/EmptyState'

const CartList = () => {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const selectedIds = useCartStore((state) => state.selectedIds)
  const selectItem = useCartStore((state) => state.selectItem)
  const [cartItems, setCartItems] = useState<CartView[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // 전체 선택 여부 확인 - 모든 cartItems의 productNo가 selectedIds에 포함되어 있는지 확인
  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => selectedIds.includes(String(item.productNo)))

  // 장바구니 목록 다시 조회
  const refetchCartItems = async () => {
    if (!user?.memNo) return

    try {
      const response = await cartService.getCartItems(Number(user.memNo))
      setCartItems(response.data)

      // 삭제 후 선택 상태 정리 - 현재 장바구니에 없는 항목들은 selectedIds에서 제거
      const currentProductNos = response.data.map((item) =>
        String(item.productNo)
      )
      const currentSelectedIds = useCartStore.getState().selectedIds
      const validSelectedIds = currentSelectedIds.filter((id) =>
        currentProductNos.includes(id)
      )

      if (validSelectedIds.length !== currentSelectedIds.length) {
        useCartStore.setState({ selectedIds: validSelectedIds })
      }
    } catch (error: any) {
      console.error('장바구니 목록 조회 실패:', error)
    }
  }

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (allSelected) {
      // 전체 해제
      useCartStore.setState({ selectedIds: [] })
    } else {
      // 전체 선택 - 현재 API에서 받아온 cartItems의 productNo를 모두 선택
      const allProductNos = cartItems.map((item) => String(item.productNo))
      useCartStore.setState({ selectedIds: allProductNos })
    }
  }

  // 개별 삭제 핸들러
  const handleDeleteItem = async (cartNo: number, productNo: number) => {
    if (isDeleting) return

    setIsDeleting(true)

    try {
      // 개별 삭제: cartNo를 문자열로 변환하여 전송 (예: "1")
      await cartService.removeCartItem(String(cartNo))

      // 삭제 성공 후 목록 다시 조회
      await refetchCartItems()

      // 선택 상태에서도 제거
      const currentSelectedIds = useCartStore.getState().selectedIds
      const newSelectedIds = currentSelectedIds.filter(
        (id) => id !== String(productNo)
      )
      useCartStore.setState({ selectedIds: newSelectedIds })
    } catch (error: any) {
      console.error('장바구니 삭제 실패:', error)
      alert('장바구니에서 상품을 삭제하는데 실패했습니다.')
    } finally {
      setIsDeleting(false)
    }
  }

  // 선택 삭제 핸들러
  const handleDeleteSelected = async () => {
    if (isDeleting || selectedIds.length === 0) return

    setIsDeleting(true)

    try {
      // 선택된 항목들의 cartNo 찾기
      const selectedCartItems = cartItems.filter((item) =>
        selectedIds.includes(String(item.productNo))
      )

      // 여러 개 선택 삭제: cartNo를 쉼표로 구분하여 전송 (예: "1,2,3")
      const cartNos = selectedCartItems.map((item) => item.cartNo).join(',')
      await cartService.removeCartItem(cartNos)

      // 삭제 성공 후 목록 다시 조회
      await refetchCartItems()

      // 선택 상태 초기화
      useCartStore.setState({ selectedIds: [] })
    } catch (error: any) {
      console.error('장바구니 선택 삭제 실패:', error)
      alert('선택한 상품을 삭제하는데 실패했습니다.')
    } finally {
      setIsDeleting(false)
    }
  }

  // 장바구니 목록 조회
  useEffect(() => {
    // 개인회원만 장바구니 사용 가능
    if (!user || !isAuthenticated || user.memberType !== 'individual') {
      return
    }

    const fetchCartItems = async () => {
      setIsLoading(true)

      try {
        const token = TokenStorage.getAccessToken()
        if (!token) {
          console.error('인증 토큰이 없습니다.')
          setIsLoading(false)
          return
        }

        if (!user.memNo) {
          console.error('회원 번호가 없습니다.')
          setIsLoading(false)
          return
        }

        const response = await cartService.getCartItems(Number(user.memNo))
        setCartItems(response.data)

        // 장바구니 페이지 진입 시 선택 상태 초기화
        useCartStore.setState({ selectedIds: [] })
      } catch (error: any) {
        console.error('장바구니 목록 조회 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartItems()
  }, [user, isAuthenticated])

  // 개인회원이 아닌 경우 안내 메시지 표시
  if (!isAuthenticated || !user) {
    return (
      <div className={styles.container}>
        <EmptyState
          title='로그인이 필요합니다.'
          subtitle='장바구니를 사용하려면 로그인해주세요.'
        />
      </div>
    )
  }

  if (user.memberType !== 'individual') {
    return (
      <div className={styles.container}>
        <EmptyState
          title='장바구니는 개인회원만 사용할 수 있습니다.'
          subtitle='개인회원으로 로그인해주세요.'
        />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button
          type='button'
          className={styles.select_all_button}
          onClick={handleSelectAll}
          disabled={isLoading || isDeleting || cartItems.length === 0}
        >
          <Icon name={allSelected ? 'checkbox-fill-s' : 'checkbox-none-s'} />
          <span className={styles.header_text}>전체 선택</span>
        </button>

        <button
          type='button'
          className={styles.delete_button}
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0 || isLoading || isDeleting}
        >
          <span className={styles.header_text}>선택 삭제</span>
        </button>
      </div>

      {/* 장바구니 아이템 리스트 */}
      <div className={styles.list}>
        {isLoading ? (
          <div className={styles.loading}>로딩 중...</div>
        ) : (
          <>
            {cartItems.map((item) => {
              // 메인 썸네일 찾기
              const mainThumbnail = item.product.thumbnails?.find(
                (thumb) => thumb.mainThumbnailYn === 'Y'
              )
              const thumbnailUrl = mainThumbnail?.thumbnailUrl

              // 해시태그를 Tag 형식으로 변환
              const tags: Tag[] =
                item.product.hashtags?.map((hashtag) => ({
                  name: hashtag.hashtagNm,
                  color: TAG_COLOR_MAP.grade // 기본 색상 사용
                })) || []

              return (
                <div key={item.productNo} className={styles.item_wrapper}>
                  <div
                    className={styles.selectable_area}
                    onClick={() => selectItem(String(item.productNo))}
                  >
                    <ContentInfo
                      tags={tags}
                      title={item.product.product.productNm}
                      author={{
                        name: item.product.memberView.nickname,
                        avatar: item.product.memberView.profileImgUrl
                      }}
                      price={item.product.product.price}
                      imageSrc={thumbnailUrl}
                      checked={selectedIds.includes(String(item.productNo))}
                      onDelete={() =>
                        handleDeleteItem(item.cartNo, item.productNo)
                      }
                    />
                  </div>
                </div>
              )
            })}

            {cartItems.length === 0 && !isLoading && (
              <EmptyState
                title='장바구니에 담긴 자료가 없습니다.'
                subtitle='원하는 자료를 담아두고 한 번에 결제해보세요.'
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CartList
