'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import { Button } from '~/components/ui'
import DropdownMenu from '~/components/ui/DropdownMenu'
import Pagination from '~/components/ui/Pagination'
import ToggleBadge from '~/components/ui/ToggleBadge'

// 댓글 타입 정의
interface Reply {
  id: number
  author: string
  date: string
  content: string
}

interface Comment {
  id: number
  author: string
  date: string
  content: string
  replies: Reply[]
}

// 임시 댓글 데이터
const initialComments: Comment[] = [
  {
    id: 1,
    author: '김선생',
    date: '2025.11.10',
    content:
      '안녕하세요! 제가 작년에 환경 교육으로 수업했던 자료가 있는데 공유해 드릴 수 있습니다. 쓰레기 분리배출 관련 활동지와 PPT 자료 준비되어 있어요.',
    replies: []
  },
  {
    id: 2,
    author: '이교사',
    date: '2025.11.09',
    content:
      '저도 비슷한 자료 찾고 있었는데, 혹시 게임 형식으로 진행할 수 있는 자료도 있을까요?',
    replies: []
  },
  {
    id: 3,
    author: '박교사',
    date: '2025.11.08',
    content:
      '환경 관련해서는 환경부 사이트에 좋은 자료들이 많이 있더라구요. 참고하시면 도움이 될 것 같습니다!',
    replies: []
  }
]

const BoardDetailPage = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  const [comments, setComments] = useState<Comment[]>(initialComments)

  const handleGoToList = () => {
    router.push('/board')
  }

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId)
    setReplyText('')
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
    setReplyText('')
  }

  const handleSubmitReply = (commentId: number) => {
    if (!replyText.trim()) return

    // 새 답변 생성
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    const newReply: Reply = {
      id: Date.now(), // 임시 ID
      author: '현재사용자', // 실제 로그인한 사용자 정보
      date: `${year}.${month}.${day}`,
      content: replyText
    }

    // 댓글에 답변 추가
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    )

    setReplyingTo(null)
    setReplyText('')
  }

  const handleReport = (commentId: number) => {
    console.log('신고하기:', commentId)
    // TODO: 신고하기 로직 구현
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>자료 요청 게시판</h1>
        <p className={styles.description}>
          필요한 수업 자료가 없나요? 수업가게에 원하는 자료를 요청해 보세요.
          다른 선생님들이 직접 만들어 등록해 주실 수 있어요.
        </p>
      </div>

      <div className={styles.detail_wrap}>
        <p className={styles.info_txt}>
          초등 3학년 ‘환경 교육’ 수업 자료 요청드립니다
        </p>
        <div className={styles.date_box}>
          <span>박교사</span>
          <span>2025.11.05</span>
        </div>
        <pre>
          {`안녕하세요.
3학년 환경 교육 수업을 준비 중인데, 쓰레기 분리배출이나 재활용 관련된 학습 활동지를 찾고 있습니다.

교과 : 과학 / 환경
학년 : 초등 3학년
필요 자료 : 활동지 또는 PPT 자료


혹시 비슷한 주제로 이미 등록된 자료가 있거나 제작해주실 수 있는 선생님이 계시다면 댓글 부탁드립니다.
감사합니다!!`}
        </pre>
        <div className={styles.tag_wrap}>
          <ToggleBadge size='md'>초등</ToggleBadge>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className={styles.comment_section}>
        <h3 className={styles.comment_title}>
          댓글 <span className={styles.comment_count}>{comments.length}</span>
        </h3>

        <div className={styles.comment_list}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment_item}>
              <div className={styles.comment_header}>
                <div>
                  <span className={styles.comment_author}>
                    {comment.author}
                  </span>
                  <span className={styles.comment_date}>{comment.date}</span>
                </div>
                <DropdownMenu
                  trigger={
                    <button className={styles.menu_button}>
                      <Icon name='kebab' size={24} />
                    </button>
                  }
                  items={[
                    {
                      label: '답변하기',
                      action: () => handleReply(comment.id)
                    },
                    {
                      label: '신고하기',
                      action: () => handleReport(comment.id)
                    }
                  ]}
                  align='end'
                  side='bottom'
                />
              </div>
              <p className={styles.comment_content}>{comment.content}</p>

              {/* 답변 입력창 */}
              {replyingTo === comment.id && (
                <div className={styles.reply_input_wrap}>
                  <input
                    type='text'
                    className={styles.reply_input}
                    placeholder='답변을 입력하세요'
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        if (replyText.trim()) {
                          handleSubmitReply(comment.id)
                        }
                      } else if (e.key === 'Escape') {
                        handleCancelReply()
                      }
                    }}
                    autoFocus
                  />
                </div>
              )}

              {/* 답변 목록 */}
              {comment.replies.length > 0 && (
                <div className={styles.replies_list}>
                  {comment.replies.map((reply) => (
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
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className={styles.pagination_wrap}>
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <div className={styles.btn_wrap}>
        <Button variant='outline' width={376} onClick={handleGoToList}>
          목록으로 돌아가기
        </Button>
      </div>
    </div>
  )
}

export default BoardDetailPage
