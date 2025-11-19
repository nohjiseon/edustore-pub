'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import styles from './header.module.scss'
import ProfileModal from '../../modal/OfficeProfileModal'

import defaultProfile from '@/assets/images/common/default_profile.png'
import { useLogoutMutation } from '@/hooks/queries/useAuth'
import { useAuthStore } from '@/stores/auth'
import { Icon } from '~/components/Icon'

interface Props {
  src?: string
}

const LoginProfile = ({ src }: Props) => {
  const { mutate: logout } = useLogoutMutation()
  const [isActive, setIsActive] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // Zustand store에서 로그인 정보 가져오기
  const user = useAuthStore((state) => state.user)

  // 회원 유형에 따른 텍스트
  const memberTypeText =
    user?.memberType === 'organization' ? '기관회원' : '개인회원'

  // 사용자 이름 또는 닉네임 (nickname 우선, 없으면 name 사용)
  const displayName = user?.nickname

  // 프로필 이미지 (src prop이 있으면 우선 사용, 없으면 defaultProfile)
  const profileImage = src || defaultProfile
  // ProfileModal에 전달할 초기 이미지 (string 타입만 허용)
  const initialProfileImage =
    typeof profileImage === 'string' ? profileImage : profileImage.src

  const handleLogout = () => {
    logout()
  }

  const handleMouseEnter = () => {
    setIsActive(true)
  }

  const handleMouseLeave = () => {
    setIsActive(false)
  }

  const handleBlur = () => {
    setIsActive(false)
  }

  const handleProfileEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsProfileModalOpen(true)
  }

  // 마우스 휠 아래로 스크롤 시 프로필 팝업 닫기
  useEffect(() => {
    if (!isActive) return

    const handleWheel = (event: WheelEvent) => {
      // 아래로 스크롤 (deltaY > 0)
      if (event.deltaY > 0) {
        setIsActive(false)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [isActive])

  return (
    <div className={styles.login_profileWrap} onMouseLeave={handleMouseLeave}>
      <button
        className={`${styles.login_profile} pc`}
        type='button'
        onMouseEnter={handleMouseEnter}
      >
        <Image src={profileImage} alt='login profile' />
      </button>
      <div
        className={`${styles.profile_pop} ${isActive ? styles.active : ''}`}
        onBlur={handleBlur}
        tabIndex={-1}
      >
        <div className={styles.profile_pop_inner}>
          <div className={styles.top_box}>
            <div className={styles.profile_img}>
              <div className={styles.img_wrap}>
                <Image src={profileImage} alt='login profile' />
                {/* s:: 기관회원 삭제 */}
                {user?.memberType === 'organization' ? (
                  <span
                    className={styles.ic_edit}
                    onClick={handleProfileEditClick}
                  >
                    <Icon name='edit-s' />
                  </span>
                ) : null}
                {/* e:: */}
              </div>
              <div className={styles.txt_box}>
                <span>{memberTypeText}</span>
                <strong>
                  {user?.memberType !== 'organization'
                    ? displayName
                    : user?.name}
                </strong>
              </div>
            </div>
            {/* 개인회원만 표시 */}
            {user?.memberType !== 'organization' && (
              <div className={styles.btn_box}>
                <Link href='/purchase'>
                  <span className={styles.ic_box}>
                    <Icon name='receipt' color='#fff' />
                  </span>
                  구매 관리
                </Link>
                <Link href='/sales/edit'>
                  <span className={styles.ic_box}>
                    <Icon name='store' color='#fff' />
                  </span>
                  내 가게 관리
                </Link>
              </div>
            )}
          </div>
          <div className={styles.btm_box}>
            {/* 개인회원만 표시 */}
            {user?.memberType !== 'organization' && (
              <div className={styles.menu_list}>
                <Link href='/groupenroll'>
                  단체 및 기관 등록
                  <Icon name='chevron-right-s' color='#C9D0DA' />
                </Link>
                <Link href='/'>
                  기관예산 승인 관리
                  <Icon name='chevron-right-s' color='#C9D0DA' />
                </Link>
                <Link href='/settlement'>
                  정산 관리
                  <Icon name='chevron-right-s' color='#C9D0DA' />
                </Link>
                <Link href='/mypage'>
                  회원 정보 관리
                  <Icon name='chevron-right-s' color='#C9D0DA' />
                </Link>
              </div>
            )}
            <div className={styles.menu_list}>
              <Link href='/notice'>
                공지사항
                <Icon name='chevron-right-s' color='#C9D0DA' />
              </Link>
              {user?.memberType !== 'organization' && (
                <Link href='/board'>
                  자료 요청 게시판
                  <Icon name='chevron-right-s' color='#C9D0DA' />
                </Link>
              )}
              <Link href='/mypage/inquire'>
                1:1 문의
                <Icon name='chevron-right-s' color='#C9D0DA' />
              </Link>
              <Link href='/service'>
                고객센터
                <Icon name='chevron-right-s' color='#C9D0DA' />
              </Link>
            </div>
            <Link href='/' className={styles.logout_btn} onClick={handleLogout}>
              로그아웃
            </Link>
          </div>
        </div>
      </div>
      <ProfileModal
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
        initialProfileImg={initialProfileImage}
      />
    </div>
  )
}

export default LoginProfile
