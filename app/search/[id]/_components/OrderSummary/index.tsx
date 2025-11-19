'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import styles from './OrderSummary.module.scss'
import CartSuccessModal from '../CartSuccessModal/CartSuccessModal'

import LoginModal from '@/components/modal/LoginModal'
import { Button } from '@/components/ui'
import Avatar from '@/components/ui/Avatar'
import StarRating from '@/components/ui/StarRating'
import TagList, { Tag } from '@/components/ui/TagList/TagList'
import { TAG_COLOR_MAP } from '@/constants/tag'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { useModal } from '@/hooks/useModal'
import { TokenStorage } from '@/lib/api'
import type { AuthData } from '@/lib/api'
import { cn } from '@/lib/utils'
import { cartService } from '@/services/cart.service'
import { useAuthStore } from '~/stores/auth'
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
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
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
    // 비회원일 경우 로그인 모달 표시
    if (!isAuthenticated) {
      openModal(LoginModal)
      return
    }

    // 개인회원만 장바구니 사용 가능
    if (user?.memberType !== 'individual') {
      alert('장바구니 기능은 개인회원만 사용할 수 있습니다.')
      return
    }

    // memNo 확인
    const memNo = user?.memNo ? Number(user.memNo) : null
    if (!memNo || isNaN(memNo)) {
      alert('회원 정보를 불러올 수 없습니다. 다시 로그인해주세요.')
      return
    }

    // productNo 확인
    const productNo = params?.id ? Number(params.id) : null
    if (!productNo || isNaN(productNo)) {
      alert('상품 정보를 불러올 수 없습니다.')
      return
    }

    setIsAdding(true)

    try {
      // 토큰 및 인증 상태 확인
      const token = TokenStorage.getAccessToken()
      const authData = TokenStorage.getAuthData()

      console.log('=== 장바구니 추가 - 인증 상태 확인 ===')
      console.log('로그인 상태:', isAuthenticated)
      console.log('사용자 정보:', user)
      console.log('회원 번호 (memNo):', memNo)
      console.log(
        'Access Token:',
        token ? `${token.substring(0, 20)}...` : '없음'
      )
      console.log('인증 데이터:', authData ? '있음' : '없음')

      if (authData) {
        console.log('토큰 만료 시간:', authData.expireAt)
        const expireTime = new Date(authData.expireAt).getTime()
        const now = Date.now()
        const isExpired = expireTime <= now
        console.log('토큰 만료 여부:', isExpired ? '만료됨' : '유효함')
        console.log(
          '만료까지 남은 시간:',
          isExpired ? '0초' : `${Math.floor((expireTime - now) / 1000)}초`
        )
      }

      if (!token) {
        alert('인증 토큰이 없습니다. 다시 로그인해주세요.')
        setIsAdding(false)
        return
      }

      console.log('장바구니 추가 API 호출 시작...')
      console.log('요청 데이터:', {
        memNo: memNo,
        productNo: productNo
      })

      await cartService.addToCart({
        memNo: memNo,
        productNo: productNo
      })

      console.log('장바구니 추가 성공!')

      // 성공 모달 표시
      openModal(CartSuccessModal, {
        onConfirm: () => {
          router.push('/cart')
        }
      })
    } catch (error: any) {
      console.error('장바구니 추가 실패:', error)
      console.error('에러 상세:', {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        message: error?.message
      })

      // 403 Forbidden 에러 처리
      // if (error?.response?.status === 403) {
      //   alert('권한이 없습니다. 로그인 상태를 확인해주세요.')
      // } else if (error?.response?.status === 401) {
      //   alert('인증이 만료되었습니다. 다시 로그인해주세요.')
      // } else {
      //   const errorMessage =
      //     error?.response?.data?.message ||
      //     error?.message ||
      //     '장바구니 추가 중 오류가 발생했습니다.'
      //   alert(errorMessage)
      // }
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
