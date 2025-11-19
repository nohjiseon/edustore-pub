'use client'

import styles from './OrderProductList.module.scss'

import ContentInfo, {
  ContentInfoProps
} from '@/components/ui/ContentInfo/ContentInfo'

interface Props {
  products?: ContentInfoProps[]
}

// 더미데이터
const DUMMY_PRODUCT: ContentInfoProps = {
  tags: [
    { name: '초3', color: 'green' },
    { name: '독서교육', color: 'blue' }
  ],
  title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
  author: {
    name: '수업가게닉네임'
  },
  price: 50000,
  imageSrc: undefined
}

const OrderProductList = ({ products }: Props) => {
  // products가 없거나 빈 배열일 경우 더미데이터 사용
  const displayProducts =
    products && products.length > 0 ? products : [DUMMY_PRODUCT]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>주문 자료</h2>
      </div>

      <div className={styles.product_list}>
        {displayProducts.map((product, index) => (
          <ContentInfo key={index} {...product} />
        ))}
      </div>
    </div>
  )
}

export default OrderProductList
