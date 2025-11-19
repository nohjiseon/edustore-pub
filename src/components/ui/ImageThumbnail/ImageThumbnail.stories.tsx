import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import ImageThumbnail from './ImageThumbnail'

const meta: Meta<typeof ImageThumbnail> = {
  title: 'Components/ImageThumbnail',
  component: ImageThumbnail,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          자료 후기 및 자료 문의에서 사용하는 이미지 썸네일 컴포넌트입니다.

          ## 주요 기능
          - **이미지 표시**: 썸네일 이미지 렌더링
          - **개수 배지**: 2개 이상의 이미지가 있을 때 배지 표시
          - **배지 위치 제어**: top-left, top-right, bottom-left, bottom-right
          - **클릭 이벤트**: onClick 제공 시 커서 pointer 및 접근성 속성 자동 적용

          ## 사용 사례
          - 자료 후기 이미지 썸네일
          - 자료 문의 첨부 이미지 썸네일
          - 갤러리 이미지 미리보기
        `
      }
    }
  },
  argTypes: {
    imageSrc: {
      control: 'text',
      description: '썸네일 이미지 URL'
    },
    imageAlt: {
      control: 'text',
      description: '이미지 대체 텍스트'
    },
    imageCount: {
      control: { type: 'number', min: 1, max: 99 },
      description: '이미지 개수 (2개 이상일 때 배지 표시)'
    },
    countPosition: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: '이미지 개수 배지 위치'
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러 (제공 시 커서 pointer)'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof ImageThumbnail>

// 기본 썸네일 (이미지만)
export const Default: Story = {
  args: {
    imageSrc: 'https://picsum.photos/seed/thumbnail1/200/200',
    imageAlt: '썸네일 이미지'
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 이미지 썸네일입니다. 이미지 개수가 1개이거나 지정되지 않았을 때 배지가 표시되지 않습니다.'
      }
    }
  }
}

// 이미지 개수 배지 포함
export const WithCount: Story = {
  args: {
    imageSrc: 'https://picsum.photos/seed/thumbnail2/200/200',
    imageAlt: '리뷰 이미지',
    imageCount: 5,
    countPosition: 'bottom-right'
  },
  parameters: {
    docs: {
      description: {
        story:
          '2개 이상의 이미지가 있을 때 우하단에 개수 배지가 표시됩니다. countPosition prop으로 배지 위치를 변경할 수 있습니다.'
      }
    }
  }
}

// 클릭 가능한 썸네일
export const Clickable: Story = {
  args: {
    imageSrc: 'https://picsum.photos/seed/thumbnail3/200/200',
    imageAlt: '문의 첨부 이미지',
    imageCount: 3,
    countPosition: 'top-left',
    onClick: () => alert('이미지를 클릭했습니다!')
  },
  parameters: {
    docs: {
      description: {
        story:
          'onClick 이벤트가 있을 때 커서가 pointer로 변경되고, 키보드 접근성(role="button", tabIndex)이 자동으로 적용됩니다.'
      }
    }
  }
}
