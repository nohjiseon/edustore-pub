'use client'

import Image from 'next/image'
import { useMemo, useRef, useState, useEffect, type ChangeEvent } from 'react'

import styles from './ProfileModal.module.scss'

import defaultProfile from '@/assets/images/common/default_profile.png'
import Button from '@/components/ui/Button/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/Dialog'
import { Icon } from '~/components/Icon'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  initialProfileImg?: string
}

const ProfileModal = ({
  open = false,
  onOpenChange,
  zIndex,
  initialProfileImg = ''
}: Props) => {
  const [previewImage, setPreviewImage] = useState<string>(initialProfileImg)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 모달이 열릴 때 초기값 설정
  useEffect(() => {
    if (open) {
      setPreviewImage(initialProfileImg)
      setSelectedFile(null)
    }
  }, [open, initialProfileImg])

  // 이미지가 변경되었는지 확인
  const isImageChanged = useMemo(
    () => selectedFile !== null || previewImage !== initialProfileImg,
    [selectedFile, previewImage, initialProfileImg]
  )

  const isSaveDisabled = useMemo(() => !isImageChanged, [isImageChanged])

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setSelectedFile(null)
    }
  }, [open])

  const handleProfileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 확인 (예: 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    // FileReader를 사용하여 이미지 미리보기 생성
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result
      if (typeof result === 'string') {
        setPreviewImage(result)
        setSelectedFile(file)
      }
    }
    reader.onerror = () => {
      alert('이미지를 읽는 중 오류가 발생했습니다.')
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (isSaveDisabled) return

    // TODO: 실제 저장 로직 연동 (프로필 이미지)
    onOpenChange?.(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <DialogHeader className={styles.modal_header} borderHidden>
          <DialogTitle className={styles.modal_title}>프로필 수정</DialogTitle>
        </DialogHeader>
        <div className={styles.modal_body}>
          <div className={styles.profile_wrap}>
            <input
              type='file'
              ref={fileInputRef}
              accept='image/*'
              onChange={handleFileChange}
              className={styles.file_input}
            />
            <div className={styles.profile_img} onClick={handleProfileClick}>
              <Image
                src={previewImage || defaultProfile}
                alt='profile'
                width={124}
                height={124}
              />
              <span className={styles.ic_edit}>
                <Icon name='edit-s' />
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className={styles.modal_footer}>
          <Button
            variant='outline'
            onClick={() => onOpenChange && onOpenChange(false)}
            width={195}
          >
            취소
          </Button>
          <Button
            variant='default'
            onClick={handleSave}
            disabled={isSaveDisabled}
            width={195}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileModal
