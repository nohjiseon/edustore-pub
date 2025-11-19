'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'

import styles from './page.module.scss'

import { Icon } from '~/components/Icon'
import { ToggleBadge } from '~/components/ui'
import Button from '~/components/ui/Button'
import { authService } from '~/services/auth.service'

// 첫 번째 단계에서 전달받은 데이터 타입
interface SignupStep1Data {
  email: string
  name: string
  phoneNumber: string
  nickname: string
  password: string
  idVerifyReqNo?: string
  ci?: string
  reqno?: string
  birthday?: string
  isPassVerified?: boolean
  verifiedAt?: string
}

const EDUCATION_LEVELS = [
  { label: '만 3세 이하', value: 'I01' },
  { label: '만 4세', value: 'I02' },
  { label: '만 5세', value: 'I03' },
  { label: '만 6세', value: 'I04' }
] as const

const ELEMENTARY_EDUCATION_LEVELS = [
  { label: '초등 1학년', value: 'E01' },
  { label: '초등 2학년', value: 'E02' },
  { label: '초등 3학년', value: 'E03' },
  { label: '초등 4학년', value: 'E04' },
  { label: '초등 5학년', value: 'E05' },
  { label: '초등 6학년', value: 'E06' }
] as const

const MIDDLE_EDUCATION_LEVELS = [
  { label: '중등 1학년', value: 'M01' },
  { label: '중등 2학년', value: 'M02' },
  { label: '중등 3학년', value: 'M03' }
] as const

const HIGH_EDUCATION_LEVELS = [
  { label: '고등 1학년', value: 'H01' },
  { label: '고등 2학년', value: 'H02' },
  { label: '고등 3학년', value: 'H03' }
] as const

const ETC_EDUCATION_LEVELS = [
  { label: '성인교육', value: 'A01' },
  { label: '특수교육', value: 'S01' }
] as const

const SUBJECTS = {
  child: [
    { label: '신체운동·건강', value: 'S15' },
    { label: '의사소통', value: 'S16' },
    { label: '사회관계', value: 'S17' },
    { label: '예술경험', value: 'S18' },
    { label: '자연탐구', value: 'S19' }
  ],
  elementary: [
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
  ],
  middle: [
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
  ],
  high: [
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
    { label: '창의적 체험활동', value: 'S12' },
    { label: '학교자율시간', value: 'S28' },
    { label: '교과통합', value: 'S14' }
  ],
  etc: [{ label: '교과무관', value: 'S29' }]
} as const

const MAX_TOPICS = 5

