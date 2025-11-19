import Image, { StaticImageData } from 'next/image'

import styles from './ContentInfo.module.scss'

import defaultCardImage from '@/assets/images/contents/card_example.png'
import { Icon } from '@/components/Icon'
import Avatar from '@/components/ui/Avatar'
import TagList, { Tag } from '@/components/ui/TagList'

interface AuthorData {
  name: string
  avatar?: string | StaticImageData
}

export interface ContentInfoProps {
  tags: Tag[]
  title: string
  author: AuthorData
  price?: number
  imageSrc?: string | StaticImageData
  checked?: boolean
  onDelete?: () => void
}

const ContentInfo = ({
  checked,
  tags,
  title,
  author,
  price,
  onDelete,
  imageSrc = defaultCardImage
}: ContentInfoProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR')
  }

  return (
    <div className={styles.content_info_container}>
      {checked !== undefined && (
        <div className={styles.checkbox_wrapper}>
          <Icon
            name={checked ? 'checkbox-fill-s' : 'checkbox-none-s'}
            className={styles.checkbox}
          />
        </div>
      )}

      <div className={styles.content_wrapper}>
        <div className={styles.thumbnail_wrapper}>
          <Image
            src={imageSrc}
            alt={title}
            width={100}
            height={100}
            className={styles.thumbnail}
          />
        </div>

        <div className={styles.info_section}>
          <TagList tags={tags} />
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.bottom_info}>
            <Avatar name={author.name} avatar={author.avatar} size={22} />
            {price === 0 ? (
              <p className={styles.price}>0</p>
            ) : (
              <p className={styles.price}>{formatPrice(price)}</p>
            )}
          </div>
        </div>
      </div>

      {onDelete && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className={styles.delete_button}
          aria-label='삭제'
        >
          <Icon name='close-s' color='var(--color-neutral-grey-1)' />
        </button>
      )}
    </div>
  )
}

export default ContentInfo
export type { AuthorData }
