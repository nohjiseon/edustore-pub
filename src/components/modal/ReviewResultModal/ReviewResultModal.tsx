'use client'

import Image from 'next/image'
import Link from 'next/link'

import styles from './ReviewResultModal.module.scss'

import error from '@/assets/images/common/error.png'
import success from '@/assets/images/common/success.png'
import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/Dialog'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  result?: boolean
}

const ReviewResultModal = ({
  open = true,
  onOpenChange,
  zIndex,
  result
}: Props) => {
  console.log(result)

  const handleClose = () => {
    onOpenChange(false)
  }
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={styles.modal_content} zIndex={zIndex}>
          <div className={styles.modal_body}>
            <div className={styles.img_wrap}>
              <Image
                src={result === true ? success : error}
                alt='success Image'
                width={128}
                height={128}
              />
            </div>

            <div className={styles.modal_title_wrap}>
              <DialogTitle>
                {result === true
                  ? '후기 등록이 완료되었습니다'
                  : '후기 등록에 실패했습니다'}
              </DialogTitle>
              <DialogDescription>
                {result === true
                  ? '구매 자료에 대한 후기를 등록해주셔서 감사합니다'
                  : '일시적인 오류가 발생했습니다. 다시 시도해주세요'}
              </DialogDescription>
            </div>

            <div
              className={`${styles.modal_button_wrap} ${
                result === false ? styles.error_button : ''
              }`}
            >
              <Button onClick={handleClose}>확인</Button>
            </div>

            {result === false && (
              <div className={styles.link_wrap}>
                <Link href='/'>고객센터로 이동</Link>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ReviewResultModal
