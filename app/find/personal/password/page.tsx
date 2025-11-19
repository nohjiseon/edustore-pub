'use client'

export const dynamic = 'force-dynamic'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from './page.module.scss'

import Button from '~/components/ui/Button'
import { authService } from '~/services/auth.service'

// Validation schema
const findPasswordSchema = z.object({
  email: z
    .string()
    .min(1, '올바른 이메일을 입력해 주세요.')
    .email('올바른 이메일을 입력해 주세요.')
})

type FindPasswordFormData = z.infer<typeof findPasswordSchema>

const FindPassword = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FindPasswordFormData>({
    mode: 'onChange',
    resolver: zodResolver(findPasswordSchema)
  })

  const onSubmit = async (data: FindPasswordFormData) => {
    console.log('비밀번호 재설정 데이터:', data)

    const result = await authService.sendPasswordResetEmail(data.email)
    router.push('/signup/complete?type=sendLink')
  }

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>개인회원 비밀번호 재설정</h1>
        <p className={styles.description}>
          비밀번호 재설정을 위해 이메일을 입력해 주세요.
        </p>
      </div>

      {/* 이메일 인증 */}
      <form
        className={styles.email_auth_wrap}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 이메일 타이틀 */}
        <div className={styles.email_title_wrap}>
          <span>이메일</span>
        </div>

        {/* 이메일 인증 폼 */}
        <div className={styles.email_form_wrap}>
          <div className={styles.email_input}>
            <input
              type='text'
              className={errors.email ? styles.error : ''}
              placeholder='이메일을 입력해 주세요.'
              {...register('email')}
            />
          </div>

          {errors.email && (
            <div className={styles.error_message}>
              <span>{errors.email.message}</span>
            </div>
          )}

          <div className={styles.email_button_wrap}>
            <Button type='submit' disabled={!isValid}>
              확인
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FindPassword
