import Link from 'next/link'

import styles from './BeforeUseSection.module.scss'

import { cn } from '~/lib/utils'

interface Props {
  className?: string
  titleClassName?: string
}

const BeforeUseSection = ({ className, titleClassName }: Props) => {
  return (
    <section className={cn(styles.section, className)}>
      <h2 className={cn(styles.title, titleClassName)}>이용 전 확인하세요</h2>

      <div className={styles.content_wrapper}>
        <div className={styles.notice_wrapper}>
          <p className={styles.notice_text}>
            수업가게의 자료는 교사 회원이 직접 제작·업로드한 콘텐츠로 주문 취소,
            환불 요청 등의 상세 규정은 서비스 정책에 따라 적용됩니다.{' '}
            <button type='button' className={styles.view_all_button}>
              <Link href='/policy/terms' className={styles.view_all_link}>
                유의사항 전체보기
              </Link>
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}

export default BeforeUseSection
