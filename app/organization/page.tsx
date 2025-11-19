'use client'

import { useEffect, useState } from 'react'

import OrganizationSidebar from './_components/sidebar/sidebar'
import styles from './page.module.scss'

import { organizationService } from '@/services/organization'
import { useAuthStore } from '@/stores/auth'

const OrganizationHomePage = () => {
  // Zustand store에서 회원 정보 가져오기
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [organAmount, setOrganAmount] = useState<number>(0)
  const tempAmount = 123456789

  // 기관 충전금 조회 API 호출
  useEffect(() => {
    const fetchOrganAmount = async () => {
      // 기관회원이고 memNo가 있을 때만 호출
      if (
        user?.memberType === 'organization' &&
        user?.memNo &&
        isAuthenticated
      ) {
        const organNo = Number(user.memNo)

        try {
          const response = await organizationService.getOrganAmount(organNo)
          setOrganAmount(response.data)
        } catch (error: any) {
          console.error('기관 충전금 조회 실패:', error)
        }
      }
    }

    fetchOrganAmount()
  }, [user, isAuthenticated])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>기관 마이페이지</h1>
        <p className={styles.description}>
          기관 구성원과 충전금을 한 번에 관리해 보세요
        </p>
      </div>
      <div className={styles.page_content}>
        <OrganizationSidebar />
        <div className={styles.suffix}>
          <div className={styles.text_box}>{user?.name}님, 안녕하세요</div>
          <div className={styles.box_list}>
            <ul>
              <li>
                사용 가능한 충전금
                <span>{organAmount.toLocaleString()}</span>
              </li>
              <li>
                총 구성원
                <span>{`${tempAmount.toLocaleString()}`}</span>
              </li>
              <li>
                신규 구성원
                <span>{`${tempAmount.toLocaleString()}`}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationHomePage
