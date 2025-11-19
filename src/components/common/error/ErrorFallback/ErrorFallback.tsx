import { forwardRef } from 'react'

import styles from './ErrorFallback.module.scss'

import Button from '@/components/ui/Button'

type ErrorType = '401' | '404' | '500'

interface ErrorFallbackProps {
  // 콘텐츠
  title?: string
  message?: string

  // 설정
  errorType?: ErrorType

  // 상호작용
  onClick?: () => void
  customActions?: React.ReactNode
}

// 에러 타입별 기본값
const ERROR_DEFAULTS: Record<
  ErrorType,
  { code: string; title: string; message: string; buttonLabel: string }
> = {
  '401': {
    code: '401',
    title: '접근 권한이 없습니다',
    message:
      '로그인 상태를 확인하시거나,\n권한이 필요한 경우 관리자에게 문의해 주세요.',
    buttonLabel: '메인으로'
  },
  '404': {
    code: '404',
    title: '페이지를 찾을 수 없습니다',
    message:
      '요청하신 페이지를 찾을 수 없습니다.\n입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.',
    buttonLabel: '돌아가기'
  },
  '500': {
    code: '500',
    title: '서버 오류가 발생했습니다',
    message: '예상치 못한 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
    buttonLabel: '돌아가기'
  }
}

const ErrorFallback = forwardRef<HTMLDivElement, ErrorFallbackProps>(
  ({ title, message, errorType = '401', onClick, customActions }, ref) => {
    const defaults = ERROR_DEFAULTS[errorType]
    const displayCode = defaults.code
    const displayTitle = title || defaults.title
    const displayMessage = message || defaults.message
    const displayButtonLabel = defaults.buttonLabel

    const containerClass = [styles.container, styles[`type_${errorType}`]]
      .filter(Boolean)
      .join(' ')

    const handleButton = () => {
      onClick?.()
    }

    return (
      <div ref={ref} className={containerClass}>
        {/* 에러 코드 */}
        <div className={styles.code}>{displayCode}</div>

        {/* 콘텐츠 래퍼 */}
        <div className={styles.content_wrapper}>
          {/* 제목 */}
          <h1 className={styles.title}>{displayTitle}</h1>

          {/* 메시지 */}
          <div className={styles.message}>
            {displayMessage.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className={styles.actions}>
          {onClick ? (
            <Button onClick={handleButton} variant='default' width={376}>
              {displayButtonLabel}
            </Button>
          ) : null}
          {customActions}
        </div>
      </div>
    )
  }
)

ErrorFallback.displayName = 'ErrorFallback'

export default ErrorFallback
export type { ErrorFallbackProps }
