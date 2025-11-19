'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import styles from './header.module.scss'
import HeaderActions from './HeaderActions'
import HeaderNavigation from './HeaderNavigation'

import { Icon } from '@/components/Icon'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const Header = () => {
  const scrollDirection = useScrollDirection({ threshold: 10 })
  const [isElevated, setIsElevated] = useState(false)
  const user = useAuthStore((state) => state.user)
  const isOrganization = user?.memberType === 'organization'

  return (
    <header
      className={cn(
        styles.header,
        scrollDirection === 'down' && styles.header_hidden,
        scrollDirection === 'down' && 'header_hidden',
        isElevated && styles.header_elevated
      )}
    >
      <div className={styles.container}>
        {/* 로고 섹션 */}
        <div className={styles.logo_section}>
          <Link
            href={isOrganization ? '/organization' : '/'}
            className={styles.logo_container}
          >
            <Icon name='logo-symbol' width={26} height={22} className='pc' />
            <Icon name='logo-text' width={54} height={16} />
          </Link>
        </div>

        {/* 네비게이션 메뉴 (클라이언트 컴포넌트) - 기관회원일 때 숨김 */}
        {!isOrganization && (
          <HeaderNavigation onElevationChange={setIsElevated} />
        )}

        {/* 우측 액션 영역 (클라이언트 컴포넌트) */}
        <HeaderActions />
      </div>
    </header>
  )
}

export default Header
