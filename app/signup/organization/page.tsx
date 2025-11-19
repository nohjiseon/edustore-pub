'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import Button from '~/components/ui/Button'
import Config from '~/constants/config'
import { authService } from '~/services/auth.service'
import { decryptAESSync } from '~/utils/crypto'

// Validation schema
const organizationSchema = z
  .object({
    organName: z.string().min(1, '기관명을 입력해 주세요.'),
    representativeName: z.string().min(1, '대표자명을 입력해 주세요.'),
    businessNumber1: z.string().length(3, '3자리를 입력해 주세요.'),
    businessNumber2: z.string().length(2, '2자리를 입력해 주세요.'),
    businessNumber3: z.string().length(5, '5자리를 입력해 주세요.'),
    address: z.string().min(1, '주소를 입력해 주세요.'),
    detailAddress: z.string().optional(),
    email: z
      .string()
      .min(1, '올바른 이메일을 입력해 주세요.')
      .email('올바른 이메일을 입력해 주세요.'),
    code: z.string().min(1, '인증번호를 입력해 주세요.'),
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

type OrganizationFormData = z.infer<typeof organizationSchema>

const OrganizationSignupPage = () => {
  const router = useRouter()
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [timer, setTimer] = useState(180)
  const [isVerified, setIsVerified] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [isBusinessVerified, setIsBusinessVerified] = useState(false)
  const [isBusinessVerifying, setIsBusinessVerifying] = useState(false)
  const [businessError, setBusinessError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [emailCode, setEmailCode] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<OrganizationFormData>({
    mode: 'onChange',
    resolver: zodResolver(organizationSchema)
  })

  const email = watch('email')
  const code = watch('code')
  const password = watch('password')
  const passwordConfirm = watch('passwordConfirm')
  const businessNumber1 = watch('businessNumber1')
  const businessNumber2 = watch('businessNumber2')
  const businessNumber3 = watch('businessNumber3')
  const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  // 사업자 등록번호가 모두 입력되었는지 확인
  const isBusinessNumberComplete =
    businessNumber1?.length === 3 &&
    businessNumber2?.length === 2 &&
    businessNumber3?.length === 5

  // 비밀번호 확인 검증 (독립적으로 실행)
  useEffect(() => {
    if (passwordConfirm && passwordConfirm.length > 0) {
      if (password !== passwordConfirm) {
        setError('passwordConfirm', {
          type: 'manual',
          message: '비밀번호가 일치하지 않습니다.'
        })
      } else {
        clearErrors('passwordConfirm')
      }
    }
  }, [password, passwordConfirm, setError, clearErrors])

  // 타이머 관리
  useEffect(() => {
    if (isVerificationSent && timer > 0 && !isVerified) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isVerificationSent, timer, isVerified])

  // 인증번호 실시간 확인
  useEffect(() => {
    if (code === emailCode && timer > 0 && emailCode) {
      setIsVerified(true)
    } else {
      setIsVerified(false)
    }
  }, [code, emailCode, timer])

  // 인증번호가 일치하여 isVerified가 true가 되면 API 검증
  useEffect(() => {
    if (isVerified && code && email && isEmailValid) {
      const verifyEmail = async () => {
        try {
          const result = await authService.verifyOrganizationEmail({
            email: email,
            code: code
          })

          console.log('이메일 인증 검증 API 응답:', result)

          if (!result.isSuccess && result.message !== 'OK') {
            // API 검증 실패 시 상태를 false로 변경
            setIsVerified(false)
          }
        } catch (error: any) {
          console.error('이메일 인증 검증 실패:', error)
          // API 검증 실패 시 상태를 false로 변경
          setIsVerified(false)
        }
      }

      verifyEmail()
    }
  }, [isVerified, code, email, isEmailValid])

  // 주소 검색 팝업 결과 수신
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 보안을 위해 origin 체크 (필요시 수정)
      // if (event.origin !== 'http://127.0.0.1') return

      try {
        // 주소 검색 결과 데이터 처리
        const addressData = event.data

        console.log('주소 검색 팝업에서 받은 데이터:111', addressData)

        // 주소 정보 설정
        // 다양한 필드명에 대응 (API 응답 구조에 따라 다를 수 있음)
        const address = addressData.payload.roadAddr
        const detailAddress = addressData.payload.addrDetail

        console.log('--------------')

        console.log(address)
        console.log(detailAddress)

        setValue('address', address)
        setValue('detailAddress', detailAddress)
      } catch (error) {
        console.error('주소 검색 결과 처리 에러:', error)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [setValue])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const handleEmailVerification = async () => {
    if (!isEmailValid) return

    try {
      const result = await authService.sendOrganizationEmailVerification(email)

      // 응답이 암호화된 문자열인 경우 복호화
      let decryptedCode: string | null = null

      // 응답이 문자열인 경우
      if (typeof result === 'string') {
        try {
          // decryptedCode = decryptAESSync(result)
          decryptedCode = result
          console.log('복호화된 인증번호:', decryptedCode)
          setEmailCode(decryptedCode)
        } catch (decryptError) {
          console.error('복호화 실패:', decryptError)
          // 복호화 실패해도 계속 진행 (이미 복호화된 값일 수 있음)
        }
      }
      // 응답이 객체이고 data 필드가 있는 경우
      else if (result && typeof result === 'object' && 'data' in result) {
        const resultData = result as { data?: string; [key: string]: unknown }
        if (typeof resultData.data === 'string' && resultData.data) {
          try {
            // decryptedCode = decryptAESSync(resultData.data)
            decryptedCode = resultData.data
            console.log('복호화된 인증번호:', decryptedCode)
            setEmailCode(decryptedCode)
          } catch (decryptError) {
            console.error('복호화 실패:', decryptError)
          }
        }
      }

      // 인증코드 발송 성공 시 타이머 시작
      if (result !== null) {
        setIsVerificationSent(true)
        setTimer(180) // 3분 = 180초
        setIsVerified(false) // 인증 완료 상태 초기화
      } else {
        alert('인증번호 발송에 실패했습니다.')
      }
    } catch (error) {
      console.error('이메일 인증 발송 실패:', error)
      alert('인증번호 발송 중 오류가 발생했습니다.')
    }
  }

  const onSubmit = async (data: OrganizationFormData) => {
    if (isSubmitting) return

    // 사업자 등록번호 인증 확인
    if (!isBusinessVerified) {
      alert('사업자 등록번호 인증을 완료해주세요.')
      return
    }

    // 이메일 인증 확인
    if (!isVerified) {
      alert('이메일 인증을 완료해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      // businessNumber1, businessNumber2, businessNumber3을 합쳐서 businessNo로 변환
      const businessNo = `${data.businessNumber1}${data.businessNumber2}${data.businessNumber3}`

      // API 요청 데이터 구성
      const signupData = {
        organName: data.organName,
        representativeName: data.representativeName,
        businessNo: businessNo,
        address: data.address || '',
        detailAddress: data.detailAddress || '',
        email: data.email,
        code: data.code,
        password: data.password,
        confirmPassword: data.passwordConfirm
      }

      console.log('기관 회원가입 데이터:', signupData)

      const result = await authService.signupOrganization(signupData)

      if (result.message === 'OK' || result.code === 200) {
        // alert('회원가입이 완료되었습니다.')
        router.push('/signup/complete?type=organizationSuccess')
      } else {
        alert(result.message || '회원가입에 실패했습니다.')
      }
    } catch (error: any) {
      console.error('기관 회원가입 실패:', error)
      const errorMessage =
        error?.response?.data?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        '회원가입 중 오류가 발생했습니다.'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBusinessNumberVerification = async () => {
    if (!isBusinessNumberComplete) return
    const businessNo = `${businessNumber1}${businessNumber2}${businessNumber3}`

    setIsBusinessVerifying(true)
    setBusinessError(null)

    try {
      // 사업자 등록번호를 10자리 문자열로 합치기 (3-2-5 형태)
      const result = await authService.checkBusinessNumber(businessNo)

      console.log(result)
      if (result.message === 'OK') {
        setIsBusinessVerified(true)
        setBusinessError('기관 정보가 정상적으로 확인되었습니다.')
      } else {
        setIsBusinessVerified(false)
        setBusinessError(result.message || '기관 인증에 실패했습니다.')
      }
    } catch (error: any) {
      console.log(error.response.data.message)

      setIsBusinessVerified(false)
      // const errorMessage = error?.response?.data?.data?.message || error?.message || '사업자 등록번호 인증 중 오류가 발생했습니다.'
      const errorMessage =
        error.response.data.message ||
        '사업자 등록번호 인증 중 오류가 발생했습니다.'
      console.log(errorMessage)

      setBusinessError(errorMessage)
    } finally {
      setIsBusinessVerifying(false)
    }
  }

  const handleAddressSearch = () => {
    const popupWidth = 500
    const popupHeight = 600
    const left = window.screen.width / 2 - popupWidth / 2
    const top = window.screen.height / 2 - popupHeight / 2

    const popup = window.open(
      // 'http://127.0.0.1/auth/v1/address/request',
      `${Config.API_BASE_URL}/auth/v1/address/request`,
      'addressSearch',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`
    )

    if (!popup) {
      alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.')
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>기관 회원가입</h1>
      </div>

      {/* 기관 회원 정보 */}
      <form className={styles.personal_form} onSubmit={handleSubmit(onSubmit)}>
        {/* 기관명 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>기관명</span>
          <div className={styles.input_wrap}>
            <input
              type='text'
              className={`${styles.input_name} ${
                errors.organName ? styles.error : ''
              }`}
              placeholder='기관명을 입력해 주세요.'
              {...register('organName')}
            />
          </div>
          <div className={styles.input_desc_wrap}>
            {errors.organName && (
              <span className={styles.warn}>{errors.organName.message}</span>
            )}
          </div>
        </div>

        {/* 대표자명 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>대표자명</span>
          <div className={styles.input_wrap}>
            <input
              type='text'
              className={`${styles.input_name} ${
                errors.representativeName ? styles.error : ''
              }`}
              placeholder='대표자명을 입력해 주세요.'
              {...register('representativeName')}
            />
          </div>
          <div className={styles.input_desc_wrap}>
            {errors.representativeName && (
              <span className={styles.warn}>
                {errors.representativeName.message}
              </span>
            )}
          </div>
        </div>

        {/* 사업자 등록번호 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>사업자 등록번호</span>
          <div className={styles.input_wrap}>
            <input
              type='text'
              className={styles.input_name}
              placeholder=''
              maxLength={3}
              {...register('businessNumber1')}
            />
            <span>-</span>
            <input
              type='text'
              className={styles.input_name}
              placeholder=''
              maxLength={2}
              {...register('businessNumber2')}
            />
            <span>-</span>
            <input
              type='text'
              className={styles.input_name}
              placeholder=''
              maxLength={5}
              {...register('businessNumber3')}
            />
          </div>
          <div className={styles.input_sub_wrap}>
            <Button
              type='button'
              disabled={
                !isBusinessNumberComplete ||
                isBusinessVerifying ||
                isBusinessVerified
              }
              onClick={handleBusinessNumberVerification}
            >
              {isBusinessVerifying
                ? '인증 중...'
                : isBusinessVerified
                ? '인증 완료'
                : '기관인증'}
            </Button>
            {/* {isBusinessVerified && <Icon name='check' />} */}
          </div>
          {businessError && (
            <div className={styles.input_desc_wrap}>
              <span
                className={isBusinessVerified ? styles.success : styles.warn}
              >
                {businessError}
              </span>
            </div>
          )}
        </div>

        {/* 주소 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>주소</span>
          <div className={styles.input_wrap}>
            <input
              type='text'
              className={styles.input_name}
              placeholder='주소를 입력해 주세요.'
              {...register('address')}
              readOnly
            />
            <button
              type='button'
              className={styles.addr_btn}
              onClick={handleAddressSearch}
            >
              주소찾기
            </button>
          </div>
          <div className={styles.input_sub_wrap}>
            <input
              type='text'
              className={styles.input_name}
              placeholder='상세 주소를 입력해 주세요.'
              {...register('detailAddress')}
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>이메일</span>
          <div className={styles.input_wrap}>
            <input
              type='email'
              className={`${styles.input_name} ${
                errors.email ? styles.error : ''
              }`}
              placeholder='이메일을 입력해 주세요.'
              disabled={isVerified}
              {...register('email')}
            />
            <button
              type='button'
              className={styles.input_check}
              disabled={!isEmailValid || isVerified}
              onClick={handleEmailVerification}
            >
              {isVerificationSent ? '인증번호 재전송' : '인증번호 발송'}
            </button>
          </div>
          <div className={styles.input_sub_wrap}>
            <input
              type='text'
              className={`${styles.input_name} ${
                errors.code ? styles.error : ''
              }`}
              placeholder='인증번호를 입력해 주세요.'
              disabled={!isVerificationSent || isVerified}
              {...register('code')}
            />
            {isVerified && <Icon name='check' />}
          </div>
          <div className={styles.input_sub_wrap}>
            {isVerificationSent && (
              <span className={timer === 0 || isVerified ? '' : ''}>
                {isVerified
                  ? '인증이 완료되었습니다.'
                  : timer === 0
                  ? '인증번호가 만료되었습니다. 다시 요청해주세요.'
                  : `인증번호가 요청되었습니다. 유효시간 ${formatTime(timer)}`}
              </span>
            )}
            {errors.email && !isVerificationSent && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
            {errors.code && isVerificationSent && (
              <span className={styles.error}>{errors.code.message}</span>
            )}
          </div>
        </div>

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
              name={showPassword ? 'show' : 'eye-off'}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className={styles.input_sub_wrap}>
            {errors.password ? (
              <span className={styles.warn}>{errors.password.message}</span>
            ) : // <span>영문, 숫자 포함 8-20자 입력이 가능합니다.</span>
            null}
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

        {/* 가입완료 버튼 */}
        <div className={styles.button_wrap}>
          <Button
            type='submit'
            disabled={
              !isValid || !isVerified || !isBusinessVerified || isSubmitting
            }
            variant='default'
          >
            {isSubmitting ? '가입 중...' : '가입완료'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default OrganizationSignupPage
