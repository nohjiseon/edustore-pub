import { create } from 'zustand'

import {
  SEARCH_FILTER_OPTIONS,
  GRADE_CATEGORY_MAP,
  SUBJECT_OPTIONS,
  SubjectCategory
} from '~/constants/education'
import { SUBJECT_GRADE_RESTRICTIONS } from '~/constants/education-filter-options'

interface SearchFilterStore {
  selectedGrades: string[]
  enabledSubjects: readonly string[]
  disabledSubjects: string[]
  setSelectedGrades: (grades: string[]) => void
}

// 선택된 학년에 따라 활성화된 교과 목록을 반환하는 함수
const getEnabledSubjectsByGrades = (
  selectedGrades: string[]
): readonly string[] => {
  // 학년이 선택되지 않았으면 모든 교과 활성화
  if (selectedGrades.length === 0) {
    return SEARCH_FILTER_OPTIONS.subject
  }

  // 선택된 학년들에 해당하는 카테고리 찾기
  const categories = new Set<SubjectCategory>()

  selectedGrades.forEach((grade) => {
    for (const [category, grades] of Object.entries(GRADE_CATEGORY_MAP)) {
      if ((grades as readonly string[]).includes(grade)) {
        categories.add(category as SubjectCategory)
      }
    }
  })

  // 해당 카테고리들의 교과 합치기
  const subjects: string[] = []
  categories.forEach((category) => {
    subjects.push(...SUBJECT_OPTIONS[category])
  })

  // 중복 제거
  const uniqueSubjects = [...new Set(subjects)]

  // 세부 제약 조건 적용 (특정 학년에서만 허용되는 교과 필터링)
  const filteredSubjects = uniqueSubjects.filter((subject) => {
    const restrictions = SUBJECT_GRADE_RESTRICTIONS[subject]

    // 제약이 없으면 허용
    if (!restrictions) return true

    // 제약이 있으면 선택된 학년 중 하나라도 허용 목록에 있어야 함
    return selectedGrades.some((grade) => restrictions.includes(grade))
  })

  return filteredSubjects
}

export const useSearchFilterStore = create<SearchFilterStore>((set, get) => ({
  selectedGrades: [],
  enabledSubjects: SEARCH_FILTER_OPTIONS.subject,
  disabledSubjects: [],

  setSelectedGrades: (grades) => {
    const enabledSubjects = getEnabledSubjectsByGrades(grades)
    const disabledSubjects = SEARCH_FILTER_OPTIONS.subject.filter(
      (subject) => !enabledSubjects.includes(subject)
    )
    set({
      selectedGrades: grades,
      enabledSubjects,
      disabledSubjects
    })
  }
}))
