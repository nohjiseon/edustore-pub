import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import ToggleBadge from './ToggleBadge'

const meta: Meta<typeof ToggleBadge> = {
  title: 'Components/ToggleBadge',
  component: ToggleBadge,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          선택 상태를 전환할 수 있는 배지 컴포넌트입니다. 크기 옵션과 선택 여부를 조합해
          토글형 필터나 태그 UI를 구성할 때 활용합니다.
        `
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
      description: '배지 크기 변형'
    },
    selected: {
      control: 'boolean',
      description: '선택 상태 토글'
    },
    children: {
      control: 'text',
      description: '배지 내부 콘텐츠'
    }
  }
}

export default meta

type Story = StoryObj<typeof ToggleBadge>

export const Default: Story = {
  args: {
    size: 'md',
    selected: false,
    children: '토글 뱃지'
  }
}

export const Selected: Story = {
  args: {
    size: 'md',
    selected: true,
    children: '선택됨'
  },
  parameters: {
    docs: {
      description: {
        story: '선택 상태가 적용된 배지 예시입니다.'
      }
    }
  }
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <ToggleBadge size='sm'>작은 배지</ToggleBadge>
      <ToggleBadge size='md'>보통 배지</ToggleBadge>
      <ToggleBadge size='md' selected>
        선택된 배지
      </ToggleBadge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '크기와 선택 상태 조합을 한눈에 비교할 수 있습니다.'
      }
    }
  }
}
