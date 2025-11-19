'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from './LoginModal.module.scss'

import { Icon } from '@/components/Icon'
import { Button, Input } from '@/components/ui'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { useLoginMutation } from '@/hooks/queries/useAuth'
import { cn } from '@/lib/utils'
import type { MemberType } from '@/types/auth'

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

// 로그인 폼 검증 스키마 (동적으로 생성)
const createLoginFormSchema = (memberType: MemberType) => {
  if (memberType === 'individual') {
    // 개인회원: 이메일 필수
    return z.object({
      identifier: z
        .string()
        .min(1, '이메일을 입력해 주세요.')
        .email('올바른 이메일을 입력해 주세요.'),
      password: z.string().min(1, '비밀번호를 입력해 주세요.'),
      autoLogin: z.boolean().optional()
    })
  } else {
    // 기관회원: 로그인 ID 필수
    return z.object({
      identifier: z.string().min(1, '이메일을 입력해 주세요.'),
      password: z.string().min(1, '비밀번호를 입력해 주세요.'),
      autoLogin: z.boolean().optional()
    })
  }
}

type LoginFormData = {
  identifier: string // email 또는 loginId
  password: string
  autoLogin?: boolean
}

const LoginModal = ({ open = true, onOpenChange, zIndex }: Props) => {
  const router = useRouter()
  const [memberType, setMemberType] = useState<MemberType>('individual')
  const loginMutation = useLoginMutation()

  // React Hook Form 설정
  const form = useForm<LoginFormData>({
    resolver: zodResolver(createLoginFormSchema(memberType)),
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      password: '',
      autoLogin: false
    }
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
    reset,
    trigger
  } = form

  // 필드 값 감시
  const identifierValue = watch('identifier')
  const passwordValue = watch('password')

  // memberType 변경 시 폼 초기화 및 재검증
  useEffect(() => {
    reset({
      identifier: '',
      password: '',
      autoLogin: false
    })
    // 스키마가 변경되었으므로 재검증
    trigger()
  }, [memberType, reset, trigger])

  // 로그인 핸들러
  const onSubmit = (data: LoginFormData) => {
    const credentials =
      memberType === 'individual'
        ? {
            memberType: 'individual' as const,
            email: data.identifier,
            password: data.password,
            autoLogin: data.autoLogin
          }
        : {
            memberType: 'organization' as const,
            email: data.identifier,
            password: data.password,
            autoLogin: data.autoLogin
          }

    loginMutation.mutate(credentials, {
      onSuccess: () => {
        // 로그인 성공 시 모달 닫기 (라우팅은 useLoginMutation에서 처리)
        onOpenChange?.(false)
      }
    })
  }

  const handleFindId = () => {
    onOpenChange?.(false)
    const path =
      memberType === 'individual'
        ? '/find/personal/id'
        : '/find/organization/id'
    router.push(path)
  }

  const handleResetPassword = () => {
    onOpenChange?.(false)
    const path =
      memberType === 'individual'
        ? '/find/personal/password'
        : '/find/organization/password'
    router.push(path)
  }

  const handleSignup = () => {
    onOpenChange?.(false)
    router.push('/signup')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='on'>
          <div className={styles.modal_body}>
            {/* 로고 */}
            <DialogTitle className={styles.logo}>
              <Icon name='logo-text' width={97} height={30} />
            </DialogTitle>

            {/* 회원 유형 탭 */}
            <div className={styles.member_type_tabs}>
              <button
                type='button'
                className={cn(
                  styles.tab,
                  styles.tab_left,
                  memberType === 'individual' && styles.tab_active
                )}
                onClick={() => setMemberType('individual')}
              >
                <p className={styles.tab_title}>개인회원</p>
                <p className={styles.tab_subtitle}>선생님, 일반인 등</p>
              </button>
              <button
                type='button'
                className={cn(
                  styles.tab,
                  styles.tab_right,
                  memberType === 'organization' && styles.tab_active
                )}
                onClick={() => setMemberType('organization')}
              >
                <p className={styles.tab_title}>기관회원</p>
                <p className={styles.tab_subtitle}>학교, 유치원, 교육청 등</p>
              </button>
            </div>

            {/* 로그인 폼 */}
            <div className={styles.login_form}>
              <Input
                type={memberType === 'individual' ? 'email' : 'text'}
                placeholder='이메일을 입력해 주세요.'
                autoComplete='username'
                {...register('identifier')}
                errorMessage={
                  touchedFields.identifier
                    ? errors.identifier?.message
                    : undefined
                }
              />
              <Input
                type='password'
                placeholder='비밀번호를 입력해 주세요.'
                autoComplete='current-password'
                {...register('password')}
                errorMessage={
                  touchedFields.password ? errors.password?.message : undefined
                }
              />
            </div>

            {/* 자동 로그인 체크박스 */}
            <div className={styles.auto_login}>
              <label className={styles.checkbox_label}>
                <input
                  type='checkbox'
                  {...register('autoLogin')}
                  className={styles.checkbox_input}
                />
                <span className={styles.checkbox_custom} />
                <span className={styles.checkbox_text}>자동 로그인</span>
              </label>
            </div>
          </div>

          {/* 하단 버튼 및 링크 */}
          <div className={styles.modal_footer}>
            {/* 로그인 에러 메시지 */}
            {loginMutation.error && (
              <div className={styles.error_message}>
                {loginMutation.error instanceof Error
                  ? loginMutation.error.message
                  : '로그인에 실패했습니다. 다시 시도해 주세요.'}
              </div>
            )}

            <Button
              type='submit'
              disabled={!isValid || loginMutation.isPending}
            >
              {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </Button>

            <div className={styles.links}>
              <button
                type='button'
                onClick={handleFindId}
                className={styles.link_button}
              >
                아이디 찾기
              </button>
              <div className={styles.link_divider} />
              <button
                type='button'
                onClick={handleResetPassword}
                className={styles.link_button}
              >
                비밀번호 재설정
              </button>
              <div className={styles.link_divider} />
              <button
                type='button'
                onClick={handleSignup}
                className={styles.link_button}
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
