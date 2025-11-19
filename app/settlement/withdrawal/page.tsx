'use client'

import { useState } from 'react'

import {
  mockWithdrawalItems,
  mockWithdrawableAmount,
  type WithdrawalItem
} from '../_mock/settlementData'
import styles from '../page.module.scss'
import WithdrawalRequestModal from './_components/WithdrawalRequestModal'

import EmptyState from '~/components/common/EmptyState'
import { Icon } from '~/components/Icon'
import { FilterDropdown, Pagination, Button } from '~/components/ui'

const WithdrawalPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [WithdrawalFilter, setWithdrawalFilter] =
    useState<string>('정산 상태 전체')
  const [termFilter, setTermFilter] = useState<string>('기간 전체')
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)

  // 출금 내역 데이터 (TODO: API 연동 시 교체)
  const withdrawalList = mockWithdrawalItems

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // TODO: 페이지 변경 시 데이터 fetch
  }

  // 출금 상태에 따른 스타일 클래스 반환
  const getStatusClass = (status: WithdrawalItem['status']) => {
    if (status === '출금신청') return styles.blue
    if (status === '출금완료') return styles.yellow
    if (status === '출금반려') return styles.red
    return styles.gray
  }

  // 숫자 포맷팅
  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()}`
  }

  // 필터 옵션
  const statusOptions = ['출금신청', '출금완료', '출금반려'] as const
  const termOptions = [
    '최근 1주일',
    '최근 1개월',
    '최근 3개월',
    '최근 1년'
  ] as const

  return (
    <div className={styles.withdrawal_wrap}>
      <WithdrawalRequestModal
        open={isWithdrawalModalOpen}
        onOpenChange={setIsWithdrawalModalOpen}
        withdrawableAmount={mockWithdrawableAmount}
      />

      <div className={styles.dash_wrap}>
        <div className={styles.txt_box}>
          <strong>출금 신청</strong>
          <p>판매 수익금을 출금할 수 있어요.</p>
        </div>
        <div className={styles.btn_box}>
          <div className={styles.amount_box}>
            <p>출금 가능 금액</p>
            <span>{formatCurrency(mockWithdrawableAmount)}</span>
          </div>
          <Button
            variant='default'
            width={187}
            onClick={() => setIsWithdrawalModalOpen(true)}
          >
            출금 신청
          </Button>
        </div>
      </div>

      <div className={styles.filter_wrap}>
        <div className={styles.filter_box}>
          <FilterDropdown
            options={statusOptions}
            defaultValue='상태 전체'
            showDefaultOption={false}
            selectedValues={
              WithdrawalFilter === '정산 상태 전체' ||
              WithdrawalFilter === '상태 전체'
                ? []
                : [WithdrawalFilter]
            }
            onSelect={(values) =>
              setWithdrawalFilter(
                values.length > 0 ? values[values.length - 1] : '정산 상태 전체'
              )
            }
            singleSelect
          />

          <FilterDropdown
            options={termOptions}
            defaultValue='기간 전체'
            showDefaultOption={false}
            selectedValues={termFilter === '기간 전체' ? [] : [termFilter]}
            onSelect={(values) =>
              setTermFilter(
                values.length > 0 ? values[values.length - 1] : '기간 전체'
              )
            }
            singleSelect
          />
        </div>
      </div>

      <div className={styles.table_wrap}>
        <table className={styles.basic_table}>
          <colgroup>
            <col style={{ width: '217px' }} />
            <col style={{ width: '221px' }} />
            <col style={{ width: '251px' }} />
            <col style={{ width: '251px' }} />
            <col style={{ width: '251px' }} />
            <col style={{ width: '251px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>출금 상태</th>
              <th>출금 신청일</th>
              <th>
                <div className={styles.flex_center}>
                  <span>출금 금액</span>
                  <Icon name='sort' color='var(--color-neutral-grey-2)' />
                </div>
              </th>
              <th>
                <div className={styles.flex_center}>
                  <span>출금 계좌</span>
                  <Icon name='sort' color='var(--color-neutral-grey-2)' />
                </div>
              </th>
              <th>
                <div className={styles.flex_center}>
                  <span>예금주</span>
                  <Icon name='sort' color='var(--color-neutral-grey-2)' />
                </div>
              </th>
              <th>
                <div className={styles.flex_center}>
                  <span>출금 완료일</span>
                  <Icon name='sort' color='var(--color-neutral-grey-2)' />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {withdrawalList.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    title='출금 신청 내역이 없습니다.'
                    subtitle='정산받을 금액을 출금 신청하면 내역이 이곳에 표시됩니다.'
                  />
                </td>
              </tr>
            ) : (
              withdrawalList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span
                      className={`${styles.status_tag} ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.requestDate}</td>
                  <td>{formatCurrency(item.amount)}</td>
                  <td>{item.account}</td>
                  <td>{item.accountHolder}</td>
                  <td>{item.completedDate || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {withdrawalList.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default WithdrawalPage
