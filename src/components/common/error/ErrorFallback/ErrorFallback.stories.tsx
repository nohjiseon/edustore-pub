import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import ErrorFallback from './ErrorFallback'

const meta: Meta<typeof ErrorFallback> = {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          Figma 디자인 기반의 전역 에러 페이지 컴포넌트입니다.

          ## 주요 기능
          - **에러 코드 표시**: 큰 배경 텍스트로 에러 코드 표시 (401, 404, 500)
          - **다양한 에러 타입**: 401 (Unauthorized), 404 (Not Found), 500 (Server Error)
          - **기본값 자동 제공**: 에러 타입에 따른 기본 제목, 메시지
          - **레이아웃 변형**: default (기본), minimal (콤팩트)
          - **메인 버튼**: 메인으로 이동하는 CTA 버튼 지원
          - **디자인 토큰**: Figma 스타일 기반 스타일링
          - **반응형 디자인**: 모바일/데스크톱 최적화

          ## 사용 사례
          - 접근 권한 없음 페이지 (401)
          - 페이지를 찾을 수 없음 (404)
          - 서버 에러 페이지 (500)

          ## Props 가이드
          - \`errorType\`: 에러 타입 ('401' | '404' | '500')
          - \`layout\`: 레이아웃 변형 ('default' | 'minimal')
          - \`title\`: 에러 제목 (미설정 시 기본값 사용)
          - \`message\`: 에러 메시지 (미설정 시 기본값 사용)
          - \`onHome\`: 메인으로 버튼 클릭 핸들러
          - \`customActions\`: 커스텀 액션 요소
        `
      }
    }
  },
  argTypes: {
    errorType: {
      control: { type: 'select' },
      options: ['401', '404', '500'],
      description: '에러 타입',
      defaultValue: '401'
    },
    title: {
      control: 'text',
      description: '에러 제목 (미설정 시 기본값 사용)'
    },
    message: {
      control: 'text',
      description: '에러 메시지 (미설정 시 기본값 사용)'
    },
    onClick: {
      action: 'onClick',
      description: '버튼 클릭 핸들러'
    }
  }
}

export default meta
type Story = StoryObj<typeof ErrorFallback>

// 1. 401 Unauthorized
export const Unauthorized: Story = {
  args: {
    errorType: '401',
    onClick: () => alert('홈으로 이동합니다')
  }
}

// 2. 404 Not Found
export const NotFound: Story = {
  args: {
    errorType: '404',
    onClick: () => alert('홈으로 이동합니다')
  }
}

// 3. 500 Server Error
export const ServerError: Story = {
  args: {
    errorType: '500',
    onClick: () => alert('홈으로 이동합니다')
  }
}
