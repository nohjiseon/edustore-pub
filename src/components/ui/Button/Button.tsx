import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import styles from './Button.module.scss'

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'outline'
  width?: number
  asChild?: boolean
}

const Button = ({
  className,
  variant = 'default',
  width,
  asChild = false,
  style,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  const buttonClasses = [styles.container, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  const customStyle = {
    ...style,
    width: width ? `${width}px` : '100%'
  }

  return (
    <Comp
      data-slot='button'
      className={buttonClasses}
      style={customStyle}
      {...props}
    />
  )
}

export default Button
export type { ButtonProps }
