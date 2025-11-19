'use client'

import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

import RelatedContentsSection from './_components/RelatedContentsSection'
import SalesContentSection, {
  type SalesContentSectionRef
} from './_components/SalesContentSection'
import styles from './page.module.scss'

import { BaseLayout } from '~/components/layout'
import Button from '~/components/ui/Button'
import Toast from '~/components/ui/toast'
import { useCreateProduct } from '~/hooks/useProduct'
import type { ProductStatusCode } from '~/types/product'

const UploadPage = () => {
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)
  const createProduct = useCreateProduct()
  const salesContentRef = useRef<SalesContentSectionRef>(null)

  const handleSubmit = async () => {
    try {
      // SalesContentSection 데이터 유효성 검증
      if (!salesContentRef.current?.validate()) {
        return
      }

      // SalesContentSection 데이터 수집
      const salesData = salesContentRef.current.getData()

      // TODO: RelatedContentsSection에서 데이터 수집 필요
      // TODO: 파일 업로드 API 호출 후 URL 받기
      const result = await createProduct.mutateAsync({
        command: {
          productNm: salesData.title,
          description: salesData.summary,
          detailDescription: salesData.content,
          priceType: '01' as ProductStatusCode, // TODO: RelatedContentsSection에서 가져오기
          price: 0, // TODO: RelatedContentsSection에서 가져오기
          theme: '주제', // TODO: RelatedContentsSection의 topics에서 가져오기
          productStatus: '03' as ProductStatusCode, // 03: 판매중
          hashtags: '', // TODO: RelatedContentsSection의 topics에서 가져오기
          gradeSubjects: '', // TODO: RelatedContentsSection에서 가져오기
          categories: '', // TODO: RelatedContentsSection에서 가져오기
          forms: '' // TODO: 파일 확장자에서 결정
        },
        mainThumbnail: salesData.thumbnail?.file.name || '', // TODO: 파일 업로드 후 URL
        otherThumbnailFiles: [],
        attachmentFiles: salesData.files.map((f) => f.file.name) // TODO: 파일 업로드 후 URL
      })

      console.log('상품 등록 성공:', result.data)
      router.push('/upload/complete')
    } catch (error) {
      console.error('상품 등록 실패:', error)
      // TODO: 에러 처리 UI 추가
    }
  }

  const handleTempSave = async () => {
    try {
      // 임시저장은 유효성 검증 생략 가능
      const salesData = salesContentRef.current?.getData()

      if (!salesData) {
        return
      }

      const result = await createProduct.mutateAsync({
        command: {
          productNm: salesData.title || '제목 없음',
          description: salesData.summary || '',
          detailDescription: salesData.content || '',
          priceType: '01' as ProductStatusCode,
          price: 0,
          theme: '',
          productStatus: '01' as ProductStatusCode, // 01: 임시저장
          hashtags: '',
          gradeSubjects: '',
          categories: '',
          forms: ''
        },
        mainThumbnail: salesData.thumbnail?.file.name || '',
        otherThumbnailFiles: [],
        attachmentFiles: salesData.files.map((f) => f.file.name)
      })

      console.log('임시저장 성공:', result.data)
      setShowToast(true)
    } catch (error) {
      console.error('임시저장 실패:', error)
      // TODO: 에러 처리 UI 추가
    }
  }

  return (
    <BaseLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>진열하기</h1>

        <SalesContentSection ref={salesContentRef} />

        <RelatedContentsSection />

        <div className={styles.form_action_buttons}>
          <Button
            variant='outline'
            width={355}
            onClick={handleTempSave}
            disabled={createProduct.isPending}
          >
            {createProduct.isPending ? '저장 중...' : '임시저장'}
          </Button>
          <Button
            width={355}
            onClick={handleSubmit}
            disabled={createProduct.isPending}
          >
            {createProduct.isPending ? '등록 중...' : '등록하기'}
          </Button>
        </div>

        {showToast && (
          <Toast
            message='임시저장되었습니다.'
            icon='check'
            duration={3000}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </BaseLayout>
  )
}

export default UploadPage
