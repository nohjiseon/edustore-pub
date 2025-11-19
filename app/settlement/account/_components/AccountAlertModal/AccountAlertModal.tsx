'use client'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import styles from './AccountAlertModal.module.scss'

import errorImage from '@/assets/images/common/error.png'
import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'
import { cn } from '@/lib/utils'
import { accountService } from '@/services/account.service'

type AccountAlertType =
  | 'changeConfirm'
  | 'changeError'
  | 'deleteError'
  | 'addError'

type ModalConfig = {
  title: string
  description: string
  buttonLabel: string
  image?: {
    src: StaticImageData
    alt: string
  }
  titleClassName?: string
  showServiceLink?: boolean
}

const MODAL_CONFIG: Record<AccountAlertType, ModalConfig> = {
  changeConfirm: {
    title: '대표 계좌를 변경하시겠어요?',
    description:
      '해당 계좌를 대표 계좌로 설정할 경우\n기존 대표 계좌 설정이 해제됩니다.',
    buttonLabel: '변경하기'
  },
  changeError: {
    title: '대표 계좌 변경이 실패하였습니다.',
    description:
      '일시적인 오류로 대표계좌 변경에 실패했습니다.\n잠시 후 다시 시도해주세요',
    buttonLabel: '확인'
  },
  deleteError: {
    title: '계좌 삭제가 실패하였습니다.',
    description:
      '대표계좌는 삭제할 수 없습니다.\n대표계좌 변경 후 다시 시도해 주세요.',
    buttonLabel: '확인',
    image: {
      src: errorImage,
      alt: 'error image'
    },
    showServiceLink: true
  },
  addError: {
    title: '계좌 등록에 실패하였습니다.',
    description:
      '요청하신 계좌번호는 잘못 입력된 오류번호입니다.\n계좌번호를 확인 후 다시 이용하시길 바랍니다.',
    buttonLabel: '확인',
    image: {
      src: errorImage,
      alt: 'error image'
    },
    showServiceLink: true
  }
}

interface AccountAlertModalProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  type: AccountAlertType
  onConfirm?: () => void | Promise<void>
  bankAccountNo?: number // 대표계좌 변경 시 필요한 계좌 번호
  isCurrentlyPrimary?: boolean // 현재 대표계좌 여부
  onSuccess?: () => void | Promise<void> // 성공 시 콜백
  onError?: () => void // 실패 시 콜백
}

const AccountAlertModal = ({
  open,
  onOpenChange,
  zIndex,
  type,
  onConfirm,
  bankAccountNo,
  isCurrentlyPrimary,
  onSuccess,
  onError
}: AccountAlertModalProps) => {
  const modalConfig = MODAL_CONFIG[type]

  const handleConfirm = async () => {
    console.log(33)

    // changeConfirm 타입이고 bankAccountNo가 있으면 API 호출
    if (type === 'changeConfirm' && bankAccountNo !== undefined) {
      try {
        // 현재 대표계좌면 일반계좌로, 아니면 대표계좌로 변경
        const newPrimaryYn: 'Y' | 'N' = isCurrentlyPrimary ? 'N' : 'Y'

        const response = await accountService.updateBankAccountPrimary(
          bankAccountNo,
          {
            primaryYn: newPrimaryYn
          }
        )

        console.log(response)

        if (response.status === 200 || response.code === 200) {
          // 성공 시 콜백 호출
          if (onSuccess) {
            await onSuccess()
          }
          onOpenChange?.(false)
        } else {
          throw new Error(response.message || '대표계좌 변경에 실패했습니다.')
        }
      } catch (error) {
        console.error('대표계좌 변경 실패:', error)
        // 실패 시 에러 콜백 호출
        if (onError) {
          onError()
        } else {
          onOpenChange?.(false)
        }
      }
      return
    }

    // 기존 onConfirm 콜백이 있으면 실행
    if (onConfirm) {
      await onConfirm()
      return
    }

    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <div className={styles.modal_body}>
          {modalConfig.image && (
            <div className={styles.img_wrap}>
              <Image
                src={modalConfig.image.src}
                alt={modalConfig.image.alt}
                width={128}
                height={128}
              />
            </div>
          )}
          <div className={styles.modal_title_wrap}>
            <DialogTitle
              className={cn(styles.title, modalConfig.titleClassName)}
            >
              {modalConfig.title}
            </DialogTitle>
            <DialogDescription className={styles.description}>
              {modalConfig.description}
            </DialogDescription>
          </div>
          <div className={styles.modal_button_wrap}>
            <Button onClick={handleConfirm}>{modalConfig.buttonLabel}</Button>
            {modalConfig.showServiceLink && (
              <Link href='/service'>고객센터 문의하기</Link>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export type { AccountAlertType }
export default AccountAlertModal
