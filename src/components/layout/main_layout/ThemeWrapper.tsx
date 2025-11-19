'use client'

import { ReactNode } from 'react'

import styles from './main_layout.module.scss'

import { useThemeStore } from '~/stores/common'

interface Props {
  children: ReactNode
}

export const ThemeWrapper = ({ children }: Props) => {
  const theme = useThemeStore((state) => state.theme)

  return (
    <div className={`${styles.main_layout_wrapper} ${styles[theme]}`}>
      {children}
    </div>
  )
}
