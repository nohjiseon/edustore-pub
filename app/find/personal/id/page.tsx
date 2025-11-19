'use client'

export const dynamic = 'force-dynamic'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import Button from '~/components/ui/Button'
import { authService } from '~/services/auth.service'

const findIdSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, '올바른 휴대폰 번호를 입력해 주세요.')
    .max(11, '올바른 휴대폰 번호를 입력해 주세요.')
    .regex(/^\d+$/, '숫자만 입력 가능합니다.'),
  verificationCode: z.string().min(1, '인증번호를 입력해 주세요.')
})

type FindIdFormData = z.infer<typeof findIdSchema>

const FindId = () => {
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [timer, setTimer] = useState(180) // 3분 = 180초
  const [isVerified, setIsVerified] = useState(false)
  const [foundEmail, setFoundEmail] = useState<string>('')

  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid }
  } = useForm<FindIdFormData>({
    mode: 'onChange',
    resolver: zodResolver(findIdSchema)
  })

  const phoneNumber = watch('phoneNumber')
  const verificationCode = watch('verificationCode')
  const isPhoneNumberValid = phoneNumber && phoneNumber.length >= 10
  const isVerificationCodeEntered =
    verificationCode &&
    verificationCode.length > 0 &&
    /^\d+$/.test(verificationCode)
  const CORRECT_VERIFICATION_CODE = '1234' // 인증번호 (테스트용)

  useEffect(() => {
    if (isVerificationSent && timer > 0 && !isVerified) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isVerificationSent, timer, isVerified])

  useEffect(() => {
    if (verificationCode === CORRECT_VERIFICATION_CODE && timer > 0) {
      setIsVerified(true)
    } else {
      setIsVerified(false)
    }
  }, [verificationCode, timer])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const handlePhoneVerification = async () => {
    if (!isPhoneNumberValid || !phoneNumber) return

    try {
      const result = await authService.sendFindEmailSMS(phoneNumber)

      // 인증번호 발송 성공 시 타이머 시작
      if (result !== null) {
        setIsVerificationSent(true)
        setTimer(180) // 3분 = 180초
        setIsVerified(false) // 인증 완료 상태 초기화
      } else {
        alert('인증번호 발송에 실패했습니다.')
      }
    } catch (error) {
      console.error('인증번호 발송 실패:', error)
      setError('phoneNumber', {
        type: 'manual',
        message: '가입 내역이 없는 휴대폰 번호입니다.'
      })
    }
  }

  const onSubmit = async (data: FindIdFormData) => {
    try {
      const result = await authService.findEmail({
        mobileNumber: data.phoneNumber,
        code: data.verificationCode
      })

      // 응답에서 이메일 추출
      const email =
        result.email ||
        (typeof result === 'object' &&
        result !== null &&
        'data' in result &&
        typeof result.data === 'object' &&
        result.data !== null &&
        'email' in result.data
          ? String(result.data.email)
          : '') ||
        ''

      setFoundEmail(email)
      sessionStorage.setItem('foundEmail', email)
      router.push('/signup/complete?type=findEmail')
    } catch (error) {
      router.push('/signup/error?type=notRegistered')
      // 에러 처리
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>개인회원 아이디 찾기</h1>
        <p className={styles.description}>
          수업가게 계정에 등록된 휴대폰 번호를 인증하시면 <br />
          사용중인 이메일 주소를 전달드립니다.
        </p>
      </div>

      {/* 핸드폰 인증 */}
      <form
        className={styles.phone_auth_wrap}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 핸드폰 인증 타이틀 */}
        <div className={styles.phone_title_wrap}>
          <span>휴대폰 번호</span>
        </div>

        {/* 핸드폰 인증 폼 */}
        <div className={styles.phone_form_wrap}>
          <div className={styles.phone_input}>
            <input
              type='text'
              className={errors.phoneNumber ? styles.error : ''}
              placeholder='예) 01023456789'
              maxLength={11}
              disabled={isVerified}
              {...register('phoneNumber')}
            />
            <button
              type='button'
              disabled={!isPhoneNumberValid || isVerified}
              onClick={handlePhoneVerification}
            >
              {isVerificationSent ? '인증번호 재전송' : '인증번호'}
            </button>
          </div>

          <div className={styles.auth_input_wrap}>
            <input
              type='text'
              className={errors.verificationCode ? styles.error : ''}
              placeholder='인증번호를 입력해 주세요.'
              disabled={!isVerificationSent || isVerified}
              {...register('verificationCode')}
            />
            {isVerified && <Icon name='check' />}
            {isVerificationSent && (
              <span className={timer === 0 ? styles.error : ''}>
                {isVerified
                  ? '인증이 완료되었습니다.'
                  : timer === 0
                  ? '인증번호가 만료되었습니다. 다시 요청해주세요.'
                  : `인증번호가 요청되었습니다. 유효시간 ${formatTime(timer)}`}
              </span>
            )}
            {errors.phoneNumber && (
              <span className={styles.error}>{errors.phoneNumber.message}</span>
            )}
            {errors.verificationCode && isVerificationSent && (
              <span className={styles.error}>
                {errors.verificationCode.message}
              </span>
            )}
          </div>

          <div className={styles.phone_button_wrap}>
            <Button
              type='submit'
              disabled={
                !isValid ||
                !isVerificationSent ||
                timer === 0 ||
                !isVerificationCodeEntered
              }
            >
              계속
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FindId
