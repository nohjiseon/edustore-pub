import { TagColor } from '@/components/ui/TagList'

export type TagType = 'grade' | 'subject' | 'type' | 'format'

export const TAG_COLOR_MAP: Record<TagType, TagColor> = {
  grade: 'green',
  subject: 'yellow',
  type: 'blue',
  format: 'red'
} as const
