'use client'

import { useRouter } from 'next/navigation'
import { use } from 'react'

import styles from './page.module.scss'

import imgSample from '@/assets/images/contents/card_example.png'
import { Icon } from '~/components/Icon'
import { Button, FilterDropdown, Tabs, TagList } from '~/components/ui'
import { Tag } from '~/components/ui/TagList'

interface InquiryDetailPageProps {
  params: Promise<{ id: string }>
}

const InquiryDetailPage = ({ params }: InquiryDetailPageProps) => {
  const router = useRouter()
  const { id } = use(params)

  const tagsArr: Tag[] = [
    {
      name: '초3',
      color: 'green'
    },
    {
      name: '국어',
      color: 'yellow'
    },
    {
      name: '독서교육',
      color: 'blue'
    },
    {
      name: 'PDF',
      color: 'red'
    }
  ]

  return (
    <>
      {/* 문의 상세 */}
      <div className={styles.inquiry_detail_wrap}>
        {/* ----------------------------- */}
        <div className={styles.my_inquire_wrap}>
          <div className={styles.inquire_item}>
            <div className={styles.inquire_state_wrap}>
              {/* 상태 */}
              <div className={styles.inquire_state}>
                <span>구매</span>
                <Icon name='divider-center' />
                <span className={styles.state_success}>답변완료</span>
              </div>

              {/* 날짜 */}
              <div className={styles.inquire_date}>
                <span>0000.00.00</span>
              </div>
            </div>

            {/* 문의 */}
            <div className={styles.inquire_card}>
              {/* 이미지 */}
              <div className={styles.inquire_img}>
                <img src={imgSample.src} alt='sample' />
              </div>

              <div className={styles.inquire_info_wrap}>
                {/* 태그 */}
                <div className={styles.inquire_tags_wrap}>
                  <TagList tags={tagsArr} />
                </div>

                {/* 제목 */}
                <div className={styles.inquire_title}>
                  <span>
                    효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 내용 */}
          <div className={styles.inquire_desc}>
            <div className={styles.inquire_text}>
              <Icon name='question' />
              <p>첨부된 파일이 오류로 열리지 않아요.</p>
            </div>

            <div className={styles.inquire_img_wrap}>
              <ul>
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i}>
                    <img src={imgSample.src} alt='sample' />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* ----------------------------- */}
        <div className={styles.answer_wrap}>
          <div className={styles.answer}>
            <p>
              안녕하세요, 파일 재업로드 했으니 다시 확인 부탁드립니다. 불편을
              드려 죄송합니다.
            </p>
          </div>

          <div className={styles.answer_date_wrap}>
            <span>장**</span>
            <span>2025.06.30</span>
          </div>
        </div>
      </div>

      {/* 목록으로 */}
      <div className={styles.back_button_wrap}>
        <Button variant='outline' onClick={() => router.back()}>
          <Icon name='chevron-left-s' />
          <span>목록으로</span>
        </Button>
      </div>
    </>
  )
}
export default InquiryDetailPage
