'use client'

import { useState } from 'react'

import MyInquiriesPage from './inquiries/page'
import styles from './page.module.scss'
import MyReviewsPage from './reviews/page'

import imgSample from '@/assets/images/contents/card_example.png'
import ReviewModal from '@/components/modal/ReviewModal'
import { usePurchaseStore } from '@/stores/purchase'
import { Icon } from '~/components/Icon'
import RefundModal from '~/components/modal/CancelModal'
import DownloadModal from '~/components/modal/DownloadModal'
import RefundRejectModal from '~/components/modal/RefundRejectModal'
import { Button, Pagination } from '~/components/ui'
import TagList, { Tag } from '~/components/ui/TagList'
import { useModal } from '~/hooks/useModal'

const PurchaseListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { tabValue } = usePurchaseStore()
  const { openModal } = useModal()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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

  const handleReviewClick = () => {
    openModal(ReviewModal)
  }

  const handleDownloadClick = () => {
    openModal(DownloadModal)
  }

  const handleRefundClick = () => {
    openModal(RefundModal)
  }

  const handleRefundRejectClick = () => {
    openModal(RefundRejectModal)
  }

  return (
    <>
      {tabValue === 'purchase' ? (
        // 구매 목록
        <div className={styles.purchase_wrap}>
          <ul>
            {/* 날짜별 item */}
            <li>
              <div className={styles.purchase_title_wrap}>
                <div className={styles.purchase_date_wrap}>
                  <span>0000.00.00</span>
                  <Icon name='divider-center' />
                  <span>주문 2건</span>
                </div>
                <div className={styles.purchase_detail_wrap}>
                  <a href='/purchase/1'>
                    상세 내역 <Icon name='chevron-right-s' />
                  </a>
                </div>
              </div>
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
                              효율적인 업무 관리를 위한 시간 관리와 자기관리
                              목록들
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
                          <Button variant='outline' onClick={handleRefundClick}>
                            구매취소
                          </Button>
                          <Button
                            variant='outline'
                            onClick={handleDownloadClick}
                          >
                            다운로드
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
                              효율적인 업무 관리를 위한 시간 관리와 자기관리
                              목록들
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
                          <Button
                            variant='outline'
                            onClick={handleDownloadClick}
                          >
                            다운로드
                          </Button>
                          <Button variant='outline' onClick={handleReviewClick}>
                            후기 남기기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.purchase_title_wrap}>
                <div className={styles.purchase_date_wrap}>
                  <span>0000.00.00</span>
                  <Icon name='divider-center' />
                  <span>주문 2건</span>
                </div>
                <div className={styles.purchase_detail_wrap}>
                  <a href='/purchase/1'>
                    상세 내역 <Icon name='chevron-right-s' />
                  </a>
                </div>
              </div>
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
                              효율적인 업무 관리를 위한 시간 관리와 자기관리
                              목록들
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
                          <Button variant='outline' onClick={handleRefundClick}>
                            구매취소
                          </Button>
                          <Button
                            variant='outline'
                            onClick={handleDownloadClick}
                          >
                            다운로드
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
                              효율적인 업무 관리를 위한 시간 관리와 자기관리
                              목록들
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
                          <Button variant='outline' onClick={handleRefundClick}>
                            구매취소
                          </Button>
                          <Button
                            variant='outline'
                            onClick={handleDownloadClick}
                          >
                            다운로드
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.purchase_title_wrap}>
                <div className={styles.purchase_date_wrap}>
                  <span>0000.00.00</span>
                  <Icon name='divider-center' />
                  <span>주문 2건</span>
                </div>
                <div className={styles.purchase_detail_wrap}>
                  <a href='/purchase/1'>
                    상세 내역 <Icon name='chevron-right-s' />
                  </a>
                </div>
              </div>
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
                              효율적인 업무 관리를 위한 시간 관리와 자기관리
                              목록들
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
                          <Button
                            variant='outline'
                            onClick={handleReviewClick}
                            type='button'
                          >
                            후기남기기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.purchase_title_wrap}>
                <div className={styles.purchase_date_wrap}>
                  <span>0000.00.00</span>
                  <Icon name='divider-center' />
                  <span>주문 2건</span>
                </div>
                <div className={styles.purchase_detail_wrap}>
                  <a href='/purchase/1'>
                    상세 내역 <Icon name='chevron-right-s' />
                  </a>
                </div>
              </div>
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
                              효율적인 업무 관리를 위한 시간 관리와 자기관리
                              목록들
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
                          <Button
                            variant='outline'
                            onClick={handleDownloadClick}
                          >
                            다운로드
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div className={styles.purchase_title_wrap}>
                <div className={styles.purchase_date_wrap}>
                  <span>0000.00.00</span>
                  <Icon name='divider-center' />
                  <span>주문 2건</span>
                </div>
                <div className={styles.purchase_detail_wrap}>
                  <a href='/purchase/1'>
                    상세 내역 <Icon name='chevron-right-s' />
                  </a>
                </div>
              </div>
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
                              효율적인 업무 관리를 위한 시간 관리와 자기관리
                              목록들
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
                          <Button
                            variant='outline'
                            onClick={handleRefundRejectClick}
                          >
                            다운로드
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      ) : tabValue === 'review' ? (
        <MyReviewsPage />
      ) : (
        <MyInquiriesPage />
      )}

      {/* 페이징 */}
      {/* 페이지네이션 영역 */}
      {tabValue === 'purchase' && (
        <Pagination
          currentPage={currentPage}
          totalPages={17}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}

export default PurchaseListPage
