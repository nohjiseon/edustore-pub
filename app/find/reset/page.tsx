'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import Button from '~/components/ui/Button'
import { authService } from '~/services/auth.service'

// Validation schema (회원가입과 동일)
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 8-20자로 입력해야 합니다.')
      .max(20, '비밀번호는 8-20자로 입력해야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        '영문과 숫자를 포함해야 합니다.'
      ),
    passwordConfirm: z.string().min(1, '비밀번호를 다시 입력해 주세요.')
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm']
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

const ResetPasswordContent = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ResetPasswordFormData>({
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema)
  })

  useEffect(() => {
    if (code) {
      console.log('주소에서 받은 code 값:', code)
    }
  }, [code])

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!code) {
      alert('인증 코드가 없습니다.')
      return
    }

    try {
      if (type === 'organ') {
        // 기관회원 비밀번호 재설정
        await authService.resetOrganizationPassword({
          code: code,
          password: data.password,
          confirmPassword: data.passwordConfirm
        })
      } else {
        // 개인회원 비밀번호 재설정 (기본값)
        await authService.resetPassword({
          code: code,
          password: data.password,
          confirmPassword: data.passwordConfirm
        })
      }

      router.push('/signup/complete?type=resetPassword')
    } catch (error: any) {
      console.error('비밀번호 재설정 실패:', error)
      alert(
        error.response?.data?.message ||
          '비밀번호 재설정 중 오류가 발생했습니다.'
      )
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>새 비밀번호 입력</h1>
        <p className={styles.description}>
          새로 사용하실 비밀번호를 입력해 주세요.
        </p>
      </div>

      <form
        className={styles.reset_password_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 비밀번호 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>비밀번호</span>
          <div className={styles.input_wrap}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`${styles.input_name} ${
                errors.password ? styles.error : ''
              }`}
              placeholder='비밀번호를 입력해 주세요'
              {...register('password')}
            />
            <Icon name='show' onClick={() => setShowPassword(!showPassword)} />
          </div>
          <div className={styles.input_sub_wrap}>
            {errors.password ? (
              <span className={styles.warn}>{errors.password.message}</span>
            ) : (
              <span>영문, 숫자 포함 8-20자 입력이 가능합니다.</span>
            )}
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>비밀번호 확인</span>
          <div className={styles.input_wrap}>
            <input
              type={showPasswordConfirm ? 'text' : 'password'}
              className={`${styles.input_name} ${
                errors.passwordConfirm ? styles.error : ''
              }`}
              placeholder='********'
              {...register('passwordConfirm')}
            />
            <Icon
              name='show'
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            />
          </div>
          <div className={styles.input_desc_wrap}>
            {errors.passwordConfirm && (
              <span className={styles.warn}>
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>
        </div>

        {/* 비밀번호 설정 버튼 */}
        <div className={styles.password_btn_wrap}>
          <Button type='submit' disabled={!isValid || !code}>
            확인
          </Button>
        </div>
      </form>
    </div>
  )
}

const PasswordCompletePage = () => {
  return (
    <Suspense fallback={<div className={styles.wrapper}>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}

export default PasswordCompletePage
