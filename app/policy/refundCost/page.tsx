'use client'

import { useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'

interface AccordionSection {
  title: string
  content: JSX.Element
}

const TermsOfServicePage = () => {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true
  })

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const accordionSections: AccordionSection[] = [
    {
      title: '1. 기본 원칙',
      content: (
        <p>
          <span>
            • 자료 구매 후 7일 이내에는 아래 조건에 따라 구매취소 또는 환불
            요청이 가능합니다.
          </span>
          <span>
            • 단, 자료를 다운로드하거나 열람한 이후에는 ‘콘텐츠 제공이 개시된
            것’으로 간주되어 단순 변심 사유의 환불은 불가합니다.
          </span>
          <span>
            • 결제수단에 따라 환불 또는 결제 취소 시 처리 기간이 상이할 수
            있습니다.
          </span>
        </p>
      )
    },
    {
      title: '2. 구매취소 (다운로드 전)',
      content: (
        <p>
          <span>
            • 결제 후 7일 이내, 자료를 한 번도 다운로드하지 않은 경우 → 즉시
            결제 취소 및 자동 환불 처리됩니다.
          </span>
          <span>
            • PG사 또는 카드사 정책에 따라 실제 환급까지 영업일 기준 3~5일이
            소요될 수 있습니다.
          </span>
          <span>• 취소 수수료: 없음</span>
          <span className={styles.indent_bar2}>
            환급 방식: 결제수단과 동일 (예: 카드결제 → 카드승인취소)
          </span>
        </p>
      )
    },
    {
      title: '3. 환불요청 (다운로드 후)',
      content: (
        <p>
          <span>
            • 자료를 다운로드한 이후에는, 단순 변심이 아닌 아래와 같은 사유에
            한해 환불 요청이 가능합니다.
          </span>
          <span>
            • 요청은 구매일로부터 7일 이내 가능하며, 관리자의 검수 후
            승인됩니다.
          </span>
          <span>1. 환불 가능 사유 예시</span>
          <span className={styles.indent_bar2}>① 파일 오류, 깨짐, 누락</span>
          <span className={styles.indent_bar2}>
            ② 자료 설명과 명백히 불일치한 내용
          </span>
          <span className={styles.indent_bar2}>③ 관리자 승인 품질 문제</span>
          <span>2. 환불 불가 사유 예시</span>
          <span className={styles.indent_bar2}>
            ① 단순한 개인적 불만족 (예: 내용이 기대와 다름)
          </span>
          <span className={styles.indent_bar2}>
            ② 자료 일부만 활용한 후 환불 요청
          </span>
          <span className={styles.indent_bar2}>③ 파일 정상 열람 가능 시</span>
          <span>3. 환불 처리 절차</span>
          <span className={styles.indent_bar2}>
            ① [구매상세] 페이지에서 환불 요청
          </span>
          <span className={styles.indent_bar2}>
            ② 관리자 검수 및 승인/거절 결정
          </span>
          <span className={styles.indent_bar2}>
            ③ 승인 시, 등록된 환불 계좌로 송금
          </span>
          <span className={styles.indent_bar2}>
            ④ 입금까지 평균 7영업일 소요
          </span>
          <span>• 환불 수수료: 없음</span>
          <span className={styles.indent_bar2}>
            환불 방식: 등록 계좌 송금 (예금주 일치 필수)
          </span>
          <span className={styles.indent_bar2}>
            처리 기간: 승인 후 7영업일 이내
          </span>
        </p>
      )
    },
    {
      title: '4. 구매 7일 이후의 환불 요청',
      content: (
        <p>
          <span>
            • 구매일로부터 7일이 경과하면 자동 구매확정 상태로 전환됩니다.
          </span>
          <span>
            • 단, 자료 파일의 오류나 손상 등 명백한 하자가 확인될 경우
            예외적으로 환불 요청이 가능합니다.
          </span>
        </p>
      )
    },
    {
      title: '5. 기관회원(학교·교육청) 결제의 경우',
      content: (
        <p>
          <span>
            • 기관 충전금으로 결제한 내역은 기관 정산 정책에 따라 취소·환불이
            진행됩니다.
          </span>
          <span>• 환불 요청은 기관 담당 승인 후에 처리됩니다.</span>
        </p>
      )
    },
    {
      title: '6. 문의 및 추가 안내',
      content: (
        <p>
          <span>
            • 환불 진행 상태는 [마이페이지 &gt; 구매내역] &gt; 각 상세
            페이지에서 확인할 수 있습니다.
          </span>
          <span>
            • 환불 승인 후, 영업일 기준 최대 7일 이내 입금 처리됩니다.
          </span>
          <span>• 문의: teachersmarket@naver.com / 070-5111-2661</span>
        </p>
      )
    },
    {
      title: '요약',
      content: (
        <div className={styles.summary_table}>
          <table>
            <thead>
              <tr>
                <th>구분</th>
                <th>가능 조건</th>
                <th>처리 방식</th>
                <th>소요 기간</th>
                <th>수수료</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>구매취소</td>
                <td>다운로드 전, 7일 이내</td>
                <td>PG 자동 취소</td>
                <td>3~5영업일</td>
                <td>없음</td>
              </tr>
              <tr>
                <td>환불요청</td>
                <td>다운로드 후, 관리자 승인</td>
                <td>계좌 송금</td>
                <td>7영업일</td>
                <td>없음</td>
              </tr>
              <tr>
                <td>7일 이후</td>
                <td>자료 오류 시 예외 처리</td>
                <td>계좌 송금</td>
                <td>7영업일</td>
                <td>없음</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <h1>취소/환불 비용 안내</h1>
        <div className={styles.title_date}>
          <span>시행일 : 2025. 11. 28</span>
        </div>
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
export default TermsOfServicePage
