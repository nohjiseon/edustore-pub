'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { ErrorFallback } from '@/components/common/error'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const GlobalError = ({ error, reset }: ErrorProps) => {
  const router = useRouter()

  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 에러 추적 서비스로 대체)
    console.error('애플리케이션 에러:', error)
  }, [error])

  const handleHome = () => {
    router.push('/')
  }

  return <ErrorFallback errorType='500' onClick={handleHome} />
}

export default GlobalError
