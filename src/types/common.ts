export type ThemeType = 'light' | 'dark'

export interface PaginationModel {
  page: number
  size: number
  total: number
  hasNext: boolean
  totalPages: number
}
