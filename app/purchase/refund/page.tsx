'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './page.module.scss'

import imgSample from '@/assets/images/contents/card_example.png'
import { Button, TagList, Textarea } from '~/components/ui'
import { Tag } from '~/components/ui/TagList'

const RefundPage = () => {
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

  const CANCEL_REASONS = [
    '자료 파일 오류/파일 깨짐/누락',
    '자료 설명과 명백히 불일치',
    '관리자 승인한 품질 문제',
    '결제 오류로 인한 환불/중복 결제',
    '기타(직접 입력)'
  ]

  const [selectedReason, setSelectedReason] = useState<string>('')
  const [detailReason, setDetailReason] = useState<string>('')

  console.log(selectedReason)
  console.log(detailReason)

  const handleReasonChange = (value: string) => {
    setSelectedReason(value)
    // 기타가 아닌 경우 상세 사유 초기화
    if (value !== '기타(직접 입력)') {
      setDetailReason('')
    }
  }

  const handleNext = () => {
    router.push('/purchase/refund/info')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.item_wrap}>
        <div className={styles.item_title_wrap}>
          <span>환불 요청</span>
        </div>

        <div className={styles.item_content_wrap}>
          <div className={styles.item_content}>
            <div className={styles.content_img_wrap}>
              <img src={imgSample.src} alt='sample' />
            </div>

            <div className={styles.content_info_wrap}>
              <div className={styles.tags_wrap}>
                <TagList tags={tagsArr} />
              </div>

              <div className={styles.content_title_wrap}>
                <span>
                  효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                </span>
              </div>

              <div className={styles.seller_wrap}>
                <div className={styles.seller_img_wrap}>
                  <img src={imgSample.src} alt='sample' />
                  <span>수업가게닉네임</span>
                </div>

                <div className={styles.price}>
                  <span>10,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.refund_report_wrap}>
          <div className={styles.refund_report_title_wrap}>
            <span>환불 사유를 입력해 주세요</span>
          </div>

          <div className={styles.refund_report_content_wrap}>
            <div className={styles.reson_wrap}>
              <div className={styles.radio_group}>
                {CANCEL_REASONS.map((reason) => (
                  <label key={reason} className={styles.radio_item}>
                    <input
                      type='radio'
                      name='cancelReason'
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => handleReasonChange(reason)}
                      className={styles.radio_input}
                    />
                    <span className={styles.radio_label}>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.textarea_wrap}>
              <Textarea
                placeholder='상세 사유를 입력해 주세요'
                maxLength={300}
                showCounter
                value={detailReason}
                onChange={(e) => setDetailReason(e.target.value)}
                disabled={selectedReason !== '기타(직접 입력)'}
              />
            </div>
          </div>
        </div>

        <div className={styles.modal_button_wrap}>
          <Button variant='default' onClick={handleNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RefundPage
