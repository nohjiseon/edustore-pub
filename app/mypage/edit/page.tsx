'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { EmailModal } from './_components/EmailModal'
import InterestSelectionModal from './_components/InterestSelectionModal'
import { NicknameModal } from './_components/NicknameModal'
import { PhoneModal } from './_components/PhoneModal'
import { ProfileModal } from './_components/ProfileModal'
import SubjectModal from './_components/SubjectModal'
import styles from './page.module.scss'

import defaultProfile from '@/assets/images/common/default_profile.png'
import { useModal } from '@/hooks/useModal'
import { authService } from '@/services/auth.service'
import { Icon } from '~/components/Icon'
import { Button, Input, ToggleBadge } from '~/components/ui'

const EDUCATION_LEVELS = [
  { label: '만 3세 이하', value: 'I01' },
  { label: '만 4세', value: 'I02' },
  { label: '만 5세', value: 'I03' },
  { label: '만 6세', value: 'I04' },
  { label: '초등 1학년', value: 'E01' },
  { label: '초등 2학년', value: 'E02' },
  { label: '초등 3학년', value: 'E03' },
  { label: '초등 4학년', value: 'E04' },
  { label: '초등 5학년', value: 'E05' },
  { label: '초등 6학년', value: 'E06' },
  { label: '중등 1학년', value: 'M01' },
  { label: '중등 2학년', value: 'M02' },
  { label: '중등 3학년', value: 'M03' },
  { label: '고등 1학년', value: 'H01' },
  { label: '고등 2학년', value: 'H02' },
  { label: '고등 3학년', value: 'H03' },
  { label: '성인교육', value: 'A01' }
] as const
const SUBJECT_GROUPS = [
  {
    key: 'child',
    title: '유아',
    items: [
      { label: '신체운동·건강', value: 'S15' },
      { label: '의사소통', value: 'S16' },
      { label: '사회관계', value: 'S17' },
      { label: '예술경험', value: 'S18' },
      { label: '자연탐구', value: 'S19' }
    ]
  },
  {
    key: 'elementary',
    title: '초등',
    items: [
      { label: '국어', value: 'S01' },
      { label: '도덕', value: 'S06' },
      { label: '사회', value: 'S05' },
      { label: '수학', value: 'S02' },
      { label: '과학', value: 'S04' },
      { label: '실과', value: 'S07' },
      { label: '음악', value: 'S08' },
      { label: '미술', value: 'S09' },
      { label: '체육', value: 'S10' },
      { label: '영어', value: 'S03' },
      { label: '통합교과(바/슬/즐)', value: 'S11' },
      { label: '창의적 체험활동', value: 'S12' },
      { label: '학교자율시간', value: 'S13' },
      { label: '교과통합', value: 'S14' }
    ]
  },
  {
    key: 'middle',
    title: '중등',
    items: [
      { label: '국어', value: 'S01' },
      { label: '도덕', value: 'S06' },
      { label: '사회', value: 'S05' },
      { label: '수학', value: 'S02' },
      { label: '과학', value: 'S04' },
      { label: '기술·가정', value: 'S20' },
      { label: '정보', value: 'S21' },
      { label: '선택', value: 'S22' },
      { label: '음악', value: 'S08' },
      { label: '미술', value: 'S09' },
      { label: '체육', value: 'S10' },
      { label: '영어', value: 'S03' },
      { label: '창의적 체험활동', value: 'S12' },
      { label: '학교자율시간', value: 'S13' },
      { label: '교과통합', value: 'S14' }
    ]
  },
  {
    key: 'high',
    title: '고등',
    items: [
      { label: '국어', value: 'S01' },
      { label: '사회', value: 'S05' },
      { label: '수학', value: 'S02' },
      { label: '과학', value: 'S04' },
      { label: '기술·가정', value: 'S20' },
      { label: '정보', value: 'S21' },
      { label: '예술', value: 'S22' },
      { label: '제2외국어', value: 'S24' },
      { label: '한문', value: 'S25' },
      { label: '교양', value: 'S26' },
      { label: '전문교과', value: 'S27' },
      { label: '체육', value: 'S10' },
      { label: '영어', value: 'S03' },
      { label: '창의적 체험활동', value: '' },
      { label: '학교자율시간', value: 'S28' },
      { label: '교과통합', value: 'S14' }
    ]
  },
  {
    key: 'etc',
    title: '기타',
    items: [{ label: '교과무관', value: 'S29' }]
  }
] as const

