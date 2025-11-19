'use client'

import { useState } from 'react'

import styles from './PaymentMethod.module.scss'

import RadioLabel from '@/components/ui/RadioLabel'

type PaymentType = 'group' | 'individual'

interface Props {
  defaultMethod?: PaymentType
  onMethodChange?: (method: PaymentType) => void
}

const PaymentMethod = ({ defaultMethod = 'group', onMethodChange }: Props) => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentType>(defaultMethod)

  const handleMethodChange = (method: PaymentType) => {
    setSelectedMethod(method)
    onMethodChange?.(method)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>결제 방식</h2>

      <div className={styles.options}>
        <RadioLabel
          label='단체 충전금 결제'
          name='payment_method'
          value='group'
          checked={selectedMethod === 'group'}
          onChange={() => handleMethodChange('group')}
        />

        <RadioLabel
          label='개인 결제'
          name='payment_method'
          value='individual'
          checked={selectedMethod === 'individual'}
          onChange={() => handleMethodChange('individual')}
        />
      </div>
    </div>
  )
}

export default PaymentMethod
