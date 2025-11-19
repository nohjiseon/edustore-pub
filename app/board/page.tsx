'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import { Pagination, ToggleBadge } from '~/components/ui'
import Button from '~/components/ui/Button'

const BoardPage = () => {
  const router = useRouter()
  const NOTICE_CATEGORIES: { label: string; value: string }[] = [
    {
      label: '유아',
      value: 'infant'
    },
    {
      label: '초등',
      value: 'elementary'
    },
    {
      label: '중등',
      value: 'middle'
    },
    {
      label: '고등',
      value: 'high'
    },
    {
      label: '특수',
      value: 'special'
    },
    {
      label: '기타',
      value: 'etc'
    }
  ]

  const noticeList = [
    {
      id: 1,
      category: '초등',
      title: "초등 3학년 '환경 교육' 수업 자료 요청드립니다",
      author: '김**',
      date: '2024.11.14'
    },
    {
      id: 2,
      category: '유아',
      title: "창의적 체험활동용 '진로 탐색 활동지' 필요합니다",
      author: '이**',
      date: '2024.11.13'
    },
    {
      id: 3,
      category: '중등',
      title: "중등 과학 '기체의 성질 실험' 수업 PPT 요청",
      author: '박**',
      date: '2024.11.12'
    },
    {
      id: 4,
      category: '고등',
      title: "고등 수학Ⅰ '함수의 그래프' 시각 자료 요청",
      author: '최**',
      date: '2024.11.11'
    },
    {
      id: 5,
      category: '초등',
      title: "1학년 국어 '받침 있는 글자 배우기' 자료 요청",
      author: '정**',
      date: '2024.11.10'
    },
    {
      id: 6,
      category: '초등',
      title: "초등 3학년 '환경 교육' 수업 자료 요청드립니다",
      author: '강**',
      date: '2024.11.14'
    },
    {
      id: 7,
      category: '유아',
      title: "창의적 체험활동용 '진로 탐색 활동지' 필요합니다",
      author: '조**',
      date: '2024.11.13'
    },
    {
      id: 8,
      category: '중등',
      title: "중등 과학 '기체의 성질 실험' 수업 PPT 요청",
      author: '윤**',
      date: '2024.11.12'
    },
    {
      id: 9,
      category: '고등',
      title: "고등 수학Ⅰ '함수의 그래프' 시각 자료 요청",
      author: '장**',
      date: '2024.11.11'
    },
    {
      id: 10,
      category: '초등',
      title: "1학년 국어 '받침 있는 글자 배우기' 자료 요청",
      author: '임**',
      date: '2024.11.10'
    }
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'infant'
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleToggleSelection = (value: string) => {
    setSelectedCategory((prev) => (prev === value ? null : value))
  }

  const handleRequestClick = () => {
    router.push('/service')
  }

  const handleBoardClick = (id: number) => {
    router.push(`/board/${id}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>자료 요청 게시판</h1>
        <p className={styles.description}>
          필요한 수업 자료가 없나요? 수업가게에 원하는 자료를 요청해 보세요.
          다른 선생님들이 직접 만들어 등록해 주실 수 있어요.
        </p>
        <Button variant='default' width={223} onClick={handleRequestClick}>
          자료 요청하기
          <Icon name='chevron-right-s' color='var(--color-neutral-white)' />
        </Button>
      </div>

      <div className={styles.tag_wrap}>
        <ul>
          {NOTICE_CATEGORIES.map((item) => (
            <li key={item.value}>
              <ToggleBadge
                size='md'
                onClick={() => handleToggleSelection(item.value)}
                selected={selectedCategory === item.value}
              >
                {item.label}
              </ToggleBadge>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.table_wrap}>
        <table className={styles.notice_table}>
          <colgroup>
            <col style={{ width: '6.25rem' }} />
            <col style={{ width: '8.125rem' }} />
            <col />
            <col style={{ width: '10.125rem' }} />
            <col style={{ width: '12.75rem' }} />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>구분</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {noticeList.map((notice) => (
              <tr
                key={notice.id}
                onClick={() => handleBoardClick(notice.id)}
                style={{ cursor: 'pointer' }}
              >
                <td className={styles.col_gray}>{notice.id}</td>
                <td className={styles.col_gray}>{notice.category}</td>
                <td className={styles.align_left}>{notice.title}</td>
                <td>{notice.author}</td>
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

export default BoardPage
