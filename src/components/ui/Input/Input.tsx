'use client'

import { forwardRef, InputHTMLAttributes, useState } from 'react'

import styles from './Input.module.scss'

import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  message?: string
  title?: string
  regex?: RegExp
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      errorMessage,
      message,
      title,
      className,
      type,
      regex,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const hasError = !!errorMessage
    const displayMessage = errorMessage || message
    const isPasswordType = type === 'password'

    // regex가 있고 validation 통과 시 체크 아이콘 표시
    const showValidIcon = regex && isValid

    // password 타입일 때는 showPassword 상태에 따라 type 결정
    const inputType = isPasswordType
      ? showPassword
        ? 'text'
        : 'password'
      : type

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // regex가 있으면 자동 검증
      if (regex) {
        const inputValue = e.target.value
        setIsValid(regex.test(inputValue))
      }
      // 원래의 onChange 호출
      onChange?.(e)
    }

    return (
      <div className={styles.input_wrapper}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.input_container}>
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={handleChange}
            className={cn(
              styles.input,
              hasError && styles.error,
              (isPasswordType || showValidIcon) && styles.input_with_icon,
              isPasswordType && showValidIcon && styles.input_with_both_icons,
              className
            )}
            {...props}
          />
          {showValidIcon && (
            <div
              className={cn(
                styles.check_icon,
                isPasswordType && styles.check_icon_with_toggle
              )}
            >
              <Icon name='check' size={24} />
            </div>
          )}
          {isPasswordType && (
            <button
              type='button'
              className={styles.toggle_button}
              onClick={handleTogglePassword}
              aria-label={showPassword ? '비밀번호 보기' : '비밀번호 숨기기'}
            >
              <Icon name={showPassword ? 'show' : 'eye-off'} size={20} />
            </button>
          )}
        </div>
        {displayMessage && (
          <p className={cn(styles.message, hasError && styles.error_message)}>
            {displayMessage}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
