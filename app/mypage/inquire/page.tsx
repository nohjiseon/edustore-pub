'use client'
import Image from 'next/image'
import { useState } from 'react'

import styles from './page.module.scss'

import defaultCardImage from '@/assets/images/contents/card_example.png'
import { Icon } from '~/components/Icon'
import PersonalInquireModal from '~/components/modal/PersonalInquireModal'
import { Button, Pagination, ToggleBadge } from '~/components/ui'
import { useModal } from '~/hooks/useModal'

const MyInquire = () => {
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
  const [selectedFaq, setSelectedFaq] = useState<string | null>('content')
  const [currentPage, setCurrentPage] = useState(1)
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
        <h1>나의 문의 내역</h1>
        <p>1:1 문의 내역을 확인하고 관리해 보세요.</p>
        <Button variant='default' onClick={handleInquiryClick} width={216}>
          1:1 문의 하기
          <Icon name='chevron-right-s' />
        </Button>
      </div>

      <div className={styles.toggle_wrap}>
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

      <div className={styles.my_inquire_wrap}>
        <ul>
          <li>
            <div className={styles.inquire_state}>
              <span>
                <span>구매 콘텐츠 관리</span>
                <span className={styles.bar}></span>
                <span className={styles.done}>답변완료</span>
              </span>

              <span>2025.05.21</span>
            </div>

            <div className={styles.my_inquire_item}>
              <div className={styles.my_inquire}>
                <Icon name='question' />

                <div className={styles.inquire_info}>
                  <div className={styles.inquire_title}>
                    <span>결제 완료 후 자료 다운로드가 되지 않습니다.</span>
                  </div>

                  <div className={styles.inquire_desc}>
                    <p>
                      안녕하세요. 어제 결제한 자료의 다운로드 버튼을 눌러도
                      반응이 없습니다. 결제 내역에서는 ‘결제완료’로 표시되는데,
                      파일이 열리지 않아 확인 부탁드립니다. <br />
                      <br />
                      자료명: [2025 국어과 읽기지도 자료 세트] <br />
                      주문번호: ORD20250520-1142
                    </p>
                  </div>

                  <div className={styles.inquire_img}>
                    <ul>
                      {[1, 2, 3, 4, 5].map((val, idx) => (
                        <li key={idx}>
                          <Image
                            src={defaultCardImage.src}
                            alt='문의 관련 이미지'
                            width={200}
                            height={150}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.my_answer}>
                <p>
                  안녕하세요, 수업가게 운영팀입니다.
                  <br />
                  이용에 불편을 드려 죄송합니다. 확인 결과, 결제는 정상적으로
                  완료되었으나 파일 서버 전송 과정에서 일시적인 지연이 발생한
                  것으로 확인되었습니다.
                  <br />
                  현재 재처리가 완료되어 [마이페이지 ? 구매내역] 에서 바로
                  다운로드 가능합니다.
                  <br />
                  동일한 문제가 반복될 경우, 브라우저 캐시를 삭제하거나 다른
                  기기에서 재시도해 주세요.
                  <br /> 추가로 문제가 지속되면 고객센터로 다시 문의 주시면
                  신속히 도와드리겠습니다. 감사합니다.
                </p>

                <span className={styles.answer_date}>
                  <span>수업가게 운영팀</span>
                  <span>2025.06.30</span>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.inquire_state}>
              <span>
                <span>구매 콘텐츠 관리</span>
                <span className={styles.bar}></span>
                <span className={styles.done}>답변완료</span>
              </span>

              <span>2025.05.21</span>
            </div>

            <div className={styles.my_inquire_item}>
              <div className={styles.my_inquire}>
                <Icon name='question' />

                <div className={styles.inquire_info}>
                  <div className={styles.inquire_title}>
                    <span>결제 완료 후 자료 다운로드가 되지 않습니다.</span>
                  </div>

                  <div className={styles.inquire_desc}>
                    <p>
                      안녕하세요. 어제 결제한 자료의 다운로드 버튼을 눌러도
                      반응이 없습니다. 결제 내역에서는 ‘결제완료’로 표시되는데,
                      파일이 열리지 않아 확인 부탁드립니다. <br />
                      <br />
                      자료명: [2025 국어과 읽기지도 자료 세트] <br />
                      주문번호: ORD20250520-1142
                    </p>
                  </div>

                  <div className={styles.inquire_img}>
                    <ul>
                      {[1, 2, 3, 4, 5].map((val, idx) => (
                        <li key={idx}>
                          <Image
                            src={defaultCardImage.src}
                            alt='문의 관련 이미지'
                            width={200}
                            height={150}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.my_answer}>
                <p>
                  안녕하세요, 수업가게 운영팀입니다.
                  <br />
                  이용에 불편을 드려 죄송합니다. 확인 결과, 결제는 정상적으로
                  완료되었으나 파일 서버 전송 과정에서 일시적인 지연이 발생한
                  것으로 확인되었습니다.
                  <br />
                  현재 재처리가 완료되어 [마이페이지 ? 구매내역] 에서 바로
                  다운로드 가능합니다.
                  <br />
                  동일한 문제가 반복될 경우, 브라우저 캐시를 삭제하거나 다른
                  기기에서 재시도해 주세요.
                  <br /> 추가로 문제가 지속되면 고객센터로 다시 문의 주시면
                  신속히 도와드리겠습니다. 감사합니다.
                </p>

                <span className={styles.answer_date}>
                  <span>수업가게 운영팀</span>
                  <span>2025.06.30</span>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.inquire_state}>
              <span>
                <span>구매 콘텐츠 관리</span>
                <span className={styles.bar}></span>
                <span className={styles.done}>답변완료</span>
              </span>

              <span>2025.05.21</span>
            </div>

            <div className={styles.my_inquire_item}>
              <div className={styles.my_inquire}>
                <Icon name='question' />

                <div className={styles.inquire_info}>
                  <div className={styles.inquire_title}>
                    <span>결제 완료 후 자료 다운로드가 되지 않습니다.</span>
                  </div>

                  <div className={styles.inquire_desc}>
                    <p>
                      안녕하세요. 어제 결제한 자료의 다운로드 버튼을 눌러도
                      반응이 없습니다. 결제 내역에서는 ‘결제완료’로 표시되는데,
                      파일이 열리지 않아 확인 부탁드립니다. <br />
                      <br />
                      자료명: [2025 국어과 읽기지도 자료 세트] <br />
                      주문번호: ORD20250520-1142
                    </p>
                  </div>

                  <div className={styles.inquire_img}>
                    <ul>
                      {[1, 2, 3, 4, 5].map((val, idx) => (
                        <li key={idx}>
                          <Image
                            src={defaultCardImage.src}
                            alt='문의 관련 이미지'
                            width={200}
                            height={150}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.my_answer}>
                <p>
                  안녕하세요, 수업가게 운영팀입니다.
                  <br />
                  이용에 불편을 드려 죄송합니다. 확인 결과, 결제는 정상적으로
                  완료되었으나 파일 서버 전송 과정에서 일시적인 지연이 발생한
                  것으로 확인되었습니다.
                  <br />
                  현재 재처리가 완료되어 [마이페이지 ? 구매내역] 에서 바로
                  다운로드 가능합니다.
                  <br />
                  동일한 문제가 반복될 경우, 브라우저 캐시를 삭제하거나 다른
                  기기에서 재시도해 주세요.
                  <br /> 추가로 문제가 지속되면 고객센터로 다시 문의 주시면
                  신속히 도와드리겠습니다. 감사합니다.
                </p>

                <span className={styles.answer_date}>
                  <span>수업가게 운영팀</span>
                  <span>2025.06.30</span>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.inquire_state}>
              <span>
                <span>구매 콘텐츠 관리</span>
                <span className={styles.bar}></span>
                <span className={styles.pending}>답변대기</span>
              </span>

              <span>2025.05.21</span>
            </div>

            <div className={styles.my_inquire_item}>
              <div className={styles.my_inquire}>
                <Icon name='question' />

                <div className={styles.inquire_info}>
                  <div className={styles.inquire_title}>
                    <span>결제 완료 후 자료 다운로드가 되지 않습니다.</span>
                  </div>

                  <div className={styles.inquire_desc}>
                    <p>
                      안녕하세요. 어제 결제한 자료의 다운로드 버튼을 눌러도
                      반응이 없습니다. 결제 내역에서는 ‘결제완료’로 표시되는데,
                      파일이 열리지 않아 확인 부탁드립니다. <br />
                      <br />
                      자료명: [2025 국어과 읽기지도 자료 세트] <br />
                      주문번호: ORD20250520-1142
                    </p>
                  </div>

                  <div className={styles.inquire_img}>
                    <ul>
                      {[1, 2, 3, 4, 5].map((val, idx) => (
                        <li key={idx}>
                          <Image
                            src={defaultCardImage.src}
                            alt='문의 관련 이미지'
                            width={200}
                            height={150}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* <div className={styles.my_answer}>
                <p>
                  안녕하세요, 수업가게 운영팀입니다.
                  <br />
                  이용에 불편을 드려 죄송합니다. 확인 결과, 결제는 정상적으로
                  완료되었으나 파일 서버 전송 과정에서 일시적인 지연이 발생한
                  것으로 확인되었습니다.
                  <br />
                  현재 재처리가 완료되어 [마이페이지 ? 구매내역] 에서 바로
                  다운로드 가능합니다.
                  <br />
                  동일한 문제가 반복될 경우, 브라우저 캐시를 삭제하거나 다른
                  기기에서 재시도해 주세요.
                  <br /> 추가로 문제가 지속되면 고객센터로 다시 문의 주시면
                  신속히 도와드리겠습니다. 감사합니다.
                </p>

                <span className={styles.answer_date}>
                  <span>수업가게 운영팀</span>
                  <span>2025.06.30</span>
                </span>
              </div> */}
            </div>
          </li>
          <li>
            <div className={styles.inquire_state}>
              <span>
                <span>구매 콘텐츠 관리</span>
                <span className={styles.bar}></span>
                <span className={styles.pending}>답변대기</span>
              </span>

              <span>2025.05.21</span>
            </div>

            <div className={styles.my_inquire_item}>
              <div className={styles.my_inquire}>
                <Icon name='question' />

                <div className={styles.inquire_info}>
                  <div className={styles.inquire_title}>
                    <span>결제 완료 후 자료 다운로드가 되지 않습니다.</span>
                  </div>

                  <div className={styles.inquire_desc}>
                    <p>
                      안녕하세요. 어제 결제한 자료의 다운로드 버튼을 눌러도
                      반응이 없습니다. 결제 내역에서는 ‘결제완료’로 표시되는데,
                      파일이 열리지 않아 확인 부탁드립니다. <br />
                      <br />
                      자료명: [2025 국어과 읽기지도 자료 세트] <br />
                      주문번호: ORD20250520-1142
                    </p>
                  </div>

                  {/* <div className={styles.inquire_img}>
                    <ul>
                      {[1, 2, 3, 4, 5].map((val, idx) => (
                        <li>
                          <Image
                            src={defaultCardImage.src}
                            alt='문의 관련 이미지'
                            width={200}
                            height={150}
                          />
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </div>
              </div>

              {/* <div className={styles.my_answer}>
                <p>
                  안녕하세요, 수업가게 운영팀입니다.
                  <br />
                  이용에 불편을 드려 죄송합니다. 확인 결과, 결제는 정상적으로
                  완료되었으나 파일 서버 전송 과정에서 일시적인 지연이 발생한
                  것으로 확인되었습니다.
                  <br />
                  현재 재처리가 완료되어 [마이페이지 ? 구매내역] 에서 바로
                  다운로드 가능합니다.
                  <br />
                  동일한 문제가 반복될 경우, 브라우저 캐시를 삭제하거나 다른
                  기기에서 재시도해 주세요.
                  <br /> 추가로 문제가 지속되면 고객센터로 다시 문의 주시면
                  신속히 도와드리겠습니다. 감사합니다.
                </p>

                <span className={styles.answer_date}>
                  <span>수업가게 운영팀</span>
                  <span>2025.06.30</span>
                </span>
              </div> */}
            </div>
          </li>
          <li>
            <div className={styles.inquire_state}>
              <span>
                <span>구매 콘텐츠 관리</span>
                <span className={styles.bar}></span>
                <span className={styles.done}>답변완료</span>
              </span>

              <span>2025.05.21</span>
            </div>

            <div className={styles.my_inquire_item}>
              <div className={styles.my_inquire}>
                <Icon name='question' />

                <div className={styles.inquire_info}>
                  <div className={styles.inquire_title}>
                    <span>결제 완료 후 자료 다운로드가 되지 않습니다.</span>
                  </div>

                  <div className={styles.inquire_desc}>
                    <p>
                      안녕하세요. 어제 결제한 자료의 다운로드 버튼을 눌러도
                      반응이 없습니다. 결제 내역에서는 ‘결제완료’로 표시되는데,
                      파일이 열리지 않아 확인 부탁드립니다. <br />
                      <br />
                      자료명: [2025 국어과 읽기지도 자료 세트] <br />
                      주문번호: ORD20250520-1142
                    </p>
                  </div>

                  <div className={styles.inquire_img}>
                    <ul>
                      {[1, 2, 3, 4, 5].map((val, idx) => (
                        <li key={idx}>
                          <Image
                            src={defaultCardImage.src}
                            alt='문의 관련 이미지'
                            width={200}
                            height={150}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.my_answer}>
                <p>
                  안녕하세요, 수업가게 운영팀입니다.
                  <br />
                  이용에 불편을 드려 죄송합니다. 확인 결과, 결제는 정상적으로
                  완료되었으나 파일 서버 전송 과정에서 일시적인 지연이 발생한
                  것으로 확인되었습니다.
                  <br />
                  현재 재처리가 완료되어 [마이페이지 ? 구매내역] 에서 바로
                  다운로드 가능합니다.
                  <br />
                  동일한 문제가 반복될 경우, 브라우저 캐시를 삭제하거나 다른
                  기기에서 재시도해 주세요.
                  <br /> 추가로 문제가 지속되면 고객센터로 다시 문의 주시면
                  신속히 도와드리겠습니다. 감사합니다.
                </p>

                <span className={styles.answer_date}>
                  <span>수업가게 운영팀</span>
                  <span>2025.06.30</span>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.inquire_state}>
              <span>
                <span>구매 콘텐츠 관리</span>
                <span className={styles.bar}></span>
                <span className={styles.done}>답변완료</span>
              </span>

              <span>2025.05.21</span>
            </div>

            <div className={styles.my_inquire_item}>
              <div className={styles.my_inquire}>
                <Icon name='question' />

                <div className={styles.inquire_info}>
                  <div className={styles.inquire_title}>
                    <span>결제 완료 후 자료 다운로드가 되지 않습니다.</span>
                  </div>

                  <div className={styles.inquire_desc}>
                    <p>
                      안녕하세요. 어제 결제한 자료의 다운로드 버튼을 눌러도
                      반응이 없습니다. 결제 내역에서는 ‘결제완료’로 표시되는데,
                      파일이 열리지 않아 확인 부탁드립니다. <br />
                      <br />
                      자료명: [2025 국어과 읽기지도 자료 세트] <br />
                      주문번호: ORD20250520-1142
                    </p>
                  </div>

                  <div className={styles.inquire_img}>
                    <ul>
                      {[1, 2, 3, 4, 5].map((val, idx) => (
                        <li key={idx}>
                          <Image
                            src={defaultCardImage.src}
                            alt='문의 관련 이미지'
                            width={200}
                            height={150}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.my_answer}>
                <p>
                  안녕하세요, 수업가게 운영팀입니다.
                  <br />
                  이용에 불편을 드려 죄송합니다. 확인 결과, 결제는 정상적으로
                  완료되었으나 파일 서버 전송 과정에서 일시적인 지연이 발생한
                  것으로 확인되었습니다.
                  <br />
                  현재 재처리가 완료되어 [마이페이지 ? 구매내역] 에서 바로
                  다운로드 가능합니다.
                  <br />
                  동일한 문제가 반복될 경우, 브라우저 캐시를 삭제하거나 다른
                  기기에서 재시도해 주세요.
                  <br /> 추가로 문제가 지속되면 고객센터로 다시 문의 주시면
                  신속히 도와드리겠습니다. 감사합니다.
                </p>

                <span className={styles.answer_date}>
                  <span>수업가게 운영팀</span>
                  <span>2025.06.30</span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.pagination_wrap}>
        <Pagination
          currentPage={currentPage}
          totalPages={17}
          onPageChange={handlePageChange}
        />
      </div>

      <div className={styles.none_item_wrap}>
        <span>문의 내역이 없습니다.</span>
      </div>
    </div>
  )
}

export default MyInquire
