import type { Meta, StoryObj } from '@storybook/react'

import ContentInfo from './ContentInfo'

import avatarExample from '@/assets/images/example/avatar_example.png'

const meta = {
  title: 'components/ContentInfo',
  component: ContentInfo,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ContentInfo>

export default meta
type Story = StoryObj<typeof meta>

const mockTags = [
  { name: '초3', color: 'green' as const },
  { name: '국어', color: 'yellow' as const },
  { name: '독서교육', color: 'blue' as const },
  { name: 'PDF', color: 'red' as const }
]

export const Default: Story = {
  args: {
    tags: mockTags,
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    author: {
      name: '수업가게닉네임',
      avatar: avatarExample
    },
    price: 10000,
    onDelete: undefined
  }
}

export const WithCheckbox: Story = {
  args: {
    checked: false,
    tags: mockTags,
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    author: {
      name: '수업가게닉네임',
      avatar: avatarExample
    },
    price: 10000
  }
}

export const WithDeleteButton: Story = {
  args: {
    tags: mockTags,
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    author: {
      name: '수업가게닉네임'
    },
    price: 10000,
    onDelete: () => alert('삭제 버튼 클릭')
  }
}

export const FullFeatures: Story = {
  args: {
    checked: true,
    tags: mockTags,
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    author: {
      name: '수업가게닉네임',
      avatar: avatarExample
    },
    price: 10000,
    onDelete: () => alert('삭제 버튼 클릭')
  }
}

export const WithDefaultAvatar: Story = {
  args: {
    checked: false,
    tags: mockTags,
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    author: {
      name: '수업가게닉네임'
    },
    price: 10000,
    onDelete: () => alert('삭제 버튼 클릭')
  }
}
