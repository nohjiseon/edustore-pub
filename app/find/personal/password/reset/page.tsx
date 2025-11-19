'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import Button from '~/components/ui/Button'

// Validation schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 8-20자로 입력해야 합니다.')
      .max(20, '비밀번호는 8-20자로 입력해야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        '영문과 숫자를 포함해야 합니다.'
      )
      .refine(
        (password) => !/(.)\1{2,}/.test(password),
        '같은 문자를 3번 이상 연속으로 사용할 수 없습니다.'
      ),
    passwordConfirm: z.string().min(1, '비밀번호를 다시 입력해 주세요.')
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm']
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

const PasswordCompletePage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ResetPasswordFormData>({
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema)
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log('비밀번호 재설정 데이터:', data)

    try {
      // TODO: API 호출 및 비밀번호 재설정 로직 구현
      // 예시:
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ password: data.password })
      // })
      // const result = await response.json()

      // 비밀번호 재설정 완료 후 결과 페이지로 이동
      router.push('/signup/complete?type=resetPassword')
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error)
      // TODO: 에러 처리
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

      {/* 비밀번호 안내 사항 */}
      <div className={styles.reset_info}>
        <span>비밀번호 유의사항 안내</span>
        <br />
        <br />
        <ul>
          <li>
            <span>영문, 숫자 포함 8~20자 입력이 가능합니다.</span>
          </li>
          <li>
            <span>
              개인정보(이름/이메일/전화 등)와 동일한 문자열은 사용할 수
              없습니다.
            </span>
          </li>
          <li>
            <span>같은 문자를 3번 이상 연속으로 사용할 수 없습니다.</span>
          </li>
          <li>
            <span>이전과 같은 비밀번호는 사용할 수 없습니다.</span>
          </li>
        </ul>
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
            <Icon
              name={showPasswordConfirm ? 'show' : 'eye-off'}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className={styles.input_desc_wrap}>
            {errors.password && (
              <span className={styles.warn}>{errors.password.message}</span>
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
              name={showPasswordConfirm ? 'show' : 'eye-off'}
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
          <Button type='submit' disabled={!isValid}>
            확인
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PasswordCompletePage
