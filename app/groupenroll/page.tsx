'use client'

import styles from './page.module.scss'

const GroupEnroll = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>단체 및 기관 등록</h1>
      <p className={styles.description}>
        단체(학교, 기관 등)에 소속을 승인받고, 충전금을 이용해 수업 자료를
        구매해보세요.
      </p>
      <p className={styles.info_txt}>단체 등록 안내</p>
    </div>
  )
}

export default GroupEnroll
