import React from 'react'

import styles from './header.module.scss'

import type { DropdownCategory } from '@/types/education'

interface Props {
  category: DropdownCategory
  onSelect: (
    category: string,
    subcategory?: string,
    gradeLevel?: string
  ) => void
}

// Grid 기반 드롭다운 렌더 컴포넌트
const DropdownItem = ({ category, onSelect }: Props) => {
  return (
    <div className={styles.dropdown_flex}>
      {category.sections.map((section) => (
        <div
          key={section.gradeLevel || section.title || 'section'}
          className={styles.grade_section}
        >
          {section.title && (
            <div className={styles.grade_title}>{section.title}</div>
          )}
          <ul className={styles.subjects_list}>
            {section.items.map((subject) => (
              <li key={subject.searchParam}>
                <button
                  className={styles.subject_item}
                  onClick={() =>
                    onSelect(
                      category.searchParam,
                      subject.searchParam,
                      section.gradeLevel
                    )
                  }
                >
                  {subject.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default DropdownItem
