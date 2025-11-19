import styles from './ImageThumbnail.module.scss'

import { cn } from '@/lib/utils'

interface Props {
  imageSrc: string
  imageAlt?: string
  imageCount?: number
  countPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  onClick?: () => void
  className?: string
}

const ImageThumbnail = ({
  imageSrc,
  imageAlt = '썸네일 이미지',
  imageCount,
  countPosition = 'top-right',
  onClick,
  className
}: Props) => {
  const showCount = imageCount && imageCount > 1

  return (
    <div
      className={cn(
        styles.thumbnail_container,
        onClick && styles.clickable,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img src={imageSrc} alt={imageAlt} className={styles.thumbnail_image} />
      {showCount && (
        <div
          className={cn(
            styles.image_count,
            styles[`position_${countPosition.replace('-', '_')}`]
          )}
        >
          {imageCount}
        </div>
      )}
    </div>
  )
}

export default ImageThumbnail
