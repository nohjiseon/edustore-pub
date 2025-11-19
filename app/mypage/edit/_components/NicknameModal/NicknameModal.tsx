'use client'

import { useEffect, useMemo, useState, type ChangeEvent } from 'react'

import styles from './NicknameModal.module.scss'

import Button from '@/components/ui/Button/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/Dialog'
import { authService } from '@/services/auth.service'
import { Input } from '~/components/ui'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const NicknameModal = ({ open = false, onOpenChange, zIndex }: Props) => {
  const [nickname, setNickname] = useState('')
  const [helperMessage, setHelperMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [checkedNickname, setCheckedNickname] = useState('')

  const isSaveDisabled = useMemo(
    () => !nickname.trim() || !isDuplicateChecked || !isAvailable,
    [nickname, isAvailable, isDuplicateChecked]
  )

  // 닉네임 입력 시 실시간 유효성 검사 - 회원가입 페이지와 동일한 로직
  useEffect(() => {
    // 빈 값인 경우
    if (!nickname || nickname.length === 0) {
      setErrorMessage('')
      setIsDuplicateChecked(false)
      setIsAvailable(false)
      setCheckedNickname('')
      setHelperMessage('')
      return
    }

    // 최소 길이 검사
    if (nickname.length < 3) {
      setErrorMessage('닉네임은 3-10자로 입력해야 합니다.')
      setIsDuplicateChecked(false)
      setIsAvailable(false)
      setCheckedNickname('')
      setHelperMessage('')
      return
    }

    // 최대 길이 검사
    if (nickname.length > 10) {
      setErrorMessage('닉네임은 3-10자로 입력해야 합니다.')
      setIsDuplicateChecked(false)
      setIsAvailable(false)
      setCheckedNickname('')
      setHelperMessage('')
      return
    }

    // 형식 검사 (한글, 영문, 숫자만 허용)
    if (!/^[가-힣a-zA-Z0-9]+$/.test(nickname)) {
      setErrorMessage('한글, 영문, 숫자만 입력 가능합니다.')
      setIsDuplicateChecked(false)
      setIsAvailable(false)
      setCheckedNickname('')
      setHelperMessage('')
      return
    }

    // 유효한 경우 에러 메시지 초기화
    setErrorMessage('')
  }, [nickname])

  // 닉네임 입력 시 자동 중복확인 (디바운싱) - 회원가입 페이지와 동일한 로직
  useEffect(() => {
    // 닉네임이 유효하지 않으면 중복확인 스킵
    if (
      !nickname ||
      nickname.length < 3 ||
      nickname.length > 10 ||
      !/^[가-힣a-zA-Z0-9]+$/.test(nickname)
    ) {
      setIsDuplicateChecked(false)
      setIsAvailable(false)
      setCheckedNickname('')
      setHelperMessage('')
      return
    }

    // 이미 확인한 닉네임이면 스킵
    if (nickname === checkedNickname) {
      return
    }

    // 상태 초기화
    setIsDuplicateChecked(false)
    setIsAvailable(false)
    setHelperMessage('')

    // 디바운싱: 입력이 멈춘 후 500ms 후에 API 호출
    const timer = setTimeout(async () => {
      try {
        const result = await authService.checkNicknameDuplicate(nickname)

        setCheckedNickname(nickname)
        setIsDuplicateChecked(true)
        setIsAvailable(!result.isDuplicate)

        if (result.isDuplicate) {
          setErrorMessage('이미 사용 중인 닉네임입니다.')
          setHelperMessage('')
        } else {
          setHelperMessage('사용 가능한 닉네임입니다.')
          setErrorMessage('')
        }
      } catch (error) {
        setCheckedNickname(nickname)
        setIsDuplicateChecked(true)
        setIsAvailable(false)
        setErrorMessage('이미 사용 중인 닉네임입니다.')
        setHelperMessage('')
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [nickname, checkedNickname])

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setNickname('')
      setHelperMessage('')
      setErrorMessage('')
      setIsDuplicateChecked(false)
      setIsAvailable(null)
      setCheckedNickname('')
    }
  }, [open])

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    setNickname(nextValue)
  }

  const handleSave = () => {
    if (isSaveDisabled) return

    // TODO: 실제 저장 로직 연동
    onOpenChange?.(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <DialogHeader className={styles.modal_header} borderHidden>
          <DialogTitle className={styles.modal_title}>닉네임 수정</DialogTitle>
        </DialogHeader>
        <div className={styles.modal_body}>
          <div className={styles.label}>닉네임</div>
          <div
            className={`${styles.input_group} ${
              isDuplicateChecked && isAvailable === true ? styles.success : ''
            }`}
          >
            <Input
              placeholder='닉네임을 입력해 주세요.'
              value={nickname}
              onChange={handleNicknameChange}
              errorMessage={errorMessage}
              className={
                isDuplicateChecked && isAvailable === true
                  ? styles.input_success
                  : ''
              }
            />
            <button
              type='button'
              className={`${styles.duplication_btn} ${
                isDuplicateChecked && nickname === checkedNickname
                  ? isAvailable
                    ? styles.success
                    : styles.error
                  : ''
              }`}
              disabled={true}
            >
              중복확인
            </button>
          </div>
          {isDuplicateChecked && nickname === checkedNickname ? (
            isAvailable ? (
              helperMessage && (
                <p className={styles.success_message}>{helperMessage}</p>
              )
            ) : null
          ) : (
            <p className={styles.duplication_desc}>
              한글, 영문, 숫자 포함 3-10자 입력이 가능합니다.
            </p>
          )}
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

export default NicknameModal
