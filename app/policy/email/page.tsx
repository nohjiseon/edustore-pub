'use client'

import { useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'

interface AccordionSection {
  title: string
  content: JSX.Element
}
const EmailCollectionPage = () => {
  // 모든 섹션을 열린 상태로 초기화
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true
  })

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }
  const accordionSections: AccordionSection[] = [
    {
      title: '1. 금지 행위',
      content: (
        <p>
          <span>
            • 웹페이지에 게시된 이메일 주소를 수집 프로그램/스크립트/봇 등으로
            자동 수집하는 행위
          </span>
          <span>• 이렇게 수집된 이메일 주소를 판매·대여·유통하는 행위</span>
          <span>
            • 수집된 이메일 주소로 광고성 정보(스팸메일)를 전송하는 행위
          </span>
          <span>
            • 페이지 소스·크롤링·무단 스크래핑 등 기술적 방법을 통한 이메일 추출
            행위
          </span>
        </p>
      )
    },
    {
      title: '2. 위반 시 조치',
      content: (
        <p>
          <span>
            위 행위가 확인될 경우, 수업가게는 관련 법령에 따라 수사의뢰,
            형사고발, 민·형사상 손해배상 청구 등 법적 조치를 취할 수 있습니다.
          </span>
        </p>
      )
    },
    {
      title: '3. 문의',
      content: (
        <p>
          <span>
            이메일 수신 관련 문의 또는 신고는 아래 경로로 접수해 주세요.
          </span>
          <span className={styles.indent}>
            • 문의하기 :{' '}
            <a href='https://www.naver.com'>https://www.naver.com</a>
          </span>
          <span className={styles.indent}>
            • 대표 전화 : 070-5111-2661 (운영시간 : 월~금, 09:00~17:00)
          </span>
          <br />
          <br />
          <span>
            이메일무단수집거부 : 본 사이트에 게시된 이메일 주소의 무단
            수집·유통·광고 전송을 금지합니다(정보통신망법 제50조의2). 위반 시
            법적 제재를 받을 수 있습니다.
          </span>
        </p>
      )
    }
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <h1>이메일무단수집거부</h1>
        <div className={styles.title_date}>
          <span>시행일 : 2025. 11. 28</span>
          <span>운영자 : 수업가게</span>
        </div>
      </div>

      <div className={styles.description_wrap}>
        <p>
          수업가게는 본 웹사이트에 게시된 전자우편 주소의 무단 수집을
          금지합니다. 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하
          ‘정보통신망법’) 제50조의2에 따라, 전자우편 주소를 수집 프로그램 또는
          그 밖의 기술적 장치를 이용하여 무단으로 수집하는 행위, 수집된 주소를
          판매·유통하거나 광고성 정보 전송에 이용하는 행위는 금지되며 위반 시
          형사처벌 및 손해배상의 대상이 될 수 있습니다.
        </p>
      </div>

      <div className={styles.policy_info_wrap}>
        {accordionSections.map((section, index) => {
          const isOpen = openSections[index] || false

          return (
            <div key={index} className={styles.list_wrap}>
              <div
                className={styles.info_title_wrap}
                onClick={() => toggleSection(index)}
              >
                <span>{section.title}</span>
                <Icon
                  name='down-arrow'
                  color='currentColor'
                  className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
                />
              </div>
              <div
                className={`${styles.info_desc_wrap} ${
                  isOpen ? styles.open : styles.closed
                }`}
              >
                {section.content}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EmailCollectionPage
