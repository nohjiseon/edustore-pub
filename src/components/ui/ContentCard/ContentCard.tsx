import Image, { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

import styles from './ContentCard.module.scss'

import defaultCardImage from '@/assets/images/contents/card_example.png'
import { Icon } from '@/components/Icon'
import Avatar from '@/components/ui/Avatar'

interface AuthorData {
  name: string
  avatar?: string | StaticImageData
}

interface ContentCardProps {
  id: number
  rating: number
  tags?: ReactNode
  title: string
  description: string
  author: AuthorData
  price: number
  imageSrc?: string | StaticImageData
  maxWidth?: number | string
  onClick?: () => void
}

const ContentCard = ({
  id,
  rating,
  tags,
  title,
  description,
  author,
  price,
  imageSrc = defaultCardImage,
  maxWidth,
  onClick
}: ContentCardProps) => {
  const formatPrice = (price: number) => {
    if (price === 0) {
      return '무료'
    }
    return price.toLocaleString('ko-KR')
  }

  return (
    <div
      className={styles.card_container}
      onClick={onClick}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <div className={styles.image_wrapper}>
        <Image src={imageSrc} alt={title} fill className={styles.card_image} />
        <div className={styles.gradient_overlay} />
        <div className={styles.rating_badge}>
          <Icon
            name='star'
            className={styles.star_icon}
            color='var(--color-neutral-white)'
          />
          <span className={styles.rating_text}>{rating}</span>
        </div>
      </div>

      <div className={styles.contents_bottom}>
        <div className={styles.content_info}>
          {tags}
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.author_price_section}>
          <Avatar name={author.name} avatar={author.avatar} size={22} />
          <div className={styles.price}>{formatPrice(price)}</div>
        </div>
      </div>
    </div>
  )
}

export default ContentCard
export type { AuthorData, ContentCardProps }
