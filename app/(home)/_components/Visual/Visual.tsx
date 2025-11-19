'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from './Visual.module.scss'
import '../SlidePagination.scss'

import defaultCardImage from '@/assets/images/contents/card_example.png'
import IcBtn1 from '@/assets/images/main/ic_btn1.png'
import IcBtn2 from '@/assets/images/main/ic_btn2.png'
import IcBtn3 from '@/assets/images/main/ic_btn3.png'
import IcBtn4 from '@/assets/images/main/ic_btn4.png'
import IcBtn5 from '@/assets/images/main/ic_btn5.png'
import IcBtn6 from '@/assets/images/main/ic_btn6.png'
import IcBtn7 from '@/assets/images/main/ic_btn7.png'
import IcBtn8 from '@/assets/images/main/ic_btn8.png'
import IcClock from '@/assets/images/main/ic_clock.png'
import IcFolder from '@/assets/images/main/ic_folder.png'
import IcHot from '@/assets/images/main/ic_hot.png'
import IcNote from '@/assets/images/main/ic_note.png'
import IcPin from '@/assets/images/main/ic_pin.png'
import IcPuzzle from '@/assets/images/main/ic_puzzle.png'
import { Icon } from '@/components/Icon'
import { Button, FloatingButton } from '@/components/ui'
import Avatar from '@/components/ui/Avatar'
import GravityBox from '@/components/ui/GravityBox/GravityBox'
import TagList from '@/components/ui/TagList'

