'use client'

import { useEffect, useState } from 'react'

import styles from './ReviewTypeModal.module.scss'
import ReviewFormModal from '../ReviewFormModal'

import imgSample from '@/assets/images/contents/card_example.png'
import imgType1 from '@/assets/images/modal/modalType1.png'
import imgType2 from '@/assets/images/modal/modalType2.png'
import imgType3 from '@/assets/images/modal/modalType3.png'
import imgType4 from '@/assets/images/modal/modalType4.png'
import imgType5 from '@/assets/images/modal/modalType5.png'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'
import TagList, { Tag } from '~/components/ui/TagList'
import { useModal } from '~/hooks/useModal'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const ReviewTypeModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const [formModal, setFormModal] = useState(false)
  const [type, setType] = useState('type1')
  const { openModal } = useModal()

  const handleTypeForm = () => {
    setFormModal(true)
  }

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

  useEffect(() => {
    if (formModal) {
      openModal(ReviewFormModal, { type: type })
      onOpenChange(false)
    }
  }, [open, formModal])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          <div className={styles.modal_title_wrap}>
            <DialogTitle>후기 남기기</DialogTitle>
            <DialogDescription>
              자료를 사용해보신 후 후기를 남겨주세요
            </DialogDescription>
          </div>

          <div className={styles.review_info_wrap}>
            {/* 구매 이미지 */}
            <div className={styles.item_img}>
              <img src={imgSample.src} alt='sample' />
            </div>
            <div className={styles.item_info}>
              {/* 태그 */}
              <div className={styles.tags_wrap}>
                <TagList tags={tagsArr} />
              </div>

              {/* 제목 */}
              <div className={styles.item_title}>
                <span>
                  효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                </span>
              </div>

              {/* 판매자 */}
              <div className={styles.item_seller}>
                <img src={imgSample.src} alt='sample' />
                <span>수업가게닉네임</span>
              </div>
            </div>
          </div>

          <div className={styles.item_type_wrap}>
            <div className={styles.item_type_title}>
              <span>이 자료를 어디에 사용하셨나요?</span>
            </div>

            <ul className={styles.item_type_list}>
              <li
                onClick={() => {
                  handleTypeForm()
                }}
                style={{ backgroundImage: `url(${imgType1.src})` }}
              >
                <span>원격 수업에 사용</span>
              </li>
              <li
                onClick={() => {
                  handleTypeForm()
                }}
                style={{ backgroundImage: `url(${imgType2.src})` }}
              >
                <span>교실 수업에 사용</span>
              </li>
              <li
                onClick={() => {
                  handleTypeForm()
                }}
                style={{ backgroundImage: `url(${imgType3.src})` }}
              >
                <span>가정 학습에 사용</span>
              </li>
              <li
                onClick={() => {
                  handleTypeForm()
                  setType('type2')
                }}
                style={{ backgroundImage: `url(${imgType4.src})` }}
              >
                <span>수업 연구로 사용</span>
              </li>
              <li
                onClick={() => {
                  handleTypeForm()
                  setType('type2')
                }}
                style={{ backgroundImage: `url(${imgType5.src})` }}
              >
                <span>그 밖에 다른 용도</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewTypeModal
