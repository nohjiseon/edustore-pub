import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Tooltip from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          툴팁 컴포넌트입니다.

          ## 주요 기능
          - **위치 커스터마이징**: top, left 값을 통해 툴팁 위치 조정 가능 (position: absolute)
          - **클릭 토글**: 버튼 클릭 시 툴팁 표시/숨김
          - **외부 클릭 닫기**: 툴팁 외부 클릭 시 자동으로 닫힘
          - **ESC 키 닫기**: ESC 키를 눌러 툴팁 닫기

          ## 사용 사례
          - 정보 아이콘에 추가 설명 제공
          - 버튼의 추가 안내 문구
          - 폼 입력 필드의 도움말
        `
      }
    }
  },
  argTypes: {
    children: {
      description: '툴팁이 표시될 트리거 요소',
      control: { type: 'text' }
    },
    title: {
      description: '툴팁 제목 (선택사항)',
      control: { type: 'text' }
    },
    content: {
      description: '툴팁에 표시될 내용',
      control: { type: 'text' }
    },
    top: {
      description: '문자열: % 또는 다른 단위 사용',
      control: { type: 'text' }
    },
    left: {
      description: '문자열: % 또는 다른 단위 사용',
      control: { type: 'text' }
    },
    width: {
      description: '문자열: % 또는 다른 단위 사용',
      control: { type: 'text' }
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Tooltip>

// 기본 스토리
export const Default: Story = {
  args: {
    children: (
      <button
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        클릭해보세요
      </button>
    ),
    title: '제목',
    bottom: '2rem',
    right: '-3.75rem',
    width: '15rem',
    content: '이것은 기본 툴팁입니다.'
  }
}

// HTML 태그 예시 (br 태그)
export const WithHTMLTags: Story = {
  args: {
    children: (
      <button
        style={{
          padding: '8px 16px',
          backgroundColor: '#ffc107',
          color: 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        HTML 태그 툴팁
      </button>
    ),
    title: '제목',
    bottom: '2rem',
    right: '-3.75rem',
    width: '15rem',
    content: (
      <>
        첫 번째 줄입니다.
        <br />
        두 번째 줄입니다.
        <br />세 번째 줄입니다.
      </>
    )
  }
}
