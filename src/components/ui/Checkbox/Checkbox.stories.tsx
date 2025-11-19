import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import Checkbox from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          체크박스 컴포넌트입니다.

          ## 주요 기능
          - **아이콘 통합**: checkbox-fill-s/checkbox-none-s 아이콘 자동 전환
          - **접근성**: 숨겨진 실제 checkbox input 포함
          - **상태 관리**: checked prop으로 선택 상태 제어
          - **비활성화**: disabled 상태 지원

          ## 사용 사례
          - 리스트 다중 선택
          - 전체 선택/해제
          - 설정 옵션 선택
          - 약관 동의
        `
      }
    }
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크 상태'
    },
    label: {
      control: 'text',
      description: '라벨 텍스트'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    id: {
      control: 'text',
      description: 'checkbox input의 id 속성'
    },
    name: {
      control: 'text',
      description: 'checkbox input의 name 속성'
    },
    value: {
      control: 'text',
      description: 'checkbox input의 value 속성'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Checkbox>

// 기본 스토리
export const Default: Story = {
  args: {
    checked: false,
    onChange: (checked) => console.log('Checked:', checked)
  }
}

// 라벨이 있는 체크박스
export const WithLabel: Story = {
  args: {
    checked: false,
    label: '옵션 선택',
    onChange: (checked) => console.log('Checked:', checked)
  }
}

// 체크된 상태
export const Checked: Story = {
  args: {
    checked: true,
    onChange: (checked) => console.log('Checked:', checked)
  }
}

// 체크된 상태 + 라벨
export const CheckedWithLabel: Story = {
  args: {
    checked: true,
    label: '선택된 옵션',
    onChange: (checked) => console.log('Checked:', checked)
  }
}

// 비활성화 상태
export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    onChange: (checked) => console.log('Checked:', checked)
  }
}

// 비활성화 + 체크된 상태
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    onChange: (checked) => console.log('Checked:', checked)
  }
}

// 체크박스 그룹 예시를 위한 컴포넌트
const CheckboxGroupExample = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const items = [
    { id: 1, label: '옵션 1' },
    { id: 2, label: '옵션 2' },
    { id: 3, label: '옵션 3' }
  ]

  const isAllChecked =
    items.length > 0 && items.every((item) => selectedItems.includes(item.id))

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(items.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox
        checked={isAllChecked}
        label='전체 선택'
        onChange={handleSelectAll}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginLeft: '1.5rem'
        }}
      >
        {items.map((item) => (
          <Checkbox
            key={item.id}
            id={`checkbox-${item.id}`}
            checked={selectedItems.includes(item.id)}
            label={item.label}
            onChange={(checked) => {
              setSelectedItems((prev) => {
                if (checked) {
                  return prev.includes(item.id) ? prev : [...prev, item.id]
                } else {
                  return prev.filter((id) => id !== item.id)
                }
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}

export const CheckboxGroup: Story = {
  render: () => <CheckboxGroupExample />,
  parameters: {
    docs: {
      description: {
        story:
          '체크박스 그룹의 실제 사용 예시입니다. 전체 선택과 개별 선택이 연동됩니다.'
      }
    }
  }
}
