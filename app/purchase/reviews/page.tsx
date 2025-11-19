'use client'

import { useRouter } from 'next/navigation'

import styles from './page.module.scss'

import imgSample from '@/assets/images/contents/card_example.png'
import StarRating from '@/components/ui/StarRating'
import { Icon } from '~/components/Icon'
import MyReviewModal from '~/components/modal/MyReviewModal'
import DropdownMenu from '~/components/ui/DropdownMenu'
import TagList, { Tag } from '~/components/ui/TagList'
import { useModal } from '~/hooks/useModal'

const tagsArr: Tag[] = [
  {
    name: '초6',
    color: 'yellow'
  },
  {
    name: '국어',
    color: 'blue'
  },
  {
    name: '독서교육',
    color: 'green'
  },
  {
    name: 'PDF',
    color: 'red'
  }
]

const MyReviewsPage = () => {
  const router = useRouter()
  const { openModal } = useModal()

  const handleMyReview = () => {
    openModal(MyReviewModal)
  }

  const handleReply = () => {
    router.push('/purchase/1')
  }

  const dropdownItems = [
    {
      label: '답변하기',
      action: handleReply
    }
  ]

  return (
    <div className={styles.my_review_rwap}>
      <ul>
        <li
          onClick={() => {
            handleMyReview()
          }}
        >
          <div className={styles.review_item}>
            {/* 탭 */}
            <div className={styles.review_info}>
              <div className={styles.review_tags_wrap}>
                <TagList tags={tagsArr} />
              </div>

              <div className={styles.review_title}>
                <span>
                  효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                </span>
              </div>

              <div className={styles.review_rating_wrap}>
                <div className={styles.review_rating}>
                  <StarRating rating={2.3} showScore={false} />
                  <span className={styles.rating_text}>4.5</span>
                </div>

                <div className={styles.review_date}>
                  <span>0000.00.00</span>
                </div>
              </div>

              <div className={styles.review_read}>
                <p>
                  3학년 2학기 첫 글쓰기 수업에서 이 자료를 사용했어요. 아이들이
                  글의 구조를 처음 접하는데 효과적이었어요. 3학년 2학기 첫
                  글쓰기 수업에서 이 자료를 사용했어요. 아이들이 글의 구조를
                  처음 접하는데 효과적이었어요
                </p>
              </div>
            </div>

            <div className={styles.review_img_wrap}>
              <img src={imgSample.src} alt='sample' />
            </div>

            <div
              className={styles.review_icon_wrap}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenu
                trigger={<Icon name='kebab-mo' />}
                items={dropdownItems}
                align='end'
                side='bottom'
              />
            </div>
          </div>
        </li>
        <li
          onClick={() => {
            handleMyReview()
          }}
        >
          <div className={styles.review_item}>
            {/* 탭 */}
            <div className={styles.review_info}>
              <div className={styles.review_tags_wrap}>
                <TagList tags={tagsArr} />
              </div>

              <div className={styles.review_title}>
                <span>
                  효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                </span>
              </div>

              <div className={styles.review_rating_wrap}>
                <div className={styles.review_rating}>
                  <StarRating rating={2.3} showScore={false} />
                  <span className={styles.rating_text}>4.5</span>
                </div>

                <div className={styles.review_date}>
                  <span>0000.00.00</span>
                </div>
              </div>

              <div className={styles.review_read}>
                <p>
                  3학년 2학기 첫 글쓰기 수업에서 이 자료를 사용했어요. 아이들이
                  글의 구조를 처음 접하는데 효과적이었어요. 3학년 2학기 첫
                  글쓰기 수업에서 이 자료를 사용했어요. 아이들이 글의 구조를
                  처음 접하는데 효과적이었어요
                </p>
              </div>
            </div>

            <div className={styles.review_img_wrap}>
              <img src={imgSample.src} alt='sample' />
            </div>

            <div
              className={styles.review_icon_wrap}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenu
                trigger={<Icon name='kebab-mo' />}
                items={dropdownItems}
                align='end'
                side='bottom'
              />
            </div>
          </div>
        </li>
        <li
          onClick={() => {
            handleMyReview()
          }}
        >
          <div className={styles.review_item}>
            {/* 탭 */}
            <div className={styles.review_info}>
              <div className={styles.review_tags_wrap}>
                <TagList tags={tagsArr} />
              </div>

              <div className={styles.review_title}>
                <span>
                  효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                </span>
              </div>

              <div className={styles.review_rating_wrap}>
                <div className={styles.review_rating}>
                  <StarRating rating={2.3} showScore={false} />
                  <span className={styles.rating_text}>4.5</span>
                </div>

                <div className={styles.review_date}>
                  <span>0000.00.00</span>
                </div>
              </div>

              <div className={styles.review_read}>
                <p>
                  3학년 2학기 첫 글쓰기 수업에서 이 자료를 사용했어요. 아이들이
                  글의 구조를 처음 접하는데 효과적이었어요. 3학년 2학기 첫
                  글쓰기 수업에서 이 자료를 사용했어요. 아이들이 글의 구조를
                  처음 접하는데 효과적이었어요
                </p>
              </div>
            </div>

            <div className={styles.review_img_wrap}>
              <img src={imgSample.src} alt='sample' />
            </div>

            <div
              className={styles.review_icon_wrap}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenu
                trigger={<Icon name='kebab-mo' />}
                items={dropdownItems}
                align='end'
                side='bottom'
              />
            </div>
          </div>
        </li>
        <li
          onClick={() => {
            handleMyReview()
          }}
        >
          <div className={styles.review_item}>
            {/* 탭 */}
            <div className={styles.review_info}>
              <div className={styles.review_tags_wrap}>
                <TagList tags={tagsArr} />
              </div>

              <div className={styles.review_title}>
                <span>
                  효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                </span>
              </div>

              <div className={styles.review_rating_wrap}>
                <div className={styles.review_rating}>
                  <StarRating rating={2.3} showScore={false} />
                  <span className={styles.rating_text}>4.5</span>
                </div>

                <div className={styles.review_date}>
                  <span>0000.00.00</span>
                </div>
              </div>

              <div className={styles.review_read}>
                <p>
                  3학년 2학기 첫 글쓰기 수업에서 이 자료를 사용했어요. 아이들이
                  글의 구조를 처음 접하는데 효과적이었어요. 3학년 2학기 첫
                  글쓰기 수업에서 이 자료를 사용했어요. 아이들이 글의 구조를
                  처음 접하는데 효과적이었어요
                </p>
              </div>
            </div>

            <div className={styles.review_img_wrap}>
              <img src={imgSample.src} alt='sample' />
            </div>

            <div
              className={styles.review_icon_wrap}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenu
                trigger={<Icon name='kebab-mo' />}
                items={dropdownItems}
                align='end'
                side='bottom'
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default MyReviewsPage
