'use client'

import { forwardRef, TextareaHTMLAttributes } from 'react'

import styles from './Textarea.module.scss'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCounter?: boolean
  error?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { showCounter = false, maxLength, value, error, className, ...props },
    ref
  ) => {
    const currentLength =
      typeof value === 'string' ? value.length : value?.toString().length || 0

    return (
      <div className={styles.textarea_wrapper}>
        <textarea
          ref={ref}
          className={cn(
            styles.textarea,
            error && styles.error,
            showCounter && styles.with_counter,
            className
          )}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        {showCounter && maxLength && (
          <p className={styles.char_count}>
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
