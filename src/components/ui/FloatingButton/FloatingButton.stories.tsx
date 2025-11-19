import type { Meta, StoryObj } from '@storybook/react'

import FloatingButton from './index'

const meta = {
  title: 'components/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    emoji: { control: 'text' },
    background: { control: 'color' },
    color: { control: 'color' }
  }
} satisfies Meta<typeof FloatingButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: '학급 운영을 돕는 생활지도·계획안',
    emoji: '📅'
  }
}

export const CustomColors: Story = {
  args: {
    text: '커스텀 색상 버튼',
    emoji: '🎨',
    background: '#ffc0cb',
    color: '#ff1493'
  }
}

export const ShortText: Story = {
  args: {
    text: '알림',
    emoji: '🔔',
    background: '#e1f5fe',
    color: '#01579b'
  }
}

export const LongText: Story = {
  args: {
    text: '프로젝트 관리 및 협업 도구를 활용한 효율적인 업무 처리',
    emoji: '📊',
    background: '#f3e5f5',
    color: '#4a148c'
  }
}
