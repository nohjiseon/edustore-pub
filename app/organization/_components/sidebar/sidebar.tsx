'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import styles from './OrganizationSidebar.module.scss'

import defaultProfile from '@/assets/images/common/default_profile.png'
import { useAuthStore } from '@/stores/auth'
import { Icon } from '~/components/Icon'

const OrganizationSidebar = () => {
  // Zustand store에서 회원 정보 가져오기
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // 회원 정보 콘솔 출력
  useEffect(() => {
    // console.log('=== 기관회원 정보 (Sidebar) ===')
    // console.log('로그인 상태:', isAuthenticated)
    // console.log('회원 정보:', user)
    // if (user) {
    //   console.log('회원 번호 (memNo):', user.memNo)
    //   console.log('이메일:', user.email)
    //   console.log('이름:', user.name)
    //   console.log('닉네임:', user.nickname)
    //   console.log('회원 유형:', user.memberType)
    // }
    // console.log('=============================')
  }, [user, isAuthenticated])

  const data = {
    profileImg: '',
    tag: '기관회원',
    name: '맑음',
    joinDate: '2025-10-02',
    totalMember: 0
  }

  const pathname = usePathname()

  // ✅ 고정 링크 목록
  const links = [
    { href: '/organization/members/approval', label: '신규 승인 신청 리스트' },
    { href: '/organization/members', label: '전체 구성원 리스트' },
    { href: '/organization/funds/charge', label: '충전 및 내역 확인' },
    { href: '/organization/funds/purchase', label: '구매 내역 확인' }
  ]

  // ✅ 프로필 이미지 설정
  const profileSrc =
    data.profileImg && data.profileImg.trim() !== ''
      ? data.profileImg
      : defaultProfile

  return (
    <div className={styles.prefix}>
      {/* 프로필 */}
      <div className={styles.profile}>
        <div className={styles.top}>
          <div className={styles.profile_img}>
            <Image src={profileSrc} alt='profile' width={60} height={60} />
          </div>
          <div className={styles.infos}>
            <span className={styles.tag}>{data.tag}</span>
            <span>{user?.name}</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.profile_info}>
            <ul>
              <li>
                <div className={styles.dt}>가입일</div>
                <div className={styles.dd}>{data.joinDate}</div>
              </li>
              <li>
                <div className={styles.dt}>소속된 전체 인원</div>
                <div className={styles.dd}>{data.totalMember}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <div className={styles.in_nav}>
        <ul>
          <li>기관 구성원 관리</li>
          {links.slice(0, 2).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? styles.active : ''}
              >
                {item.label}
                <Icon name='chevron-left-s' />
              </Link>
            </li>
          ))}
        </ul>

        <ul>
          <li>기관 충전금 관리</li>
          {links.slice(2).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? styles.active : ''}
              >
                {item.label}
                <Icon name='chevron-left-s' />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default OrganizationSidebar
