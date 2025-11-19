'use client'

import React from 'react'

import { useAuthStore } from '@/stores/auth'
import LoginButton from '~/components/layout/header/LoginButton'
import LoginProfile from '~/components/layout/header/LoginProfile'

/**
 * 인증 상태에 따라 로그인 버튼 또는 프로필을 표시하는 컴포넌트
 * - 로그인 상태: LoginProfile 표시
 * - 비로그인 상태: LoginButton 표시
 */
const AuthSection = () => {
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated)

  return isLoggedIn ? <LoginProfile /> : <LoginButton />
}

export default AuthSection
