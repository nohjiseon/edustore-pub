'use client'

import { Suspense, useEffect } from 'react'

import AchievementSection from './_components/AchievementSection'
import BeforeUseSection from './_components/BeforeUseSection'
import ClassSection from './_components/ClassSection'
import HeaderSection from './_components/HeaderSection'
import InquirySection from './_components/InquirySection'
import IntroSection from './_components/IntroSection'
import OrderSummary from './_components/OrderSummary'
import RelatedContentsSection from './_components/RelatedContentsSection'
import ReviewSection from './_components/ReviewSection'
import TabsSection from './_components/TabsSection'
import UploaderSection from './_components/UploaderSection'
import { mockContentDetail } from './_mocks/detailData'
import styles from './page.module.scss'

import { BaseLayout } from '~/components/layout'

interface Props {
  params: Promise<{ id: string }>
}

const SearchDetailPage = ({ params }: Props) => {
  return (
    <BaseLayout background='linear-gradient(0deg, #F6F7F9 0%, #F6F7F9 100%), #F7F8F8'>
      <div className={styles.container}>
        <div className={styles.content_wrapper}>
          <HeaderSection
            breadcrumbs={['홈', '초등', '국어']}
            thumbnailSrc='https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=952&h=516&fit=crop&auto=format'
            thumbnailAlt='콘텐츠 썸네일 이미지'
          />

          <TabsSection
            className={styles.tabs_wrapper}
            scrollUpClassName={styles.scr_up}
          />

          <Suspense
            fallback={
              <div className={styles.loading}>자료 정보 로딩 중...</div>
            }
          >
            <ClassSection
              reviews={mockContentDetail.classReviews}
              className={styles.content_section_top}
              titleClassName={styles.content_title}
              gridClassName={styles.class_review_grid}
            />

            <AchievementSection
              standards={mockContentDetail.achievementStandards}
              className={styles.content_section}
              titleClassName={styles.content_title}
              listClassName={styles.achievement_standards_list}
            />

            <IntroSection
              data={mockContentDetail.contentIntro}
              className={styles.content_section}
              titleClassName={styles.content_title}
            />
          </Suspense>

          <Suspense
            fallback={
              <div className={styles.loading}>업로더정보 로딩 중...</div>
            }
          >
            <UploaderSection
              info={mockContentDetail.uploaderInfo}
              className={styles.content_section}
              titleClassName={styles.content_title}
            />
          </Suspense>

          <Suspense
            fallback={
              <div className={styles.loading}>관련 컨텐츠 로딩 중...</div>
            }
          >
            <RelatedContentsSection className={styles.content_section} />
          </Suspense>

          <Suspense
            fallback={<div className={styles.loading}>리뷰 로딩 중...</div>}
          >
            <ReviewSection className={styles.content_section} />
          </Suspense>

          <Suspense
            fallback={
              <div className={styles.loading}>자료 문의 로딩 중...</div>
            }
          >
            <InquirySection className={styles.content_section} />
          </Suspense>

          <BeforeUseSection
            className={styles.content_section}
            titleClassName={styles.content_title}
          />
        </div>

        <OrderSummary />
      </div>
    </BaseLayout>
  )
}

export default SearchDetailPage
