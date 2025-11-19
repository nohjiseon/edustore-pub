'use client'

import { useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'

interface AccordionSection {
  title: string
  content: JSX.Element
}

const CopyrightPolicyPage = () => {
  // 모든 섹션을 열린 상태로 초기화
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
    9: true,
    10: true,
    11: true,
    12: true
  })

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }
  const accordionSections: AccordionSection[] = [
    {
      title: '1. 목적과 적용 범위',
      content: (
        <p>
          본 정책은 ‘수업가게’ 플랫폼(웹/모바일 포함, 이하 “플랫폼”)에서
          제공·유통되는 교육용 디지털 콘텐츠(파일, 링크, 스트리밍 포함) 및
          이용자 생성 콘텐츠(UGC) 에 대한 저작권 보호, 침해 신고·처리, 재게시
          절차, 반복 침해자 조치 기준을 정합니다. 플랫폼을 이용하는 모든
          회원(구매자·판매자·기관회원·비회원 열람자) 에 적용됩니다.
        </p>
      )
    },
    {
      title: '2. 권리 귀속과 이용허락',
      content: (
        <p>
          <span>
            ① 플랫폼/회사 자산(UI, 프로그램, 로고, 안내문 등)의 모든 권리는 회사
            또는 정당한 권리자에게 귀속됩니다.플랫폼/회사 자산(UI, 프로그램,
            로고, 안내문 등)의 모든 권리는 회사 또는 정당 한 권리자에게
            귀속됩니다.
          </span>
          <span>
            ② 판매자 콘텐츠의 저작권은 원저작자(판매자/권리자)에게 있으며,
            판매자는 플랫폼 운영·전시·홍보를 위해 필요한 범위에서 회사에
            비독점적 이용허락을 부여합니다(구체 범위는 판매자 약관/운영정책에
            따름).
          </span>
          <span>
            ③ 구매자 이용권은 원칙적으로 비독점·양도불가이며, 상품 상세 및
            라이선스 고지 범위 내에서만 이용할 수 있습니다. 무단
            재배포/재판매/공중송신/2차적 저작물 작성은 금지됩니다.
          </span>
        </p>
      )
    },
    {
      title: '3. 구매자 이용 범위(교육 목적 특화)',
      content: (
        <p>
          <span>
            • 수업 준비·진행 등 비상업적 교육 목적 사용을 기본으로 하며 외부
            배포·전송·공개 게시·강의 영상 재판매는 금지됩니다.
          </span>
          <span>
            • 학교/기관 내부망의 제한적 공유가 필요한 경우, 상품별 라이선스 고지
            또는 판매자 허락을 따릅니다.
          </span>
          <span>• DRM/워터마크 등 기술적 보호조치 우회는 금지됩니다.</span>
        </p>
      )
    },
    {
      title: '4. 판매자(업로더) 보증과 의무',
      content: (
        <p>
          <span>
            • 판매자는 업로드하는 자료에 대해 권리 보유 및 제3자 권리 비침해를
            보증합니다. 판매자는 업로드하는 자료에 대해 권리 보유 및 제3자 권리
            비침해를 보증합니다.
          </span>
          <span>
            • 제3자 권리(이미지·폰트·소스·음원 등)를 사용한 경우, 적법한
            라이선스 취득 및 표시 의무가 있습니다.
          </span>
          <span>
            • 허위 표기·타인의 저작물 무단 업로드 등 침해 사실이 확인되면 회사는
            판매 중지/삭제/정산 보류/계정 제한 등 필요한 조치를 할 수 있습니다.
          </span>
        </p>
      )
    },
    {
      title: '5. 금지 행위',
      content: (
        <p>
          <span>
            • 타인의 저작물을 무단 업로드·배포·전송·공유(링크 비공개라 하더라도
            포함)
          </span>
          <span>
            • 유료 콘텐츠의 스크래핑·캡처·복제·DRM 무력화·워터마크 제거
          </span>
          <span>
            • 오픈 라이선스(CC 등) 표기를 누락하거나 라이선스 조건을 위반하는
            행위
          </span>
          <span>• 자동화 도구를 통한 대량 다운로드·재유통 등</span>
        </p>
      )
    },
    {
      title: '6. 침해 신고(통지) 및 처리 절차(Notice & Takedown)',
      content: (
        <p>
          <span>① 신고 요건(권리자 또는 대리인)</span>
          <span className={styles.indent}>
            아래 정보를 포함하여 저작권 침해 신고를 제출하세요(전용
            양식/이메일/우편).
          </span>
          <span className={styles.indent2}>
            • 권리자 성명(법인명)·연락처, 대리인의 경우 위임 증빙
          </span>
          <span className={styles.indent2}>
            • 침해 주장 콘텐츠의 위치(URL, 게시물 ID, 캡처 등) – 구체적·개별적
            특정 필요(대법원 판례 취지).
          </span>
          <span className={styles.indent2}>
            • 권리 보유 사실을 소명할 증빙 자료(원본·등록증·계약서 등)
          </span>
          <span className={styles.indent2}>
            • 삭제/전송중단 요청의 사유와 범위
          </span>
          <span className={styles.indent2}>• 서명(전자서명 가능)</span>

          <span>② 1차 조치(복제·전송의 중단)</span>
          <span className={styles.indent}>
            정상 접수 시 회사는 지체 없이 해당 콘텐츠의 복제·전송을 임시
            중단하고, 업로더(복제·전송자) 및 신고인(권리주장자) 에게 통지합니다.
          </span>
          <span>③ 임시조치 기간 및 공시</span>
          <span className={styles.indent}>
            권리 침해 판단이 어렵거나 당사자 간 다툼이 예상되는 경우, 회사는
            최대 30일 임시차단을 적용할 수 있으며 필요한 조치를 한 사실을 게시판
            공시 등으로 이용자가 알 수 있도록 안내합니다.
          </span>
          <span>④ 이의신청(재게시 요청)</span>
          <span className={styles.indent}>
            업로더는 중단 통지를 받은 날로부터 임시조치 기간 내에 정당한 권리
            보유 또는 침해 아님을 소명하는 이의신청을 제출할 수 있습니다. 회사는
            관련 법령·정책에 따라 재게시 여부를 판단합니다
          </span>
          <span>⑤ 오신고 책임</span>
          <span className={styles.indent}>
            정당한 권리 없이 중단 또는 재개를 요구하여 손해를 발생시킨 자는 그
            손해를 배상해야 합니다(남용 방지).
          </span>
          <span className={styles.indent}>
            • 운영 SLA(권고): 영업일 3일 이내 1차 조치, 7일 이내 판단/임시조치
            통지, 임시조치 중에는 당사자 협의 또는 증빙 보완을 안내(법정 의무는
            아니나 투명성 제고 목적).
          </span>
        </p>
      )
    },
    {
      title: '7. 반복 침해자 정책',
      content: (
        <p>
          <span>
            • 동일 계정 또는 실질적으로 동일한 주체가 반복적으로 침해를 야기하는
            경우, 회사는 경고 → 일정 기간 업로드 금지 → 정산 보류 → 계정 해지
            순으로 강도 높은 제재를 적용할 수 있습니다.
          </span>
          <span>
            • 반복의 기준(예: 30일 내 2회 이상, 분기 3회 이상 등)은 운영정책에
            고지합니다.
          </span>
        </p>
      )
    },
    {
      title: '8. 오픈 라이선스·공공저작물',
      content: (
        <p>
          <span>
            • CC 라이선스/공공누리 등 오픈 라이선스 자료를 사용할 때는
            표시(저작자·출처·라이선스 유형) 준수와 비상업/변경금지 등 조건을
            따라야 합니다(각 라이선스 조건).
          </span>
          <span>
            • 문화체육관광부 가이드라인·자료를 참고하여 표기 예시와 자주 묻는
            질문(FAQ)을 제공하는 것을 권장합니다.
          </span>
        </p>
      )
    },
    {
      title: '9. 기술적 보호조치',
      content: (
        <p>
          <span>
            • 회사는 필요 시 워터마크·DRM·다운로드 제한·스트리밍 보호 등 기술적
            보호조치를 시행할 수 있습니다.
          </span>
          <span>
            • 이를 무력화·우회하는 행위는 금지되며, 민·형사 책임 및 계정 제재
            사유가 됩니다.
          </span>
        </p>
      )
    },
    {
      title: '10. 권리자 지원 및 투명성',
      content: (
        <p>
          <span>
            • 회사는 전용 신고 채널(웹 양식/이메일)을 운영하고, 처리 결과를
            신고인·업로더 양측에 통지합니다
          </span>
          <span>
            • 분쟁이 잦은 카테고리·판매자에 대해 사전 검토·승인제 또는 추가 증빙
            요구를 적용할 수 있습니다.
          </span>
          <span>
            • 연 1회 이상 침해 대응 통계(접수·차단·재게시·제재 현황) 공지를
            권장합니다(투명성 보고).
          </span>
        </p>
      )
    },
    {
      title: '11. 책임 제한(온라인서비스제공자, OSP)',
      content: (
        <p>
          <span>
            • 플랫폼은 통신판매중개 및 호스팅을 제공하는 온라인서비스제공자(OSP)
            로서 권리자 통지에 따라 합리적 범위 내에서 복제·전송의 중단 등
            필요한 조치를 합니다.
          </span>
          <span>
            • 다만, 플랫폼이 구체적·개별적 침해 사실을 인식하지 못했거나
            기술·경제적으로 통제가 곤란한 경우까지 일반적 감시 의무를 부담하지
            않습니다(대법원 판례 취지).
          </span>
        </p>
      )
    },
    {
      title: '12. 정책 개정과 문의',
      content: (
        <p>
          <span>
            본 정책은 약관 및 운영정책의 일부로서 개정될 수 있으며, 주요 변경 시
            사전 공지합니다.
          </span>
          <span className={styles.indent}>• 저작권 전담 창구</span>
          <span className={styles.indent2}>
            • 이메일 : teachersmarket@naver.com
          </span>
          <span className={styles.indent2}>
            • 접수 필수 항목: 권리자/대리인 정보, 연락처, 문제 게시물의 정확한
            URL/ID, 권리 보유 증빙, 요청 사유/범위, 서명
          </span>
          <span className={styles.indent2_bar}>
            • 처리 절차: 정상 접수 시 지체 없이 삭제/임시조치 후 신고인·게시자
            모두에게 통지하며, 필요한 경우 게시판 공시합니다. 게시자는 기간 내
            이의신청을 통해 재게시 요청이 가능합니다. (오신고로 인한 손해 발생
            시 책임이 부과될 수 있습니다.
          </span>
        </p>
      )
    }
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <h1>저작권 정책</h1>
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

export default CopyrightPolicyPage
