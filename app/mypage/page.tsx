'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './page.module.scss'

import { authService } from '@/services/auth.service'
import { Button, Input } from '~/components/ui'

const MyPage = () => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    if (!password) {
      setErrorMessage('비밀번호를 입력해 주세요.')
      return
    }

    setIsLoading(true)

    try {
      const result = await authService.checkPassword(password)

      // API 응답 구조: { data: {...}, status: number, code: number, message: string }
      // checkPassword는 response.data.data || response.data를 반환하므로
      // 실제 응답 구조에 따라 code, status가 있을 수 있음
      const response = result as any

      // 성공 시 code는 200, status도 200
      if (response?.code === 200 || response?.status === 200) {
        // 비밀번호 검증 성공 시 회원 정보 수정 페이지로 이동
        router.push('/mypage/edit')
      } else {
        setErrorMessage('비밀번호가 일치하지 않습니다.')
      }
    } catch (error: any) {
      console.error('비밀번호 검증 실패:', error)
      setErrorMessage('비밀번호가 일치하지 않습니다.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>회원 정보 관리</h1>
        <p className={styles.descirption}>
          소중한 정보 보호를 위해 비밀번호를 다시 입력해 주세요.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_box}>
          <label>비밀번호</label>
          <Input
            type='password'
            placeholder='비밀번호를 입력해 주세요.'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value)
              setErrorMessage('')
            }}
            errorMessage={errorMessage}
            disabled={isLoading}
          />
        </div>
        <div className={styles.btn_wrap}>
          <Button
            variant='default'
            width={195}
            type='submit'
            disabled={isLoading || !password}
          >
            {isLoading ? '확인 중...' : '확인'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MyPage
