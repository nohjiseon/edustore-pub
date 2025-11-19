'use client'

import styles from './FileTag.module.scss'

import { Icon } from '@/components/Icon'

interface Props {
  fileName: string
  onRemove?: () => void
}

const FileTag = ({ fileName, onRemove }: Props) => {
  return (
    <div className={styles.file_tag}>
      <p className={styles.file_name}>{fileName}</p>
      {onRemove && (
        <button
          type='button'
          className={styles.remove_button}
          onClick={onRemove}
          aria-label='파일 제거'
        >
          <Icon name='close' size={14} />
        </button>
      )}
    </div>
  )
}

export default FileTag
