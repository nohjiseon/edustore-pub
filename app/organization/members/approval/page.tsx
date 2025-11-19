'use client'

import { useState } from 'react'

import styles from './page.module.scss'
import OrganizationSidebar from '../../_components/sidebar/sidebar'

import { Icon } from '~/components/Icon'
import { Checkbox, Pagination } from '~/components/ui'
import Button from '~/components/ui/Button'

//임시 데이터
const data = [
  {
    id: 1,
    status: 1, // 승인완료
    name: '홍길동',
    email: '0000@gmail.com',
    phone: '000-0000-0000',
    requestDate: '24.09.30',
    approvalDate: '24.10.01'
  },
  {
    id: 2,
    status: 2, // 승인대기
    name: '김맑음',
    email: 'malgeum@adf.com',
    phone: '010-1234-5678',
    requestDate: '24.10.02',
    approvalDate: '-'
  },
  {
    id: 3,
    status: 1, // 승인완료
    name: '이빛나',
    email: 'bright@naver.com',
    phone: '010-9876-5432',
    requestDate: '24.09.29',
    approvalDate: '24.09.30'
  },
  {
    id: 4,
    status: 2, // 승인대기
    name: '최명호',
    email: 'myungho@company.com',
    phone: '010-5555-3333',
    requestDate: '24.10.03',
    approvalDate: '-'
  }
]

const MemberApprovalPage = () => {
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
        <h1 className={styles.title}>신규 승인 신청 리스트 </h1>
      </div>
      <div className={styles.page_content}>
        <OrganizationSidebar />
        <div className={styles.suffix}>
          <div className={styles.searchWrap}>
            <div className={styles.search_box}>
              <input
                type='text'
                placeholder='회원명, 이메일, 휴대폰번호로 검색하세요'
              />
              <button>
                <Icon name='search' />
              </button>
            </div>
            <button className={styles.execl_download}>Excel 다운로드</button>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: '60px' }} />
                <col style={{ width: '50px' }} />
                <col style={{ width: '140px' }} />
                <col style={{ width: '140px' }} />
                <col style={{ width: '190px' }} />
                <col style={{ width: '190px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '150px' }} />
              </colgroup>
              {data.length === 0 ? (
                <tr>
                  <th colSpan={8} className={styles.empty}>
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
                      <th>이메일</th>
                      <th>휴대폰 번호</th>
                      <th>승인 요청일</th>
                      <th>승인일</th>
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
                              승인완료
                            </span>
                          ) : (
                            <span className={`${styles.status} ${styles.wait}`}>
                              승인대기
                            </span>
                          )}
                        </td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        <td>{row.requestDate}</td>
                        <td>{row.approvalDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
            <div className={styles.table_btn_wrap}>
              <Button
                variant='outline'
                width={147}
                onClick={handleApproveSelected}
              >
                선택 승인
              </Button>
              <Button
                variant='outline'
                width={147}
                onClick={handleRejectSelected}
              >
                선택 거절
              </Button>
            </div>
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

export default MemberApprovalPage
