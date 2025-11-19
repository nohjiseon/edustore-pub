'use client'

import { ReactNode } from 'react'

import styles from './base_layout.module.scss'

import { LayoutProps } from '~/types/layout'

interface BaseLayoutProps extends LayoutProps {
  background?: string
}

const BaseLayout = ({ children, background = '#fff' }: BaseLayoutProps) => {
  return (
    <div className={styles.wrapper} style={{ background }}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

interface BaseLayoutTitleProps {
  children: ReactNode
}

const BaseLayoutTitle = ({ children }: BaseLayoutTitleProps) => {
  return <h1 className={styles.title}>{children}</h1>
}

export { BaseLayout, BaseLayoutTitle }
