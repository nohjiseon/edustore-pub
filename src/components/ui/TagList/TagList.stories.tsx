import type { Meta, StoryObj } from '@storybook/react'

import TagList from './TagList'

const meta: Meta<typeof TagList> = {
  title: 'components/TagList',
  component: TagList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          태그 목록을 표시하는 컴포넌트입니다.

          ## 주요 기능
          - **4가지 색상 시스템**: green, yellow, blue, red
          - **자동 줄바꿈**: flex-wrap을 통한 반응형 레이아웃
          - **일관된 스타일**: 모든 태그에 동일한 패딩과 간격 적용

          ## 색상 매핑
          - **green**: 학년 정보 (#f1f8e6 배경, #6db600 텍스트)
          - **yellow**: 과목 정보 (#fffbee 배경, #e0924f 텍스트)
          - **blue**: 유형 정보 (#f1f7ff 배경, #6199e0 텍스트)
          - **red**: 포맷 정보 (#fff2f0 배경, #e18d85 텍스트)

          ## 사용 예시
          ContentCard와 함께 사용하여 교육 컨텐츠의 메타 정보를 표시합니다.
        `
      }
    }
  },
  argTypes: {
    tags: {
      control: 'object',
      description: '표시할 태그 배열 (name, color)'
    }
  }
}

export default meta
type Story = StoryObj<typeof TagList>

// 기본 스토리 - 모든 색상 표시
export const Default: Story = {
  args: {
    tags: [
      { name: '초등 3학년', color: 'green' },
      { name: '수학', color: 'yellow' },
      { name: '문제집', color: 'blue' },
      { name: 'PDF', color: 'red' }
    ]
  }
}

// 단일 태그
export const SingleTag: Story = {
  args: {
    tags: [{ name: '초등 5학년', color: 'green' }]
  },
  parameters: {
    docs: {
      description: {
        story: '하나의 태그만 표시하는 경우입니다.'
      }
    }
  }
}

// 많은 태그 (줄바꿈 테스트)
export const ManyTags: Story = {
  args: {
    tags: [
      { name: '중학 2학년', color: 'green' },
      { name: '수학', color: 'yellow' },
      { name: '기하학', color: 'yellow' },
      { name: '심화 학습', color: 'blue' },
      { name: '문제 풀이', color: 'blue' },
      { name: 'PDF', color: 'red' },
      { name: '동영상', color: 'red' },
      { name: '워크북', color: 'red' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '많은 태그가 있을 때 자동으로 줄바꿈되어 표시됩니다. (flex-wrap)'
      }
    }
  }
}

// Green 색상만
export const GreenTags: Story = {
  args: {
    tags: [
      { name: '초등 1학년', color: 'green' },
      { name: '초등 3학년', color: 'green' },
      { name: '중학 1학년', color: 'green' },
      { name: '고등 2학년', color: 'green' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'green 색상은 주로 학년 정보에 사용됩니다.'
      }
    }
  }
}

// Yellow 색상만
export const YellowTags: Story = {
  args: {
    tags: [
      { name: '국어', color: 'yellow' },
      { name: '수학', color: 'yellow' },
      { name: '영어', color: 'yellow' },
      { name: '과학', color: 'yellow' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'yellow 색상은 주로 과목 정보에 사용됩니다.'
      }
    }
  }
}

// Blue 색상만
export const BlueTags: Story = {
  args: {
    tags: [
      { name: '문제집', color: 'blue' },
      { name: '워크북', color: 'blue' },
      { name: '실험', color: 'blue' },
      { name: '탐구 활동', color: 'blue' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'blue 색상은 주로 컨텐츠 유형 정보에 사용됩니다.'
      }
    }
  }
}

// Red 색상만
export const RedTags: Story = {
  args: {
    tags: [
      { name: 'PDF', color: 'red' },
      { name: '동영상', color: 'red' },
      { name: 'PPT', color: 'red' },
      { name: 'HWP', color: 'red' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'red 색상은 주로 파일 포맷 정보에 사용됩니다.'
      }
    }
  }
}

// 일부 태그만 (실제 사용 케이스)
export const PartialTags: Story = {
  args: {
    tags: [
      { name: '고등 1학년', color: 'green' },
      { name: '화학', color: 'yellow' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '일부 태그만 있는 실제 사용 케이스입니다.'
      }
    }
  }
}

// 긴 텍스트 태그
export const LongTextTags: Story = {
  args: {
    tags: [
      { name: '중학교 3학년', color: 'green' },
      { name: '사회 (한국사)', color: 'yellow' },
      { name: '심화 학습 자료', color: 'blue' },
      { name: 'PDF + 동영상', color: 'red' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트를 포함한 태그도 깔끔하게 표시됩니다.'
      }
    }
  }
}

// 다양한 너비에서 테스트
export const ResponsiveTest: Story = {
  args: {
    tags: [
      { name: '초3', color: 'green' },
      { name: '국어', color: 'yellow' },
      { name: '독서교육', color: 'blue' },
      { name: 'PDF', color: 'red' },
      { name: '워크북', color: 'blue' },
      { name: '심화', color: 'blue' }
    ]
  },
  decorators: [
    (Story) => (
      <div
        style={{ width: '200px', border: '1px dashed #ccc', padding: '8px' }}
      >
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story:
          '좁은 컨테이너에서도 자동으로 줄바꿈되어 표시됩니다. (200px 너비)'
      }
    }
  }
}
