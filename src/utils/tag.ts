import { Tag } from '@/components/ui/TagList'
import { TAG_COLOR_MAP, TagType } from '@/constants/tag'
import { TagData } from '@/types/search'

export const convertTagDataToTags = (tagData: TagData): Tag[] => {
  const tags: Tag[] = []

  Object.entries(tagData).forEach(([key, value]) => {
    if (value) {
      const tagType = key as TagType
      const color = TAG_COLOR_MAP[tagType]
      tags.push({ name: value, color })
    }
  })

  return tags
}
