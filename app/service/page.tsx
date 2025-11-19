'use client'

import { useState } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import PersonalInquireModal from '~/components/modal/PersonalInquireModal'
import { Pagination, ToggleBadge } from '~/components/ui'
import Button from '~/components/ui/Button'
import { useModal } from '~/hooks/useModal'

const SignupPage = () => {
  const FAQ_CATEGORIES: { label: string; value: string }[] = [
    {
      label: '전체',
      value: 'content'
    },
    {
      label: '회원 정보 관리',
      value: 'member'
    },
    {
      label: '기관회원',
      value: 'institution'
    },
    {
      label: '자료 콘텐츠',
      value: 'contents'
    },
    {
      label: '구매 콘텐츠 관리',
      value: 'purchase'
    },
    {
      label: '결제·취소·환불',
      value: 'refund'
    },
    {
      label: '시스템 오류',
      value: 'error'
    },
    {
      label: '기타',
      value: 'etc'
    }
  ]

  const faqList = [
    {
      category: '자료 콘텐츠',
      question: '수업가게의 자료는 누가 업로드하는 건가요?',
      answer:
        '수업가게 회원 중 교사 인증을 완료한 개인회원 또는 기관회원이 직접 자료를 등록할 수 있습니다.'
    },
    {
      category: '자료 콘텐츠',
      question: '유료 콘텐츠를 업로드한 뒤에도 수정할 수 있나요?',
      answer:
        '판매 중인 콘텐츠는 [편집하기]를 통해 수정이 가능하며, 편집 후에는 관리자에게 다시 등록 요청 과정을 거쳐 업로드됩니다.'
    },
    {
      category: '취소/환불',
      question: '구매한 자료를 취소하거나 환불할 수 있나요?',
      answer:
        '구매 후 7일 이내 다운로드하지 않았을 경우 취소가 가능하며, 다운로드 후에는 환불이 불가합니다. 단, 파일 오류 등 예외 사유가 있을 경우 관리자에게 환불 요청을 진행할 수 있습니다.'
    },
    {
      category: '주문/결제',
      question: '결제 가능한 방법에는 어떤 종류가 있나요?',
      answer: '개인 결제와 예산 결제 총 두 가지 방법이 있습니다.'
    },
    {
      category: '기관회원',
      question: '소속 기관을 등록하면 기관 예산으로 결제할 수 있나요?',
      answer:
        '네. 결제 내역이 확인된 자료는 다운로드 가능 기간 내 언제든 다시 다운받을 수 있습니다. 단, 기간이 만료된 경우 재구매가 필요합니다.'
    },
    {
      category: '다운로드',
      question: '다운로드가 중단되었어요. 다시 받을 수 있나요?',
      answer:
        '네. 결제 내역이 확인된 자료는 다운로드 가능 기간 내 언제든 다시 다운받을 수 있습니다. 단, 기간이 만료된 경우 재구매가 필요합니다.'
    },
    {
      category: '다운로드',
      question: '구매한 자료는 어디에서 다운받을 수 있나요?',
      answer:
        '결제 완료 후 [마이페이지 > 구매 및 다운로드 관리]에서 다운로드 버튼을 눌러 파일을 다운받을 수 있습니다.'
    },
    {
      category: '회원계정',
      question: '비밀번호 변경은 어디서 하나요?',
      answer: '[마이페이지 > 회원 정보 관리]에서 비밀번호 변경이 가능합니다.'
    },
    {
      category: '자료 컨텐츠',
      question: '내가 수업가게에 업로드한 자료는 어떻게 관리할 수 있나요?',
      answer:
        '[마이페이지 > 내 가게 관리]에서 등록한 자료의 판매 현황, 후기, 문의 내역을 확인할 수 있습니다.'
    },
    {
      category: '기관회원',
      question: '예산으로 결제하기 위해서는 어떤 과정을 거쳐야 하나요?',
      answer:
        '[마이페이지 > 내 단체 등록]을 통해 소속 기관에 승인 요청이 필요합니다. 승인 요청 후에는 장바구니에서 품의기안 및 견적서를 소속 기관에 제출하신 후 승인이 나면 예산 배정이 완료됩닏. 그 후 배정받은 예산으로 결제하면 됩'
    }
  ]
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { openModal } = useModal()
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleToggleSelection = (value: string) => {
    setSelectedFaq((prev) => (prev === value ? null : value))
  }
  const handleInquiryClick = () => {
    openModal(PersonalInquireModal)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>수업가게 고객센터</h1>
        <p className={styles.description}>
          수업가게 어떻게 이용하나요? 수업가게에 대해 자주 물어보는 질문을
          모아봤어요.
        </p>
      </div>

      <div className={styles.search_wrap}>
        <Icon
          name='search'
          color='var(--color-neutral-grey-3)'
          className={styles.ic_search}
        />
        <input
          type='text'
          name=''
          placeholder='서비스에 대해 궁금한 점을 검색해 보세요.'
        />
        <Button variant='default' width={226}>
          검색하기
        </Button>
      </div>

      <div className={styles.background}>
        <div className={styles.question_section}>
          <div className={styles.question_wrap}>
            <div className={styles.faq_title_wrap}>
              <div className={styles.faq_icon}>
                <span>
                  <span></span>
                  FAQ List
                </span>
              </div>

              <div className={styles.question_title}>
                <span>자주 물어보는 질문</span>
              </div>
            </div>

            <div className={styles.tag_wrap}>
              <ul>
                {FAQ_CATEGORIES.map((item) => (
                  <li key={item.value}>
                    <ToggleBadge
                      size='md'
                      onClick={() => handleToggleSelection(item.value)}
                      selected={selectedFaq === item.value}
                    >
                      {item.label}
                    </ToggleBadge>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.faq_list_wrap}>
              <ul>
                {faqList.map((faq, index) => (
                  <li key={index}>
                    <div className={styles.faq_item}>
                      <div
                        className={styles.question}
                        onClick={() =>
                          setOpenIndex((prev) =>
                            prev === index ? null : index
                          )
                        }
                      >
                        <div className={styles.question_title_wrap}>
                          <Icon name='question' />
                          <span className={styles.category}>
                            {faq.category}
                          </span>
                          <span className={styles.question_title}>
                            {faq.question}
                          </span>
                        </div>

                        <Icon
                          name='down-arrow'
                          color='currentColor'
                          className={`${styles.arrow} ${
                            openIndex === index ? styles.rotated : ''
                          }`}
                        />
                      </div>

                      <div
                        className={`${styles.answer} ${
                          openIndex === index ? styles.open : styles.closed
                        }`}
                      >
                        <Icon name='answer' />
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={8}
              onPageChange={handlePageChange}
            />
          </div>

          {/* ----------------------- */}

          <div className={styles.none_item_wrap}>
            <span>검색 결과가 없습니다.</span>
            <p>입력하신 내용을 다시 확인하거나 다른 키워드로 검색해 보세요.</p>
          </div>
          {/* ----------------------- */}
          <div className={styles.buttton_wrap}>
            <Button onClick={handleInquiryClick}>
              <span>찾으시는 정보가 없으신가요? 1:1 문의 바로가기</span>
              <Icon name='chevron-right-s' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
