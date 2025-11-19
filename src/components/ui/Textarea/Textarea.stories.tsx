import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import Textarea from './index'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          교육자료 쇼핑몰의 기본 Textarea 컴포넌트입니다.

          ## 주요 기능
          - **문자 카운터**: maxLength와 showCounter로 입력 제한 표시
          - **에러 상태**: error prop으로 에러 상태 표시
          - **접근성**: 키보드 네비게이션 및 스크린 리더 지원

          ## 사용 사례
          - 문의 내용 입력
          - 리뷰 작성
          - 긴 텍스트 입력 폼
        `
      }
    }
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트'
    },
    maxLength: {
      control: 'number',
      description: '최대 입력 가능한 문자 수'
    },
    showCounter: {
      control: 'boolean',
      description: '문자 카운터 표시 여부'
    },
    error: {
      control: 'boolean',
      description: '에러 상태 표시'
    },
    disabled: {
      control: 'boolean',
      description: 'Textarea 비활성화 상태'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          width: '600px'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Textarea>

// 기본 스토리 - Controls 작동
export const Default: Story = {
  args: {
    placeholder: '내용을 입력해 주세요',
    disabled: false,
    error: false
  }
}

// 문자 카운터 포함 - 실제 동작 시연
const WithCounterComponent = () => {
  const [value, setValue] = useState('')

  return (
    <Textarea
      placeholder='문의하실 내용을 정확하게 입력해 주세요'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      maxLength={500}
      showCounter
    />
  )
}

export const WithCounter: Story = {
  render: () => <WithCounterComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '최대 500자까지 입력 가능하며, 문자 카운터가 표시됩니다.'
      }
    }
  }
}
