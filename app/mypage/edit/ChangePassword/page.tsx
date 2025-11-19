'use client'

import { useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import { Button, Input } from '~/components/ui'

const ChangePasswrodPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [confirmError, setConfirmError] = useState(false)
  const [confirmErrorMessage, setConfirmErrorMessage] = useState('')

  // 이전 비밀번호(실제 환경에서는 서버에서 받아오거나 props로 전달)
  const previousPassword = '' // 필요 시 실제 이전 비밀번호로 교체

  // 개인 정보(이름/이메일/전화 등) 배열을 넣어 비교할 수 있음
  const personalInfo: string[] = [] // 예: ['홍길동','0000@gmail.com','01012345678']

  const validatePasswordRules = (pwd: string) => {
    // 길이 체크
    if (pwd.length < 8 || pwd.length > 20) {
      return {
        ok: false,
        message: '비밀번호는 8자 이상 20자 이하로 입력해 주세요.'
      }
    }

    // 영문/숫자 중 최소 하나 이상 포함 여부
    const hasAlpha = /[A-Za-z]/.test(pwd)
    const hasDigit = /[0-9]/.test(pwd)
    if (!hasAlpha && !hasDigit) {
      return {
        ok: false,
        message:
          '비밀번호에 한글 또는 영문 또는 숫자 중 하나 이상 포함해 주세요.'
      }
    }

    // 같은 문자 3번 연속 사용 금지
    if (/(.)\1\1/.test(pwd)) {
      return {
        ok: false,
        message: '같은 문자를 3번 이상 연속으로 사용할 수 없습니다.'
      }
    }

    // 이전 비밀번호와 동일한지 체크 (previousPassword가 비어있지 않을 때만)
    if (previousPassword && pwd === previousPassword) {
      return {
        ok: false,
        message: '이전과 같은 비밀번호는 사용할 수 없습니다.'
      }
    }

    // 개인 정보 포함 여부 체크
    for (const info of personalInfo) {
      if (!info) continue
      if (pwd.includes(info)) {
        return {
          ok: false,
          message: '개인정보와 동일한 문자열은 사용할 수 없습니다.'
        }
      }
    }

    return { ok: true, message: '' }
  }

  const handleSubmit = () => {
    // 규칙 검사
    const { ok, message } = validatePasswordRules(password)
    if (!ok) {
      setPasswordError(true)
      setPasswordErrorMessage(message)
      return
    }

    // 확인값 비교
    if (password !== passwordConfirm) {
      setConfirmError(true)
      setConfirmErrorMessage('비밀번호가 일치하지 않습니다')
      return
    }

    // 모든 검사 통과
    setPasswordError(false)
    setPasswordErrorMessage('')
    setConfirmError(false)
    setConfirmErrorMessage('')
    console.log('비밀번호 변경 실행', { password })
    // 실제 비밀번호 저장 로직 연결 지점
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.page_title}>
        <h2>비밀번호 변경</h2>
        <p className={styles.description}>
          새로 변경하실 비밀번호를 입력해주세요.
        </p>
      </div>
      <div className={styles.text_box}>
        <div className={styles.title}>비밀번호 유의사항 안내</div>
        <ul className={styles.dot_list}>
          <li>한글, 영문, 숫자 포함 8~20자 입력이 가능합니다.</li>
          <li>
            개인정보(이름/이메일/전화 등)와 동일한 문자열은 사용할 수 없습니다.
          </li>
          <li>같은 문자를 3번 이상 연속으로 사용할 수 없습니다.</li>
          <li>이전과 같은 비밀번호는 사용할 수 없습니다.</li>
        </ul>
      </div>
      <div className={styles.form_box}>
        <span className={styles.label}>비밀번호 </span>
        <div className={styles.input_group}>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder='비밀번호를 입력해 주세요.'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // error={passwordError}
            errorMessage={passwordErrorMessage}
          />
        </div>
      </div>
      <div className={styles.form_box}>
        <span className={styles.label}>비밀번호 확인</span>
        <div className={styles.input_group}>
          <Input
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder='비밀번호를 입력해 주세요.'
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value)
              setConfirmError(false)
              setConfirmErrorMessage('')
            }}
            // error={confirmError}
            errorMessage={confirmErrorMessage}
          />
        </div>
      </div>
      <div className={styles.btn_box}>
        <Button variant='default' className='button' onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </div>
  )
}
export default ChangePasswrodPage
