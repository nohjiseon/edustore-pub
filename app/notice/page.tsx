'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import { Pagination } from '~/components/ui'
import Button from '~/components/ui/Button'

const NoticePage = () => {
  const router = useRouter()
  const noticeList = [
    {
      id: 1,
      category: '안내',
      title: '수업가게 서비스 점검 예정 안내 (11/15 00:00~03:00)',
      date: '2024.11.14'
    },
    {
      id: 2,
      category: '공지',
      title: '기관회원 예산 충전 기능 업데이트 안내',
      date: '2024.11.13'
    },
    {
      id: 3,
      category: '안내',
      title: '자료 등록 가이드 문서 업데이트 (2025년 9월 개정)',
      date: '2024.11.12'
    },
    {
      id: 4,
      category: '공지',
      title: '개인정보 처리방침 개정 안내',
      date: '2024.11.11'
    },
    {
      id: 5,
      category: '점검',
      title: '결제 시스템 안정화 점검 완료 안내',
      date: '2024.11.10'
    },
    {
      id: 6,
      category: '안내',
      title: '수업가게 서비스 점검 예정 안내 (11/15 00:00~03:00)',
      date: '2024.11.14'
    },
    {
      id: 7,
      category: '공지',
      title: '기관회원 예산 충전 기능 업데이트 안내',
      date: '2024.11.13'
    },
    {
      id: 8,
      category: '안내',
      title: '자료 등록 가이드 문서 업데이트 (2025년 9월 개정)',
      date: '2024.11.12'
    },
    {
      id: 9,
      category: '공지',
      title: '개인정보 처리방침 개정 안내',
      date: '2024.11.11'
    },
    {
      id: 10,
      category: '점검',
      title: '결제 시스템 안정화 점검 완료 안내',
      date: '2024.11.10'
    }
  ]

  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleNoticeClick = (id: number) => {
    router.push(`/notice/${id}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>수업가게 공지사항</h1>
        <p className={styles.description}>
          수업가게의 최신 소식과 서비스 이용 안내를 확인해 보세요.
        </p>
      </div>

      <div className={styles.search_wrap}>
        <Icon
          name='search'
          color='var(--color-neutral-grey-3)'
          className={styles.ic_search}
        />
        <input
          type='text'
          name=''
          placeholder='제목 또는 내용을 입력해 검색해 보세요.'
        />
        <Button variant='default' width={226}>
          검색하기
        </Button>
      </div>

      <div className={styles.table_wrap}>
        <table className={styles.notice_table}>
          <colgroup>
            <col style={{ width: '9.375rem' }} />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {noticeList.map((notice) => (
              <tr
                key={notice.id}
                onClick={() => handleNoticeClick(notice.id)}
                style={{ cursor: 'pointer' }}
              >
                <td className={styles.col_gray}>{notice.id}</td>
                <td className={styles.align_left}>
                  <span>[{notice.category}] </span>
                  {notice.title}
                </td>
                <td>{notice.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={8}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default NoticePage
