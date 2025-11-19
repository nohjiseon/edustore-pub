'use client'

import { useState } from 'react'

import styles from './page.module.scss'
import OrganizationSidebar from '../../_components/sidebar/sidebar'

import { Checkbox, Pagination } from '~/components/ui'
import FilterDropdown from '~/components/ui/FilterDropdown'
import { SEARCH_FILTER_OPTIONS } from '~/constants/search-filter-options'

//임시 데이터
const data = [
  {
    id: 1,
    status: 1, // 승인완료
    name: '홍길동',
    phone: '000-0000-0000',
    chargeDate: '24.09.30',
    chargeAmount: '10,000',
    remaining: '10,000'
  },
  {
    id: 2,
    status: 2, // 승인대기
    name: '김맑음',
    chargeDate: '24.09.30',
    chargeAmount: '10,000',
    remaining: '10,000'
  },
  {
    id: 3,
    status: 1, // 승인완료
    name: '이빛나',
    chargeDate: '24.09.30',
    chargeAmount: '10,000',
    remaining: '10,000'
  },
  {
    id: 4,
    status: 2, // 승인대기
    name: '이빛나',
    chargeDate: '24.09.30',
    chargeAmount: '10,000',
    remaining: '10,000'
  }
]

const FundsChargePage = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 전체 선택 / 해제
  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const allIds = data.map((row) => row.id)
      setCheckedItems(allIds)
      console.log(allIds)
    } else {
      setCheckedItems([])
    }
  }

  // 승인 선택 핸들러
  const handleApproveSelected = () => {
    console.log('승인할 회원 ID들:', checkedItems)
  }

  //승인 거절 핸들러
  const handleRejectSelected = () => {
    console.log('거절할 회원 ID들:', checkedItems)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>충전 및 내역 확인</h1>
      </div>
      <div className={styles.page_content}>
        <OrganizationSidebar />
        <div className={styles.suffix}>
          <div className={styles.text_box}>
            <div className={styles.prefix_text}>
              <h2 className={styles.sub_title}>기관 충전금</h2>
              <p>예산으로 필요한 자료를 구매할 수 있어요.</p>
            </div>
            <div className={styles.suffix_text}>
              <span className={styles.text}>현재 잔여 충전금</span>
              <span className={styles.price}>00,000</span>
            </div>
          </div>
          <div className={styles.tableWrapper}>
            <FilterDropdown
              options={SEARCH_FILTER_OPTIONS.inquiryPeriod}
              defaultValue={SEARCH_FILTER_OPTIONS.inquiryPeriod[0]}
            />
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: '60px' }} />
                <col style={{ width: '50px' }} />
                <col style={{ width: '140px' }} />
                <col style={{ width: '202px' }} />
                <col style={{ width: '202px' }} />
                <col style={{ width: '202px' }} />
                <col style={{ width: '202px' }} />
              </colgroup>
              {data.length === 0 ? (
                <tr>
                  <th colSpan={7} className={styles.empty}>
                    데이터가 없습니다.
                  </th>
                </tr>
              ) : (
                <>
                  <thead>
                    <tr>
                      <th>
                        <Checkbox
                          checked={checkedItems.length === data.length}
                          onChange={handleAllCheck}
                        />
                      </th>
                      <th>#</th>
                      <th>상태</th>
                      <th>회원명</th>
                      <th>충전일자</th>
                      <th>충전금액</th>
                      <th>잔여충전금</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, i) => (
                      <tr key={row.id}>
                        <td>
                          <Checkbox
                            id={`checkbox-${row.id}`}
                            checked={checkedItems.includes(row.id)}
                            onChange={(checked) => {
                              if (checked) {
                                setCheckedItems((prev) => [...prev, row.id])
                              } else {
                                setCheckedItems((prev) =>
                                  prev.filter((item) => item !== row.id)
                                )
                              }
                            }}
                          />
                        </td>
                        <td>{row.id}</td>
                        <td>
                          {row.status === 1 ? (
                            <span
                              className={`${styles.status} ${styles.approve}`}
                            >
                              충전완료
                            </span>
                          ) : (
                            <span className={`${styles.status} ${styles.wait}`}>
                              충전대기
                            </span>
                          )}
                        </td>
                        <td>{row.name}</td>
                        <td>{row.chargeDate}</td>
                        <td>{row.chargeAmount}</td>
                        <td>{row.remaining}</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={17}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default FundsChargePage
