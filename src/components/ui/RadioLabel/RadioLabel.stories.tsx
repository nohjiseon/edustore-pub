import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import RadioLabel from './RadioLabel'

const meta: Meta<typeof RadioLabel> = {
  title: 'Components/RadioLabel',
  component: RadioLabel,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          라디오 버튼 라벨 컴포넌트입니다.

          ## 주요 기능
          - **아이콘 통합**: radio-on/radio-off 아이콘 자동 전환
          - **접근성**: 숨겨진 실제 radio input 포함
          - **상태 관리**: checked prop으로 선택 상태 제어
          - **비활성화**: disabled 상태 지원

          ## 사용 사례
          - 결제 방식 선택
          - 배송 옵션 선택
          - 설정 옵션 선택
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: '라벨 텍스트'
    },
    checked: {
      control: 'boolean',
      description: '체크 상태'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    name: {
      control: 'text',
      description: 'radio input의 name 속성'
    },
    value: {
      control: 'text',
      description: 'radio input의 value 속성'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          gap: '1rem',
          width: '500px',
          alignItems: 'center'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof RadioLabel>

// 기본 스토리
export const Default: Story = {
  args: {
    label: '옵션 선택',
    checked: true,
    name: 'option',
    value: 'selected'
  }
}

// 라디오 그룹 예시를 위한 컴포넌트
const RadioGroupExample = () => {
  const [selected, setSelected] = useState<'group' | 'individual'>('group')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <RadioLabel
        label='단체 충전금 결제'
        checked={selected === 'group'}
        onChange={() => setSelected('group')}
        name='paymentType'
        value='group'
      />

      <RadioLabel
        label='개인 결제'
        checked={selected === 'individual'}
        onChange={() => setSelected('individual')}
        name='paymentType'
        value='individual'
      />
    </div>
  )
}

export const RadioGroup: Story = {
  render: () => <RadioGroupExample />,
  parameters: {
    docs: {
      description: {
        story: '라디오 버튼 그룹의 실제 사용 예시입니다.'
      }
    }
  }
}
