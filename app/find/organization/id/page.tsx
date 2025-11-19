'use client'

export const dynamic = 'force-dynamic'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from './page.module.scss'

import Button from '~/components/ui/Button'
import { authService } from '~/services/auth.service'

const findOrganIdSchema = z.object({
  businessNumber1: z.string().length(3, '3자리를 입력해 주세요.'),
  businessNumber2: z.string().length(2, '2자리를 입력해 주세요.'),
  businessNumber3: z.string().length(5, '5자리를 입력해 주세요.')
})

type FindOrganIdFormData = z.infer<typeof findOrganIdSchema>

const FindId = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<FindOrganIdFormData>({
    mode: 'onChange',
    resolver: zodResolver(findOrganIdSchema)
  })

  const businessNumber1 = watch('businessNumber1')
  const businessNumber2 = watch('businessNumber2')
  const businessNumber3 = watch('businessNumber3')

  const isBusinessNumberComplete =
    businessNumber1?.length === 3 &&
    businessNumber2?.length === 2 &&
    businessNumber3?.length === 5

  const onSubmit = async (data: FindOrganIdFormData) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const businessNo = `${data.businessNumber1}${data.businessNumber2}${data.businessNumber3}`

      console.log('기관회원 아이디 찾기 요청:', { businessNo })

      const result = await authService.sendFindOrganLoginIdEmail(businessNo)

      console.log('기관회원 아이디 찾기 응답:', result)

      // API 응답에서 이메일 추출
      // 응답 구조: { data: "email@example.com", status: 200, code: 200, message: "OK" }
      // 서비스에서 response.data.data || response.data를 반환하므로
      // result가 문자열(이메일)이거나 객체일 수 있음
      let email: string | undefined

      if (typeof result === 'string') {
        // result가 직접 이메일 문자열인 경우
        email = result
      } else if (result && typeof result === 'object') {
        // result가 객체인 경우 data 필드에서 이메일 추출
        email = (result as any).data
      }

      // 성공 조건: 이메일이 있거나, isSuccess가 true이거나, message가 'OK'
      if (email || result?.isSuccess || result?.message === 'OK') {
        // 이메일을 세션 스토리지에 저장
        if (email && typeof window !== 'undefined') {
          sessionStorage.setItem('foundOrganEmail', email)
        }
        router.push('/signup/complete?type=findOrganId')
      } else {
        alert(result?.message || '아이디 찾기에 실패했습니다.')
      }
    } catch (error: any) {
      console.error('기관회원 아이디 찾기 실패:', error)

      if (error?.response?.status === 400 || error?.response?.status === 404) {
        router.push('/signup/error?type=notRegistered')
      } else {
        alert('아이디 찾기 중 오류가 발생했습니다.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>기관회원 아이디 찾기</h1>
        <p className={styles.description}>
          수업가게 계정에 등록된 사업자 번호를 인증하시면 <br />
          등록된 이메일 주소로 아이디를 전달드립니다.
        </p>
      </div>

      {/* 사업자 등록번호 인증 */}
      <form
        className={styles.business_auth_wrap}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 사업자 등록번호 타이틀 */}
        <div className={styles.business_title_wrap}>
          <span>사업자 등록번호</span>
        </div>

        {/* 사업자 등록번호 인증 폼 */}
        <div className={styles.business_form_wrap}>
          <div className={styles.business_input}>
            <input
              type='text'
              maxLength={3}
              className={errors.businessNumber1 ? styles.error : ''}
              placeholder='000'
              {...register('businessNumber1')}
            />
            <span>-</span>
            <input
              type='text'
              maxLength={2}
              className={errors.businessNumber2 ? styles.error : ''}
              placeholder='00'
              {...register('businessNumber2')}
            />
            <span>-</span>
            <input
              type='text'
              maxLength={5}
              className={errors.businessNumber3 ? styles.error : ''}
              placeholder='00000'
              {...register('businessNumber3')}
            />
          </div>

          {(errors.businessNumber1 ||
            errors.businessNumber2 ||
            errors.businessNumber3) && (
            <div className={styles.error_desc}>
              <span>사업자 번호를 정확하게 입력해 주세요.</span>
            </div>
          )}

          {/* 확인 버튼 */}
          <div className={styles.business_button_wrap}>
            <Button
              type='submit'
              disabled={!isValid || !isBusinessNumberComplete || isSubmitting}
            >
              {isSubmitting ? '처리 중...' : '확인'}
            </Button>
          </div>
        </div>

        {/* 사업자 등록 설명 */}
        <div className={styles.business_info}>
          <p>
            사업자 번호 확인이 어려운 경우, 수업가게 고객센터 이메일 주소로 하기
            서류를 제출해 주세요. <br />
            <br />
            1. 사업자등록본 <br />
            2. 사본 재직증명서 또는 위임장 <br />
            3. 신분증 사본
          </p>
        </div>
      </form>
    </div>
  )
}

export default FindId
