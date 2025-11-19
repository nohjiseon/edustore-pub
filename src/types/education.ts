/**
 * 교육 카테고리 관련 타입 정의
 *
 * @version 1.0.0
 * @created 2025-01-13
 */

/**
 * 드롭다운 개별 항목
 * id와 searchParam은 동일한 값으로 자동 생성됨
 */
export interface DropdownItem {
  label: string
  searchParam: string
}

/**
 * 드롭다운 섹션 (여러 항목을 그룹화)
 * key는 gradeLevel 또는 title로 자동 생성됨
 */
export interface DropdownSection {
  title?: string
  items: DropdownItem[]
  gradeLevel?: string
}

/**
 * 드롭다운 카테고리 (최상위 메뉴 항목)
 * id와 searchParam은 동일한 값으로 자동 생성됨
 */
export interface DropdownCategory {
  label: string
  searchParam: string
  sections: DropdownSection[]
}
