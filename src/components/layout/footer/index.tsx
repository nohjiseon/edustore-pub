'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from './footer.module.scss'

import { Icon } from '@/components/Icon'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 회사 로고 및 정보 */}
        <div className={styles.companyInfo}>
          <div className={styles.logo}>
            <Icon name='logo-symbol' width={40} />
            <Icon name='logo-text' width={77} />
          </div>

          <div className={styles.footer_links}>
            <Link href='/notice'>공지사항</Link>
            {/* <Link href='/board'>자료요청게시판</Link> */}
            <Link href='/service'>고객센터</Link>
            <Link href='/mypage/inquire'>1:1 문의</Link>
          </div>

          <div className={styles.companyDetails}>
            <p>
              주식회사 수업가게 대표자: 남태현 사업자번호 : 409-88-03110
              개인정보보호책임자 : 이선명 전화번호 : 010-6385-2661
            </p>
            <p>
              이메일 : teachersmarket@naver.com 주소: 세종특별자치시 국세청로
              45, 309동 1305호(나성동, 나릿재마을 3단지)
            </p>
          </div>
        </div>

        {/* 저작권 및 정책 링크 */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p>© 수업가게, MALGUM. All Rights Reserved.</p>
          </div>

          <div className={styles.policyLinks}>
            <Link href='/policy/terms'>이용약관</Link>
            <span className={styles.separator}>|</span>
            <Link href='/policy/privacy'>개인정보처리방침</Link>
            <span className={styles.separator}>|</span>
            <Link href='/policy/copyright'>저작권 정책</Link>
            <span className={styles.separator}>|</span>
            <Link href='/policy/email'>이메일무단수집거부</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
