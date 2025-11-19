'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './page.module.scss'

import logoSymbol from '@/assets/images/common/success.png'
import Button from '~/components/ui/Button'

const UploadCompletePage = () => {
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.image_wrap}>
        <Image src={logoSymbol} alt='check Image' width={128} height={128} />
      </div>

      <div className={styles.title_wrap}>
        <h1 className={styles.title}>등록 요청이 완료되었습니다</h1>
        <p className={styles.description}>
          소중한 자료를 업로드해주셔서 감사합니다.
        </p>
      </div>

      <div className={styles.button_wrap}>
        <Button width={376} onClick={handleSubmit}>
          메인으로
        </Button>
      </div>
    </div>
  )
}

export default UploadCompletePage
