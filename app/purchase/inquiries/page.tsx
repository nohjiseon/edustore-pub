'use client'

import { useRouter } from 'next/navigation'

import styles from './page.module.scss'

import imgSample from '@/assets/images/contents/card_example.png'
import { Icon } from '~/components/Icon'
import { TagList } from '~/components/ui'
import { Tag } from '~/components/ui/TagList'

const MyInquiriesPage = () => {
  const router = useRouter()

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

  const handleInquiryClick = (id: string) => {
    router.push(`/purchase/inquiries/${id}`)
  }

  return (
    <div className={styles.my_inquire_wrap}>
      <ul>
        <li>
          <button
            className={styles.inquire_link}
            onClick={() => handleInquiryClick('1')}
          >
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

                  {/* 내용 */}
                  <div className={styles.inquire_desc}>
                    <Icon name='question' />
                    <p>첨부된 파일이 오류로 열리지 않아요.</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </li>
        <li>
          <button
            className={styles.inquire_link}
            onClick={() => handleInquiryClick('2')}
          >
            <div className={styles.inquire_item}>
              <div className={styles.inquire_state_wrap}>
                {/* 상태 */}
                <div className={styles.inquire_state}>
                  <span>구매</span>
                  <Icon name='divider-center' />
                  <span className=''>답변대기</span>
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

                  {/* 내용 */}
                  <div className={styles.inquire_desc}>
                    <Icon name='question' />
                    <p>첨부된 파일이 오류로 열리지 않아요.</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </li>
        <li>
          <button
            className={styles.inquire_link}
            onClick={() => handleInquiryClick('3')}
          >
            <div className={styles.inquire_item}>
              <div className={styles.inquire_state_wrap}>
                {/* 상태 */}
                <div className={styles.inquire_state}>
                  <span>구매</span>
                  <Icon name='divider-center' />
                  <span className=''>답변대기</span>
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

                  {/* 내용 */}
                  <div className={styles.inquire_desc}>
                    <Icon name='question' />
                    <p>첨부된 파일이 오류로 열리지 않아요.</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default MyInquiriesPage
