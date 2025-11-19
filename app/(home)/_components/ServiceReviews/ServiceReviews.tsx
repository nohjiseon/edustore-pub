'use client'
import styles from './ServiceReviews.module.scss'

import { Icon } from '@/components/Icon'

const ServiceReviews = () => {
  return (
    <ul className={styles.review_list}>
      <li>
        <Icon name='img-circle01' color='#11C5D4' size={96} />
        <strong>경험이 모여 더 큰 가치로</strong>
        <p>
          선생님들의 다양한 수업자료가 모여, 누구나 활용할 수 있는 풍부한 자원이
          됩니다.
        </p>
      </li>
      <li>
        <Icon name='img-circle02' color='#11C5D4' size={96} />
        <strong>작은 자료, 큰 울림</strong>
        <p>
          한 명의 교사가 만든 자료가 여러 교실로 확산되어 더 넓은 배움으로
          이어집니다.
        </p>
      </li>
      <li>
        <Icon name='img-circle03' color='#11C5D4' size={96} />
        <strong>체계적으로 쌓이는 자료</strong>
        <p>
          학년별, 과목별, 특수교육까지 다양한 자료가 체계적으로 정리되어
          있습니다.
        </p>
      </li>
      <li>
        <Icon name='img-circle04' color='#11C5D4' size={96} />
        <strong>다양한 방식과 균형 잡힌 선택</strong>
        <p>
          개인 결제는 물론, 학교 단체 예산으로도 편리하게 구매할 수 있습니다.
        </p>
      </li>
    </ul>
  )
}
export default ServiceReviews
