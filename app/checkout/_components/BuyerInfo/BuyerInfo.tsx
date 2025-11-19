'use client'

import styles from './BuyerInfo.module.scss'

interface Props {
  name: string
  phone: string
  email: string
}

const BuyerInfo = ({ name, phone, email }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>구매자</h2>

      <div className={styles.info_grid}>
        <div className={styles.label_column}>
          <p className={styles.label}>이름</p>
          <p className={styles.label}>휴대폰 번호</p>
          <p className={styles.label}>이메일</p>
        </div>

        <div className={styles.value_column}>
          <p className={styles.value}>{name}</p>
          <p className={styles.value}>{phone}</p>
          <p className={styles.value}>{email}</p>
        </div>
      </div>
    </div>
  )
}

export default BuyerInfo
