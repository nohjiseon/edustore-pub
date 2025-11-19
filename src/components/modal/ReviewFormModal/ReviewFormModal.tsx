'use client'

import { useState, useEffect, useRef } from 'react'

import styles from './ReviewFormModal.module.scss'
import ReviewResultModal from '../ReviewResultModal'

import imgSample from '@/assets/images/contents/card_example.png'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'
import { Icon } from '~/components/Icon'
import { Button, StarRating, Textarea, ToggleBadge } from '~/components/ui'
import TagList, { Tag } from '~/components/ui/TagList'
import { useModal } from '~/hooks/useModal'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  type: string
}

const ReviewFormModal = ({
  open = true,
  onOpenChange,
  zIndex,
  type
}: Props) => {
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

  const [gradeSelected, setGradeSelected] = useState<string[]>([])
  const [gradeTargetSelected, setGradeTargetSelected] = useState<string[]>([])
  const [review, setReview] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_title_wrap}>
          <DialogTitle>후기 남기기</DialogTitle>
          <DialogDescription>
            자료를 사용해보신 후 후기를 남겨주세요
          </DialogDescription>
        </div>
        <div className={styles.modal_body}>
          {type === 'type1' ? (
            <>
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
              <div className={styles.grade_wrap}>
                <div className={styles.section_title}>
                  <span>자료 활용 대상 학년을 확인해 주세요</span>
                </div>

                <div className={styles.grade_list_wrap}>
                  <ul>
                    {GRADE_OPTIONS.map((item) => (
                      <li key={item.value}>
                        <ToggleBadge
                          size='md'
                          onClick={() => handleToggleSelection(item.value)}
                          selected={gradeSelected.includes(item.value)}
                        >
                          {item.label}
                        </ToggleBadge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.grade_target_wrap}>
                <div className={styles.section_title}>
                  <span>자료 활용 대상 학생을 확인해 주세요 (선택)</span>
                </div>

                <div className={styles.grade_list_wrap}>
                  <ul>
                    {GRADE_TARGET_OPTIONS.map((item) => (
                      <li key={item.value}>
                        <ToggleBadge
                          size='md'
                          onClick={() =>
                            handleToggleGradeTargetSelection(item.value)
                          }
                          selected={gradeTargetSelected.includes(item.value)}
                        >
                          {item.label}
                        </ToggleBadge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : null}

          <div className={styles.rate_wrap}>
            <div className={styles.section_title}>
              <span>이 자료에 대해 어느 정도로 만족하셨나요?</span>
            </div>

            <div className={styles.star_wrap}>
              <StarRating
                rating={rating}
                showScore={false}
                onRatingChange={handleRatingChange}
              />
            </div>
          </div>

          <div className={styles.review_write_wrap}>
            <div className={styles.section_title}>
              <span>구체적인 후기를 작성해 주세요</span>
              <p>
                다른 선생님들에게 이 자료를 어떻게 사용했는지, 가르친 학생이 이
                자료를 사용하며 무엇을 좋아하고 무엇을 어려워했는지 등을
                알려주세요.
              </p>
            </div>

            <div className={styles.review_editor_wrap}>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                maxLength={300}
                showCounter
                className={styles.review_textarea}
              />
            </div>

            <div className={styles.review_attach_wrap}>
              <div className={styles.attach_input}>
                <input
                  type='file'
                  id='file'
                  multiple
                  accept='image/*'
                  onChange={handleImageChange}
                />
                <label htmlFor='file'>
                  <Icon name='camera' color='#53585E' size={36} />
                  <span>사진 올리기</span>
                </label>
              </div>

              {/* 이미지 미리보기 */}
              {previewUrls.length > 0 && (
                <div className={styles.preview_list}>
                  {previewUrls.map((url, index) => (
                    <div key={index} className={styles.preview_item}>
                      <img src={url} alt={`preview-${index}`} />
                      <button
                        type='button'
                        className={styles.remove_btn}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Icon name='close' size={8} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.file_desc_wrap}>
              <ul>
                <li>
                  사진은 각 용량 20MB 이하, 최대 5개까지 첨부할 수 있습니다.
                </li>
                <li>
                  사진에 주민 등록 번호, 전화번호 등 개인정보가 포함되지 않도록
                  유의해 주세요.
                </li>
                <li>
                  자료와 관련 없거나 부적합한 문의는 사전 고지 없이 삭제 또는
                  차단될 수 있습니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.button_wrap}>
          <Button variant='outline' onClick={handleClose}>
            취소
          </Button>
          <Button type='submit' onClick={handleSubmit}>
            등록
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewFormModal
