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
    7: true,
    8: true,
    9: true
  })

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const accordionSections: AccordionSection[] = [
    {
      title: '제1조(목적)',
      content: (
        <p>
          본 정책은 「전자상거래 등에서의 소비자보호에 관한 법률」 제17조 및
          제18조에 의거하여, 수업가게(이하 “회사”)의 디지털 콘텐츠 거래에 관한
          청약철회 및 환불 기준을 명확히 함을 목적으로 합니다.
        </p>
      )
    },
    {
      title: '제2조(취소 및 환불의 원칙)',
      content: (
        <p>
          <span>
            ① 수업가게에서 판매되는 모든 자료는 디지털 파일 형태의 콘텐츠로
            제공되며, 사용자가 자료를 다운로드하거나 열람하는 시점부터 콘텐츠
            제공이 개시된 것으로 간주됩니다
          </span>
          <span>
            ② 콘텐츠 제공이 개시된 이후에는 「전자상거래법 제17조 제2항
            제5호」에 따라 단순 변심으로 인한 청약철회가 제한됩니다.
          </span>
          <span>
            ③ 단, 콘텐츠에 명백한 하자가 있거나 서비스 제공 과정에서 회사의
            귀책이 있는 경우에는 제5조에 따라 환불이 가능합니다.
          </span>
        </p>
      )
    },
    {
      title: '제3조(구매취소)',
      content: (
        <p>
          <span>
            ① 사용자가 자료를 다운로드하지 않은 상태에서 결제일로부터 7일 이내에
            청약철회를 요청하는 경우, 해당 거래는 즉시 취소 처리됩니다.
          </span>
          <span>
            ② 결제수단에 따라 취소 승인일로부터 영업일 기준 3~5일 이내에
            결제금액이 환급됩니다.{' '}
            <span className={styles.red}>영업일기준 재확인필요</span>
          </span>
          <span>③ 구매취소 시 별도의 수수료는 부과되지 않습니다.</span>
        </p>
      )
    },
    {
      title: '제4조(환불요청)',
      content: (
        <p>
          <span>
            ① 사용자가 자료를 다운로드한 이후에는 단순 변심으로 인한 환불이
            불가합니다.
          </span>
          <span>
            ② 다음 각 호의 사유에 해당하는 경우, 사용자는 결제일로부터 7일
            이내에 환불을 요청할 수 있습니다.
          </span>
          <span className={styles.indent}>
            (1) 자료 파일이 손상되거나 정상적으로 열리지 않는 경우
          </span>
          <span className={styles.indent}>
            (2) 자료 설명과 실제 내용이 명백히 불일치하는 경우
          </span>
          <span className={styles.indent}>
            (3) 관리자 검수 결과 품질 결함이 확인된 경우
          </span>
          <span>
            ③ 환불요청은 [마이페이지 &gt; 구매내역 &gt; 구매상세] 화면을 통해
            접수하며, 회사는 요청 접수 후 3영업일 이내에 승인 여부를 통지합니다.
          </span>
          <span>
            ④ 환불이 승인된 경우, 사용자가 등록한 계좌로 환불금이 지급되며 실제
            입금까지는 승인일로부터 최대 7영업일이 소요될 수 있습니다.
          </span>
          <span>⑤ 환불 처리 시 별도의 수수료는 부과되지 않습니다.</span>
        </p>
      )
    },
    {
      title: '제5조(구매확정 이후의 환불)',
      content: (
        <p>
          <span>
            ① 결제일로부터 7일이 경과한 거래는 자동으로 구매확정 상태로
            전환됩니다.
          </span>
          <span>
            ② 단, 구매확정 이후에도 다음 각 호의 사유가 확인될 경우 회사는
            예외적으로 환불을 승인할 수 있습니다.
          </span>
          <span className={styles.indent}>
            (1) 자료가 열리지 않거나 파일이 손상된 경우
          </span>
          <span className={styles.indent}>
            (2) 관리자 검수에서 명백한 오류가 확인된 경우
          </span>
          <span>
            ③ 위 항의 경우, 환불은 제4조 제4항의 절차에 따라 처리합니다.
          </span>
        </p>
      )
    },
    {
      title: '제6조(기관 예산 결제 및 환불)',
      content: (
        <p>
          <span>
            ① 회사는 기관회원(학교, 교육청 등)에게 직접적인 결제 서비스를
            제공하지 않습니다.
          </span>
          <span>
            ② 기관회원에 소속된 개인회원(교사 등)이 기관 예산을 사용하여 결제할
            수 있으며, 이 경우 결제 주체는 해당 개인회원으로 간주됩니다.
          </span>
          <span>
            ③ 개인회원은 증빙서류 제출 및 기관 예산 배정 승인이 완료되어야 기관
            예산을 결제수단으로 사용할 수 있습니다.
          </span>
          <span>
            ④ 기관 예산으로 결제된 거래의 환불은 개인회원의 환불 요청에 따라
            회사가 직접 처리하며 기관 내부 승인 절차와는 무관하게 진행됩니다.
          </span>
          <span>
            ⑤ 단, 기관 예산이 회계정산 또는 행정처리 중인 경우, 환불 처리 일정은
            기관 사정에 따라 지연될 수 있습니다.
          </span>
        </p>
      )
    },
    {
      title: '제7조(환불 처리 기간 및 방법)',
      content: (
        <p>
          <span>
            ① 결제수단별 환불 처리 기간은 다음 각 호와 같습니다.{' '}
            <span className={styles.red}>영업일기준 재확인필요</span>
          </span>
          <span className={styles.indent}>
            (1) 카드결제: 승인취소 후 영업일 기준 3~5일 이내
          </span>
          <span className={styles.indent}>
            (2) 계좌이체 또는 가상계좌: 영업일 기준 3~5일 이내
          </span>
          <span className={styles.indent}>
            (3) 수업가게 충전금: 승인 즉시 충전금으로 환원
          </span>
          <span>
            ② 환불은 원결제 수단을 원칙으로 하되, 환불 계좌 송금이 필요한 경우
            예금주 일치 여부를 확인합니다.
          </span>
        </p>
      )
    },
    {
      title: '제8조(환불 불가 사유)',
      content: (
        <p>
          <span>① 단순한 개인적 불만족 (예: 내용이 기대와 다름)</span>
          <span>② 자료 일부만 이용한 후 환불 요청하는 경우</span>
          <span>③ 파일이 정상적으로 다운로드·열람 가능한 경우</span>
          <span>④ 관리자 검수 결과 이상이 없는 경우</span>
        </p>
      )
    },
    {
      title: '제9조(기타)',
      content: (
        <p>
          <span>
            ① 회사는 본 정책을 관련 법령 및 서비스 운영 정책의 변경에 따라
            수정할 수 있으며, 변경 시 그 내용을 홈페이지에 사전 공지합니다.
          </span>
          <span>
            ② 본 정책에 명시되지 않은 사항은 「전자상거래법」 및 관계 법령에
            따릅니다.
          </span>
        </p>
      )
    }
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <h1>취소/환불 정책 약관</h1>
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
