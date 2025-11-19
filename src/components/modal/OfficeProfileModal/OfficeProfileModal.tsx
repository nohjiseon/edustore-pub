'use client'

import Image from 'next/image'
import { useMemo, useRef, useState, useEffect, type ChangeEvent } from 'react'

import styles from './OfficeProfileModal.module.scss'

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
import { Input } from '~/components/ui'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  initialProfileImg?: string
}

const OfficeProfileModal = ({
  open = false,
  onOpenChange,
  zIndex,
  initialProfileImg = ''
}: Props) => {
  const [organizationName, setOrganizationName] = useState('')
  const [previewImage, setPreviewImage] = useState<string>(initialProfileImg)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 모달이 열릴 때 초기값 설정
  useEffect(() => {
    if (open) {
      setPreviewImage(initialProfileImg)
      setOrganizationName('')
    }
  }, [open, initialProfileImg])

  // 기관명에 한 글자라도 입력되면 저장 버튼 활성화
  const isSaveDisabled = useMemo(
    () => !organizationName.trim(),
    [organizationName]
  )

  const handleOrganizationNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrganizationName(e.target.value)
  }

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
  }

  const handleSave = () => {
    if (isSaveDisabled) return

    // TODO: 실제 저장 로직 연동 (프로필 이미지와 기관명)
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

          <div className={styles.label}>기관명 변경</div>
          <div className={styles.input_group}>
            <Input
              placeholder='기관명을 입력해 주세요.'
              value={organizationName}
              onChange={handleOrganizationNameChange}
            />
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

export default OfficeProfileModal
