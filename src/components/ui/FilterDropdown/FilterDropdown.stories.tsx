import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { FilterDropdown } from './index'

const meta: Meta<typeof FilterDropdown> = {
  title: 'Components/FilterDropdown',
  component: FilterDropdown,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Figma 디자인을 기반으로 한 필터링용 드롭다운 컴포넌트입니다. CSS Modules + SCSS를 사용하여 모듈 스코프로 스타일이 격리되어 있습니다.'
      }
    }
  },
  argTypes: {
    options: {
      description: '드롭다운에 표시될 옵션 목록',
      control: 'object'
    },
    defaultValue: {
      description: '기본적으로 선택된 값',
      control: 'text'
    },
    placeholder: {
      description: '값이 선택되지 않았을 때 표시될 텍스트',
      control: 'text'
    },
    selectedValues: {
      description: '현재 선택된 값들의 배열',
      control: 'object'
    },
    disabledOptions: {
      description: '비활성화할 옵션들의 배열',
      control: 'object'
    },
    onSelect: {
      description: '옵션 선택 시 호출되는 콜백 함수 (다중 선택 지원)',
      action: 'selected'
    },
    className: {
      description: '추가 CSS 클래스',
      control: 'text'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', minHeight: '200px' }}>
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof FilterDropdown>

// 기본 스토리
export const Default: Story = {
  args: {
    options: ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'],
    defaultValue: '학년 전체',
    selectedValues: [],
    onSelect: (values: string[]) => console.log('Selected:', values)
  }
}

// 학년 필터
export const GradeFilter: Story = {
  args: {
    options: ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'],
    defaultValue: '학년 전체',
    selectedValues: [],
    onSelect: (values: string[]) => console.log('Grade selected:', values)
  },
  parameters: {
    docs: {
      description: {
        story: '학년 선택을 위한 필터 드롭다운입니다.'
      }
    }
  }
}

// 과목 필터
export const SubjectFilter: Story = {
  args: {
    options: ['국어', '영어', '수학', '과학', '사회', '체육', '음악', '미술'],
    defaultValue: '과목 전체',
    selectedValues: [],
    onSelect: (values: string[]) => console.log('Subject selected:', values)
  },
  parameters: {
    docs: {
      description: {
        story: '과목 선택을 위한 필터 드롭다운입니다.'
      }
    }
  }
}

// Placeholder 사용 예시
export const WithPlaceholder: Story = {
  args: {
    options: ['옵션 1', '옵션 2', '옵션 3', '옵션 4'],
    placeholder: '옵션을 선택하세요',
    selectedValues: [],
    onSelect: (values: string[]) => console.log('Selected:', values)
  },
  parameters: {
    docs: {
      description: {
        story: 'defaultValue 대신 placeholder를 사용한 예시입니다.'
      }
    }
  }
}

// 긴 옵션 목록
export const LongOptionList: Story = {
  args: {
    options: [
      '서울특별시',
      '부산광역시',
      '대구광역시',
      '인천광역시',
      '광주광역시',
      '대전광역시',
      '울산광역시',
      '세종특별자치시',
      '경기도',
      '강원특별자치도',
      '충청북도',
      '충청남도',
      '전북특별자치도',
      '전라남도',
      '경상북도',
      '경상남도',
      '제주특별자치도'
    ],
    defaultValue: '전체',
    selectedValues: [],
    onSelect: (values: string[]) => console.log('Region selected:', values)
  },
  parameters: {
    docs: {
      description: {
        story:
          '많은 옵션이 있을 때의 드롭다운 동작을 확인할 수 있습니다. 스크롤이 자동으로 생성됩니다.'
      }
    }
  }
}

// 다중 드롭다운 예시
export const MultipleDropdowns: Story = {
  render: (args) => {
    const gradeOptions = ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년']
    const subjectOptions = ['국어', '영어', '수학', '과학', '사회']
    const regionOptions = ['서울', '부산', '대구', '인천', '광주', '대전']

    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <FilterDropdown
          options={gradeOptions}
          defaultValue='학년 전체'
          selectedValues={[]}
          onSelect={(values) => console.log('Grade:', values)}
        />
        <FilterDropdown
          options={subjectOptions}
          defaultValue='과목 전체'
          selectedValues={[]}
          onSelect={(values) => console.log('Subject:', values)}
        />
        <FilterDropdown
          options={regionOptions}
          defaultValue='지역 전체'
          selectedValues={[]}
          onSelect={(values) => console.log('Region:', values)}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          '여러 개의 드롭다운을 함께 사용하는 예시입니다. 각각 독립적으로 동작합니다.'
      }
    }
  }
}

// 상호작용 테스트
// 훅 사용을 위해 독립 컴포넌트로 분리 (ESLint hooks 규칙 준수)
const InteractionTestRender: React.FC<any> = (args) => {
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <FilterDropdown
          options={['1학년', '2학년', '3학년', '4학년', '5학년', '6학년']}
          defaultValue='학년 전체'
          selectedValues={selectedGrades}
          onSelect={setSelectedGrades}
        />
        <FilterDropdown
          options={['국어', '영어', '수학', '과학', '사회']}
          defaultValue='과목 전체'
          selectedValues={selectedSubjects}
          onSelect={setSelectedSubjects}
        />
      </div>
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '14px'
        }}
      >
        <strong>선택된 값:</strong>
        <br />
        학년: {selectedGrades.length > 0 ? selectedGrades.join(', ') : '전체'}
        <br />
        과목:{' '}
        {selectedSubjects.length > 0 ? selectedSubjects.join(', ') : '전체'}
      </div>
    </div>
  )
}

// expand 타입
export const ExpandType: Story = {
  args: {
    options: [
      '출금 계좌 선택',
      '기업은행 111-111-111111',
      '국민은행 222-222-222222',
      '우리은행 333-333-333333',
      '신한은행 444-444-444444'
    ],
    defaultValue: '출금 계좌 선택',
    selectedValues: ['출금 계좌 선택'],
    showDefaultOption: false,
    singleSelect: true,
    type: 'expand',
    onSelect: (values: string[]) => console.log('Account selected:', values)
  },
  parameters: {
    docs: {
      description: {
        story: '계좌 선택 드롭다운'
      }
    }
  }
}

export const InquiryType: Story = {
  args: {
    options: ['문의 유형 선택', '회원 정보 관리', '기관회원', '자료 콘텐츠'],
    defaultValue: '문의 유형 선택',
    selectedValues: ['문의 유형 선택'],
    showDefaultOption: false,
    singleSelect: true,
    type: 'inquiry',
    onSelect: (values: string[]) => console.log('Account selected:', values)
  },
  parameters: {
    docs: {
      description: {
        story: '문의 유형 선택 드롭다운'
      }
    }
  }
}
