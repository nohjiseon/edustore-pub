'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'sonner'

import { ModalRoot } from '@/components/common/modal_root'
import { Dimmed } from '@/components/ui/Dimmed'
import { useAuthInitializer } from '@/hooks/useAuthInitializer'
import { useIndividualRouteGuard } from '@/hooks/useIndividualRouteGuard'
// import { useOrganizationRouteGuard } from '@/hooks/useOrganizationRouteGuard'

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  const queryClientRef = useRef<QueryClient>()

  // 인증 초기화 Hook 호출
  useAuthInitializer()

  // 기관회원 라우트 가드 Hook 호출
  // useOrganizationRouteGuard()

  // 개인회원 라우트 가드 Hook 호출
  useIndividualRouteGuard()

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: true,
          retry: 1,
          staleTime: 0,
          gcTime: 3 * 60 * 1000 // 3분
        }
      }
    })
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ErrorBoundary
        fallbackRender={() => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <h1>오류가 발생했습니다</h1>
            <p>페이지를 새로고침해주세요.</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}
            >
              새로고침
            </button>
          </div>
        )}
      >
        {children}
        <ReactQueryDevtools />
        <ModalRoot />
        <Dimmed />
        <Toaster position='bottom-right' richColors closeButton />
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default Providers
