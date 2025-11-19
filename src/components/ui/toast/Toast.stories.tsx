import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import Toast from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          토스트 알림 컴포넌트입니다.

          ## 주요 기능
          - **자동 사라짐**: 기본 3초 후 자동으로 사라집니다
          - **아이콘 표시**: 성공, 에러 등 상황에 맞는 아이콘 표시 가능
          - **커스터마이징**: duration과 onClose 콜백으로 동작 제어 가능

          ## 사용 사례
          - 작업 완료 알림
          - 에러 메시지 표시
          - 성공 메시지 표시
          - 정보 알림
        `
      }
    }
  },
  argTypes: {
    duration: {
      description: '토스트가 표시될 시간(밀리초)',
      control: { type: 'number', min: 0, max: 10000, step: 500 }
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: '200px',
          position: 'relative'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Toast>

// 커스텀 duration 예시를 위한 컴포넌트
const CustomDurationExample = () => {
  const [showToast, setShowToast] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <button
        onClick={() => setShowToast(true)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        토스트 표시 (5초)
      </button>
      {showToast && (
        <Toast
          message='5초 후에 사라집니다.'
          icon='check'
          duration={5000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}

export const CustomDuration: Story = {
  render: () => <CustomDurationExample />,
  parameters: {
    docs: {
      description: {
        story:
          'duration을 5초로 설정한 예시입니다. 버튼을 클릭하면 토스트가 표시되고 5초 후에 사라집니다.'
      }
    }
  }
}
