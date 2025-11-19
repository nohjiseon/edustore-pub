'use client'

import { useSearchParams } from 'next/navigation'
import router from 'next/router'
import { Suspense } from 'react'

import styles from './page.module.scss'

import imgSample from '@/assets/images/common/success.png'
import Button from '~/components/ui/Button'

type ResultType = 'cancel' | 'refund'

const ResultContent = () => {
  const searchParams = useSearchParams()
  const type = (searchParams.get('type') as ResultType) || 'cancel'
  const getResultText = () => {
    switch (type) {
      case 'cancel':
        return {
          title: '구매 취소가 완료되었습니다',
          description: '구매 시 등록한 결제수단으로 환불됩니다.'
        }
      case 'refund':
        return {
          title: '환불 요청이 완료되었습니다',
          description: (
            <>
              관리자 검토 후 환불 처리가 진행되며,
              <br />
              경우에 따라 환불 요청이 거절될 수 있습니다.
            </>
          )
        }
      default:
        return {
          title: '구매 취소가 완료되었습니다',
          description: '구매 시 등록한 결제수단으로 환불됩니다.'
        }
    }
  }

  const resultText = getResultText()

  const handleSubmit = () => {
    router.push('/purchase')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.img_wrap}>
        <img src={imgSample.src} alt='success image' />
      </div>

      <div className={styles.title_wrap}>
        <h1 className={styles.title}>{resultText.title}</h1>
        <p className={styles.description}>{resultText.description}</p>
      </div>

      <div className={styles.button_wrap}>
        <Button variant='default' onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </div>
  )
}

const ResultPage = () => {
  return (
    <Suspense fallback={<div className={styles.wrapper}>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

export default ResultPage
