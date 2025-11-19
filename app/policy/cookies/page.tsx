'use client'

import styles from './page.module.scss'

interface AccordionSection {
  title: string
  content: JSX.Element
}

const CookiesPolicyPage = () => {
  const accordionSections: AccordionSection[] = [
    {
      title: '1. 쿠키는 무엇인가요?',
      content: (
        <p>
          현재 가동중인 웹사이트는 고객 맞춤형 서비스를 제공하기 위하여 고객님의
          웹사이트 사용 관련 정보의 일부를 저장하고 참조하는 쿠키(cookie)를
          사용합니다. 쿠키는 고객님이 웹사이트에 접속하고 활용하는 과정에서
          웹서버가 고객님의 웹브라우저에 소용량의 텍스트 파일을 전달하고
          고객님의 컴퓨터 메모리 또는 하드 디스크에 저장합니다. 향후 고객님이
          웹사이트에 재접속할 때 고객님의 메모리 또는 하드 디스크에 저장되어
          있는 쿠키의 내용을 확인하여 고객님에게 최적화된 사용자 환경을 유지하고
          최적화된 맞춤 서비스를 제공하도록 합니다. 쿠키는 개인 식별 가능정보를
          수집하지 않습니다. 고객님은 사용과정에서 쿠키에 정보를 저장하는 것을
          원치 않으실 경우 거부하시거나 저장 정보를 삭제하실 수 있습니다.
        </p>
      )
    },
    {
      title: '2. 사용목적',
      content: (
        <p>
          웹사이트에 접속하시는 고객님의 방문 빈도나 사용시간 등을 확인하여
          고객서비스 품질 향상과 고객 맞춤형 서비스를 고도화하기 위해 쿠키를
          활용하고 있습니다.
          <br />
          <br />
          <br />
          <span>• 접속통계, 분석툴</span>
          <span>• 팝업창 운영</span>
          <span>• 물이벤트 참여</span>
        </p>
      )
    },
    {
      title: '3. 개인정보의 처리 및 보유기간',
      content: (
        <p>
          고객님은 쿠키 사용 및 설치에 대한 선택하실 수 있습니다. 쿠키를
          사용하도록 허용하거나 쿠키 사용을 거부하실 수 있습니다. 대부분의 웹
          브라우저는 쿠키 사용이 허용으로 설정되어 있으며 쿠키 사용을 제어하기
          위해서는 웹브라우저의 설정을 조정하셔야 합니다.
          <br />
          <br />
          <br />
          <span>• 웹브라우저 종류에 따라 설정방법에 다소 차이가 있습니다.</span>
          <span>• 웹브라우저의 [설정]에서 ‘쿠키’로 검색하십시오.</span>
          <br />
          <br />
          쿠키 사용을 거부하실 경우 웹사이트의 대부분의 정보에 접근하실 수
          있으나 고객 맞춤형 서비스에 제한이 발생될 수 있습니다.
        </p>
      )
    }
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <h1>쿠키정책</h1>
      </div>

      <div className={styles.policy_info_wrap}>
        {accordionSections.map((section, index) => {
          return (
            <div key={index} className={styles.list_wrap}>
              <div className={styles.info_title_wrap}>
                <span>{section.title}</span>
              </div>
              <div className={styles.info_desc_wrap}>{section.content}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default CookiesPolicyPage
