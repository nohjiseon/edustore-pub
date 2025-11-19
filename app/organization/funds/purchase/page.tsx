'use client'

import { useState } from 'react'

import styles from './page.module.scss'
import OrganizationSidebar from '../../_components/sidebar/sidebar'

import { Icon } from '~/components/Icon'
import { Pagination } from '~/components/ui'
import FilterDropdown from '~/components/ui/FilterDropdown'
import { SEARCH_FILTER_OPTIONS } from '~/constants/search-filter-options'

const data = [
  {
    id: 1,
    name: '홍길동',
    email: '000@gmail.com',
    infos: '효율적인 업무 관리르 위한 시간 관리와 자기관리 목록들 외 2건',
    chargeAmount: '10,000',
    buydate: '24.10.01'
  },
  {
    id: 2,
    name: '홍길동',
    email: '000@gmail.com',
    infos: '효율적인 업무 관리르 위한 시간 관리와 자기관리 목록들 외 2건',
    chargeAmount: '10,000',
    buydate: '24.10.01'
  },
  {
    id: 3,
    name: '홍길동',
    email: '000@gmail.com',
    infos: '효율적인 업무 관리르 위한 시간 관리와 자기관리 목록들 외 2건',
    chargeAmount: '10,000',
    buydate: '24.10.01'
  }
]
const FundsPurchasePage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>구매 내역 확인</h1>
      </div>
      <div className={styles.page_content}>
        <OrganizationSidebar />
        <div className={styles.suffix}>
          <div className={styles.searchWrap}>
            <FilterDropdown
              options={SEARCH_FILTER_OPTIONS.inquiryPeriod}
              defaultValue={SEARCH_FILTER_OPTIONS.inquiryPeriod[0]}
            />
            <div className={styles.search_box}>
              <input type='text' placeholder='회원명으로 검색하세요' />
              <button>
                <Icon name='search' />
              </button>
            </div>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: '50px' }} />
                <col style={{ width: '115px' }} />
                <col style={{ width: '200px' }} />
                <col style={{ width: '435px' }} />
                <col style={{ width: '130px' }} />
                <col style={{ width: '130px' }} />
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
                      <th>#</th>
                      <th>회원명</th>
                      <th>이메일</th>
                      <th>자료 정보</th>
                      <th>사용 충전금</th>
                      <th>구매일자</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, i) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.infos}</td>
                        <td>{row.chargeAmount}</td>
                        <td>{row.buydate}</td>
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

export default FundsPurchasePage
