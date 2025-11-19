import type { Meta, StoryObj } from '@storybook/react'

import Avatar from './Avatar'

import avatarExample from '@/assets/images/example/avatar_example.png'

const meta = {
  title: 'components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithAvatar: Story = {
  args: {
    name: '수업가게닉네임',
    avatar: avatarExample,
    size: 22
  }
}

export const WithDefaultAvatar: Story = {
  args: {
    name: '수업가게닉네임',
    size: 22
  }
}

export const LargeSize: Story = {
  args: {
    name: '수업가게닉네임',
    avatar: avatarExample,
    size: 40
  }
}
