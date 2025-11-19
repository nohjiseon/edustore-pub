'use client'

import { useRouter } from 'next/navigation'
import { useId } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import '../SlidePagination.scss'

import { mockEducationList } from '../../_mock/educationList'

import { Icon } from '@/components/Icon'
import { ContentCard, TagList } from '@/components/ui'
import { convertTagDataToTags } from '@/utils/tag'

interface Props {
  className?: string
}

const EducationList = ({ className }: Props) => {
  const router = useRouter()
  const uniqueId = useId()

  const handleCardClick = (id: number) => {
    router.push(`/search/${id}`)
  }

  return (
    <div className={className}>
      <div className='educationslide_nav'>
        <button className={`education_prev prev_${uniqueId}`}>
          <Icon name='arrow-right' color='currentColor' />
        </button>
        <button className={`education_next next_${uniqueId}`}>
          <Icon name='arrow-right' color='currentColor' />
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={8}
        slidesPerView={'auto'}
        navigation={{
          nextEl: `.next_${uniqueId}`,
          prevEl: `.prev_${uniqueId}`
        }}
        breakpoints={{
          1280: {
            spaceBetween: 24
          },
          1700: {
            slidesPerView: 4,
            spaceBetween: 24
          }
        }}
      >
        {mockEducationList.map((content) => (
          <SwiperSlide key={content.id} className='education_slide'>
            <ContentCard
              key={content.id}
              id={content.id}
              rating={content.rating}
              tags={<TagList tags={convertTagDataToTags(content.tags)} />}
              title={content.title}
              description={content.description}
              author={content.author}
              price={content.price}
              imageSrc={content.imageSrc}
              onClick={() => handleCardClick(content.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default EducationList
