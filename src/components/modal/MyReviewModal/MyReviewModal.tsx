'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from './MyReviewModal.module.scss'
import ReviewResultModal from '../ReviewResultModal'

import imgSample from '@/assets/images/contents/card_example.png'
import imgBackground from '@/assets/images/modal/modal_bar.png'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'
import { Icon } from '~/components/Icon'
import {
  Button,
  HelpfulButton,
  StarRating,
  Textarea,
  ToggleBadge
} from '~/components/ui'
import TagList, { Tag } from '~/components/ui/TagList'
import { useModal } from '~/hooks/useModal'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const MyReviewModal = ({ open = true, onOpenChange, zIndex }: Props) => {
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

  const GRADE_OPTIONS = [
    { label: '만 3세 이하', value: '1' },
    { label: '만 4세', value: '2' },
    { label: '만 5세', value: '3' },
    { label: '만 6세', value: '4' },
    { label: '초등 1학년', value: '5' },
    { label: '초등 2학년', value: '6' },
    { label: '초등 3학년', value: '7' },
    { label: '초등 4학년', value: '8' },
    { label: '초등 5학년', value: '9' },
    { label: '초등 6학년', value: '10' },
    { label: '중등 1학년', value: '11' },
    { label: '중등 2학년', value: '12' },
    { label: '중등 3학년', value: '13' },
    { label: '고등 1학년', value: '14' },
    { label: '고등 2학년', value: '15' },
    { label: '고등 3학년', value: '16' },
    { label: '성인교육', value: '17' },
    { label: '특수교육', value: '18' }
  ] as const

  const GRADE_TARGET_OPTIONS = [
    { label: '학습 부진을 겪고 있는 학생', value: '1' },
    { label: '특수 교육 대상 학생', value: '2' },
    { label: '이중 언어 대상 학생', value: '3' },
    { label: '다문화 학생', value: '4' },
    { label: '기타', value: '5' }
  ] as const

  const swiperLength = [1, 2, 3, 4]

  const [gradeSelected, setGradeSelected] = useState<string[]>([])
  const [gradeTargetSelected, setGradeTargetSelected] = useState<string[]>([])
  const [review, setReview] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [helpfulCount, setHelpfulCount] = useState<number>(0)
  const [isHelpfulEnabled, setIsHelpfulEnabled] = useState<boolean>(false)
  const { openModal } = useModal()
  const previewUrlsRef = useRef<string[]>([])

  useEffect(() => {
    previewUrlsRef.current = previewUrls
  }, [previewUrls])

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const handleToggleSelection = (value: string) => {
    setGradeSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleToggleGradeTargetSelection = (value: string) => {
    setGradeTargetSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const fileArray = Array.from(files)
    const totalImages = selectedImages.length + fileArray.length

    // 최대 5개 제한
    if (totalImages > 5) {
      alert('사진은 최대 5개까지 첨부할 수 있습니다.')
      return
    }

    // 각 파일 크기 체크 (20MB)
    const maxSize = 20 * 1024 * 1024 // 20MB in bytes
    const validFiles = fileArray.filter((file) => {
      if (file.size > maxSize) {
        alert(`${file.name}은(는) 20MB를 초과합니다.`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    // 미리보기 URL 생성
    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file))

    setSelectedImages((prev) => [...prev, ...validFiles])
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls])

    // input 초기화
    e.target.value = ''
  }

  const handleRemoveImage = (index: number) => {
    // 미리보기 URL 해제
    URL.revokeObjectURL(previewUrls[index])

    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    openModal(ReviewResultModal, { result: false })
    onOpenChange(false)
  }

  const handleHelpfulClick = () => {
    setIsHelpfulEnabled((prev) => !prev)
    setHelpfulCount((prev) => (isHelpfulEnabled ? prev - 1 : prev + 1))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          <div className={styles.modal_title_wrap}>
            <DialogTitle>자료 후기</DialogTitle>
            <Icon
              name='close-m'
              className={styles.close_icon}
              color='var(--color-neutral-grey-3)'
            />
          </div>
        </div>

        <img src={imgBackground.src} alt='sample' className={styles.bar_img} />

        <div className={styles.modal_content_wrap}>
          <div className={styles.rating_wrap}>
            <div className={styles.rating}>
              <StarRating rating={4.5} showScore={false} />
              <span className={styles.rating_text}>4.5</span>
            </div>

            <div className={styles.writer_wrap}>
              <span>단단**</span>
              <span>2025.06.30</span>
            </div>
          </div>

          <div className={styles.review_title_wrap}>
            <span>
              3학년 2학기 첫 글쓰기 수업에서 이 자료를 사용했어요. 아이들이 글의
              구조를 처음 접하는데 효과적이었어요.
            </span>
          </div>

          <div className={styles.toggle_badge_wrap}>
            <ul>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge size='md'>
                  <span>만 3세 이하</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge>
                  <span>만 4세</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge>
                  <span>만 5세</span>
                </ToggleBadge>
              </li>
              <li>
                <ToggleBadge>
                  <span>학습 부진을 겪고 있는 학생</span>
                </ToggleBadge>
              </li>
            </ul>
          </div>

          <div className={styles.swiper_wrap}>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={
                swiperLength.length > 3 ? 3.2 : (swiperLength.length as number)
              }
              spaceBetween={16}
              navigation={false}
              pagination={false}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 10
                },
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 12
                },
                1024: {
                  slidesPerView: 3.2,
                  spaceBetween: 16
                }
              }}
            >
              {swiperLength.map((_, index) => (
                <SwiperSlide key={index}>
                  <img src={imgSample.src} alt='sample' />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={styles.recommend_wrap}>
            <HelpfulButton
              count={helpfulCount}
              enabled={isHelpfulEnabled}
              text='유용해요'
              onClick={handleHelpfulClick}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MyReviewModal
