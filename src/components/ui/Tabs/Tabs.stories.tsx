import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          Radix UI 기반의 탭 컴포넌트입니다.

          ## 주요 기능
          - **Radix UI Tabs**: 접근성이 보장된 탭 컴포넌트
          - **뱃지 지원**: 각 탭에 숫자 뱃지 표시 가능
          - **반응형**: 피그마 디자인을 기반으로 한 스타일링
          - **키보드 네비게이션**: 화살표 키로 탭 전환 가능

          ## 디자인 스펙
          - 활성 탭: SemiBold, #1e2022, 하단 1.5px 보더
          - 비활성 탭: Medium, #727983
          - 뱃지: #11c5d4 배경, 흰색 텍스트
          - 탭 간격: 40px

          ## 사용 사례
          - 콘텐츠 상세 페이지 (자료소개, 업로더정보, 자료후기, 자료문의)
          - 대시보드 섹션 전환
          - 설정 페이지 카테고리 분류
        `
      }
    }
  },
  argTypes: {
    items: {
      description: '탭 아이템 배열 (value, label, badge, content)',
      control: { type: 'object' }
    },
    defaultValue: {
      control: 'text',
      description: '기본 선택 탭 value'
    },
    type: {
      control: { type: 'select' },
      options: ['default', 'primary', 'centerline'],
      description:
        '탭 스타일 타입 (default: 언더라인 블랙, primary: 언더라인 청록, centerline: 언더라인 청록 가운데 라인)'
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Tabs>

// 기본 스토리
export const Default: Story = {
  args: {
    items: [
      {
        value: 'intro',
        label: '자료소개',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>자료소개</h3>
            <p>이 자료는 초등학생을 위한 학습 콘텐츠입니다.</p>
          </div>
        )
      },
      {
        value: 'uploader',
        label: '업로더정보',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>업로더정보</h3>
            <p>업로더 이름: 김선생</p>
            <p>경력: 10년</p>
          </div>
        )
      },
      {
        value: 'review',
        label: '자료후기',
        badge: 20,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>자료후기</h3>
            <p>총 20개의 후기가 있습니다.</p>
          </div>
        )
      },
      {
        value: 'inquiry',
        label: '자료문의',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>자료문의</h3>
            <p>문의사항을 남겨주세요.</p>
          </div>
        )
      }
    ],
    defaultValue: 'intro'
  }
}

// 뱃지 사용 예시
export const WithBadges: Story = {
  args: {
    items: [
      {
        value: 'all',
        label: '전체',
        badge: 152,
        content: <div style={{ padding: '20px' }}>전체 콘텐츠 (152개)</div>
      },
      {
        value: 'new',
        label: '신규',
        badge: 8,
        content: <div style={{ padding: '20px' }}>신규 콘텐츠 (8개)</div>
      },
      {
        value: 'popular',
        label: '인기',
        badge: 25,
        content: <div style={{ padding: '20px' }}>인기 콘텐츠 (25개)</div>
      }
    ],
    defaultValue: 'all'
  },
  parameters: {
    docs: {
      description: {
        story:
          '각 탭에 뱃지가 표시된 예시입니다. 숫자 또는 문자열을 사용할 수 있습니다.'
      }
    }
  }
}

// 간단한 탭 (뱃지 없음)
export const Simple: Story = {
  args: {
    items: [
      {
        value: 'overview',
        label: '개요',
        content: <div style={{ padding: '20px' }}>프로젝트 개요</div>
      },
      {
        value: 'features',
        label: '기능',
        content: <div style={{ padding: '20px' }}>주요 기능 목록</div>
      },
      {
        value: 'specs',
        label: '사양',
        content: <div style={{ padding: '20px' }}>기술 사양</div>
      }
    ],
    defaultValue: 'overview'
  },
  parameters: {
    docs: {
      description: {
        story: '뱃지가 없는 간단한 탭 구성입니다.'
      }
    }
  }
}

// 많은 콘텐츠를 포함한 탭
export const WithRichContent: Story = {
  args: {
    items: [
      {
        value: 'description',
        label: '상세설명',
        content: (
          <div style={{ padding: '20px' }}>
            <h2>상세설명</h2>
            <p>
              이 교육자료는 초등학교 3학년 수학 과정의 분수 개념을 다룹니다.
            </p>
            <ul>
              <li>분수의 정의</li>
              <li>분자와 분모의 이해</li>
              <li>분수의 크기 비교</li>
              <li>실생활 활용 예제</li>
            </ul>
            <p>총 30페이지 분량의 PDF 자료입니다.</p>
          </div>
        )
      },
      {
        value: 'curriculum',
        label: '커리큘럼',
        content: (
          <div style={{ padding: '20px' }}>
            <h2>커리큘럼</h2>
            <ol>
              <li>1주차: 분수의 개념 이해</li>
              <li>2주차: 분수의 종류</li>
              <li>3주차: 분수의 크기 비교</li>
              <li>4주차: 실생활 문제 풀이</li>
            </ol>
          </div>
        )
      },
      {
        value: 'reviews',
        label: '리뷰',
        badge: 47,
        content: (
          <div style={{ padding: '20px' }}>
            <h2>리뷰 (47개)</h2>
            <div
              style={{
                border: '1px solid #eee',
                padding: '10px',
                marginBottom: '10px'
              }}
            >
              <strong>⭐⭐⭐⭐⭐</strong> 김학부모: 아이가 재미있게 학습했어요!
            </div>
            <div
              style={{
                border: '1px solid #eee',
                padding: '10px',
                marginBottom: '10px'
              }}
            >
              <strong>⭐⭐⭐⭐</strong> 이선생: 교육 현장에서 활용하기 좋습니다.
            </div>
          </div>
        )
      }
    ],
    defaultValue: 'description'
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 시나리오처럼 풍부한 콘텐츠를 포함한 탭 예시입니다.'
      }
    }
  }
}

// 2개 탭만 있는 경우
export const TwoTabs: Story = {
  args: {
    items: [
      {
        value: 'public',
        label: '공개',
        badge: 12,
        content: <div style={{ padding: '20px' }}>공개 자료 (12개)</div>
      },
      {
        value: 'private',
        label: '비공개',
        badge: 3,
        content: <div style={{ padding: '20px' }}>비공개 자료 (3개)</div>
      }
    ],
    defaultValue: 'public'
  },
  parameters: {
    docs: {
      description: {
        story: '2개의 탭만 있는 경우의 예시입니다.'
      }
    }
  }
}

// 타입별 스토리: Primary 타입
export const TypePrimary: Story = {
  args: {
    type: 'primary',
    items: [
      {
        value: '01',
        label: 'tab1',
        content: (
          <div>
            사용 페이지 예시입니다.
            <br />
            - 구매 및 다운로드 관리
            <br />- 다운로드 / 취소 / 환불
          </div>
        )
      },
      {
        value: '02',
        label: 'tab2',
        content: <div>panel</div>
      },
      {
        value: '03',
        label: 'tab3',
        content: <div>panel</div>
      }
    ],
    defaultValue: '01'
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary 타입: 언더라인 청록 스타일입니다.'
      }
    }
  }
}

// 타입별 스토리: Centerline 타입
export const TypeCenterline: Story = {
  args: {
    type: 'centerline',
    items: [
      {
        value: '01',
        label: 'tab1',
        content: (
          <div>
            사용 페이지 예시입니다.
            <br />- 정산 관리
          </div>
        )
      },
      {
        value: '02',
        label: 'tab2',
        content: <div>panel</div>
      },
      {
        value: '03',
        label: 'tab3',
        content: <div>panel</div>
      }
    ],
    defaultValue: '01'
  },
  parameters: {
    docs: {
      description: {
        story: 'Centerline 타입: 언더라인 청록 가운데 라인 스타일입니다.'
      }
    }
  }
}