const Visual = () => {
  const items = [
    <FloatingButton
      key='btn1'
      text='행정업무를 돕는 양식 모음'
      img={IcBtn1}
      background='#85BFDC'
      color='#333'
    />,
    <FloatingButton
      key='btn2'
      text='학습 격차 해소를 위한 보충자료'
      img={IcBtn2}
      background='#C7E1EE'
      color='#333'
    />,
    <FloatingButton
      key='btn3'
      text='교사의 행정업무를 돕는 양식 모음'
      img={IcBtn3}
      background='#21316F'
      color='#fff'
    />,
    <FloatingButton
      key='btn4'
      text='학생 활동을 위한 문제지와 활동지'
      img={IcBtn4}
      background='#DDFFC6'
      color='#333'
    />,
    <FloatingButton
      key='btn5'
      text='수업에 필요한 학습자료'
      img={IcBtn5}
      background='#DDFFC6'
      color='#333'
    />,
    <FloatingButton
      key='btn6'
      text='학급 운영을 돕는 생활지도·계획안'
      img={IcBtn6}
      background='#BCD7E1'
      color='#333'
    />,
    <FloatingButton
      key='btn7'
      text='프로젝트형 창의 융합자료'
      img={IcBtn7}
      background='#5EBECD'
      color='#fff'
    />,
    <FloatingButton
      key='btn8'
      text='수업 진단을 위한 형성·단원평가 자료'
      img={IcBtn8}
      background='#fff'
      color='#333'
    />
  ]

  return (
    <div className={styles.visual_wrap}>
      <Swiper slidesPerView={'auto'} className={styles.visual_slide}>
        <SwiperSlide className={styles.tag_ani}>
          <GravityBox items={items} />
        </SwiperSlide>

        {/* 이번주 HOT3 컨텐츠 */}
        <SwiperSlide className={`${styles.shadow_box} ${styles.hot_box}`}>
          <strong className={styles.ctt_tit}>
            <Image src={IcHot} alt='hot 아이콘' />
            이번주 HOT3 컨텐츠
          </strong>
          <ul className={styles.hot_list}>
            <li>
              <Link href='/'>
                <div className={styles.book_img}>
                  <Image src={defaultCardImage} alt={''} />
                </div>
                <div className={styles.txt_box}>
                  <div className={styles.tag_box}>
                    <TagList
                      tags={[
                        { name: '국어', color: 'yellow' },
                        { name: '초3', color: 'green' },
                        { name: '독서교육', color: 'blue' },
                        { name: 'PDF', color: 'red' }
                      ]}
                    />
                  </div>
                  <p className={styles.book_name}>
                    효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                  </p>
                  <div className={styles.price_box}>
                    <div className={styles.profile}>
                      <Avatar size={18} name='수업가게닉네임' />
                    </div>
                    <strong className={styles.price}>10,000</strong>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <div className={styles.book_img}>
                  <Image src={defaultCardImage} alt={''} />
                </div>
                <div className={styles.txt_box}>
                  <div className={styles.tag_box}>
                    <TagList
                      tags={[
                        { name: '국어', color: 'yellow' },
                        { name: '초3', color: 'green' },
                        { name: '독서교육', color: 'blue' },
                        { name: 'PDF', color: 'red' }
                      ]}
                    />
                  </div>
                  <p className={styles.book_name}>
                    효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                  </p>
                  <div className={styles.price_box}>
                    <div className={styles.profile}>
                      <Avatar size={18} name='수업가게닉네임' />
                    </div>
                    <strong className={styles.price}>10,000</strong>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <div className={styles.book_img}>
                  <Image src={defaultCardImage} alt={''} />
                </div>
                <div className={styles.txt_box}>
                  <div className={styles.tag_box}>
                    <TagList
                      tags={[
                        { name: '국어', color: 'yellow' },
                        { name: '초3', color: 'green' },
                        { name: '독서교육', color: 'blue' },
                        { name: 'PDF', color: 'red' }
                      ]}
                    />
                  </div>
                  <p className={styles.book_name}>
                    효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들
                  </p>
                  <div className={styles.price_box}>
                    <div className={styles.profile}>
                      <Avatar size={18} name='수업가게닉네임' />
                    </div>
                    <strong className={styles.price}>10,000</strong>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </SwiperSlide>

        {/* 이번주 추천 컨텐츠 */}
        <SwiperSlide className={`${styles.shadow_box} ${styles.recommend_box}`}>
          <strong className={styles.ctt_tit}>
            <Image src={IcPin} alt='pin 아이콘' />
            이번주 추천 컨텐츠
          </strong>

          <div className='rcmslide_wrap'>
            {/* 슬라이드 네비 */}
            <div className='rcm_nav'>
              <button className='rcm_prev'>
                이전
                <Icon name='blue-arrow' color='currentColor' />
              </button>
              <button className='rcm_next'>
                다음
                <Icon name='blue-arrow' color='currentColor' />
              </button>
            </div>
            <div className='rcm_pagination'></div>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: '.rcm_prev',
                nextEl: '.rcm_next'
              }}
              pagination={{
                el: '.rcm_pagination',
                clickable: true
              }}
            >
              <SwiperSlide className={styles.rcm_slide}>
                <Link href='/'>
                  <div className={styles.tag_box}>
                    <TagList
                      tags={[
                        { name: '국어', color: 'yellow' },
                        { name: '초3', color: 'green' },
                        { name: '독서교육', color: 'blue' },
                        { name: 'PDF', color: 'red' }
                      ]}
                    />
                  </div>
                  <div className={styles.image_wrapper}>
                    <Image
                      src={defaultCardImage}
                      alt={''}
                      fill
                      className={styles.card_image}
                    />
                    <div className={styles.rating_badge}>
                      <Icon
                        name='star'
                        className={styles.star_icon}
                        color='var(--color-neutral-white)'
                      />
                      <span className={styles.rating_text}>4.5</span>
                    </div>
                  </div>

                  <div className={styles.contents_bottom}>
                    <div className={styles.content_info}>
                      <h3 className={styles.title}>
                        효율적인 업무 관리를 위한 시간 관리
                      </h3>
                      <p className={styles.description}>
                        시간 관리를 위한 디지털 도구 활용법에는 생산성 앱과
                        소프트웨어가 추천됩니다. 예를 들어, Todoist나 Trello와
                        같은 작업 관리 앱은 할 일을 체계적으로 정리하고
                        우선순위를 설정하는 데 유용합니다. Google Calendar는
                        일정 관리를 효율적으로 도와주며, Notion은 노트 작성과
                        프로젝트 관리를 통합적으로 지원합니다. 이러한 디지털
                        도구들을 활용하면 시간 관리를 더욱 효과적으로 할 수
                        있으며, 생산성을 크게 향상시킬 수 있습니다.
                      </p>
                    </div>
                    <div className={styles.price}>10,000원</div>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={styles.rcm_slide}>
                <Link href='/'>
                  <div className={styles.tag_box}>
                    <TagList
                      tags={[
                        { name: '국어', color: 'yellow' },
                        { name: '초3', color: 'green' },
                        { name: '독서교육', color: 'blue' },
                        { name: 'PDF', color: 'red' }
                      ]}
                    />
                  </div>
                  <div className={styles.image_wrapper}>
                    <Image
                      src={defaultCardImage}
                      alt={''}
                      fill
                      className={styles.card_image}
                    />
                    <div className={styles.rating_badge}>
                      <Icon
                        name='star'
                        className={styles.star_icon}
                        color='var(--color-neutral-white)'
                      />
                      <span className={styles.rating_text}>4.5</span>
                    </div>
                  </div>

                  <div className={styles.contents_bottom}>
                    <div className={styles.content_info}>
                      <h3 className={styles.title}>
                        효율적인 업무 관리를 위한 시간 관리
                      </h3>
                      <p className={styles.description}>
                        시간 관리를 위한 디지털 도구 활용법에는 생산성 앱과
                        소프트웨어가 추천됩니다. 예를 들어, Todoist나 Trello와
                        같은 작업 관리 앱은 할 일을 체계적으로 정리하고
                        우선순위를 설정하는 데 유용합니다. Google Calendar는
                        일정 관리를 효율적으로 도와주며, Notion은 노트 작성과
                        프로젝트 관리를 통합적으로 지원합니다. 이러한 디지털
                        도구들을 활용하면 시간 관리를 더욱 효과적으로 할 수
                        있으며, 생산성을 크게 향상시킬 수 있습니다.
                      </p>
                    </div>
                    <div className={styles.price}>10,000원</div>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={styles.rcm_slide}>
                <Link href='/'>
                  <div className={styles.tag_box}>
                    <TagList
                      tags={[
                        { name: '국어', color: 'yellow' },
                        { name: '초3', color: 'green' },
                        { name: '독서교육', color: 'blue' },
                        { name: 'PDF', color: 'red' }
                      ]}
                    />
                  </div>
                  <div className={styles.image_wrapper}>
                    <Image
                      src={defaultCardImage}
                      alt={''}
                      fill
                      className={styles.card_image}
                    />
                    <div className={styles.rating_badge}>
                      <Icon
                        name='star'
                        className={styles.star_icon}
                        color='var(--color-neutral-white)'
                      />
                      <span className={styles.rating_text}>4.5</span>
                    </div>
                  </div>

                  <div className={styles.contents_bottom}>
                    <div className={styles.content_info}>
                      <h3 className={styles.title}>
                        효율적인 업무 관리를 위한 시간 관리
                      </h3>
                      <p className={styles.description}>
                        시간 관리를 위한 디지털 도구 활용법에는 생산성 앱과
                        소프트웨어가 추천됩니다. 예를 들어, Todoist나 Trello와
                        같은 작업 관리 앱은 할 일을 체계적으로 정리하고
                        우선순위를 설정하는 데 유용합니다. Google Calendar는
                        일정 관리를 효율적으로 도와주며, Notion은 노트 작성과
                        프로젝트 관리를 통합적으로 지원합니다. 이러한 디지털
                        도구들을 활용하면 시간 관리를 더욱 효과적으로 할 수
                        있으며, 생산성을 크게 향상시킬 수 있습니다.
                      </p>
                    </div>
                    <div className={styles.price}>10,000원</div>
                  </div>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* 전국 교사들이 - */}
      <div className={styles.search_box}>
        <strong className={styles.ctt_subtit}>
          전국 교사들이 만든 검증된 수업자료를 지금 만나보세요
        </strong>
        <div className={styles.inp_box}>
          <Icon
            name='search'
            color='var(--color-neutral-grey-3)'
            className={styles.ic_search}
          />
          <input type='text' name='' placeholder='어떤 자료가 필요하세요?' />
          <Button variant='default' width={226}>
            자료 찾기
          </Button>
        </div>
        <ul className={styles.search_tags}>
          <li>
            <Image src={IcClock} alt='시계 아이콘' />
            <span>새학기 맞이 필수 학급 운영 자료</span>
          </li>
          <li>
            <Image src={IcPuzzle} alt='퍼즐 아이콘' />
            <span> 방과후 특별수업 자료</span>
          </li>
          <li>
            <Image src={IcBtn3} alt='책 아이콘' />
            <span>독서교육 활동지</span>
          </li>
          <li>
            <Image src={IcFolder} alt='폴더 아이콘' />
            <span> 학급 회의록 & 시간표 양식</span>
          </li>
          <li>
            <Image src={IcNote} alt='노트 아이콘' />
            <span>가정통신문 양식</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Visual
