'use client'

import { useRouter } from 'next/navigation'

import styles from './page.module.scss'

import { Button } from '~/components/ui'

const NoticeDetailPage = () => {
  const router = useRouter()

  const handleGoToList = () => {
    router.push('/notice')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>수업가게 공지사항</h1>
        <p className={styles.description}>
          수업가게의 최신 소식과 서비스 이용 안내를 확인해 보세요.
        </p>
      </div>

      <div className={styles.detail_wrap}>
        <p className={styles.info_txt}>
          [안내] 수업가게 서비스 점검 예정 안내 (11/15 00:00~03:00)
        </p>
        <div className={styles.date_box}>
          <span>수업가게</span>
          <span>2025.11.05</span>
        </div>
        <pre>
          {`안녕하세요, 수업가게 운영팀입니다. 
안정적인 서비스 제공을 위해 아래 일정으로 시스템 점검이 진행될 예정입니다. 

점검 일시 : 2025년 11월 15일(토) 00:00 ~ 03:00
점검 영향 : 사이트 접속 및 결제 서비스 일시 중단 
대상 서비스 : 웹, 모바일 전체 

이용에 불편을 드려 죄송하며, 더 나은 서비스를 제공하기 위해 노력하겠습니다. 

감사합니다. 
수업가게 운영팀 드림`}
        </pre>
      </div>

      <div className={styles.btn_wrap}>
        <Button variant='outline' width={376} onClick={handleGoToList}>
          목록으로 돌아가기
        </Button>
      </div>
    </div>
  )
}

export default NoticeDetailPage
