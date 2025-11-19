'use client'

import { useState } from 'react'

import styles from './CopyButton.module.scss'

interface Props {
  copyText: string
  className?: string
  onCopy?: () => void
}

const CopyButton = ({ copyText, className, onCopy }: Props) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      setIsCopied(true)
      onCopy?.()
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('복사 실패:', error)
    }
  }

  return (
    <button onClick={handleCopy} className={className || styles.copy_button}>
      {isCopied ? '복사됨' : '복사'}
    </button>
  )
}

export default CopyButton
