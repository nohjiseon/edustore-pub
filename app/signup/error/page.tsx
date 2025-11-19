'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Fragment, Suspense } from 'react'

import styles from './page.module.scss'

import errorImage from '@/assets/images/common/error.png'
import Button from '~/components/ui/Button'

type ErrorType = 'linkExpired' | 'notRegistered'

type ErrorConfig = {
  title: string
  description?: string[]
  buttons: Array<{
    label: string
    href: string
    variant: 'default' | 'outline'
  }>
}

const ERROR_CONFIG: Record<ErrorType, ErrorConfig> = {
  linkExpired: {
    title: '유효시간(30분)이 초과되었습니다.',
    description: [
      '비밀번호 재발송을 다시 요청한 후,',
      '이메일에 포함된 링크를 통해 비밀번호를 재설정해주세요.'
    ],
    buttons: [
      {
        label: '재발송',
        href: '/find/reset',
        variant: 'default'
      }
    ]
  },
  notRegistered: {
    title: '가입 내역이 없습니다.',
    buttons: [
      {
        label: '메인으로',
        href: '/',
        variant: 'outline'
      },
      {
        label: '회원가입',
        href: '/signup',
        variant: 'default'
      }
    ]
  }
}

const parseErrorType = (typeParam: string | null): ErrorType => {
  if (typeParam === 'notRegistered') {
    return 'notRegistered'
  }

  return 'linkExpired'
}

const SignupErrorContent = () => {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')
  const { title, description, buttons } =
    ERROR_CONFIG[parseErrorType(typeParam)]

  return (
    <div className={styles.wrapper}>
      <div className={styles.image_wrap}>
        <Image src={errorImage} alt='error Image' width={128} height={128} />
      </div>

      <div className={styles.title_wrap}>
        <h1 className={styles.title}>{title}</h1>
        {description && description.length > 0 && (
          <p className={styles.description}>
            {description.map((line, index) => (
              <Fragment key={`${line}-${index}`}>
                {line}
                {index !== description.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        )}
      </div>

      <div className={styles.button_wrap}>
        {buttons.map(({ label, href, variant }) => (
          <Link key={label} href={href}>
            <Button variant={variant}>{label}</Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

const SignupErrorPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SignupErrorContent />
    </Suspense>
  )
}

export default SignupErrorPage
