'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import InquiryPage from './inquiry/page'
import styles from './page.module.scss'
import ReviewsPage from './reviews/page'

import defaultProfile from '@/assets/images/common/default_profile.png'
import cardExample from '@/assets/images/contents/card_example.png'
import salesBack from '@/assets/images/sub/sales_back.png'
import EmptyState from '@/components/common/EmptyState'
import { Icon } from '~/components/Icon'
import { Pagination } from '~/components/ui'
import DropdownMenu from '~/components/ui/DropdownMenu'
import FilterDropdown from '~/components/ui/FilterDropdown'
import Tabs from '~/components/ui/Tabs'
import TagList, { type Tag } from '~/components/ui/TagList'

interface SalesItem {
  id: number
  image: string
  status: '진열 완료' | '임시 저장' | '비활성화' | '업로드 대기' | '진열 반려'
  tags: Tag[]
  title: string
  price: string
  displayDate: string
  salesCount: number
  reviewScore: number
  clickCount: number
}

const SalesPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('진열 목록')
  const [activeFilter, setActiveFilter] = useState('상태 전체')
  const [sortOption, setSortOption] = useState<string[]>(['기간 전체'])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const tabItems = [
    { label: '진열 목록', value: '진열 목록' },
    { label: '후기 관리', value: '후기 관리' },
    { label: '문의 관리', value: '문의 관리' }
  ]

  const filters = [
    '상태 전체',
    '진열 완료',
    '비활성화',
    '임시 저장',
    '업로드 대기',
    '진열 반려'
  ] as const

  const sortOptions = ['기간 전체'] as const

  // 임시 데이터
  const [salesData, setSalesData] = useState<SalesItem[]>([
    {
      id: 1,
      image: cardExample.src,
      status: '진열 완료',
      tags: [
        { name: '초등', color: 'green' as const },
        { name: '3학년', color: 'blue' as const },
        { name: '과학수업', color: 'yellow' as const },
        { name: 'PDF', color: 'red' as const }
      ],
      title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
      price: '00,000',
      displayDate: '00.00.00',
      salesCount: 55,
      reviewScore: 4.8,
      clickCount: 55
    },
    {
      id: 2,
      image: cardExample.src,
      status: '임시 저장',
      tags: [
        { name: '초등', color: 'green' as const },
        { name: '3학년', color: 'blue' as const },
        { name: '과학수업', color: 'yellow' as const },
        { name: 'PDF', color: 'red' as const }
      ],
      title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
      price: '00,000',
      displayDate: '00.00.00',
      salesCount: 55,
      reviewScore: 4.8,
      clickCount: 55
    },
    {
      id: 3,
      image: cardExample.src,
      status: '비활성화',
      tags: [
        { name: '초등', color: 'green' as const },
        { name: '3학년', color: 'blue' as const },
        { name: '과학수업', color: 'yellow' as const },
        { name: 'PDF', color: 'red' as const }
      ],
      title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
      price: '00,000',
      displayDate: '00.00.00',
      salesCount: 55,
      reviewScore: 4.8,
      clickCount: 55
    },
    {
      id: 4,
      image: cardExample.src,
      status: '진열 반려',
      tags: [
        { name: '초등', color: 'green' as const },
        { name: '3학년', color: 'blue' as const },
        { name: '과학수업', color: 'yellow' as const },
        { name: 'PDF', color: 'red' as const }
      ],
      title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
      price: '00,000',
      displayDate: '00.00.00',
      salesCount: 55,
      reviewScore: 4.8,
      clickCount: 55
    },
    {
      id: 5,
      image: cardExample.src,
      status: '업로드 대기',
      tags: [
        { name: '초등', color: 'green' as const },
        { name: '3학년', color: 'blue' as const },
        { name: '과학수업', color: 'yellow' as const },
        { name: 'PDF', color: 'red' as const }
      ],
      title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
      price: '00,000',
      displayDate: '00.00.00',
      salesCount: 55,
      reviewScore: 4.8,
      clickCount: 55
    }
  ])

  const handleManageTransaction = () => {
    router.push('/sales/edit')
  }

  const handleEditContent = (id: number) => {
    console.log('편집하기:', id)
    // TODO: 컨텐츠 편집 페이지로 이동
  }

  const handleDeactivateContent = (id: number) => {
    setSalesData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: '비활성화' } : item
      )
    )
  }

  const handleActivateContent = (id: number) => {
    setSalesData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: '진열 완료' } : item
      )
    )
  }

  const handleDeleteContent = (id: number) => {
    // 로컬에서 삭제
    setSalesData((prevData) => prevData.filter((item) => item.id !== id))
  }

  // 상태값을 클래스명으로 변환
  const getStatusClass = (status: SalesItem['status']) => {
    const statusMap: Record<string, string> = {
      '진열 완료': 'active',
      '임시 저장': 'temp',
      비활성화: 'inactive',
      '업로드 대기': 'pending',
      '진열 반려': 'rejected'
    }
    return statusMap[status] || ''
  }

  // 상태에 따른 케밥 메뉴 아이템 생성
  const getMenuItems = (item: SalesItem) => {
    switch (item.status) {
      case '업로드 대기':
      case '진열 반려':
        return [
          {
            label: '삭제하기',
            action: () => handleDeleteContent(item.id)
          }
        ]
      case '진열 완료':
        return [
          {
            label: '편집하기',
            action: () => handleEditContent(item.id)
          },
          {
            label: '컨텐츠 비활성화',
            action: () => handleDeactivateContent(item.id)
          },
          {
            label: '삭제하기',
            action: () => handleDeleteContent(item.id)
          }
        ]
      case '비활성화':
        return [
          {
            label: '컨텐츠 활성화',
            action: () => handleActivateContent(item.id)
          },
          {
            label: '삭제하기',
            action: () => handleDeleteContent(item.id)
          }
        ]
      case '임시 저장':
        return [
          {
            label: '편집하기',
            action: () => handleEditContent(item.id)
          },
          {
            label: '삭제하기',
            action: () => handleDeleteContent(item.id)
          }
        ]
      default:
        return []
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top_imgbox}>
        <Image src={salesBack.src} alt='백그라운드' fill priority unoptimized />
      </div>

      {/* 프로필 섹션 */}
      <div className={styles.profile_section}>
        <div className={styles.profile_wrap}>
          <div className={styles.profile_img}>
            <Image
              src={defaultProfile}
              alt='profile'
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
            <span className={styles.ic_edit}>
              <Icon name='edit-s' />
            </span>
          </div>
          <p>홍길동</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat_item}>
            <Icon name='like' size={20} color='var(--color-primary)' />
            <span>000</span>
          </div>
          <div className={styles.stat_item}>
            <Icon name='star' size={20} color='#FFD52B' />
            <span>4.8/5(200)</span>
          </div>
        </div>

        <p className={styles.my_info}>
          수업가게 내 거래한 게시판작성 내 거래에 대한 별점 소개 글을
          작성합니다.
        </p>

        <div className={styles.btn_box}>
          <button type='button' onClick={handleManageTransaction}>
            내 가게 편집
          </button>
        </div>

        {/* 통계 카드 섹션 */}
        <div className={`${styles.stats_cards} ${styles.con_box}`}>
          <div className={styles.card}>
            <p className={styles.card_label}>진행 자료 수</p>
            <p className={styles.card_value}>00</p>
          </div>
          <div className={styles.card}>
            <p className={styles.card_label}>후기 및 응원 업데이트 건</p>
            <p className={styles.card_value}>0</p>
          </div>
          <div className={styles.card}>
            <p className={styles.card_label}>지금까지 받은 정산 금액</p>
            <p className={styles.card_value}>100,000</p>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className={styles.con_box}>
          <Tabs
            items={tabItems}
            value={activeTab}
            onValueChange={setActiveTab}
            type='centerline'
          />
        </div>
      </div>

      <div className={styles.con_box}>
        {/* 진열 목록 탭 */}
        {activeTab === '진열 목록' && (
          <>
            {/* 필터 및 검색 */}
            <div className={styles.filter_section}>
              <FilterDropdown
                options={filters}
                selectedValues={activeFilter ? [activeFilter] : []}
                onSelect={(values) => setActiveFilter(values[0] || '상태 전체')}
                singleSelect
                showDefaultOption={false}
                defaultValue='상태 전체'
              />
              <div className={styles.right_box}>
                <FilterDropdown
                  options={sortOptions}
                  selectedValues={sortOption}
                  onSelect={setSortOption}
                  singleSelect
                  showDefaultOption={false}
                  defaultValue='기간 전체'
                />

                <div className={styles.search_box}>
                  <input
                    type='text'
                    placeholder='자료명으로 검색하세요'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Icon name='search' size={24} />
                </div>
              </div>
            </div>

            {/* 자료 목록 */}
            <div className={styles.content_list}>
              {salesData.length === 0 ? (
                <div className={styles.empty_box}>
                  <EmptyState
                    title='진열 중인 자료가 없습니다.'
                    subtitle='등록한 자료를 진열하면 다른 선생님들이 쉽게 찾아볼 수 있습니다'
                  />
                </div>
              ) : (
                salesData.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.content_item} ${
                      styles[getStatusClass(item.status)]
                    }`}
                  >
                    <div className={styles.content_top}>
                      <div className={styles.status_badge}>{item.status}</div>
                      <DropdownMenu
                        trigger={
                          <button className={styles.menu_button}>
                            <Icon name='kebab' size={24} />
                          </button>
                        }
                        items={getMenuItems(item)}
                        align='end'
                        side='bottom'
                      />
                    </div>
                    <Link
                      href={`/content/${item.id}`}
                      className={styles.content_box}
                    >
                      <div className={styles.thumbnail}>
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className={styles.content_info}>
                        <TagList tags={item.tags} gap={0.5} />
                        <h3 className={styles.content_title}>{item.title}</h3>
                        <p className={styles.price}>{item.price}</p>
                        <div className={styles.content_meta}>
                          <span>진열일 {item.displayDate}</span>
                          <span>판매수 {item.salesCount}</span>
                          <span>후기 {item.reviewScore}/5</span>
                          <span>클릭수 {item.clickCount}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>

            {/* 페이지네이션 */}
            <div className={styles.pagination_wrap}>
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}

        {/* 후기 관리 탭 */}
        {activeTab === '후기 관리' && <ReviewsPage />}

        {/* 문의 관리 탭 */}
        {activeTab === '문의 관리' && <InquiryPage />}
      </div>
    </div>
  )
}

export default SalesPage
