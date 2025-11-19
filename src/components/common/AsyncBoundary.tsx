import React, { ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface Props {
  children: ReactNode
  errorComponent?: ReactNode
  errorText?: string
  loadingComponent?: ReactNode
}

const AsyncBoundary = ({
  errorComponent = <div>오류가 발생했습니다.</div>,
  loadingComponent,
  children
}: Props) => {
  return (
    <ErrorBoundary fallbackRender={() => <>{errorComponent}</>}>
      <Suspense fallback={loadingComponent}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default AsyncBoundary
