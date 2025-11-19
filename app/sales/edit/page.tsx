'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import styles from './page.module.scss'

import defaultProfile from '@/assets/images/common/default_profile.png'
import salesBack from '@/assets/images/sub/sales_back.png'
import { Icon } from '~/components/Icon'
import { Button } from '~/components/ui'

const SalesEditPage = () => {
  const router = useRouter()
  const [name, setName] = useState('홍길동')
  const [description, setDescription] = useState(
    '수업가게 내 거래한 게시판작성 내 거래에 대한 별점 소개 글을 작성합니다.'
  )
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const backgroundFileInputRef = useRef<HTMLInputElement>(null)
  const profileFileInputRef = useRef<HTMLInputElement>(null)

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBackgroundImageClick = (e: React.MouseEvent) => {
    e.preventDefault()
    backgroundFileInputRef.current?.click()
  }

  const handleProfileImageClick = () => {
    profileFileInputRef.current?.click()
  }

  const handleDeleteProfileImage = () => {
    setProfileImage(null)
    // 파일 입력 초기화
    if (profileFileInputRef.current) {
      profileFileInputRef.current.value = ''
    }
  }

  const handleCancel = () => {
    router.push('/sales')
  }

  const handleSave = () => {
    // TODO: 프로필 저장 API 호출
    console.log('저장하기:', { name, description })
    router.push('/sales')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top_imgbox}>
        <input
          ref={backgroundFileInputRef}
          type='file'
          accept='image/*'
          onChange={handleBackgroundImageChange}
          className={styles.hidden_input}
        />
        <label
          onClick={handleBackgroundImageClick}
          className={styles.image_replace_label}
        >
          이미지 교체
        </label>
        <Image
          src={backgroundImage || salesBack.src}
          alt='백그라운드'
          fill
          priority
          unoptimized
        />
      </div>

      {/* 프로필 섹션 */}
      <div className={styles.profile_section}>
        <div className={styles.profile_wrap}>
          <div className={styles.profile_img} onClick={handleProfileImageClick}>
            <input
              ref={profileFileInputRef}
              type='file'
              accept='image/*'
              onChange={handleProfileImageChange}
              className={styles.hidden_input}
            />
            <Image
              src={profileImage || defaultProfile}
              alt='profile'
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
            <span className={styles.ic_edit}>
              <Icon name='edit-s' />
            </span>
          </div>
          <button
            className={styles.delete_btn}
            onClick={handleDeleteProfileImage}
          >
            이미지 삭제
          </button>

          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.name_input}
          />
        </div>

        <div className={styles.stats}>
          <div className={styles.stat_item}>
            <Icon name='like' size={20} color='var(--color-primary)' />
            <span>000</span>
          </div>
          <div className={styles.stat_item}>
            <Icon name='star' size={20} color='#FFD52B' />
            <span>4.8/5(200)</span>
          </div>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.my_info_textarea}
          placeholder='소개 글을 작성해주세요.'
        />

        <div className={styles.btn_box}>
          <Button variant='outline' width={195} onClick={handleCancel}>
            취소하기
          </Button>
          <Button variant='default' width={195} onClick={handleSave}>
            저장하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SalesEditPage
