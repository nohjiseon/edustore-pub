'use client'

import React from 'react'

import styles from './header.module.scss'

import LoginModal from '@/components/modal/LoginModal'
import { useModal } from '@/hooks/useModal'

const LoginButton = () => {
  const { openModal } = useModal()

  const handleLoginClick = () => {
    openModal(LoginModal)
  }

  return (
    <div className={`${styles.login_section} pc`}>
      <button
        className={styles.login_button}
        onClick={handleLoginClick}
        type='button'
        aria-label='로그인'
      >
        로그인
      </button>
    </div>
  )
}

export default LoginButton
