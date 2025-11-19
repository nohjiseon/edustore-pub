import Image from 'next/image'
import { useEffect } from 'react'

import styles from './page.module.scss'

import logoSymbol from '@/assets/images/common/success.png'
import LoginButton from '~/components/layout/header/LoginButton'
import Button from '~/components/ui/Button'

export type Props = {
  type:
    | 'personalSuccess'
    | 'findEmail'
    | 'findOrganId'
    | 'sendLink'
    | 'resetPassword'
    | 'organizationSuccess'
  email?: string
}

const SignupCompletePage = ({ type, email }: Props) => {
  // 이메일 찾기 완료 후 세션 스토리지 정리
  useEffect(() => {
    if ((type === 'findEmail' || type === 'findOrganId') && email) {
      // 페이지 표시 후 세션 스토리지에서 이메일 제거
      return () => {
        if (type === 'findEmail') {
          sessionStorage.removeItem('foundEmail')
        } else if (type === 'findOrganId') {
          sessionStorage.removeItem('foundOrganEmail')
        }
      }
    }
  }, [type, email])
  const signupCompleteObj = {
    personalSuccess: {
      key: 'signupSuccess',
      title: '수업가게 개인 회원가입이 완료되었습니다.',
      description: '로그인 후 수업가게의 다양한 서비스를 이용하실 수 있습니다.',
      btn1: '메인으로',
      btnLink1: '/',
      btn2: '로그인',
      btnLink2: ''
    },
    findEmail: {
      key: 'findEmail',
      title: '이메일 찾기가 완료되었습니다.',
      description: '',
      btn1: '비밀번호 재설정',
      btnLink1: '',
      btn2: '로그인',
      btnLink2: ''
    },
    findOrganId: {
      key: 'findOrganId',
      title: '기관회원 아이디 찾기가 완료되었습니다.',
      description: '',
      btn1: '비밀번호 재설정',
      btnLink1: '',
      btn2: '로그인',
      btnLink2: ''
    },
    sendLink: {
      key: 'sendLink',
      title: '비밀번호 재설정 링크가 발송되었습니다.',
      description:
        '이메일에 포함된 링크를 통해 비밀번호를 재설정해주세요. <br />*링크는 발송 후 30분간 유효하며, 만료 시 다시 요청하셔야 합니다.',
      btn1: '',
      btnLink1: '',
      btn2: '',
      btnLink2: ''
    },
    resetPassword: {
      key: 'resetPassword',
      title: '비밀번호가 재설정되었습니다.',
      description:
        '보안을 위해 다시 로그인해 주세요. <br />본인이 요청하지 않은 변경이라면 즉시 고객센터로 알려주세요.',
      btn1: '메인으로',
      btnLink1: '/',
      btn2: '로그인',
      btnLink2: ''
    },
    organizationSuccess: {
      key: 'organizationSuccess',
      title: '수업가게 기관 회원가입이 완료되었습니다.',
      description: '로그인 후 수업가게의 다양한 서비스를 이용하실 수 있습니다.',
      btn1: '메인으로',
      btnLink1: '/',
      btn2: '로그인',
      btnLink2: ''
    }
  }

  const data = signupCompleteObj[type]

  return (
    <div className={styles.wrapper}>
      <div className={styles.image_wrap}>
        <Image src={logoSymbol} alt='check Image' width={128} height={128} />
      </div>

      <div
        className={`${styles.title_wrap} ${
          data.key === 'findEmail' || data.key === 'findOrganId'
            ? styles.find_email_wrap
            : ''
        }`}
      >
        <h1 className={styles.title}>{data.title}</h1>
        {data.key !== 'findEmail' && data.key !== 'findOrganId' && (
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
      </div>

      {(data.key === 'findEmail' || data.key === 'findOrganId') && (
        <div className={styles.show_email_wrap}>
          <span>
            회원님의 이메일 계정은
            <span className={styles.email}>{email || '이메일 없음'}</span>
            입니다.
          </span>
        </div>
      )}

      {data.key !== 'sendLink' && (
        <div className={styles.button_wrap}>
          <a href={data.btnLink1}>
            <Button variant='outline'>{data.btn1}</Button>
          </a>
          <LoginButton />
        </div>
      )}
    </div>
  )
}

export default SignupCompletePage
