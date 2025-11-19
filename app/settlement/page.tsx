'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  mockSettlementDashboard,
  mockSettlementItems,
  mockPagination,
  type SettlementItem
} from './_mock/settlementData'
import AccountManagePage from './account/page'
import styles from './page.module.scss'
import WithdrawalPage from './withdrawal/page'

import EmptyState from '~/components/common/EmptyState'
import { Icon } from '~/components/Icon'
import { Tabs, FilterDropdown, Tooltip, Pagination } from '~/components/ui'

const SettlementListPage = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [tabValue, setTabValue] = useState<
    'settlement' | 'withdrawal' | 'account'
  >('settlement')
  const [settlementFilter, setSettlementFilter] =
    useState<string>('정산 상태 전체')
  const [termFilter, setTermFilter] = useState<string>('기간 전체')
  const [accountFilter, setAccountFilter] = useState<string>('계좌 전체')

  const dashboardData = mockSettlementDashboard
  const settlementList = mockSettlementItems
  const pagination = mockPagination

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // TODO: 페이지 변경 시 데이터 fetch
  }

  const handleRowClick = (id: number) => {
    router.push(`/settlement/${id}`)
  }

  // 정산 상태에 따른 스타일 클래스 반환
  const getStatusClass = (status: SettlementItem['status']) => {
    return status === 'completed' ? styles.blue : styles.gray
  }

  // 정산 상태 텍스트 반환
  const getStatusText = (status: SettlementItem['status']) => {
    return status === 'completed' ? '정산완료' : '정산대기'
  }

  // 숫자 포맷팅 (원 단위)
  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()}`
  }

  const tabs = [
    {
      value: 'settlement',
      label: '정산 목록'
    },
    {
      value: 'withdrawal',
      label: '출금내역'
    },
    {
      value: 'account',
      label: '계좌관리'
    }
  ]

  // 필터 옵션
  const statusOptions = ['정산대기', '정산완료'] as const
  const termOptions = [
    '최근 1주일',
    '최근 1개월',
    '최근 3개월',
    '최근 1년'
  ] as const
  const accountOptions = [
    '기업은행 111-111-111111',
    '국민은행 111-111-222222',
    '우리은행 111-111-333333'
  ] as const

  return (
    <div className={styles.wrapper}>
      <div className={styles.con_box}>
        <h1 className={styles.title}>정산 관리</h1>
        <p className={styles.subtitle}>
          정산받을 계좌를 등록하고 출금을 신청해주세요
        </p>
        <Tabs
          items={tabs}
          value={tabValue}
          type='centerline'
          onValueChange={(value) =>
            setTabValue(value as 'settlement' | 'withdrawal' | 'account')
          }
        />

        {tabValue === 'settlement' ? (
          <div className={styles.settlement_wrap}>
            <div className={styles.dash_wrap}>
              <div className={styles.dash_item}>
                <p>정산 예정 금액</p>
                <span>{dashboardData.expectedAmount.toLocaleString()}</span>
              </div>
              <div className={styles.dash_item}>
                <p>지금까지 받은 정산 금액</p>
                <span>{dashboardData.totalAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className={styles.filter_wrap}>
              <div className={styles.filter_box}>
                <FilterDropdown
                  options={statusOptions}
                  defaultValue='상태 전체'
                  showDefaultOption={false}
                  selectedValues={
                    settlementFilter === '정산 상태 전체' ||
                    settlementFilter === '상태 전체'
                      ? []
                      : [settlementFilter]
                  }
                  onSelect={(values) =>
                    setSettlementFilter(
                      values.length > 0
                        ? values[values.length - 1]
                        : '정산 상태 전체'
                    )
                  }
                  singleSelect
                />

                <FilterDropdown
                  options={termOptions}
                  defaultValue='기간 전체'
                  showDefaultOption={false}
                  selectedValues={
                    termFilter === '기간 전체' ? [] : [termFilter]
                  }
                  onSelect={(values) =>
                    setTermFilter(
                      values.length > 0
                        ? values[values.length - 1]
                        : '기간 전체'
                    )
                  }
                  singleSelect
                />

                <FilterDropdown
                  className={styles.w_298}
                  options={accountOptions}
                  defaultValue='계좌 전체'
                  showDefaultOption={false}
                  selectedValues={
                    accountFilter === '계좌 전체' ? [] : [accountFilter]
                  }
                  onSelect={(values) =>
                    setAccountFilter(
                      values.length > 0
                        ? values[values.length - 1]
                        : '계좌 전체'
                    )
                  }
                  singleSelect
                />
              </div>
              <div className={styles.search_box}>
                <input
                  type='text'
                  placeholder='자료명, 업로더명으로 검색하세요'
                />
                <button>
                  <Icon name='search' />
                </button>
              </div>
            </div>

            <div className={styles.table_wrap}>
              <table className={styles.basic_table}>
                <colgroup>
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '129px' }} />
                  <col />
                  <col style={{ width: '107px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '138px' }} />
                  <col style={{ width: '167px' }} />
                  <col style={{ width: '133px' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>정산상태</th>
                    <th>정산 완료일</th>
                    <th>자료 정보</th>
                    <th>
                      <div className={styles.flex_center}>
                        <span>금액</span>
                        <Icon name='sort' color='var(--color-neutral-grey-2)' />
                      </div>
                    </th>
                    <th>
                      <div className={styles.flex_center}>
                        <span>판매수</span>
                        <Icon name='sort' color='var(--color-neutral-grey-2)' />
                      </div>
                    </th>
                    <th>
                      <div className={styles.flex_center}>
                        <span>총 매출액</span>
                        <Icon name='sort' color='var(--color-neutral-grey-2)' />
                      </div>
                    </th>
                    <th>
                      <div className={styles.flex_center}>
                        <span>PG 수수료</span>
                        <Tooltip
                          title='PG 수수료'
                          content={
                            <>
                              결제대행(PG) 서비스를 이용할 때 발생하는
                              수수료입니다.
                              <br />
                              결제 건당 결제대행사(PG사)에 지불되는 기본
                              수수료를 의미합니다.
                            </>
                          }
                          top='1.5rem'
                          right='-1.625rem'
                          width='26.5rem'
                        >
                          <button className={styles.info_btn}>
                            <Icon
                              name='info'
                              color='var(--color-neutral-grey-3)'
                            />
                          </button>
                        </Tooltip>
                      </div>
                      <div className={`${styles.flex_center} ${styles.pl_18}`}>
                        <span>서비스 수수료</span>
                        <Tooltip
                          title='서비스 수수료'
                          content={
                            <>
                              수업가게 플랫폼을 통해 자료를 판매할 때 발생하는
                              서비스 이용 수수료입니다.
                              <br />
                              판매 금액에서 일정 비율이 차감되어 정산됩니다.
                            </>
                          }
                          top='1.5rem'
                          right='-1.625rem'
                          width='29.8125rem'
                        >
                          <button className={styles.info_btn}>
                            <Icon
                              name='info'
                              color='var(--color-neutral-grey-3)'
                            />
                          </button>
                        </Tooltip>
                      </div>
                    </th>
                    <th>
                      <div className={styles.flex_center}>
                        <span>정산 금액</span>
                        <Icon name='sort' color='var(--color-neutral-grey-2)' />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {settlementList.length === 0 ? (
                    <tr>
                      <td colSpan={8}>
                        <EmptyState
                          title='정산 내역이 없습니다.'
                          subtitle='판매가 완료된 자료의 정산 내역이 이곳에 표시됩니다.'
                        />
                      </td>
                    </tr>
                  ) : (
                    settlementList.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleRowClick(item.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>
                          <span
                            className={`${styles.status_tag} ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {getStatusText(item.status)}
                          </span>
                        </td>
                        <td>{item.completedDate}</td>
                        <td>{item.contentTitle}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{item.salesCount}</td>
                        <td>{formatCurrency(item.totalSales)}</td>
                        <td>
                          <div>{formatCurrency(item.pgFee)}</div>
                          <div>{formatCurrency(item.serviceFee)}</div>
                        </td>
                        <td>{formatCurrency(item.settlementAmount)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {settlementList.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        ) : tabValue === 'withdrawal' ? (
          <WithdrawalPage />
        ) : (
          <AccountManagePage />
        )}
      </div>
    </div>
  )
}

export default SettlementListPage