const PersonalSignupPage2 = () => {
  const [selectedEdu, setSelectedEdu] = useState<string[]>([])
  const [selectedSub, setSelectedSub] = useState<string[]>([])
  const [topic, setTopic] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // 그룹별 과목 선택 상태 (초등, 중등, 고등, 기타, 유아)
  const [selectedSubjectsByGroup, setSelectedSubjectsByGroup] = useState<{
    child: string[]
    elementary: string[]
    middle: string[]
    high: string[]
    etc: string[]
  }>({
    child: [],
    elementary: [],
    middle: [],
    high: [],
    etc: []
  })

  const router = useRouter()

  // 첫 번째 단계에서 전달받은 데이터
  const [step1Data, setStep1Data] = useState<SignupStep1Data | null>(null)

  // localStorage에서 데이터 추출
  useEffect(() => {
    const storedData = localStorage.getItem('signup_step1_data')

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setStep1Data(parsedData)
      } catch (error) {
        console.error('데이터 파싱 에러:', error)
        // 데이터가 잘못된 경우 첫 번째 단계로 리다이렉트
        router.push('/signup/personal')
      }
    } else {
      // 데이터가 없으면 첫 번째 단계로 리다이렉트
      router.push('/signup/personal')
    }
  }, [router])

  const isTopicValid =
    topic.trim().length >= 2 &&
    topic.trim().length <= 20 &&
    selectedSub.length < MAX_TOPICS

  // 학년, 교과, 주제 모두 최소 1개씩 선택되었는지 확인
  const hasGradeSelection = selectedEdu.some((value) => {
    return [
      'E01',
      'E02',
      'E03',
      'E04',
      'E05',
      'E06',
      'M01',
      'M02',
      'M03',
      'H01',
      'H02',
      'H03'
    ].includes(value)
  })

  const hasSubjectSelection = Object.values(selectedSubjectsByGroup).some(
    (subjects) => subjects.length > 0
  )

  const hasTopicSelection = selectedSub.length > 0

  const canSubmit =
    hasGradeSelection && hasSubjectSelection && hasTopicSelection

  const handleToggleSelection = (value: string, groupTitle?: string) => {
    // 학년인 경우 (그룹 정보 없음)
    if (!groupTitle) {
      setSelectedEdu((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      )
      return
    }

    // 과목인 경우 그룹별로 관리
    const groupKey =
      groupTitle === '유아'
        ? 'child'
        : groupTitle === '초등'
        ? 'elementary'
        : groupTitle === '중등'
        ? 'middle'
        : groupTitle === '고등'
        ? 'high'
        : ('etc' as keyof typeof selectedSubjectsByGroup)

    setSelectedSubjectsByGroup((prev) => {
      const currentSubjects = prev[groupKey] || []
      const newSubjects = currentSubjects.includes(value)
        ? currentSubjects.filter((v) => v !== value)
        : [...currentSubjects, value]

      return {
        ...prev,
        [groupKey]: newSubjects
      }
    })
  }

  // 초등/중등/고등 전체 선택/해제
  const handleToggleAllGrades = (
    grades: readonly { label: string; value: string }[]
  ) => {
    const gradeValues = grades.map((grade) => grade.value)
    const allSelected = gradeValues.every((value) =>
      selectedEdu.includes(value)
    )

    if (allSelected) {
      // 모두 선택된 경우 → 모두 해제
      setSelectedEdu((prev) => prev.filter((v) => !gradeValues.includes(v)))
    } else {
      // 하나라도 선택되지 않은 경우 → 모두 선택
      setSelectedEdu((prev) => {
        const newSelection = [...prev]
        gradeValues.forEach((value) => {
          if (!newSelection.includes(value)) {
            newSelection.push(value)
          }
        })
        return newSelection
      })
    }
  }

  const handleAddTopic = () => {
    if (!isTopicValid) return

    const trimmedTopic = topic.trim()

    setSelectedSub((prev) =>
      prev.includes(trimmedTopic) ? prev : [...prev, trimmedTopic]
    )
    setTopic('')

    inputRef.current?.focus()
  }

  const handleRemoveTopic = (value: string) => {
    setSelectedSub((prev) => prev.filter((v) => v !== value))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTopic()
    }
  }

  const handleSubmit = async () => {
    if (!step1Data) {
      alert('첫 번째 단계 데이터가 없습니다.')
      return
    }

    // 학년 코드 리스트 생성 (학년 코드만 필터링)
    const gradeCodeList = selectedEdu.filter((value) => {
      return [
        'E01',
        'E02',
        'E03',
        'E04',
        'E05',
        'E06',
        'M01',
        'M02',
        'M03',
        'H01',
        'H02',
        'H03'
      ].includes(value)
    })

    // 그룹별로 선택된 과목들을 모두 수집하고 중복 제거
    const allSelectedSubjects = new Set<string>()

    // 각 그룹의 과목들을 수집 (중복 제거)
    Object.values(selectedSubjectsByGroup).forEach((subjects) => {
      subjects.forEach((subjectCode) => {
        if (subjectCode) {
          // 빈 문자열 제외
          allSelectedSubjects.add(subjectCode)
        }
      })
    })

    // 과목 코드 리스트 생성 (중복 제거된 배열)
    const subjectCodeList = Array.from(allSelectedSubjects)

    try {
      // API 호출
      await authService.signup({
        idVerifyReqNo: step1Data.reqno,
        ci: step1Data.ci,
        name: step1Data.name,
        nickname: step1Data.nickname,
        email: step1Data.email,
        mobileNumber: step1Data.phoneNumber,
        birthday: step1Data.birthday,
        password: step1Data.password,
        confirmPassword: step1Data.password,
        gradeCodeList,
        subjectCodeList,
        categoryList: selectedSub
      })

      // 회원가입 완료 후 localStorage 데이터 정리
      localStorage.removeItem('signup_step1_data')

      router.push('/signup/complete?type=personalSuccess')
    } catch (error: any) {
      console.error('회원가입 API 에러:', error)
      const errorMessage = '회원가입 중 오류가 발생했습니다.'
      alert(errorMessage)
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 */}
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>개인 회원가입</h1>
      </div>

      {/* 개인 회원 정보 */}
      <div className={styles.personal_form}>
        <div className={styles.interest_wrap}>
          {/* 관심 학년 선택 */}
          <div className={styles.interest_grade}>
            <div className={styles.interest_title_wrap}>
              <span className={styles.interest_title}>관심 학년 선택</span>
              <span className={styles.interest_desc}>다중 선택 가능</span>
            </div>

            <div className={styles.interest_grade_wrap}>
              {/* 관심학년 어린이 */}
              <ul className={styles.interest_ul}>
                {EDUCATION_LEVELS.map((item, index) => (
                  <li key={item.value || `edu-${index}`}>
                    <ToggleBadge
                      size='md'
                      onClick={() => handleToggleSelection(item.value)}
                      selected={selectedEdu.includes(item.value)}
                    >
                      {item.label}
                    </ToggleBadge>
                  </li>
                ))}
              </ul>

              {/* 관심학년 초등 */}
              <div className={styles.interest_grade_section}>
                <div className={styles.interest_all}>
                  <ToggleBadge
                    size='md'
                    onClick={() =>
                      handleToggleAllGrades(ELEMENTARY_EDUCATION_LEVELS)
                    }
                    selected={ELEMENTARY_EDUCATION_LEVELS.every((item) =>
                      selectedEdu.includes(item.value)
                    )}
                  >
                    초등 전체
                  </ToggleBadge>
                  <Icon name='divider-bottom' />
                </div>
                <ul className={styles.interest_ul}>
                  {ELEMENTARY_EDUCATION_LEVELS.map((item, index) => (
                    <li key={item.value || `elementary-${index}`}>
                      <ToggleBadge
                        size='md'
                        onClick={() => handleToggleSelection(item.value)}
                        selected={selectedEdu.includes(item.value)}
                      >
                        {item.label}
                      </ToggleBadge>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 관심학년 중등 */}
              <div className={styles.interest_grade_section}>
                <div className={styles.interest_all}>
                  <ToggleBadge
                    size='md'
                    onClick={() =>
                      handleToggleAllGrades(MIDDLE_EDUCATION_LEVELS)
                    }
                    selected={MIDDLE_EDUCATION_LEVELS.every((item) =>
                      selectedEdu.includes(item.value)
                    )}
                  >
                    중등 전체
                  </ToggleBadge>
                  <Icon name='divider-bottom' />
                </div>
                <ul className={styles.interest_ul}>
                  {MIDDLE_EDUCATION_LEVELS.map((item, index) => (
                    <li key={item.value || `middle-${index}`}>
                      <ToggleBadge
                        size='md'
                        onClick={() => handleToggleSelection(item.value)}
                        selected={selectedEdu.includes(item.value)}
                      >
                        {item.label}
                      </ToggleBadge>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 관심학년 고등 */}
              <div className={styles.interest_grade_section}>
                <div className={styles.interest_all}>
                  <ToggleBadge
                    size='md'
                    onClick={() => handleToggleAllGrades(HIGH_EDUCATION_LEVELS)}
                    selected={HIGH_EDUCATION_LEVELS.every((item) =>
                      selectedEdu.includes(item.value)
                    )}
                  >
                    고등 전체
                  </ToggleBadge>
                  <Icon name='divider-bottom' />
                </div>
                <ul className={styles.interest_ul}>
                  {HIGH_EDUCATION_LEVELS.map((item, index) => (
                    <li key={item.value || `high-${index}`}>
                      <ToggleBadge
                        size='md'
                        onClick={() => handleToggleSelection(item.value)}
                        selected={selectedEdu.includes(item.value)}
                      >
                        {item.label}
                      </ToggleBadge>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 관심학년 기타 */}
              <ul className={styles.interest_ul}>
                {ETC_EDUCATION_LEVELS.map((item, index) => (
                  <li key={item.value || `etc-edu-${index}`}>
                    <ToggleBadge
                      size='md'
                      onClick={() => handleToggleSelection(item.value)}
                      selected={selectedEdu.includes(item.value)}
                    >
                      {item.label}
                    </ToggleBadge>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 관심 교과 선택 */}
          <div className={styles.interest_subject}>
            <div className={styles.interest_title_wrap}>
              <span className={styles.interest_title}>관심 교과 선택</span>
              <span className={styles.interest_desc}>다중 선택 가능</span>
            </div>

            {/* 유아 */}
            <SubjectGroup
              title='유아'
              items={SUBJECTS.child}
              selectedItems={selectedSubjectsByGroup.child}
              onToggle={(value) => handleToggleSelection(value, '유아')}
            />

            {/* 초등 */}
            <SubjectGroup
              title='초등'
              items={SUBJECTS.elementary}
              selectedItems={selectedSubjectsByGroup.elementary}
              onToggle={(value) => handleToggleSelection(value, '초등')}
            />

            {/* 중등 */}
            <SubjectGroup
              title='중등'
              items={SUBJECTS.middle}
              selectedItems={selectedSubjectsByGroup.middle}
              onToggle={(value) => handleToggleSelection(value, '중등')}
            />

            {/* 고등 */}
            <SubjectGroup
              title='고등'
              items={SUBJECTS.high}
              selectedItems={selectedSubjectsByGroup.high}
              onToggle={(value) => handleToggleSelection(value, '고등')}
            />

            {/* 기타 */}
            <SubjectGroup
              title='기타'
              items={SUBJECTS.etc}
              selectedItems={selectedSubjectsByGroup.etc}
              onToggle={(value) => handleToggleSelection(value, '기타')}
            />
          </div>
        </div>

        <div className={styles.topics_wrap}>
          {/* 관심 주제 타이틀 */}
          <div className={styles.interest_title_wrap}>
            <span className={styles.interest_title}>관심 주제 입력</span>
            <span className={styles.interest_desc}>
              최대 {MAX_TOPICS}개까지 입력 가능
            </span>
          </div>

          {/* 관심 주제 입력창 */}
          <div className={styles.interest_input_wrap}>
            <input
              type='text'
              placeholder='예 : 독도, 어린이날'
              ref={inputRef}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={handleKeyPress}
              maxLength={20}
              // disabled={selectedSub.length >= MAX_TOPICS}
            />
            <Button onClick={handleAddTopic} disabled={!isTopicValid}>
              추가
            </Button>
          </div>

          {/* 선택된 주제 목록 */}
          {selectedSub.length > 0 && (
            <div className={styles.topics_ul_wrap}>
              <ul>
                {selectedSub.map((item) => (
                  <li key={item}>
                    <span>#{item}</span>
                    <Icon
                      name='close-s'
                      onClick={() => handleRemoveTopic(item)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 가입완료 버튼 */}
          <div className={styles.button_wrap}>
            <Button
              variant='default'
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              가입완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SubjectGroupProps {
  title: string
  items: readonly { label: string; value: string }[]
  selectedItems: string[]
  onToggle: (value: string) => void
}

const SubjectGroup = ({
  title,
  items,
  selectedItems,
  onToggle
}: SubjectGroupProps) => {
  return (
    <div className={styles.interest_subject_group}>
      <div className={styles.subject_title}>
        <span>{title}</span>
      </div>
      <ul className={styles.interest_ul}>
        {items.map((item, index) => (
          <li key={item.value || `${title}-${index}`}>
            <ToggleBadge
              size='md'
              onClick={() => onToggle(item.value)}
              selected={selectedItems.includes(item.value)}
            >
              {item.label}
            </ToggleBadge>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PersonalSignupPage2
