'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import styles from './OrderSummary.module.scss'
import CartSuccessModal from '../CartSuccessModal/CartSuccessModal'

import { Button } from '@/components/ui'
import Avatar from '@/components/ui/Avatar'
import StarRating from '@/components/ui/StarRating'
import TagList, { Tag } from '@/components/ui/TagList/TagList'
import { TAG_COLOR_MAP } from '@/constants/tag'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { useModal } from '@/hooks/useModal'
import { cn } from '@/lib/utils'
import { useCartStore } from '~/stores/cart'

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={styles.detail_row}>
      <div className={styles.detail_label}>
        <div className={styles.detail_icon}>
          <svg width='11' height='7' viewBox='0 0 11 7' fill='none'>
            <path
              d='M1 3L4 6L10 1'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <span>{label}</span>
      </div>
      <div className={styles.detail_value}>{value}</div>
    </div>
  )
}

const OrderSummary = () => {
  const router = useRouter()
  const params = useParams()
  const { openModal } = useModal()
  const addToCart = useCartStore((state) => state.addToCart)
  const scrollDirection = useScrollDirection({ threshold: 10 })
  const [isAdding, setIsAdding] = useState(false)

  // TODO: 나중에 비동기 데이터 fetching으로 교체 예정
  const data = {
    id: '1', // 상품 고유 ID
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    price: 21000,
    rating: 4.5,
    reviewCount: 400,
    authorName: '수업가게닉네임',
    authorImage: '/api/placeholder/22/22',
    tags: [
      { text: '초3', type: 'grade' },
      { text: '국어', type: 'subject' },
      { text: '독서교육', type: 'category' },
      { text: '교무', type: 'extension' }
    ],
    details: [
      { label: '적용 학년', value: '초3' },
      { label: '적용 교과', value: '수학' },
      { label: '업로드 일', value: '0000-00-00' },
      { label: '자료 형식', value: 'PDF' }
    ]
  }

  // 태그 타입을 TAG_COLOR_MAP 키로 변환
  const typeMap: Record<string, keyof typeof TAG_COLOR_MAP> = {
    grade: 'grade',
    subject: 'subject',
    category: 'type',
    extension: 'format'
  }

  // TagList 컴포넌트에 맞는 형식으로 변환
  const convertedTags: Tag[] = data.tags.map((tag) => ({
    name: tag.text,
    color: TAG_COLOR_MAP[typeMap[tag.type] || 'grade']
  }))

  const handlePurchase = () => {
    // TODO: 구매 로직 구현
    console.log('구매하기 클릭')
  }

  const handleAddToCart = async () => {
    const productId =
      typeof params?.id === 'string' ? params.id : data.id.toString()

    setIsAdding(true)

    try {
      addToCart({
        id: productId,
        title: data.title,
        author: {
          name: data.authorName,
          avatar: data.authorImage
        },
        price: data.price,
        imageSrc: data.authorImage,
        tags: convertedTags
      })

      openModal(CartSuccessModal, {
        onConfirm: () => {
          router.push('/cart')
        }
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div
      className={cn(
        styles.container,
        scrollDirection === 'down' && styles.container_scrolled
      )}
    >
      {/* 태그 및 제목 섹션 */}
      <div className={styles.header_section}>
        <div className={styles.content_wrapper}>
          {/* 태그들 */}
          <TagList tags={convertedTags} />

          {/* 제목 */}
          <h1 className={styles.title}>{data.title}</h1>

          {/* 작성자 정보 */}
          <div className={styles.author_info}>
            <Avatar
              name={data.authorName}
              avatar={data.authorImage}
              size={22}
            />
          </div>
        </div>

        {/* 가격 및 별점 */}
        <div className={styles.price_section}>
          <div className={styles.price}>{data.price.toLocaleString()}</div>
          <div className={styles.rating_container}>
            <StarRating rating={data.rating} showScore={true} />
            <span className={styles.review_count}>
              (
              <span className={styles.review_link}>
                {data.reviewCount}개의 후기
              </span>
              )
            </span>
          </div>
        </div>
      </div>

      {/* 버튼 및 세부정보 섹션 */}
      <div className={styles.action_section}>
        {/* 버튼들 */}
        <div className={styles.button_container}>
          <Button
            variant='default'
            onClick={handlePurchase}
            className={styles.purchase_button}
          >
            구매하기
          </Button>
          <Button
            variant='outline'
            onClick={handleAddToCart}
            disabled={isAdding}
            className={styles.cart_button}
          >
            {isAdding ? '추가 중...' : '장바구니 담기'}
          </Button>
        </div>

        {/* 세부 정보 */}
        <div className={styles.details_container}>
          {data.details.map((detail, index) => (
            <DetailRow key={index} label={detail.label} value={detail.value} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
