import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          페이지네이션 컴포넌트입니다.

          ## 주요 기능
          - **페이지 이동**: 이전/다음 버튼으로 페이지 이동
          - **직접 선택**: 페이지 번호를 클릭하여 직접 이동
          - **가시성 제어**: 표시할 최대 페이지 수 설정 가능
          - **반응형 디자인**: 현재 페이지 중심으로 페이지 번호 표시
          - **접근성**: 키보드 네비게이션 및 aria-label 지원

          ## 사용 사례
          - 게시판 목록 페이지네이션
          - 검색 결과 페이지 분할
          - 상품 목록 페이지 이동
        `
      }
    }
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지 번호 (1부터 시작)'
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: '전체 페이지 수'
    },
    onPageChange: {
      action: 'page changed',
      description: '페이지 변경 시 호출되는 콜백 함수'
    },
    maxVisiblePages: {
      control: { type: 'number', min: 1, max: 10 },
      description: '표시할 최대 페이지 번호 개수 (기본값: 5)'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          minWidth: '400px'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Pagination>

// Wrapper 컴포넌트들
const DefaultWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={5}
      onPageChange={setCurrentPage}
    />
  )
}

const ManyPagesWrapper = () => {
  const [currentPage, setCurrentPage] = useState(10)
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={20}
      onPageChange={setCurrentPage}
      maxVisiblePages={5}
    />
  )
}

// 기본 스토리 (상태 관리 포함)
export const Default: Story = {
  render: () => <DefaultWrapper />,
  parameters: {
    docs: {
      description: {
        story: '기본적인 페이지네이션 컴포넌트입니다. 5개 페이지를 표시합니다.'
      }
    }
  }
}

// 많은 페이지 케이스
export const ManyPages: Story = {
  render: () => <ManyPagesWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          '20개의 페이지가 있는 경우입니다. 현재 페이지(10페이지)를 중심으로 5개의 페이지 번호가 표시됩니다.'
      }
    }
  }
}
