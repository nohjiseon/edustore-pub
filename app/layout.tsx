import { ReactNode } from 'react'

import Providers from './providers'

import MainLayout from '~/components/layout/main_layout'
import '~/styles/common.scss'
import { Pretendard } from '~/styles/fonts'

export const metadata = {
  title: 'page title'
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='ko' className={Pretendard.variable}>
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
