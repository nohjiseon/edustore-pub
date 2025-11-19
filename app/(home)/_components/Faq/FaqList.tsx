'use client'

import Image from 'next/image'
import { useState } from 'react'

import styles from './Faq.module.scss'

import ImgFaq from '@/assets/images/main/img_faq.png'
import { Icon } from '@/components/Icon'

const FaqList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(4)

  const faqData = [
    {
      question: '수업가게의 자료는 누가 업로드하는 건가요?',
      answer:
        '네, [단체 등록하기] 페이지에서 소속된 학교 혹은 기관을 찾아 등록하시면 해당 단체에서 충전한 예산으로 결제할 수 있으며, 필요한 경우 견적서 및 증빙서류도 발급 가능합니다.'
    },
    {
      question: '유료 자료 이 외에 무료 자료도 있나요?',
      answer:
        '네, [단체 등록하기] 페이지에서 소속된 학교 혹은 기관을 찾아 등록하시면 해당 단체에서 충전한 예산으로 결제할 수 있으며, 필요한 경우 견적서 및 증빙서류도 발급 가능합니다.'
    },
    {
      question: '내가 수업가게에 업로드한 자료는 어떻게 관리할 수 있나요?',
      answer:
        '네, [단체 등록하기] 페이지에서 소속된 학교 혹은 기관을 찾아 등록하시면 해당 단체에서 충전한 예산으로 결제할 수 있으며, 필요한 경우 견적서 및 증빙서류도 발급 가능합니다.'
    },
    {
      question: '환불이나 오류가 생기는 경우에는 어떻게 하나요?',
      answer:
        '네, [단체 등록하기] 페이지에서 소속된 학교 혹은 기관을 찾아 등록하시면 해당 단체에서 충전한 예산으로 결제할 수 있으며, 필요한 경우 견적서 및 증빙서류도 발급 가능합니다.'
    },
    {
      question: '소속 기관을 등록하면 기관 예산으로 결제할 수 있나요?',
      answer:
        '네, [단체 등록하기] 페이지에서 소속된 학교 혹은 기관을 찾아 등록하시면 해당 단체에서 충전한 예산으로 결제할 수 있으며, 필요한 경우 견적서 및 증빙서류도 발급 가능합니다.'
    }
  ]

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className={styles.faq_box}>
      <div className={styles.img_box}>
        <Image src={ImgFaq} alt='교재 컨텐츠 이미지' />
      </div>
      <ul className={styles.faq_list}>
        {faqData.map((faq, index) => (
          <li
            key={index}
            className={activeIndex === index ? styles.active : ''}
          >
            <div
              className={styles.faq_tit}
              onClick={() => handleToggle(index)}
              aria-expanded={activeIndex === index}
            >
              <p>{faq.question}</p>
              <span className={styles.ic_tg}>
                <Icon
                  name={activeIndex === index ? 'minus' : 'plus'}
                  color='currentColor'
                />
              </span>
            </div>
            <div className={styles.faq_txt}>
              <p>{faq.answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default FaqList
