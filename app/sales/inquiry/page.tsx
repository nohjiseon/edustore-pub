'use client'

import { useState } from 'react'

import styles from './page.module.scss'

import ReportReceivedModal from '@/components/modal/ReportReceivedModal'
import { Icon } from '~/components/Icon'
import { FilterDropdown, DropdownMenu } from '~/components/ui'
import { useModal } from '~/hooks/useModal'

interface InquiryReply {
  id: number
  author: string
  date: string
  content: string
}

interface InquiryItem {
  id: number
  author: string
  date: string
  content: string
  replies: InquiryReply[]
}

const mockInquiries: InquiryItem[] = [
  {
    id: 1,
    author: '이**',
    date: '2024.11.15',
    content:
      '자료 결제 후 다운로드가 되지 않아 문의드립니다. 확인 부탁드립니다.',
    replies: [
      {
        id: 101,
        author: '홍**',
        date: '2024.11.16',
        content:
          '안녕하세요. 결제 내역 확인 후 바로 재전송 드렸습니다. 감사합니다.'
      }
    ]
  },
  {
    id: 2,
    author: '김**',
    date: '2024.11.14',
    content: '수업자료 라이선스에 기관 사용도 포함되는지 궁금합니다.',
    replies: []
  },
  {
    id: 3,
    author: '박**',
    date: '2024.11.13',
    content: '제작 요청드린 자료 검수 결과 언제 전달 받을 수 있을까요?',
    replies: [
      {
        id: 102,
        author: '홍**',
        date: '2024.11.14',
        content: '현재 편집 마무리 중이며 금주 내 공유 예정입니다.'
      }
    ]
  }
]

const InquiryPage = () => {
  const { openModal } = useModal()
  const [periodFilter, setPeriodFilter] = useState<string>('기간 전체')
  const [inquiries, setInquiries] = useState<InquiryItem[]>(mockInquiries)
  const [openReplyIds, setOpenReplyIds] = useState<number[]>([])
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({})

  const filterOptions = ['기간 전체'] as const

  const toggleReplyInput = (inquiryId: number) => {
    setOpenReplyIds((prev) =>
      prev.includes(inquiryId)
        ? prev.filter((id) => id !== inquiryId)
        : [...prev, inquiryId]
    )
    setReplyDrafts((prev) => ({
      ...prev,
      [inquiryId]: prev[inquiryId] ?? ''
    }))
  }

  const handleCancelReply = (inquiryId: number) => {
    setOpenReplyIds((prev) => prev.filter((id) => id !== inquiryId))
    setReplyDrafts((prev) => {
      const { [inquiryId]: _, ...rest } = prev
      return rest
    })
  }

  const handleSubmitReply = (inquiryId: number) => {
    const draft = replyDrafts[inquiryId]?.trim() ?? ''
    if (!draft) return

    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    const newReply: InquiryReply = {
      id: Date.now(),
      author: '판매자',
      date: `${year}.${month}.${day}`,
      content: draft
    }

    setInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry.id === inquiryId
          ? {
              ...inquiry,
              replies: [newReply, ...(inquiry.replies ?? [])]
            }
          : inquiry
      )
    )

    handleCancelReply(inquiryId)
  }

  const handleReport = (inquiryId: number) => {
    openModal(ReportReceivedModal)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter_section}>
        <FilterDropdown
          options={filterOptions}
          defaultValue='기간 전체'
          showDefaultOption={false}
          selectedValues={periodFilter === '기간 전체' ? [] : [periodFilter]}
          onSelect={(values) =>
            setPeriodFilter(values.length > 0 ? values[0] : '기간 전체')
          }
          singleSelect
        />
        <div className={styles.search_box}>
          <input type='text' placeholder='문의 내용을 검색하세요' />
          <button aria-label='검색'>
            <Icon name='search' />
          </button>
        </div>
      </div>

      <div className={styles.review_list}>
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className={styles.review_item}>
            <div className={styles.product_info}>
              <div className={styles.product_status}>
                <span>구매</span>
                <span
                  className={
                    inquiry.replies.length > 0
                      ? styles.completed
                      : styles.waiting
                  }
                >
                  {inquiry.replies.length > 0 ? '답변완료' : '답변대기'}
                </span>
              </div>
              <DropdownMenu
                trigger={
                  <button className={styles.more_button} aria-label='더보기'>
                    <Icon name='kebab-pc' color='var(--color-neutral-grey-1)' />
                  </button>
                }
                items={[
                  {
                    label: '답변하기',
                    action: () => toggleReplyInput(inquiry.id)
                  },
                  {
                    label: '신고하기',
                    action: () => handleReport(inquiry.id)
                  }
                ]}
                side='left'
              />
            </div>

            <div className={styles.review_container}>
              <div className={styles.content_main}>
                <div className={styles.header}>
                  <div className={styles.user_info}>
                    <span className={styles.author}>{inquiry.author}</span>
                    <span className={styles.date}>{inquiry.date}</span>
                  </div>
                </div>

                <div className={styles.question_block}>
                  <Icon name='question' />
                  <p className={styles.review_content}>{inquiry.content}</p>
                </div>
              </div>

              {openReplyIds.includes(inquiry.id) && (
                <div className={styles.reply_input_wrap}>
                  <input
                    type='text'
                    className={styles.reply_input}
                    placeholder='답변을 입력하세요'
                    value={replyDrafts[inquiry.id] ?? ''}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({
                        ...prev,
                        [inquiry.id]: e.target.value
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmitReply(inquiry.id)
                      } else if (e.key === 'Escape') {
                        handleCancelReply(inquiry.id)
                      }
                    }}
                    autoFocus
                  />
                </div>
              )}

              {inquiry.replies.length > 0 && (
                <div className={styles.replies_list}>
                  {inquiry.replies.map((reply) => (
                    <div key={reply.id} className={styles.reply_item}>
                      <p className={styles.reply_content}>{reply.content}</p>
                      <div className={styles.reply_txtbox}>
                        <span className={styles.reply_author}>
                          {reply.author}
                        </span>
                        <span className={styles.reply_date}>{reply.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InquiryPage
