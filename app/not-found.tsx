import Link from 'next/link'

import { ErrorFallback } from '@/components/common/error'

const NotFound = () => {
  return (
    <ErrorFallback
      errorType='404'
      customActions={<Link href='/'>홈으로</Link>}
    />
  )
}

export default NotFound
