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

// Validation schema
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, '올바른 이메일을 입력해 주세요.')
      .email('올바른 이메일을 입력해 주세요.'),
    name: z.string().min(1, '이름을 입력해 주세요.'),
    nickname: z
      .string()
      .min(3, '닉네임은 3-10자로 입력해야 합니다.')
      .max(10, '닉네임은 3-10자로 입력해야 합니다.')
      .regex(/^[가-힣a-zA-Z0-9]+$/, '한글, 영문, 숫자만 입력 가능합니다.'),
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

type SignupFormData = z.infer<typeof signupSchema>

const PersonalSignupPage = () => {
  // 1. 상태 관련 훅
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [isPassVerified, setIsPassVerified] = useState(false)
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false)
  const [checkedNickname, setCheckedNickname] = useState('')
  const [isEmailChecked, setIsEmailChecked] = useState(false)
  const [isEmailAvailable, setIsEmailAvailable] = useState(false)
  const [checkedEmail, setCheckedEmail] = useState('')

  // 본인인증 관련 상태
  const [verificationStep, setVerificationStep] = useState<
    'idle' | 'requested' | 'completed'
  >('idle')
  const [requestId, setRequestId] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [countdown, setCountdown] = useState(0)

  // 본인인증 결과 데이터
  const [verificationData, setVerificationData] = useState<{
    phoneNumber?: string
    idVerifyReqNo?: string
    ci?: string
    birthday?: string
    reqno?: string
  }>({})

  // 본인인증으로 받은 전화번호
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState<string>('')

  // 2. 커스텀 훅
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<SignupFormData>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema)
  })

  const nickname = watch('nickname')
  const email = watch('email')

  console.log('verificationData', verificationData)

  // 닉네임 입력 시 자동 중복확인 (디바운싱)
  useEffect(() => {
    // 닉네임이 유효하지 않으면 초기화
    if (
      !nickname ||
      nickname.length < 3 ||
      !/^[가-힣a-zA-Z0-9]+$/.test(nickname)
    ) {
      setIsNicknameChecked(false)
      setIsNicknameAvailable(false)
      setCheckedNickname('')
      return
    }

    // 이미 확인한 닉네임이면 스킵
    if (nickname === checkedNickname) {
      return
    }

    // 상태 초기화
    setIsNicknameChecked(false)
    setIsNicknameAvailable(false)

    // 디바운싱: 입력이 멈춘 후 500ms 후에 API 호출
    const timer = setTimeout(async () => {
      try {
        const result = await authService.checkNicknameDuplicate(nickname)

        setCheckedNickname(nickname)
        setIsNicknameChecked(true)
        setIsNicknameAvailable(!result.isDuplicate)

        if (result.isDuplicate) {
          console.log('닉네임 중복됨')
        } else {
          console.log('닉네임 사용 가능')
        }
      } catch (error) {
        setCheckedNickname(nickname)
        setIsNicknameChecked(true)
        setIsNicknameAvailable(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [nickname, checkedNickname])

  // 컴포넌트 언마운트 시 이벤트 리스너 정리
  useEffect(() => {
    return () => {
      window.removeEventListener('message', handleVerificationResult)
    }
  }, [])

  // 카운트다운 타이머
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [countdown])

  // 4. 이벤트 핸들러

  const goToNiceId = () => {
    // 팝업 창 설정
    const width = 500
    const height = 600
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    // 본인인증 요청 URL
    const verifyUrl = `${Config.API_BASE_URL}/auth/v1/idverify/request`

    // 팝업 열기
    const popup = window.open(
      verifyUrl,
      'niceIdVerification',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    )

    // 팝업이 차단되었는지 확인
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.')
      return
    }

    // 인증 완료 후 결과를 받기 위한 이벤트 리스너
    window.addEventListener('message', handleVerificationResult)
    console.log(1)
  }

  // console.log('isPassVerified', isPassVerified)

  const handleVerificationResult = (event: MessageEvent) => {
    // 보안을 위해 origin 확인
    // if (event.origin !== window.location.origin) {
    //   return
    // }
    console.log(2)
    console.log(event)

    // 메시지 타입과 성공 여부 확인
    const data = event.data
    console.log('🔍 받은 이벤트:', event)
    console.log('📦 event.data:', data)
    console.log('🏷️ data.type:', data?.type)
    console.log('✅ data.isSuccess:', data?.isSuccess)

    if (data && data.type === 'onVerifyId') {
      console.log('🎯 onVerifyId 타입 매칭됨!')
      console.log(3)

      if (data.isSuccess) {
        // 인증 성공 시 사용자 정보 설정
        console.log('✅ 본인인증 성공!')
        console.log('📋 받은 데이터:', data)

        if (data.payload) {
          console.log('👤 사용자 정보:', data.payload)
          // console.log('📱 받은 전화번호 (원본):', data.payload.mobileno)
          // console.log('👨 이름:', data.payload.name)
          // console.log('🎂 생년월일:', data.payload.birthday)
          // console.log('🆔 CI:', data.payload.ci)
          // console.log('🔢 인증요청번호:', data.payload.idVerifyReqNo)

          // 폼 필드 자동 입력 (payload가 있을 때만)
          if (data.payload.name) {
            setValue('name', data.payload.name)
            // console.log('✅ 이름 자동 입력:', data.payload.name)
          }
          if (data.payload.mobileno) {
            // 전화번호에서 하이픈 제거 (숫자만 저장)
            const cleanPhoneNumber = data.payload.mobileno.replace(/-/g, '')
            console.log('🔧 전화번호 처리 전:', data.payload.mobileno)
            console.log('🔧 전화번호 처리 후:', cleanPhoneNumber)
            console.log('✅ 휴대폰 번호 자동 입력 완료:', cleanPhoneNumber)
            // 전화번호 저장
            setVerifiedPhoneNumber(cleanPhoneNumber)
          } else if (data.payload.mobileno === '') {
            console.warn('⚠️ 휴대폰 번호가 비어있습니다.')
          }

          // 본인인증 결과 데이터 저장
          setVerificationData({
            phoneNumber: data.payload.mobileno,
            idVerifyReqNo: data.payload.idVerifyReqNo,
            ci: data.payload.ci,
            birthday: data.payload.birthday,
            reqno: data.payload.reqno
          })
          console.log('✅ 본인인증 데이터 저장:', {
            idVerifyReqNo: data.payload.idVerifyReqNo,
            ci: data.payload.ci,
            repo: data.payload.reqno,
            birthday: data.payload.birthday
          })
        } else {
          console.log('⚠️ payload가 없습니다. 수동으로 입력해주세요.')
        }

        // 인증 완료 표시
        setIsPassVerified(true)
        setVerificationStep('completed')
        console.log('🎉 본인인증 완료 상태로 변경됨')

        alert('본인인증이 완료되었습니다.')
      } else {
        // 인증 실패 시 에러 메시지 표시
        console.error('❌ 본인인증 실패:', data.errorMessage)
        alert(data.errorMessage || '인증에 실패했습니다.')
      }

      // 이벤트 리스너 제거
      window.removeEventListener('message', handleVerificationResult)
      console.log('🧹 이벤트 리스너 제거됨')
    } else {
      console.log('⚠️ 처리되지 않은 메시지 타입:', data?.type || 'unknown')
    }
  }

  const handleEmailDuplicationCheck = async () => {
    if (!email) {
      return
    }

    // Zod 이메일 검증과 동일한 방식으로 검증
    try {
      z.string().email().parse(email)
    } catch {
      return
    }

    try {
      const result = await authService.checkEmailDuplicate(email)
      setCheckedEmail(email)
      setIsEmailChecked(true)
      setIsEmailAvailable(!result.isDuplicate)
    } catch (error) {
      setCheckedEmail(email)
      setIsEmailChecked(true)
      setIsEmailAvailable(false)
    }
  }

  const handleNicknameDuplicationCheck = async () => {
    if (!nickname) {
      return
    }

    // 닉네임 형식 검증 (3-10자, 한글/영문/숫자만)
    try {
      z.string()
        .min(3)
        .max(10)
        .regex(/^[가-힣a-zA-Z0-9]+$/)
        .parse(nickname)
    } catch {
      return
    }

    try {
      const result = await authService.checkNicknameDuplicate(nickname)
      setCheckedNickname(nickname)
      setIsNicknameChecked(true)
      setIsNicknameAvailable(!result.isDuplicate)
    } catch (error) {
      setCheckedNickname(nickname)
      setIsNicknameChecked(true)
      setIsNicknameAvailable(false)
    }
  }

  const onSubmit = (data: SignupFormData) => {
    // if (!isPassVerified) {
    //   alert('본인인증을 완료해 주세요.')
    //   return
    // }

    if (!isEmailChecked || !isEmailAvailable) {
      alert('이메일 중복확인을 완료해 주세요.')
      return
    }

    if (!isNicknameChecked || !isNicknameAvailable) {
      alert('닉네임 중복확인을 완료해 주세요.')
      return
    }

    console.log('회원가입 데이터:', data)
    console.log('본인인증 데이터:', verificationData)

    // 폼 데이터를 localStorage에 저장
    const step1Data = {
      email: data.email,
      name: data.name,
      phoneNumber: verifiedPhoneNumber, // 본인인증으로 받은 전화번호
      nickname: data.nickname,
      password: data.password,
      // PASS 본인인증 데이터 추가
      idVerifyReqNo: verificationData.idVerifyReqNo,
      ci: verificationData.ci,
      birthday: verificationData.birthday,
      reqno: verificationData.reqno, // PASS 인증 repo
      // 본인인증 완료 여부
      isPassVerified: isPassVerified,
      // 본인인증 완료 시간
      verifiedAt: new Date().toISOString()
    }

    // localStorage에 데이터 저장
    localStorage.setItem('signup_step1_data', JSON.stringify(step1Data))

    console.log('✅ 첫 번째 단계 데이터 저장 완료:', step1Data)
    console.log('📋 저장된 본인인증 정보:', {
      idVerifyReqNo: step1Data.idVerifyReqNo,
      ci: step1Data.ci,
      birthday: step1Data.birthday,
      isVerified: step1Data.isPassVerified
    })

    // 폼 유효성 검사 통과 후 다음 페이지로 이동
    router.push('/signup/personal-step2')
  }

  // 6. 렌더링 로직
  return (
    <div className={styles.wrapper}>
      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>개인 회원가입</h1>
      </div>

      {/* 개인 회원 정보 */}
      <form className={styles.personal_form} onSubmit={handleSubmit(onSubmit)}>
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
              {...register('email')}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  setCheckedEmail('')
                  setIsEmailChecked(false)
                  setIsEmailAvailable(false)
                }
              }}
            />
            <button
              type='button'
              className={`${styles.input_check} ${
                isEmailChecked && email === checkedEmail
                  ? isEmailAvailable
                    ? styles.success
                    : styles.error
                  : ''
              }`}
              // disabled={!email || !z.string().email().safeParse(email).success}
              onClick={handleEmailDuplicationCheck}
            >
              중복확인
            </button>
          </div>
          <div className={styles.input_desc_wrap}>
            {errors.email ? (
              <span className={styles.warn}>{errors.email.message}</span>
            ) : isEmailChecked && email === checkedEmail ? (
              isEmailAvailable === true ? (
                <span className={styles.success}>
                  <Icon name='check' /> 사용 가능한 이메일입니다.
                </span>
              ) : (
                <span className={styles.warn}>
                  이미 사용 중인 이메일입니다.
                </span>
              )
            ) : (
              <span>올바른 이메일 형식을 입력해 주세요.</span>
            )}
          </div>
        </div>

        {/* 이름 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>이름</span>
          <div className={styles.input_wrap}>
            <input
              type='text'
              className={`${styles.input_name} ${
                errors.name ? styles.error : ''
              }`}
              placeholder='이름을 입력해 주세요.'
              {...register('name')}
            />
          </div>
          <div className={styles.input_desc_wrap}>
            {errors.name && (
              <span className={styles.warn}>{errors.name.message}</span>
            )}
          </div>
        </div>

        {/* 휴대폰 번호 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>휴대폰 번호</span>
          <div className={styles.input_wrap}>
            {/* <input
              type='text'
              className={`${styles.input_name} ${
                errors.phoneNumber ? styles.error : ''
              } ${styles.phone_input}`}
              placeholder='본인인증을 완료하면 자동으로 입력됩니다.'
              maxLength={11}
              disabled={isPassVerified}
              {...register('phoneNumber')}
              value={watch('phoneNumber') || ''}
            /> */}
            <button
              type='button'
              className={styles.pass_check}
              disabled={isPassVerified}
              onClick={goToNiceId}
            >
              {isPassVerified ? '인증완료' : '본인인증'}
            </button>
          </div>
          <div className={styles.input_desc_wrap}>
            {isPassVerified && (
              <span className={styles.success}>
                <Icon name='check' /> 본인인증이 완료되었습니다.
              </span>
            )}
          </div>
        </div>

        {/* 닉네임 */}
        <div className={styles.input_group}>
          <span className={styles.input_title}>닉네임</span>
          <div className={styles.input_wrap}>
            <input
              type='text'
              className={`${styles.input_name} ${styles.with_button} ${
                errors.nickname ? styles.error : ''
              }`}
              placeholder='닉네임을 입력해 주세요.'
              {...register('nickname')}
            />
            <button
              type='button'
              className={`${styles.input_check} ${
                isNicknameChecked && nickname === checkedNickname
                  ? isNicknameAvailable
                    ? styles.success
                    : styles.error
                  : ''
              }`}
            >
              중복확인
            </button>
          </div>
          <div className={styles.input_desc_wrap}>
            {errors.nickname ? (
              <span className={styles.warn}>{errors.nickname.message}</span>
            ) : isNicknameChecked && nickname === checkedNickname ? (
              isNicknameAvailable ? null : ( // <span className={styles.success}>사용 가능한 닉네임입니다.</span>
                <span className={styles.warn}>
                  이미 사용 중인 닉네임입니다.
                </span>
              )
            ) : (
              <span>한글, 영문, 숫자 포함 3-10자 입력이 가능합니다.</span>
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

        {/* 다음 버튼 */}
        <div className={styles.button_wrap}>
          <Button
            type='submit'
            disabled={
              false
              // !isValid ||
              // !isPassVerified ||
              // !isEmailChecked ||
              // !isEmailAvailable ||
              // !isNicknameChecked ||
              // !isNicknameAvailable
            }
            variant='default'
          >
            다음
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalSignupPage
