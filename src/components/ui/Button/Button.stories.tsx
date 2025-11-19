import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          교육자료 쇼핑몰의 기본 버튼 컴포넌트입니다.

          ## 주요 기능
          - **다양한 변형**: 기본, 삭제, 외곽선, 보조, 고스트, 링크 스타일
          - **크기 옵션**: 기본, 작음, 큼, 아이콘 전용
          - **Radix Slot 지원**: asChild prop으로 다른 요소로 렌더링 가능
          - **접근성**: 키보드 네비게이션 및 스크린 리더 지원

          ## 사용 사례
          - 교육자료 구매 버튼
          - 장바구니 담기 액션
          - 폼 제출 버튼
          - 네비게이션 링크 버튼
          - 관리자 액션 버튼
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link'
      ],
      description: '버튼의 시각적 스타일 변형'
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태'
    },
    asChild: {
      control: 'boolean',
      description: 'Radix Slot을 사용하여 다른 요소로 렌더링'
    },
    children: {
      control: 'text',
      description: '버튼 내용 (텍스트 또는 React 요소)'
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
type Story = StoryObj<typeof Button>

// 기본 스토리
export const Default: Story = {
  args: {
    children: '기본 버튼',
    variant: 'default'
  }
}

// 모든 변형 쇼케이스
export const AllVariants: Story = {
  render: () => (
    <div
      style={{ display: 'flex', gap: '8px', width: '100%', flexWrap: 'wrap' }}
    >
      <Button disabled>비활성화</Button>
      <Button variant='default'>기본</Button>
      <Button variant='outline'>서브</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 모든 시각적 변형을 한눈에 볼 수 있습니다.'
      }
    }
  }
}
