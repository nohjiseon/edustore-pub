import styles from './TagList.module.scss'

export type TagColor = 'green' | 'yellow' | 'blue' | 'red'

export interface Tag {
  name: string
  color: TagColor
}

export interface TagListProps {
  tags: Tag[]
  gap?: number
}

const TagList = ({ tags, gap = 0.12 }: TagListProps) => {
  return (
    <div className={styles.tags_wrapper} style={{ gap: `${gap}rem` }}>
      {tags.map((tag, index) => (
        <div
          key={`${tag.name}-${index}`}
          className={`${styles.tag} ${styles[tag.color]}`}
        >
          {tag.name}
        </div>
      ))}
    </div>
  )
}

export default TagList
