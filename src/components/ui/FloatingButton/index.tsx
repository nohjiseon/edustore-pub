import type { StaticImageData } from 'next/image'

import styles from './FloatingButton.module.scss'

import { cn } from '~/lib/utils'

export interface FloatingButtonProps {
  text: string
  emoji?: string
  img?: string | StaticImageData
  background?: string
  color?: string
  className?: string
}

const FloatingButton = ({
  text,
  emoji,
  img,
  background,
  color,
  className
}: FloatingButtonProps) => {
  return (
    <div
      className={cn(styles.floating_button, className)}
      style={{
        ...(background && { backgroundColor: background }),
        ...(color && { color })
      }}
    >
      {img ? (
        <img src={typeof img === 'string' ? img : img.src} alt={text} />
      ) : (
        <span className={styles.emoji}>{emoji}</span>
      )}
      <span className={styles.text}>{text}</span>
    </div>
  )
}

export default FloatingButton
