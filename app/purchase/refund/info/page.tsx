'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './page.module.scss'

import imgSample from '@/assets/images/contents/card_example.png'
import { Button, TagList, Textarea } from '~/components/ui'
import { Tag } from '~/components/ui/TagList'

const RefundInfoPage = () => {
  const router = useRouter()

  const handleNext = () => {
    router.push('/purchase/result?type=refund')
  }

  const tagsArr: Tag[] = [
    {
      name: '초3',
      color: 'green'
    },
    {
      name: '국어',
      color: 'yellow'
    },
    {
      name: '독서교육',
      color: 'blue'
    },
    {
      name: 'PDF',
      color: 'red'
    }
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.item_wrap}>
        <div className={styles.item_title_wrap}>
          <span>환불 정보를 확인해 주세요</span>
        </div>

        <div className={styles.item_content_wrap}>
          <div className={styles.item_content}>
            <div className={styles.content_img_wrap}>
              <img src={imgSample.src} alt='sample' />
            </div>

            <div className={styles.content_info_wrap}>
              <div className={styles.tags_wrap}>
                <TagList tags={tagsArr} />
              </div>

              <div className={styles.content_title_wrap}>
                <span>
                  효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                </span>
              </div>

              <div className={styles.seller_wrap}>
                <div className={styles.seller_img_wrap}>
                  <img src={imgSample.src} alt='sample' />
                  <span>수업가게닉네임</span>
                </div>

                <div className={styles.price}>
                  <span>10,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.refund_info_wrap}>
          <div className={styles.refund_info_content}>
            <div className={styles.info_title_wrap}>
              <span>결제 정보</span>
            </div>

            <div className={styles.refund_cost_wrap}>
              <div className={styles.refund_cost}>
                <span>상품 금액</span>
                <span>00,000</span>
              </div>
              <div className={styles.refund_cost}>
                <span>할인 금액</span>
                <span>00,000</span>
              </div>
            </div>
          </div>

          <div className={styles.refund_info_content}>
            <div className={styles.info_title_wrap}>
              <span>총 결제 금액</span>
              <span>00,000</span>
            </div>

            <div className={styles.refund_cost_wrap}>
              <div className={styles.refund_cost}>
                <span>결제수단</span>
                <span>00,000</span>
              </div>
              <div className={styles.refund_cost}>
                <span>수업가게 충전금</span>
                <span>00,000</span>
              </div>
            </div>
          </div>

          <div className={styles.refund_info_content}>
            <div className={styles.info_title_wrap}>
              <span>총 환불 금액</span>
              <span>00,000</span>
            </div>

            <div className={styles.refund_cost_wrap}>
              <div className={styles.refund_cost}>
                <span>환불 계좌</span>
                <span>00,000</span>
              </div>
              <div className={styles.refund_cost}>
                <span>환불 계좌번호</span>
                <span>국민은행 00000000000</span>
              </div>
              <div className={styles.refund_cost}>
                <span>예금주</span>
                <span>홍길동</span>
              </div>
              <div className={styles.refund_cost}>
                <span>환불예정일</span>
                <span>환불 승인 후 대 7영업일 소요</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modal_button_wrap}>
          <Button variant='default' onClick={handleNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RefundInfoPage
