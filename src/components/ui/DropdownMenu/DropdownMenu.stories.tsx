import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Button from '../Button'
import DropdownMenu from './DropdownMenu'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          네이티브 React로 구현된 드롭다운 메뉴 컴포넌트입니다.

          ## 주요 기능
          - **유연한 트리거**: 상위에서 원하는 버튼/요소를 trigger로 전달
          - **간단한 Props**: label과 action만으로 메뉴 아이템 구성
          - **접근성**: 키보드 네비게이션 (ESC, Enter, Space) 및 스크린 리더 지원
          - **외부 클릭 감지**: 메뉴 외부 클릭 시 자동으로 닫힘
          - **Hover 효과**: 마우스 오버 시 배경색 변경

          ## 사용 사례
          - 댓글/리뷰 추가 액션 메뉴 (답변하기, 신고하기 등)
          - 게시물 옵션 메뉴 (수정, 삭제, 공유 등)
          - 사용자 프로필 메뉴
          - 관리자 액션 메뉴
        `
      }
    }
  },
  argTypes: {
    trigger: {
      control: false,
      description: '드롭다운을 열기 위한 트리거 요소 (버튼, 아이콘 등)'
    },
    items: {
      control: 'object',
      description: '메뉴 아이템 배열 (label, action)'
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: '메뉴 정렬 위치 (트리거 기준 정렬)'
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: '메뉴가 나타나는 위치 (상/하/좌/우)'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '8rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

// Side 옵션 비교 (상/하/좌/우)
export const SideOptions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '3rem',
        alignItems: 'center',
        justifyItems: 'center'
      }}
    >
      <DropdownMenu
        trigger={<Button variant='outline'>Top</Button>}
        items={[
          { label: '답변하기', action: () => console.log('답변하기') },
          { label: '신고하기', action: () => console.log('신고하기') }
        ]}
        side='top'
      />
      <DropdownMenu
        trigger={<Button variant='outline'>Right</Button>}
        items={[
          { label: '답변하기', action: () => console.log('답변하기') },
          { label: '신고하기', action: () => console.log('신고하기') }
        ]}
        side='right'
      />
      <DropdownMenu
        trigger={<Button variant='outline'>Bottom (기본)</Button>}
        items={[
          { label: '답변하기', action: () => console.log('답변하기') },
          { label: '신고하기', action: () => console.log('신고하기') }
        ]}
        side='bottom'
      />
      <DropdownMenu
        trigger={<Button variant='outline'>Left</Button>}
        items={[
          { label: '답변하기', action: () => console.log('답변하기') },
          { label: '신고하기', action: () => console.log('신고하기') }
        ]}
        side='left'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '드롭다운 메뉴의 모든 위치 옵션 (top, right, bottom, left)을 비교해볼 수 있습니다.'
      }
    }
  }
}

// Align 옵션 비교 (시작/중앙/끝)
export const AlignOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <DropdownMenu
        trigger={<Button variant='outline'>Start</Button>}
        items={[
          { label: '답변하기', action: () => console.log('답변하기') },
          { label: '신고하기', action: () => console.log('신고하기') }
        ]}
        align='start'
      />
      <DropdownMenu
        trigger={<Button variant='outline'>Center</Button>}
        items={[
          { label: '답변하기', action: () => console.log('답변하기') },
          { label: '신고하기', action: () => console.log('신고하기') }
        ]}
        align='center'
      />
      <DropdownMenu
        trigger={<Button variant='outline'>End</Button>}
        items={[
          { label: '답변하기', action: () => console.log('답변하기') },
          { label: '신고하기', action: () => console.log('신고하기') }
        ]}
        align='end'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '드롭다운 메뉴의 모든 정렬 옵션 (start, center, end)을 비교해볼 수 있습니다.'
      }
    }
  }
}
