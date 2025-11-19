'use client'

import { useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import { FilterDropdown } from '~/components/ui'

interface AccordionSection {
  title: string
  content: JSX.Element
}

const PrivacyPolicyPage = () => {
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
    8: true
  })

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }
  const accordionSections: AccordionSection[] = [
    {
      title: '1. 개인정보처리방침 (개인정보 개정일자 : 2025.11.28)',
      content: (
        <p>
          &apos;(주)수업가게&apos;는 (이하 &apos;회사&apos;는) 개인정보보호법 제
          30조에 따라 고객님의 개인정보를 중요시하며 정보통신망 이용촉진 등에
          관한 법률 및 개인정보보호 규정 및 방송통신위원회의 개인정보의 기술적,
          관리적 보호조치 기준 고시를 준수하고 있습니다. 회사는
          개인정보처리방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한
          용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가
          취해지고 있는지 알려드립니다. 다음 개인정보 처리 방침은 시행일로부터
          적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있을
          경우에는 변경사항의 시행 전에 웹사이트 공지사항 (또는 개별공지)을
          통하여 공지할 것입니다.
        </p>
      )
    },
    {
      title: '2. 개인정보의 처리 목적',
      content: (
        <p>
          개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의
          목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경될
          시에는「개인정보보호법」제 18조에 따라 별도의 동의를 받는 등 필요한
          조치를 이행할 예정입니다. &quot;개인정보의 처리&quot;란 개인정보의
          수집, 생성, 기록, 저장, 보유, 가공, 편집, 검색, 출력, 정정(訂正),
          복구, 이용, 제공, 공개, 파기(破棄), 그 밖에 이와 유사한 행위를 말함.
          <br />
          <br />• 개인 식별, 상담, 불만처리 등 민원처리, 고지사항 전달
        </p>
      )
    },
    {
      title: '3. 개인정보의 처리 및 보유기간',
      content: (
        <p>
          개인정보 보유 기간 : 업무상 필요 시기까지. 감사 및 이력 관리를 위해
          사용
        </p>
      )
    },
    {
      title: '4. 개인정보의 제3자 제공',
      content: (
        <p>
          회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한
          범위 내에서만 처리하며, 다음의 경우를 제외하고 정보주체의 동의, 법률의
          특별한 규정 등이 없이는 본래의 목적 범위를 초과하여 처리하거나
          제3자에게 제공하지 않습니다.
          <br />
          <br />
          <span>① 정보주체로부터 별도의 동의를 받은 경우</span>
          <span>② 다른 법률에 특별한 규정이 있는 경우</span>
          <span>
            ③ 정보주체 또는 그 법정대리인이 의사표시를 할 수 없는 상태에 있거나
            주소불명 등으로 사전동의를 받을 수 없는 경우로서 명백히 정보주체
            또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고
            인정되는 경우
          </span>
          <span>
            ④ 통계작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정
            개인을 알아볼 수 없는 형태로 개인정보를 제공하는 경우
          </span>
          <span>
            ⑤ 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공하지
            아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우로서
            보호위원회의 심의, 의결을 거친 경우
          </span>
          <span>
            ⑥ 조약, 그 밖의 국제협정의 이행을 위하여 외국정부 또는 국제기구에
            제공하기 위하여 필요한 경우
          </span>
          <span>⑦ 범죄의 수사와 공소의 제기 및 유지를 위하여 필요한 경우</span>
          <span>⑧ 법원의 재판업무 수행을 위하여 필요한 경우</span>
          <span>⑨ 형(刑) 및 감호, 보호처분의 집행을 위하여 필요한 경우</span>
        </p>
      )
    },
    {
      title: '5. 개인정보처리의 위탁',
      content: (
        <p>
          회사는 원칙적으로 이용자의 동의없이 해당 개인정보의 처리를 타인에게
          위탁하지 않습니다. 향후 개인정보처리 위탁 필요가 생길 경우 위탁대상자,
          위탁업무내용, 위탁기간, 위탁계약 내용(개인정보보호 관련 법규의 준수,
          개인정보에 관한 제3자 제공 금지 및 책임부담 등을 규정)을 공지 사항 및
          개인정보처리방침을 통해 고지하겠습니다. 또한 필요한 경우 사전동의를
          받도록 하겠습니다.
        </p>
      )
    },
    {
      title: '6. 정보주체의 권리·의무 및 행사방법',
      content: (
        <p>
          정보의 주체는 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
          있습니다.
          <br />
          <br />
          <br />
          <span>① 개인정보 열람요구</span>
          <span>② 오류 등이 있을 경우 정정요구</span>
          <span>③ 삭제요구</span>
          <span>④ 처리정지 요구</span>
        </p>
      )
    },
    {
      title: '7. 수집하는 개인정보 항목',
      content: (
        <p>
          회사는 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고
          있습니다.
          <br />
          <br />
          <br />
          <span>
            • 수집항목(제품문의) :{' '}
            <span className={styles.content}>성함, 회사명, 연락처, 이메일</span>
          </span>
          <span>
            • 개인정보 수집방법 :{' '}
            <span className={styles.content}>Contact Us</span>
          </span>
          <span>
            • 개인정보의 파기 :{' '}
            <span className={styles.content}>
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
              회사는 업무상 또는 물류서비스 이력관리가 필요한 경우 데이터를
              유지합니다.
            </span>
          </span>
          <span>
            • 파기방법 :{' '}
            <span className={styles.content}>
              전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
              사용합니다. 종이에 기록된 정보는 파쇄합니다.
            </span>
          </span>
        </p>
      )
    },
    {
      title: '8. 개인정보의 안전성 확보조치',
      content: (
        <p>
          회사는 개인정보의 안전성 확보를 위해 다음과 같이 조치를 취하고
          있습니다.
          <br />
          <br />
          <br />
          <span>
            • 관리적 조치 :{' '}
            <span className={styles.content}>
              내부관리계획 수립 및 시행, 정기적 직원 교육 등
            </span>
          </span>
          <span>
            • 기술적 조치 :{' '}
            <span className={styles.content}>
              데이터베이스에 대한 접근권한 관리, 접근통제시스템 설치,
              고유식별정보 등의 암호화, 보안프로그램 설치
            </span>
          </span>
          <span>
            • 물리적 조치 :{' '}
            <span className={styles.content}>서버실 등의 접근 통제</span>
          </span>
        </p>
      )
    },
    {
      title: '9. 개인정보 보호책임자',
      content: (
        <p>
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
          관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다.
          <br />
          <br />
          <br />
          <br />• 개인정보 보호책임자: 이선영 (010-4035-8268)
          <br />
          <br />
          <br />
          정보주체는 회사의 서비스(또는 사업)을 이용하면서 발생한 모든 개인정보
          보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
          보호책임자에게 문의할 수 있습니다. 회사는 정보주체의 문의에 대해
          지체없이 답변 및 처리해드릴 것입니다.
        </p>
      )
    }
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <h1>개인정보처리방침</h1>
        <div className={styles.policy_history_wrap}>
          <FilterDropdown
            options={[]}
            defaultValue='2025. 11. 28 이전 방침 보기'
          />
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

export default PrivacyPolicyPage