type SubjectGroupKey = (typeof SUBJECT_GROUPS)[number]['key']

const user: {
  id: number
  name: string
  nickname: string
  email: string
  phone: string
  profileImg: string
  tag: string
  joinDate: string
  totalMember: number
  interests: string[]
  subjects: Record<SubjectGroupKey, string[]>
  interestTopics: string[]
} = {
  id: 1,
  name: '홍길동',
  nickname: '길동',
  email: '0000@gmail.com',
  phone: '000-0000-0000',
  profileImg: '',
  tag: '기관회원',
  joinDate: '2025-10-02',
  totalMember: 0,
  interests: ['5', '8', '12'],
  subjects: {
    child: [],
    elementary: ['S01', 'S02'],
    middle: ['51', 'S03'],
    high: [],
    etc: []
  },
  interestTopics: ['독도', '어린이날']
}

// 전화번호 포맷팅 함수 (010-1234-5678 형식)
const formatPhoneNumber = (phoneNumber?: string): string => {
  if (!phoneNumber) return ''

  // 숫자만 추출
  const numbers = phoneNumber.replace(/\D/g, '')

  // 11자리 전화번호 (010-1234-5678)
  if (numbers.length === 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
  }
  // 10자리 전화번호 (010-123-4567)
  else if (numbers.length === 10) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`
  }
  // 그 외의 경우 원본 반환
  return phoneNumber
}

const EditMypage = () => {
  const { openModal } = useModal()
  const [myInfo, setMyInfo] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  console.log(myInfo)

  // 마이페이지 회원 정보 조회
  useEffect(() => {
    const fetchMyPage = async () => {
      setIsLoading(true)
      try {
        const result = await authService.getMyPage()
        setMyInfo(result)
      } catch (error: any) {
        console.error('마이페이지 회원 정보 조회 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMyPage()
  }, [])

  // API 응답에서 관심 학년 데이터 필터링
  // gradeSubjectList는 { gradeCode, gradeNm, subjectCode, subjectNm } 형태의 배열
  // gradeCode를 사용하여 EDUCATION_LEVELS의 value와 매칭
  const gradeCodes = myInfo.gradeSubjectList
    ? Array.from(
        new Set(
          (myInfo.gradeSubjectList as Array<{ gradeCode: string }>).map(
            (item) => item.gradeCode
          )
        )
      )
    : []

  const filteredEdu = EDUCATION_LEVELS.filter((item) =>
    gradeCodes.includes(item.value)
  )

  // API 응답에서 관심 교과 데이터 필터링
  const subjectCodes = myInfo.gradeSubjectList
    ? Array.from(
        new Set(
          (myInfo.gradeSubjectList as Array<{ subjectCode: string }>).map(
            (item) => item.subjectCode
          )
        )
      )
    : []

  const filteredSubjectGroups = SUBJECT_GROUPS.map((group) => {
    const visibleItems = group.items.filter((item) =>
      subjectCodes.includes(item.value)
    )

    return {
      ...group,
      items: visibleItems
    }
  }).filter((group) => group.items.length > 0)

  // 모달
  const handleProfileChange = () => {
    openModal(ProfileModal)
  }
  const handlePhoneChange = () => {
    openModal(PhoneModal)
  }
  const handleNicknameChange = () => {
    openModal(NicknameModal)
  }
  const handleEmailChange = () => {
    openModal(EmailModal)
  }
  const handleInterestChange = () => {
    openModal(InterestSelectionModal)
  }
  const handleSubjectModal = () => {
    const topics =
      myInfo.categoryList?.map(
        (item: { categoryNm?: string; categoryCode?: string }) =>
          item.categoryNm || item.categoryCode || ''
      ) || []
    openModal(SubjectModal, { initialTopics: topics })
  }

  // 프로필 이미지 설정
  const profileSrc =
    myInfo.profileImgUrl && myInfo.profileImgUrl.trim() !== ''
      ? myInfo.profileImgUrl
      : defaultProfile

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_wrap}>
        <div className={styles.profile_img} onClick={handleProfileChange}>
          <Image
            src={profileSrc}
            alt='profile'
            width={100}
            height={100}
            style={{ objectFit: 'cover' }}
          />
          <span className={styles.ic_edit}>
            <Icon name='edit-s' />
          </span>
        </div>
        <p>{myInfo.name}님, 안녕하세요</p>
      </div>

      <div className={styles.card_wrap}>
        {/* 회원 정보 관리 */}
        <div className={styles.card}>
          <h2 className={styles.title}>회원 정보 관리</h2>
          <div className={styles.form_field}>
            <ul>
              <li>
                <label>이름</label>
                <Input
                  type='text'
                  className={styles.inp_gray}
                  value={myInfo.name}
                  readOnly
                />
              </li>
              <li>
                <label>닉네임</label>
                <Input
                  type='text'
                  value={myInfo.nickname}
                  onClick={handleNicknameChange}
                  readOnly
                />
                <Icon
                  name='chevron-right-s'
                  color='var(--color-neutral-grey-2)'
                />
              </li>
              <li>
                <label>이메일</label>
                <Input
                  type='text'
                  value={myInfo.email}
                  onClick={handleEmailChange}
                  readOnly
                />
                <Icon
                  name='chevron-right-s'
                  color='var(--color-neutral-grey-2)'
                />
              </li>
              <li>
                <label>휴대폰 번호</label>
                <Input
                  type='text'
                  value={formatPhoneNumber(myInfo.mobileNumber)}
                  readOnly
                  onClick={handlePhoneChange}
                />
                <Icon
                  name='chevron-right-s'
                  color='var(--color-neutral-grey-2)'
                />
              </li>
            </ul>
          </div>
        </div>

        {/* 회원 관심 정보 */}
        <div className={styles.card}>
          <h2 className={styles.title}>회원 관심 정보</h2>
          <div className={styles.interest_header}>
            <h2>관심 학년</h2>
            <button
              type='button'
              className={styles.reselect_btn}
              onClick={handleInterestChange}
            >
              다시 선택
              <Icon name='chevron-right-s' />
            </button>
          </div>
          <ul className={styles.badge_list}>
            {filteredEdu.map((item) => (
              <li key={item.value}>
                <ToggleBadge size='md'>{item.label}</ToggleBadge>
              </li>
            ))}
          </ul>
          <div className={styles.interest_header}>
            <h2>관심 교과</h2>
            <button
              type='button'
              className={styles.reselect_btn}
              onClick={handleInterestChange}
            >
              다시 선택
              <Icon name='chevron-right-s' />
            </button>
          </div>
          <div className={styles.subject_wrap}>
            {filteredSubjectGroups.map((group) => (
              <div key={group.key} className={styles.subject_group}>
                <div className={styles.subject_title}>
                  <span>{group.title}</span>
                </div>
                <ul className={styles.subject_ul}>
                  {group.items.map((item) => (
                    <li key={`${group.key}-${item.label}`}>
                      <ToggleBadge size='md'>{item.label}</ToggleBadge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.interest_header}>
            <h2>관심 주제</h2>
            <button
              type='button'
              className={styles.reselect_btn}
              onClick={handleSubjectModal}
            >
              다시 선택
              <Icon name='chevron-right-s' />
            </button>
          </div>
          <div className={styles.topics_ul_wrap}>
            <ul>
              {myInfo.categoryList?.map(
                (item: { categoryNm?: string; categoryCode?: string }) => {
                  const topic = item.categoryNm || item.categoryCode || ''
                  return (
                    <li key={topic}>
                      <span>#{topic}</span>
                      <Icon name='close-s' />
                    </li>
                  )
                }
              ) || []}
            </ul>
          </div>
        </div>

        {/* 작성 글 관리 */}
        <div className={styles.card}>
          <h2 className={styles.title}>작성 글 관리</h2>
          <ul className={styles.link_list}>
            <li>
              <Link href='/mypage/inquire'>
                나의 문의 내역
                <Icon name='chevron-right-s' />
              </Link>
            </li>
          </ul>
        </div>

        {/* 회원 계정 보호 */}
        <div className={styles.card}>
          <h2 className={styles.title}>회원 계정 보호</h2>
          <ul className={styles.link_list}>
            <li>
              <Link href='/policy/privacy'>
                개인 정보 처리 방침
                <Icon name='chevron-right-s' />
              </Link>
            </li>
            <li>
              <Link href='#'>
                비밀 번호 변경
                <Icon name='chevron-right-s' />
              </Link>
            </li>
            <li>
              <Link href='#'>
                회원 탈퇴
                <Icon name='chevron-right-s' />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.btn_wrap}>
        <Button variant='default' width={195}>
          확인
        </Button>
      </div>
    </div>
  )
}

export default EditMypage
