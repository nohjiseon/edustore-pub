'use client'

import { useState } from 'react'

import styles from './InterestSelectionModal.module.scss'

import Button from '@/components/ui/Button/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/Dialog'
import { Icon } from '~/components/Icon'
import { ToggleBadge } from '~/components/ui'

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
    { label: '창의적 체험활동', value: '' },
    { label: '학교자율시간', value: 'S28' },
    { label: '교과통합', value: 'S14' }
  ],
  etc: [{ label: '교과무관', value: 'S29' }]
} as const

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
}

const InterestSelectionModal = ({
  open = false,
  onOpenChange,
  zIndex
}: Props) => {
  const [selectedEdu, setSelectedEdu] = useState<string[]>([])
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

  const handleToggleGradeSelection = (value: string) => {
    setSelectedEdu((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleToggleSubjectSelection = (value: string, groupTitle?: string) => {
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

  const handleToggleAllGrades = (
    grades: readonly { label: string; value: string }[]
  ) => {
    const gradeValues = grades.map((grade) => grade.value)
    const allSelected = gradeValues.every((value) =>
      selectedEdu.includes(value)
    )

    if (allSelected) {
      setSelectedEdu((prev) => prev.filter((v) => !gradeValues.includes(v)))
    } else {
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

  const handleSave = () => {
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modal_content} zIndex={zIndex}>
        <DialogHeader className={styles.modal_header} borderHidden>
          <DialogTitle className={styles.modal_title}>
            회원 관심 정보 선택
            <span className={styles.modal_desc}>다중 선택 가능</span>
          </DialogTitle>
        </DialogHeader>

        <div className={styles.modal_body}>
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
                      onClick={() => handleToggleGradeSelection(item.value)}
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
                        onClick={() => handleToggleGradeSelection(item.value)}
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
                        onClick={() => handleToggleGradeSelection(item.value)}
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
                        onClick={() => handleToggleGradeSelection(item.value)}
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
                      onClick={() => handleToggleGradeSelection(item.value)}
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
              onToggle={(value) => handleToggleSubjectSelection(value, '유아')}
            />

            {/* 초등 */}
            <SubjectGroup
              title='초등'
              items={SUBJECTS.elementary}
              selectedItems={selectedSubjectsByGroup.elementary}
              onToggle={(value) => handleToggleSubjectSelection(value, '초등')}
            />

            {/* 중등 */}
            <SubjectGroup
              title='중등'
              items={SUBJECTS.middle}
              selectedItems={selectedSubjectsByGroup.middle}
              onToggle={(value) => handleToggleSubjectSelection(value, '중등')}
            />

            {/* 고등 */}
            <SubjectGroup
              title='고등'
              items={SUBJECTS.high}
              selectedItems={selectedSubjectsByGroup.high}
              onToggle={(value) => handleToggleSubjectSelection(value, '고등')}
            />

            {/* 기타 */}
            <SubjectGroup
              title='기타'
              items={SUBJECTS.etc}
              selectedItems={selectedSubjectsByGroup.etc}
              onToggle={(value) => handleToggleSubjectSelection(value, '기타')}
            />
          </div>
        </div>

        <DialogFooter className={styles.modal_footer}>
          <Button variant='outline' onClick={() => onOpenChange?.(false)}>
            초기화
          </Button>
          <Button variant='default' onClick={handleSave}>
            선택 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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

export default InterestSelectionModal
