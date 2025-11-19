import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import ContentCard from './ContentCard'

import TagList from '@/components/ui/TagList'
import { convertTagDataToTags } from '@/utils/tag'

const meta: Meta<typeof ContentCard> = {
  title: 'components/ContentCard',
  component: ContentCard,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          교육자료 쇼핑몰의 콘텐츠 카드 컴포넌트입니다.

          ## 주요 기능
          - **교육자료 정보 표시**: 평점, 제목, 작성자, 가격 등 필수 정보
          - **태그 시스템**: TagList 컴포넌트를 통한 유연한 태그 표시
          - **반응형 이미지**: Next.js Image 컴포넌트로 최적화된 이미지 로딩
          - **피그마 디자인 완전 일치**: 정확한 색상, 크기, 레이아웃 재현

          ## 태그 색상 시스템
          - **green**: 초록색 계열 (#f1f8e6 배경, #6db600 텍스트)
          - **yellow**: 노란색 계열 (#fffbee 배경, #e0924f 텍스트)
          - **blue**: 파란색 계열 (#f1f7ff 배경, #6199e0 텍스트)
          - **red**: 빨간색 계열 (#fff2f0 배경, #e18d85 텍스트)

          ## 사용 사례
          - 검색 결과 목록
          - 추천 교육자료 목록
          - 카테고리별 교육자료 진열
        `
      }
    }
  },
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '교육자료 평점 (0-5)'
    },
    tags: {
      control: false,
      description: 'TagList 컴포넌트를 통한 태그 표시'
    },
    title: {
      control: 'text',
      description: '교육자료 제목'
    },
    description: {
      control: 'text',
      description: '교육자료 설명'
    },
    author: {
      control: 'object',
      description: '작성자 정보 (이름, 아바타)'
    },
    price: {
      control: { type: 'number', min: 0 },
      description: '교육자료 가격 (원)'
    },
    imageSrc: {
      control: 'text',
      description: '카드 이미지 경로'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '12px',
          backgroundColor: 'var(--color-neutral-b-grey-1)'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof ContentCard>

// 기본 스토리 (피그마 디자인과 동일)
export const Default: Story = {
  args: {
    id: 1,
    rating: 4.5,
    tags: (
      <TagList
        tags={convertTagDataToTags({
          grade: '초3',
          subject: '국어',
          type: '독서교육',
          format: 'PDF'
        })}
      />
    ),
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    description:
      '시간 관리를 위한 디지털 도구 활용법에는 생산성 앱과 소프트웨어가 추천됩니다. 예를 들어, Todoist나 Trello와 같은 작업 관리 앱은 할 일을 체계적으로 정리하고 우선순위를 설정하는 데 유용하고 시간 관리를 효과적으로 할 수 있습니다.',
    author: {
      name: '수업가게닉네임'
    },
    price: 10000
  }
}

// 모든 태그 표시
export const AllTags: Story = {
  args: {
    id: 2,
    rating: 4.8,
    tags: (
      <TagList
        tags={convertTagDataToTags({
          grade: '중1',
          subject: '수학',
          type: '문제집',
          format: 'PDF'
        })}
      />
    ),
    title: '중학교 1학년 수학 기초 문제집 - 기본 개념부터 심화까지',
    description:
      '중학교 1학년 수학의 기본 개념부터 심화 문제까지 단계별로 구성된 문제집입니다. 정수와 유리수, 문자와 식, 함수, 확률 등 주요 단원을 체계적으로 학습할 수 있도록 설계되었습니다.',
    author: {
      name: '수학쌤김선생'
    },
    price: 15000
  },
  parameters: {
    docs: {
      description: {
        story: '모든 유형의 태그가 표시된 카드입니다.'
      }
    }
  }
}

// 긴 제목
export const LongTitle: Story = {
  args: {
    id: 6,
    rating: 4.2,
    tags: (
      <TagList
        tags={convertTagDataToTags({
          grade: '중2',
          subject: '사회',
          type: '워크북',
          format: 'PDF'
        })}
      />
    ),
    title:
      '중학교 2학년 사회과 한국사 심화학습 워크북 - 고구려, 백제, 신라의 정치, 경제, 사회, 문화 총정리와 문제풀이까지',
    description:
      '고구려, 백제, 신라 삼국의 성립과 발전 과정을 체계적으로 학습할 수 있는 심화 워크북입니다. 각국의 정치 체제, 경제 구조, 사회 계층, 문화 발전상을 상세히 다루며, 핵심 개념 정리와 실전 문제를 통해 완벽한 이해를 돕습니다.',
    author: {
      name: '역사전문가김쌤'
    },
    price: 18500
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목이 있는 교육자료 카드의 레이아웃입니다.'
      }
    }
  }
}

// 카드 그리드 레이아웃 예시
export const GridLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '14px',
        width: '100%',
        maxWidth: '1200px'
      }}
    >
      <ContentCard
        id={1}
        rating={4.5}
        tags={
          <TagList
            tags={convertTagDataToTags({
              grade: '초3',
              subject: '국어',
              type: '독서교육',
              format: 'PDF'
            })}
          />
        }
        title='효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들'
        description='시간 관리를 위한 디지털 도구 활용법에는 생산성 앱과 소프트웨어가 추천됩니다.'
        author={{ name: '수업가게닉네임' }}
        price={10000}
      />
      <ContentCard
        id={2}
        rating={4.8}
        tags={
          <TagList
            tags={convertTagDataToTags({
              grade: '중1',
              subject: '수학',
              type: '문제집'
            })}
          />
        }
        title='중학교 1학년 수학 기초 문제집'
        description='중학교 1학년 수학의 기본 개념부터 심화 문제까지 단계별로 구성된 문제집입니다.'
        author={{ name: '수학쌤김선생' }}
        price={15000}
      />
      <ContentCard
        id={3}
        rating={3.9}
        tags={
          <TagList
            tags={convertTagDataToTags({
              grade: '고2',
              subject: '영어'
            })}
          />
        }
        title='고등학교 영어 듣기 훈련 프로그램'
        description='고등학교 2학년 영어 듣기 실력 향상을 위한 체계적인 훈련 프로그램입니다.'
        author={{ name: '영어마스터' }}
        price={25000}
      />
      <ContentCard
        id={4}
        rating={4.9}
        tags={
          <TagList
            tags={convertTagDataToTags({
              grade: '고3',
              subject: '물리',
              type: '실험자료',
              format: 'PPT'
            })}
          />
        }
        title='대학입시 물리 완전정복'
        description='대학 입시를 위한 물리 완전 정복 과정입니다. 역학, 전자기학, 열역학까지 모든 영역을 다룹니다.'
        author={{ name: '물리박사님' }}
        price={89000}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '검색 결과나 목록 페이지에서 사용되는 그리드 레이아웃 예시입니다.'
      }
    }
  }
}
