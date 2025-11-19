'use client'

import React, { useMemo, useState } from 'react'

import styles from './CartList.module.scss'

import { Icon } from '@/components/Icon'
import ContentInfo from '@/components/ui/ContentInfo/ContentInfo'
import { Tag } from '@/components/ui/TagList/TagList'
import { useCartStore } from '@/stores/cart'
import EmptyState from '~/components/common/EmptyState'

const CartList = () => {
  const cartItems = useCartStore((state) => state.cartItems)
  const selectedIds = useCartStore((state) => state.selectedIds)
  const selectItem = useCartStore((state) => state.selectItem)
  const selectAll = useCartStore((state) => state.selectAll)
  const deleteItem = useCartStore((state) => state.deleteItem)
  const deleteSelected = useCartStore((state) => state.deleteSelected)
  const [isDeleting, setIsDeleting] = useState(false)

  // 전체 선택 여부 확인 - 모든 cartItems의 productNo가 selectedIds에 포함되어 있는지 확인
  const allSelected = useMemo(() => {
    if (cartItems.length === 0) return false
    return cartItems.every((item) => selectedIds.includes(item.id))
  }, [cartItems, selectedIds])

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (cartItems.length === 0) return
    selectAll()
  }

  // 개별 삭제 핸들러
  const handleDeleteItem = async (id: string) => {
    if (isDeleting) return

    setIsDeleting(true)

    try {
      deleteItem(id)
    } finally {
      setIsDeleting(false)
    }
  }

  // 선택 삭제 핸들러
  const handleDeleteSelected = async () => {
    if (isDeleting || selectedIds.length === 0) return

    setIsDeleting(true)

    try {
      deleteSelected()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button
          type='button'
          className={styles.select_all_button}
          onClick={handleSelectAll}
          disabled={isDeleting || cartItems.length === 0}
        >
          <Icon name={allSelected ? 'checkbox-fill-s' : 'checkbox-none-s'} />
          <span className={styles.header_text}>전체 선택</span>
        </button>

        <button
          type='button'
          className={styles.delete_button}
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0 || isDeleting}
        >
          <span className={styles.header_text}>선택 삭제</span>
        </button>
      </div>

      {/* 장바구니 아이템 리스트 */}
      <div className={styles.list}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.item_wrapper}>
            <div
              className={styles.selectable_area}
              onClick={() => selectItem(item.id)}
            >
              <ContentInfo
                tags={item.tags as Tag[]}
                title={item.title}
                author={item.author}
                price={item.price}
                imageSrc={item.imageSrc}
                checked={selectedIds.includes(item.id)}
                onDelete={() => handleDeleteItem(item.id)}
              />
            </div>
          </div>
        ))}

        {cartItems.length === 0 && (
          <EmptyState
            title='장바구니에 담긴 자료가 없습니다.'
            subtitle='원하는 자료를 담아두고 한 번에 결제해보세요.'
          />
        )}
      </div>
    </div>
  )
}

export default CartList
