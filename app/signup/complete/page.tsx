// app/signup/complete/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import SignupCompletePage from './SignupCompletePage'

const SignupCompleteContent = () => {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')

  // URL 쿼리 파라미터에서 type 추출, 기본값은 'personalSuccess'
  const type:
    | 'personalSuccess'
    | 'findEmail'
    | 'findOrganId'
    | 'sendLink'
    | 'resetPassword'
    | 'organizationSuccess' =
    typeParam === 'findEmail' ||
    typeParam === 'findOrganId' ||
    typeParam === 'sendLink' ||
    typeParam === 'resetPassword' ||
    typeParam === 'organizationSuccess'
      ? typeParam
      : 'personalSuccess'

  // 세션 스토리지에서 이메일 가져오기
  const email =
    typeof window !== 'undefined'
      ? sessionStorage.getItem(
          type === 'findOrganId' ? 'foundOrganEmail' : 'foundEmail'
        ) || undefined
      : undefined

  return <SignupCompletePage type={type} email={email} />
}

const Page = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SignupCompleteContent />
    </Suspense>
  )
}

export default Page
