'use client'

import Image from 'next/image'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import '../SlidePagination.scss'
import styles from './ExperienceList.module.scss'

import ImgExperience_01 from '@/assets/images/main/experience_01.png'
import ImgExperience_02 from '@/assets/images/main/experience_02.png'
import ImgExperience_03 from '@/assets/images/main/experience_03.png'
import ImgExperience_04 from '@/assets/images/main/experience_04.png'
import ImgExperience_05 from '@/assets/images/main/experience_05.png'
import { Icon } from '@/components/Icon'

const ExperienceList = () => {
  return (
    <div className={styles.experience_slide}>
      <div className='experience_nav'>
        <button className='experience_prev'>
          <Icon name='arrow-right' color='currentColor' size={36} />
        </button>
        <button className='experience_next'>
          <Icon name='arrow-right' color='currentColor' size={36} />
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={'auto'}
        navigation={{
          prevEl: `.experience_prev`,
          nextEl: `.experience_next`
        }}
      >
        <SwiperSlide className={styles.img_ver}>
          <Image src={ImgExperience_01} alt='칠판 수업 이미지' />
        </SwiperSlide>
        <SwiperSlide className={styles.yellow}>
          <Icon name='quote-back' color='currentColor' />
          <p>
            내 자료를 업로드하고 <br className='pc' />
            판매해서 부가적인 수입을 얻고 있어요.
          </p>
        </SwiperSlide>
        <SwiperSlide className={styles.img_ver}>
          <Image src={ImgExperience_02} alt='강의실 이미지' />
        </SwiperSlide>
        <SwiperSlide className={styles.turquoise}>
          <Icon name='quote-back' color='currentColor' />
          <p>
            내가 만든 자료가 <br className='pc' />
            다른 선생님과 <br className='pc' />
            학생들에게도 <br className='pc' />
            도움이 된다는 게 <br className='pc' />큰 보람이 됩니다
          </p>
        </SwiperSlide>
        <SwiperSlide className={styles.blue}>
          <Icon name='quote-back' color='currentColor' />
          <p>
            자료가 체계적으로 <br className='pc' />
            정리되어 있어서 너무 편리했어요.
          </p>
        </SwiperSlide>
        <SwiperSlide className={styles.img_ver}>
          <Image src={ImgExperience_03} alt='책장 이미지' />
        </SwiperSlide>
        <SwiperSlide className={styles.green}>
          <Icon name='quote-back' color='currentColor' />
          <p>교사로서 쌓은 경험을 그대로 콘텐츠로 만들 수 있어서 좋아요.</p>
        </SwiperSlide>
        <SwiperSlide className={styles.img_ver}>
          <Image src={ImgExperience_04} alt='어린아이 이미지' />
        </SwiperSlide>
        <SwiperSlide className={styles.darkblue}>
          <Icon name='quote-back' color='currentColor' />
          <p>
            학생들이 흥미를 수업에 보이고 전보다 더 적극적으로 참여하게 돼서
            기뻐요.
          </p>
        </SwiperSlide>
        <SwiperSlide className={styles.beige}>
          <Icon name='quote-back' color='currentColor' />
          <p>다양한 주제의 콘텐츠 덕분에 수업 폭이 넓어졌어요.</p>
        </SwiperSlide>
        <SwiperSlide className={styles.img_ver}>
          <Image src={ImgExperience_05} alt='교재 이미지' />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default ExperienceList
