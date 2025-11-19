import {
  ALL_FILTER_ITEMS,
  FILTER_EXPANSIONS
} from '@/constants/education-filter-options'
import type { DropdownItem } from '@/types/education'

/**
 * 역방향 매핑 맵 생성 (label → searchParam)
 */
const LABEL_TO_SEARCHPARAM_MAP = Object.fromEntries(
  Object.entries(ALL_FILTER_ITEMS).map(([key, value]) => [value, key])
) as Record<string, string>

/**
 * searchParam 배열을 DropdownItem 배열로 변환
 * @param searchParams - searchParam 문자열 배열
 * @param source - label 매핑 소스 객체
 */
export const createItems = (
  searchParams: string[],
  source: Record<string, string>
): DropdownItem[] => {
  return searchParams.map((param) => ({
    label: source[param as keyof typeof source],
    searchParam: param
  }))
}

/**
 * searchParam → label 변환 (URL → UI)
 * @example searchParamToLabel('elementary-1') → '초등 1학년'
 */
export const searchParamToLabel = (searchParam: string): string | undefined => {
  return ALL_FILTER_ITEMS[searchParam as keyof typeof ALL_FILTER_ITEMS]
}

/**
 * label → searchParam 변환 (UI → URL)
 * @example labelToSearchParam('초등 1학년') → 'elementary-1'
 */
export const labelToSearchParam = (label: string): string | undefined => {
  return LABEL_TO_SEARCHPARAM_MAP[label]
}

/**
 * 여러 label을 searchParam으로 변환
 * @example labelsToSearchParams(['초등 1학년', '초등 2학년']) → ['elementary-1', 'elementary-2']
 */
export const labelsToSearchParams = (labels: string[]): string[] => {
  return labels
    .map((label) => labelToSearchParam(label))
    .filter((result): result is string => result !== undefined)
}

/**
 * 여러 searchParam을 label로 변환
 * @example searchParamsToLabels(['elementary-1', 'elementary-2']) → ['초등 1학년', '초등 2학년']
 */
export const searchParamsToLabels = (searchParams: string[]): string[] => {
  return searchParams
    .map((param) => searchParamToLabel(param))
    .filter((result): result is string => result !== undefined)
}

/**
 * label이 유효한지 확인
 * @example isValidLabel('초등 1학년') → true
 */
export const isValidLabel = (label: string): boolean => {
  return labelToSearchParam(label) !== undefined
}

/**
 * searchParam이 유효한지 확인
 * @example isValidSearchParam('elementary-1') → true
 */
export const isValidSearchParam = (searchParam: string): boolean => {
  return searchParamToLabel(searchParam) !== undefined
}

/**
 * searchParam을 실제 필터 값으로 확장
 * @param param - URL searchParam 값
 * @returns 실제 필터에 적용될 항목 배열
 *
 * @example
 * expandFilterParam('kindergarten-all')
 * // → ['age-3-under', 'age-4', 'age-5', 'age-6']
 *
 * @example
 * expandFilterParam('age-4')
 * // → ['age-4']
 */
export const expandFilterParam = (param: string): string[] => {
  const expanded = FILTER_EXPANSIONS[param as keyof typeof FILTER_EXPANSIONS]
  return expanded ? [...expanded] : [param]
}

/**
 * 여러 searchParam을 실제 필터 값으로 확장
 * @param params - URL searchParam 배열
 * @returns 중복 제거된 실제 필터 항목 배열
 *
 * @example
 * expandFilterParams(['kindergarten-all', 'elementary-1'])
 * // → ['age-3-under', 'age-4', 'age-5', 'age-6', 'elementary-1']
 */
export const expandFilterParams = (params: string[]): string[] => {
  const expanded = params.flatMap((param) => expandFilterParam(param))
  return [...new Set(expanded)] // 중복 제거
}

/**
 * 주어진 searchParam이 속한 "-all" 그룹 찾기
 * @param searchParam - 검색할 searchParam (예: 'age-4')
 * @returns "-all" 그룹 키 또는 undefined
 *
 * @example
 * findAllGroupForParam('age-4') → 'kindergarten-all'
 * findAllGroupForParam('elementary-1') → 'elementary-all'
 */
export const findAllGroupForParam = (
  searchParam: string
): string | undefined => {
  const entries = Object.entries(FILTER_EXPANSIONS) as Array<
    [string, readonly string[]]
  >

  for (const [key, values] of entries) {
    if (values.includes(searchParam)) {
      return key
    }
  }
  return undefined
}

/**
 * "-all" 그룹에서 특정 searchParam을 제거한 결과 반환
 * @param allGroupKey - "-all" 그룹 키 (예: 'kindergarten-all')
 * @param excludeParam - 제외할 searchParam (예: 'age-4')
 * @returns 제외 후 남은 searchParam 배열
 *
 * @example
 * removeFromAllGroup('kindergarten-all', 'age-4')
 * // → ['age-3-under', 'age-5', 'age-6']
 */
export const removeFromAllGroup = (
  allGroupKey: string,
  excludeParam: string
): string[] => {
  const expanded =
    FILTER_EXPANSIONS[allGroupKey as keyof typeof FILTER_EXPANSIONS]
  if (!expanded) return []
  return expanded.filter((param) => param !== excludeParam)
}
