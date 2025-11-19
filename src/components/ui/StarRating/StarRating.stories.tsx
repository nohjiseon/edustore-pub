import type { Meta, StoryObj } from '@storybook/react'

import StarRating from './StarRating'

const meta = {
  title: 'components/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: '별점 (0~5, 0.5 단위로 반올림)'
    },
    showScore: {
      control: 'boolean',
      description: '점수 텍스트 표시 여부'
    }
  }
} satisfies Meta<typeof StarRating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rating: 5.0,
    showScore: true
  }
}

export const RoundingExample: Story = {
  args: {
    rating: 2.7,
    showScore: true
  },
  parameters: {
    docs: {
      description: {
        story: '4.7은 0.5 단위로 반올림되어 5.0으로 표시됩니다'
      }
    }
  }
}
