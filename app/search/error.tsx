'use client'

import styles from './page.module.scss'

import { ErrorFallback } from '@/components/common/error'
import { BaseLayout, BaseLayoutTitle } from '~/components/layout'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const SearchError = ({ error, reset }: ErrorProps) => {
  return (
    <BaseLayout background='radial-gradient(42.11% 38.96% at 85.47% 32.95%, rgba(184, 224, 229, 0.17) 0%, rgba(217, 244, 247, 0.00) 100%), radial-gradient(41.25% 37.32% at 16.15% 70.19%, rgba(184, 224, 229, 0.22) 0%, rgba(217, 244, 247, 0.00) 100%), #F6F7F9'>
      <div className={styles.container}>
        <BaseLayoutTitle>
          수업자료 <span className={styles.sub_title}>검색 결과</span>
        </BaseLayoutTitle>
        <ErrorFallback
          errorType='500'
          title='검색 중 오류가 발생했습니다'
          message='요청을 처리하는 중에 문제가 발생했습니다. 다시 시도해주세요.'
        />
      </div>
    </BaseLayout>
  )
}
