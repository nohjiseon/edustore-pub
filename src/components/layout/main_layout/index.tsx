import React, { ReactNode } from 'react'

import FloatingButtons from './FloatingButtons'
import styles from './main_layout.module.scss'
import { ThemeWrapper } from './ThemeWrapper'

import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'

interface Props {
  children?: ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <ThemeWrapper>
      <Header />
      <main className={styles.main_content_box}>{children}</main>
      <FloatingButtons />
      <Footer />
    </ThemeWrapper>
  )
}

export default MainLayout
