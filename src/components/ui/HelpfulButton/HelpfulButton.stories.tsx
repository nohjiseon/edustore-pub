import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import HelpfulButton from './index'

const meta: Meta<typeof HelpfulButton> = {
  title: 'Components/HelpfulButton',
  component: HelpfulButton,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          리뷰 등에서 유용함을 표시하는 버튼 컴포넌트입니다.

          ## 주요 기능
          - **활성/비활성 상태**: isHelpful prop으로 상태 제어
          - **카운트 표시**: 도움이 된 사용자 수 표시
          - **클릭 이벤트**: onClick 핸들러 지원
          - **스타일 변형**: active 상태에 따른 색상 변화

          ## 사용 사례
          - 리뷰 도움됨 버튼
          - 댓글 추천 버튼
          - 평가 시스템
        `
      }
    }
  },
  argTypes: {
    count: {
      control: { type: 'number', min: 0 },
      description: '도움이 된 사용자 수'
    },
    enabled: {
      control: 'boolean',
      description: '활성화 상태 (사용자가 도움됨을 눌렀는지 여부)'
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러'
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스'
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
type Story = StoryObj<typeof HelpfulButton>

// 비활성 상태 (기본)
export const Inactive: Story = {
  args: {
    count: 12,
    enabled: false
  },
  parameters: {
    docs: {
      description: {
        story: '사용자가 아직 도움됨을 누르지 않은 상태입니다.'
      }
    }
  }
}

// 활성 상태
export const Active: Story = {
  args: {
    count: 13,
    enabled: true
  },
  parameters: {
    docs: {
      description: {
        story:
          '사용자가 도움됨을 누른 활성 상태입니다. 색상이 변경되어 강조됩니다.'
      }
    }
  }
}
