'use client'

import { Suspense, use } from 'react'

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
import { useProductData, useProductDetailData } from '~/hooks/useProduct'

interface Props {
  params: Promise<{ id: string }>
}

const ContentDetailPage = ({ params }: Props) => {
  // params는 Promise이므로 use() hook으로 unwrap
  const { id } = use(params)
  const productNo = Number(id)

  // 상품 기본 정보 조회 API 호출
  // const { data: product, isLoading, error } = useProductInfo(productNo)
  const {
    data: productDetailData,
    isLoading,
    error
  } = useProductDetailData(productNo)
  console.log('productDetailData', productDetailData)

  // 로딩 상태
  if (isLoading) {
    return (
      <BaseLayout background='linear-gradient(0deg, #F6F7F9 0%, #F6F7F9 100%), #F7F8F8'>
        <div className={styles.container}>
          <div className={styles.loading}>상품 정보를 불러오는 중...</div>
        </div>
      </BaseLayout>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <BaseLayout background='linear-gradient(0deg, #F6F7F9 0%, #F6F7F9 100%), #F7F8F8'>
        <div className={styles.container}>
          <div className={styles.error}>
            <h2>상품 정보를 불러올 수 없습니다</h2>
            <p>{error.message}</p>
          </div>
        </div>
      </BaseLayout>
    )
  }

  // 데이터 없음
  if (!productDetailData) {
    return (
      <BaseLayout background='linear-gradient(0deg, #F6F7F9 0%, #F6F7F9 100%), #F7F8F8'>
        <div className={styles.container}>
          <div className={styles.error}>
            <h2>상품을 찾을 수 없습니다</h2>
          </div>
        </div>
      </BaseLayout>
    )
  }

  // API 연동 확인용 콘솔 출력
  console.log('상품 상세 데이터:', {
    productNo: productDetailData.product.productNo,
    productNm: productDetailData.product.productNm,
    description: productDetailData.product.description,
    price: productDetailData.product.price,
    priceType: productDetailData.product.priceType,
    viewCount: productDetailData.product.viewCount
    // reviewCount: productDetailData.reviewCount,
    // reviewAvgRating: productDetailData.reviewAvgRating
  })

  return (
    <BaseLayout background='linear-gradient(0deg, #F6F7F9 0%, #F6F7F9 100%), #F7F8F8'>
      <div className={styles.container}>
        <div className={styles.content_wrapper}>
          <HeaderSection
            breadcrumbs={['홈', '초등', '국어']}
            thumbnailSrc='https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=952&h=516&fit=crop&auto=format'
            thumbnailAlt={productDetailData.product.productNm}
          />

          <TabsSection className={styles.tabs_wrapper} />

          <Suspense
            fallback={
              <div className={styles.loading}>자료 정보 로딩 중...</div>
            }
          >
            <ClassSection
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
              info={{
                profileImgUrl: productDetailData.memberView.profileImgUrl || '',
                name:
                  productDetailData.memberView.nickname ||
                  productDetailData.memberView.name ||
                  '',
                profileIntro: productDetailData.memberView.profileIntro || '',
                // API 응답에 포함되지 않음 - 추후 별도 API 필요
                likeCount: 0,
                rating: 0,
                reviewCount: 0
              }}
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
            <ReviewSection
              productNo={productNo}
              className={styles.content_section}
            />
          </Suspense>

          <Suspense
            fallback={
              <div className={styles.loading}>자료 문의 로딩 중...</div>
            }
          >
            <InquirySection
              productNo={productNo}
              className={styles.content_section}
            />
          </Suspense>

          <BeforeUseSection
            className={styles.content_section}
            titleClassName={styles.content_title}
          />
        </div>

        <OrderSummary data={productDetailData} />
      </div>
    </BaseLayout>
  )
}

export default ContentDetailPage
