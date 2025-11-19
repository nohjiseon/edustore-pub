'use client'

import { usePathname } from 'next/navigation'

import styles from './page.module.scss'

import { usePurchaseStore } from '@/stores/purchase'
import { Icon } from '~/components/Icon'
import { FilterDropdown, Tabs } from '~/components/ui'

const PurchaseLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const {
    tabValue,
    setTabValue,
    purchaseFilter,
    setPurchaseFilter,
    termFilter,
    setTermFilter,
    downloadFilter,
    setDownloadFilter,
    searchKeyword,
    setSearchKeyword
  } = usePurchaseStore()

  // 상세 페이지인지 확인 (탭/필터를 숨길 페이지)
  // /purchase/[id], /purchase/reviews/[id], /purchase/result, /purchase/refund, /purchase/refund/[id]
  const isDetailPage =
    /^\/purchase\/\d+$/.test(pathname) || // 구매 상세
    /^\/purchase\/reviews\/[^/]+$/.test(pathname) || // 리뷰 상세
    pathname === '/purchase/result' || // 구매 결과 페이지
    pathname === '/purchase/refund' || // 환불 요청 페이지
    /^\/purchase\/refund\/[^/]+$/.test(pathname) // 환불 요청 상세 페이지

  const purchaseOption = [
    '상태 전체',
    '결제 완료',
    '결제 취소',
    '환불 진행 중',
    '환불 완료'
  ]

  const termOption = [
    '기간 전체',
    '최근 1주일',
    '최근 1개월',
    '최근 3개월',
    '최근 1년'
  ]

  const downloadOption = ['다운로드 전체', '다운로드 완료', '다운로드 미완료']

  const tabs = [
    {
      value: 'purchase',
      label: '구매 목록',
      badge: 152
    },
    {
      value: 'review',
      label: '나의 후기',
      badge: 10
    },
    {
      value: 'inquire',
      label: '나의 문의',
      badge: 2
    }
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {!isDetailPage && (
          <>
            {/* 타이틀 */}
            <div className={styles.title_wrap}>
              <h1 className={styles.title}>구매 및 다운로드 관리</h1>
            </div>

            {/* 구매관리 탭 */}
            <div className={styles.purchase_tabs_wrap}>
              <Tabs
                items={tabs}
                value={tabValue}
                type='primary'
                onValueChange={(value) => {
                  setTabValue(value as 'purchase' | 'review' | 'inquire')
                  console.log('현재 탭:', value)
                }}
              />
            </div>

            {/* 검색 섹션 */}
            <div className={styles.filters_wrap}>
              {/* 필터 */}
              {tabValue === 'purchase' ? (
                <div className={styles.filters_list}>
                  <FilterDropdown
                    options={purchaseOption.slice(1)}
                    defaultValue='상태 전체'
                    selectedValues={
                      purchaseFilter === '상태 전체' ? [] : [purchaseFilter]
                    }
                    onSelect={(values) =>
                      setPurchaseFilter(values[0] || '상태 전체')
                    }
                    singleSelect
                  />
                  <FilterDropdown
                    options={termOption.slice(1)}
                    defaultValue='기간 전체'
                    selectedValues={
                      termFilter === '기간 전체' ? [] : [termFilter]
                    }
                    onSelect={(values) =>
                      setTermFilter(values[0] || '기간 전체')
                    }
                    singleSelect
                  />
                  <FilterDropdown
                    options={downloadOption.slice(1)}
                    defaultValue='다운로드 전체'
                    selectedValues={
                      downloadFilter === '다운로드 전체' ? [] : [downloadFilter]
                    }
                    onSelect={(values) =>
                      setDownloadFilter(values[0] || '다운로드 전체')
                    }
                    singleSelect
                  />
                </div>
              ) : (
                <div className={styles.filters_list}>
                  <FilterDropdown
                    options={termOption.slice(1)}
                    defaultValue='기간 전체'
                    selectedValues={
                      termFilter === '기간 전체' ? [] : [termFilter]
                    }
                    onSelect={(values) =>
                      setTermFilter(values[0] || '기간 전체')
                    }
                    singleSelect
                  />
                </div>
              )}

              {/* 검색창 */}
              <div className={styles.search_wrap}>
                <input
                  type='text'
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder='자료명, 업로더명으로 검색하세요'
                />
                <Icon name='search' />
              </div>
            </div>
          </>
        )}

        {/* 자식 컴포넌트 */}
        {children}
      </div>
    </div>
  )
}

export default PurchaseLayout
