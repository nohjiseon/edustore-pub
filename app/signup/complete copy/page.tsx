import Image from 'next/image'

import styles from './page.module.scss'

import logoSymbol from '@/assets/images/common/success.png'
import Button from '~/components/ui/Button'

const SignupCompletePage = () => {
  return (
    <div className={styles.wrapper}>
      {/* 가입 완료 이미지 */}
      <div className={styles.image_wrap}>
        <Image
          src={logoSymbol}
          alt='수업가게_텍스트'
          width={128}
          height={128}
        />
      </div>

      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>
          수업가게 개인 회원가입이 완료되었습니다.
        </h1>
        <p className={styles.description}>
          선택한 회원유형에 맞게 가입을 진행해 주세요.
        </p>
      </div>

      {/* 버튼 */}
      <div className={styles.button_wrap}>
        <Button variant='outline'>메인으로</Button>
        <Button variant='default'>로그인</Button>
      </div>
    </div>
  )
}

export default SignupCompletePage
