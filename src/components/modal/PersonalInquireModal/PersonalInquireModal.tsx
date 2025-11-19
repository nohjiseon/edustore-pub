'use client'

import { useState, useEffect, useRef } from 'react'

import styles from './PersonalInquireModal.module.scss'
import InquireResultModal from '../InquireResultModal'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { Icon } from '~/components/Icon'
import { Button, FilterDropdown, Textarea } from '~/components/ui'
import { useModal } from '~/hooks/useModal'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const InquireFormModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const inquireOption = [
    '회원 정보 관리',
    '기관회원',
    '자료 콘텐츠',
    '구매 콘텐츠 관리',
    '결제·취소·환불',
    '시스템 오류',
    '기타'
  ]

  const [title, setTitle] = useState<string>('')
  const [inquiryContent, setInquiryContent] = useState<string>('')
  const [selectedInquiryTypes, setSelectedInquiryTypes] = useState<string[]>([])
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const previewUrlsRef = useRef<string[]>([])
  const { openModal } = useModal()
  const [titleError, setTitleError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [contentError, setContentError] = useState(false)

  const handleResult = () => {
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

    // 각 파일 크기 체크 (10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
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
    const isTitleValid = title.trim().length > 3 && title.trim().length < 11
    const isTypeValid = selectedInquiryTypes.length > 0
    const isContentValid =
      inquiryContent.trim().length > 10 && inquiryContent.trim().length < 301

    setTitleError(!isTitleValid)
    setTypeError(!isTypeValid)
    setContentError(!isContentValid)

    if (!isTitleValid || !isTypeValid || !isContentValid) {
      return
    }

    // TODO: API 호출 및 문의 등록 로직
    console.log('문의 제목:', title)
    console.log('문의 내용:', inquiryContent)
    console.log('문의 유형:', selectedInquiryTypes)
    console.log('첨부 이미지:', selectedImages)
    onOpenChange(false)
    handleResult()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          <div className={styles.modal_title_wrap}>
            <DialogTitle>1:1 문의하기</DialogTitle>
          </div>

          <div className={styles.write_wrap}>
            <div className={styles.section_title}>
              <span>문의 유형 선택</span>
            </div>

            <div className={styles.select_wrap}>
              <FilterDropdown
                // options={inquireOption.slice(0)}
                type='inquiry'
                options={inquireOption}
                defaultValue='문의 유형 선택'
                showDefaultOption={false}
                selectedValues={selectedInquiryTypes}
                onSelect={(values) => {
                  setSelectedInquiryTypes(values)
                  if (values.length > 0) setTypeError(false)
                }}
                singleSelect
                className={typeError ? styles.error_border : undefined}
              />
              {typeError && (
                <p className={styles.error_text}>문의 유형을 선택해 주세요.</p>
              )}
            </div>
            <div className={styles.section_title}>
              <span>문의 제목 입력</span>
            </div>

            <div className={styles.inquire_title_wrap}>
              <input
                type='text'
                name=''
                id=''
                placeholder='제목을 입력해 주세요.'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (e.target.value.trim().length > 0) setTitleError(false)
                }}
                className={titleError ? styles.error_border : undefined}
              />
              {titleError && (
                <p className={styles.error_text}>
                  제목을 3-10자로 입력해야 합니다.
                </p>
              )}
            </div>
            <div className={styles.section_title}>
              <span>문의 내용 입력</span>
            </div>

            <div
              className={[
                styles.editor_wrap,
                contentError ? styles.error_border : ''
              ].join(' ')}
            >
              <Textarea
                value={inquiryContent}
                onChange={(e) => {
                  setInquiryContent(e.target.value)
                  if (e.target.value.trim().length > 0) setContentError(false)
                }}
                maxLength={300}
                showCounter
                placeholder='문의 내용을 입력해주세요'
              />
              {contentError && (
                <p className={styles.error_text}>
                  문의 내용을 10자이상으로 입력해야 합니다.
                </p>
              )}
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
                  <span>업로드 파일 용량 최대 10MB 가능</span>
                </li>
                <li>
                  <span>최대 5개까지 업로드 가능</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.button_wrap}>
            <Button variant='outline' onClick={handleClose}>
              취소
            </Button>
            <Button type='submit' onClick={handleSubmit}>
              문의하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InquireFormModal
