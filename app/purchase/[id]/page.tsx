'use client'

import { useState, useEffect } from 'react'

import styles from './page.module.scss'

import imgSample from '@/assets/images/contents/card_example.png'
import { Icon } from '~/components/Icon'
import InquireFormModal from '~/components/modal/InquireFormModal'
import { RefundModal } from '~/components/modal/RefundModal'
import { RefundRejectModal } from '~/components/modal/RefundRejectModal'
import Button from '~/components/ui/Button'
import Tabs from '~/components/ui/Tabs'
import TagList, { Tag } from '~/components/ui/TagList'
import { useModal } from '~/hooks/useModal'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const PurchaseDetailPage = ({ params }: PageProps) => {
  const [id, setId] = useState<string>('')

  useEffect(() => {
    params.then(({ id }) => setId(id))
  }, [params])
  const { openModal } = useModal()
  const [showInquireForm, setShowInquireForm] = useState(false)
  const [showRefund, setShowRefund] = useState(false)
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

  const handleInquireClick = () => {
    setShowInquireForm(true)
    openModal(InquireFormModal)
  }

  const handleRecundClick = () => {
    setShowRefund(true)
    openModal(RefundModal)
  }

  const handleRefundClick = () => {
    openModal(RefundRejectModal)
  }

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>구매 상세</h1>
        <p>
          <span>0000.00.00</span>구매 (주문번호 <span>274530357</span>)
        </p>
      </div>

      {/* 구매목록 리스트 */}
      <div className={styles.purchase_wrap}>
        <ul className={styles.purchase_item_wrap}>
          {/* 구매 아이템 */}
          <li>
            <div className={styles.purchase_item}>
              {/* 구매 상테 제목 */}
              <div className={styles.purchase_item_title}>
                <span>구매 확정</span>
              </div>

              {/* 구매 아이템 정보 */}
              <div className={styles.item_info_wrap}>
                <div className={styles.info_left_wrap}>
                  {/* 구매 이미지 */}
                  <div className={styles.item_img}>
                    <img src={imgSample.src} alt='sample' />
                  </div>

                  {/* 구매 아이템 정보 */}
                  <div className={styles.item_info}>
                    {/* 태그 */}
                    <div className={styles.tags_wrap}>
                      {/* <ul>
                          <li>초3</li>
                          <li>국어</li>
                          <li>독서교육</li>
                          <li>PDF</li>
                        </ul> */}

                      <TagList tags={tagsArr} />
                    </div>

                    {/* 제목 */}
                    <div className={styles.item_title}>
                      <span>
                        효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                      </span>
                    </div>

                    {/* 판매자 */}
                    <div className={styles.item_seller}>
                      <img src={imgSample.src} alt='sample' />
                      <span>수업가게닉네임</span>
                    </div>
                  </div>
                </div>

                <div className={styles.info_right_wrap}>
                  {/* 가격 */}
                  <div className={styles.item_price_wrap}>
                    <span>
                      000,000<span>원</span>
                    </span>
                  </div>

                  {/* 버튼 */}
                  <div className={styles.button_wrap}>
                    <Button variant='outline' onClick={handleInquireClick}>
                      문의
                    </Button>
                    <Button variant='outline' onClick={handleRecundClick}>
                      환불 요청
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.purchase_item}>
              {/* 구매 상테 제목 */}
              <div className={styles.purchase_item_title}>
                <span>구매 확정</span>
              </div>

              {/* 구매 아이템 정보 */}
              <div className={styles.item_info_wrap}>
                <div className={styles.info_left_wrap}>
                  {/* 구매 이미지 */}
                  <div className={styles.item_img}>
                    <img src={imgSample.src} alt='sample' />
                  </div>

                  {/* 구매 아이템 정보 */}
                  <div className={styles.item_info}>
                    {/* 태그 */}
                    <div className={styles.tags_wrap}>
                      {/* <ul>
                          <li>초3</li>
                          <li>국어</li>
                          <li>독서교육</li>
                          <li>PDF</li>
                        </ul> */}

                      <TagList tags={tagsArr} />
                    </div>

                    {/* 제목 */}
                    <div className={styles.item_title}>
                      <span>
                        효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                      </span>
                    </div>

                    {/* 판매자 */}
                    <div className={styles.item_seller}>
                      <img src={imgSample.src} alt='sample' />
                      <span>수업가게닉네임</span>
                    </div>
                  </div>
                </div>

                <div className={styles.info_right_wrap}>
                  {/* 가격 */}
                  <div className={styles.item_price_wrap}>
                    <span>
                      000,000<span>원</span>
                    </span>
                  </div>

                  {/* 버튼 */}
                  <div className={styles.button_wrap}>
                    <Button variant='outline' onClick={handleInquireClick}>
                      문의
                    </Button>
                    <Button variant='outline' onClick={handleRecundClick}>
                      환불 요청
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* 구매자 */}
      <div className={styles.buy_info_wrap}>
        <div className={styles.user_info_wrap}>
          {/* 구매자 정보 */}
          <div className={styles.buy_info}>
            {/* 구매자 타이틀 */}
            <div className={styles.user_title}>
              <span>구매자</span>
            </div>

            {/* 구매자 정보 */}
            <div className={styles.user_info}>
              <ul>
                <li>
                  <span>이름</span>
                  <span>홍길동</span>
                </li>
                <li>
                  <span>휴대폰 번호</span>
                  <span>000-0000-0000</span>
                </li>
                <li>
                  <span>이메일</span>
                  <span>0000@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 왼쪽 디자인 */}
          <div className={styles.user_refund_wrap}>
            <span>환불 사유</span>
            <p>자료 파일 오류/파일 깨짐/누락</p>
            <Button variant='outline' onClick={handleRefundClick}>
              환불 요청 반려 사유 확인
            </Button>
          </div>
        </div>

        {/* 결제 정보 */}
        <div className={styles.purchase_price_wrap}>
          <div className={styles.purchase_price}>
            {/* 경재 정보 타이틀 */}
            <div className={styles.purchase_title}>
              <span>결제 정보</span>
            </div>

            {/* 결제 금액 */}
            <div className={styles.price_info_wrap}>
              <ul>
                <li>
                  <span>상품 금액</span>
                  <span>00,000</span>
                </li>
                <li>
                  <span>할인 금액</span>
                  <span>00,000</span>
                </li>
              </ul>
            </div>

            <div className={styles.price_info_wrap}>
              <ul>
                <li>
                  <span>총 결제 금액</span>
                  <span>00,000</span>
                </li>
                <li>
                  <span>결제수단</span>
                  <span>00,000</span>
                </li>
              </ul>
            </div>

            <div className={styles.price_info_wrap}>
              <ul>
                <li>
                  <span>총 취소 금액</span>
                  <span>00,000</span>
                </li>
                <li>
                  <span>취소 계좌</span>
                  <span>00,000</span>
                </li>
                <li>
                  <span>취소 계좌번호</span>
                  <span>K 00000000000</span>
                </li>
                <li>
                  <span>예금주</span>
                  <span>홍길동</span>
                </li>
                <li>
                  <span>취소예정일</span>
                  <span>결제 취소 승인 후 대 7영업일 소요</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 영수증 */}
          <div className={styles.receipt_wrap}>
            <div className={styles.receipt_button_wrap}>
              <button>결제 영수증</button>
              <button>현금 영수증</button>
            </div>

            <div className={styles.refund_wrap}>
              <a href='/policy/refundCost'>취소/환불 비용 안내</a>
            </div>
          </div>
        </div>
      </div>

      {/* 돌아가기 */}
      <div className={styles.back_btn}>
        <a href='/purchase'>
          <Icon name='chevron-left-s' />
          구매 내역으로 돌아가기
        </a>
      </div>
    </div>
  )
}

export default PurchaseDetailPage
