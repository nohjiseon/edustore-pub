import type { Meta, StoryObj } from '@storybook/react'

import GravityBox from './GravityBox'
import FloatingButton from '../FloatingButton'

const meta = {
  title: 'UI/GravityBox',
  component: GravityBox,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'matter.js를 활용한 중력 시뮬레이션 컴포넌트입니다. ReactNode 리스트를 받아 물리 시뮬레이션을 적용합니다. 마우스로 드래그하여 요소를 이동할 수 있습니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: '물리 시뮬레이션을 적용할 ReactNode 배열'
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof GravityBox>

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = Array.from({ length: 10 }, (_, i) => (
  <div
    key={i}
    style={{
      width: '2rem',
      height: '0.5rem',
      backgroundColor: [
        '#e74c3c',
        '#3498db',
        '#2ecc71',
        '#f39c12',
        '#9b59b6',
        '#1abc9c'
      ][i % 6],
      borderRadius: '0.25rem'
    }}
  />
))

export const Default: Story = {
  args: {
    items: sampleItems
  }
}

export const WithText: Story = {
  args: {
    items: [
      <div
        key='text1'
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3498db',
          color: 'white',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 'bold'
        }}
      >
        Hello
      </div>,
      <div
        key='text2'
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#e74c3c',
          color: 'white',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 'bold'
        }}
      >
        World
      </div>,
      <div
        key='text3'
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#2ecc71',
          color: 'white',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 'bold'
        }}
      >
        Matter.js
      </div>
    ]
  }
}

export const MixedShapes: Story = {
  args: {
    items: [
      ...sampleItems.slice(0, 5),
      <div
        key='circle'
        style={{
          width: '3rem',
          height: '3rem',
          backgroundColor: '#9b59b6',
          borderRadius: '50%'
        }}
      />,
      <div
        key='square'
        style={{
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: '#1abc9c',
          borderRadius: '0.25rem'
        }}
      />
    ]
  }
}

export const LargeItems: Story = {
  args: {
    items: Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        style={{
          width: '4rem',
          height: '1rem',
          backgroundColor: [
            '#e74c3c',
            '#3498db',
            '#2ecc71',
            '#f39c12',
            '#9b59b6'
          ][i],
          borderRadius: '0.5rem'
        }}
      />
    ))
  }
}

export const WithContent: Story = {
  args: {
    items: [
      <FloatingButton
        key='btn1'
        text='학급 운영을 돕는 생활지도·계획안'
        emoji='📅'
        background='#ffd4a3'
        color='#000000'
      />,
      <FloatingButton
        key='btn2'
        text='수업 자료 준비하기'
        emoji='📚'
        background='#a8d5ff'
        color='#000000'
      />,
      <FloatingButton
        key='btn3'
        text='학부모 상담 일정'
        emoji='👨‍👩‍👧‍👦'
        background='#ffb3ba'
        color='#000000'
      />,
      <FloatingButton
        key='btn4'
        text='시험 문제 출제'
        emoji='📝'
        background='#bae1ff'
        color='#000000'
      />,
      <FloatingButton
        key='btn5'
        text='방과후 활동'
        emoji='⚽'
        background='#c7ceea'
        color='#000000'
      />,
      <FloatingButton
        key='btn6'
        text='성적 입력'
        emoji='💯'
        background='#ffd1dc'
        color='#000000'
      />,
      <FloatingButton
        key='btn7'
        text='출결 관리'
        emoji='✅'
        background='#e0bbe4'
        color='#000000'
      />,
      <FloatingButton
        key='btn8'
        text='학급 행사'
        emoji='🎉'
        background='#d4f1f4'
        color='#000000'
      />
    ]
  }
}
