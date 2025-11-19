import Image from 'next/image'

import styles from './UploaderInfo.module.scss'

import { Icon } from '~/components/Icon'

interface Props {
  profileImage: string
  name: string
  introduction: string
  likeCount: number
  rating: number
  reviewCount: number
}

const UploaderInfo = ({
  profileImage,
  name,
  introduction,
  likeCount,
  rating,
  reviewCount
}: Props) => {
  return (
    <div className={styles.uploader_info}>
      <div className={styles.profile_section}>
        <div className={styles.profile_image_wrapper}>
          <Image
            src={profileImage}
            alt={`${name} 프로필 이미지`}
            width={103}
            height={103}
            className={styles.profile_image}
          />
        </div>

        <div className={styles.info_wrapper}>
          <div className={styles.text_section}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.introduction}>{introduction}</p>
          </div>

          <div className={styles.stats_section}>
            <div className={styles.stat_badge}>
              <div className={styles.icon_wrapper}>
                <Icon name='like' color='var(--color-primary)' />
              </div>
              <span className={styles.stat_text}>{likeCount}</span>
            </div>

            <div className={styles.stat_badge}>
              <div className={styles.icon_wrapper}>
                <Icon name='star' color='var(--color-action-warning)' />
              </div>
              <span className={styles.stat_text}>
                {rating}/5({reviewCount})
              </span>
            </div>
          </div>
        </div>
      </div>

      <button className={styles.profile_button}>프로필 방문</button>
    </div>
  )
}

export default UploaderInfo
