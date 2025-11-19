'use client'

import { useState, useEffect, useRef } from 'react'

import styles from './InquireFormModal.module.scss'
import InquireResultModal from '../InquireResultModal'

import imgSample from '@/assets/images/contents/card_example.png'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'
import { Icon } from '~/components/Icon'
import { Button, Textarea } from '~/components/ui'
import TagList, { Tag } from '~/components/ui/TagList'
import { useModal } from '~/hooks/useModal'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const InquireFormModal = ({ open = true, onOpenChange, zIndex }: Props) => {
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

  const [inquiryContent, setInquiryContent] = useState<string>('')
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const previewUrlsRef = useRef<string[]>([])
  const { openModal } = useModal()

  const handleResult = () => {
    setShowResult(true)
    openModal(InquireResultModal, { result: true })
  }

  useEffect(() => {
    previewUrlsRef.current = previewUrls
  }, [previewUrls])

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

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
    // TODO: API 호출 및 문의 등록 로직
    console.log('문의 내용:', inquiryContent)
    console.log('첨부 이미지:', selectedImages)
    onOpenChange(false)
    handleResult()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_title_wrap}>
          <DialogTitle>판매자에게 문의하기</DialogTitle>
          <DialogDescription>
            답변은 프로필 &gt; 구매 및 다운로드 관리 &gt; 나의 문의에서 확인할
            수 있습니다.
            <a href='/purchase/inquiries' className={styles.link_icon}>
              바로가기
              <Icon name='chevron-right-s' />
            </a>
          </DialogDescription>
        </div>
        <div className={styles.modal_body}>
          <div className={styles.info_wrap}>
            <div className={styles.item_img}>
              <img src={imgSample.src} alt='상품 이미지' />
            </div>
            <div className={styles.item_info}>
              <div className={styles.tags_wrap}>
                <TagList tags={tagsArr} />
              </div>
              <div className={styles.item_title}>
                <span>
                  효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                </span>
              </div>
              <div className={styles.item_seller}>
                <img src={imgSample.src} alt='판매자 프로필' />
                <span>수업가게닉네임</span>
              </div>
            </div>
          </div>

          <div className={styles.write_wrap}>
            <div className={styles.section_title}>
              <span>문의 내용을 입력해 주세요</span>
            </div>

            <div className={styles.editor_wrap}>
              <Textarea
                value={inquiryContent}
                onChange={(e) => setInquiryContent(e.target.value)}
                maxLength={500}
                showCounter
                placeholder='문의하실 내용을 정확하게 입력해 주세요'
              />
            </div>

            <div className={styles.attach_wrap}>
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

              {previewUrls.length > 0 && (
                <div className={styles.preview_list}>
                  {previewUrls.map((url, index) => (
                    <div key={index} className={styles.preview_item}>
                      <img src={url} alt={`미리보기 ${index + 1}`} />
                      <button
                        type='button'
                        className={styles.remove_btn}
                        onClick={() => handleRemoveImage(index)}
                        aria-label='이미지 삭제'
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
                  <span>
                    사진은 각 용량 20MB 이하, 최대 5개까지 첨부할 수 있습니다.
                  </span>
                </li>
                <li>
                  <span>
                    사진에 주민 등록 번호, 전화번호 등 개인정보가 포함되지
                    않도록 유의해 주세요.
                  </span>
                </li>
                <li>
                  <span>
                    자료와 관련 없거나 부적합한 문의는 사전 고지 없이 삭제 또는
                    차단될 수 있습니다.
                  </span>
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

export default InquireFormModal
