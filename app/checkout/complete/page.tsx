'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from './page.module.scss'

import logoSymbol from '@/assets/images/common/success.png'
import Button from '~/components/ui/Button'

const UploadCompletePage = () => {
  const router = useRouter()

  const handleDownload = () => {
    router.push('/purchase')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.image_wrap}>
        <Image src={logoSymbol} alt='check Image' width={128} height={128} />
      </div>

      <div className={styles.title_wrap}>
        <h1 className={styles.title}>결제가 완료되었습니다.</h1>
        <p className={styles.description}>
          결제 영수증은 등록된 이메일로 발송되었습니다. <br />
          구매한 자료는 마이페이지&gt;구매내역에서 다운로드를 통해 이용하실 수
          있습니다.
        </p>
      </div>

      <div className={styles.button_wrap}>
        <Button width={376} onClick={handleDownload}>
          다운로드 바로가기
        </Button>
        <Link href='/search' className={styles.search_link}>
          다른 자료 둘러보기
        </Link>
      </div>
    </div>
  )
}

export default UploadCompletePage
