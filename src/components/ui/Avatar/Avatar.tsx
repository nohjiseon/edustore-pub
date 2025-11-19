'use client'

import { StaticImageData } from 'next/image'
import { useState, SyntheticEvent } from 'react'

import styles from './Avatar.module.scss'

import defaultAvatar from '@/assets/images/common/default_profile.png'

export interface AvatarProps {
  name: string
  avatar?: string | StaticImageData
  size?: number
}

const Avatar = ({ name, avatar, size = 22 }: AvatarProps) => {
  // StaticImageData를 문자열로 변환
  const getImageSrc = (img: string | StaticImageData | undefined): string => {
    if (!img) return defaultAvatar.src
    if (typeof img === 'string') return img
    return img.src
  }

  const [imgSrc, setImgSrc] = useState<string>(getImageSrc(avatar))

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    // 무한 루프 방지: 이미 기본 이미지면 재시도하지 않음
    if (imgSrc !== defaultAvatar.src) {
      setImgSrc(defaultAvatar.src)
    }
  }

  return (
    <div className={styles.avatar_container}>
      <img
        src={imgSrc}
        alt={name}
        className={styles.avatar_image}
        style={{ width: `${size}px`, height: `${size}px` }}
        onError={handleError}
      />
      <span className={styles.avatar_name}>{name}</span>
    </div>
  )
}

export default Avatar
