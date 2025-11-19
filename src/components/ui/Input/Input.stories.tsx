import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
          교육자료 쇼핑몰의 기본 입력 필드 컴포넌트입니다.

          ## 주요 기능
          - **에러 상태**: errorMessage가 있으면 자동으로 에러 UI 표시
          - **일반 메시지**: message로 입력 안내 메시지 표시
          - **Validation 체크**: regex prop으로 정규식 전달 시 자동 검증 및 체크 아이콘 표시
          - **Password 토글**: password 타입일 때 눈 아이콘으로 비밀번호 보기/숨기기
          - **비활성화 상태**: disabled 속성 지원
          - **타이틀**: title Props로 입력 필드 라벨 표시
          - **다양한 타입**: text, email, password 등 모든 input type 지원
          - **접근성**: forwardRef 패턴으로 ref 전달 지원

          ## 사용 사례
          - 로그인/회원가입 폼
          - 검색 입력 필드
          - 사용자 정보 입력
          - 교육자료 정보 수정
        `
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel'],
      description: 'Input 타입'
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트'
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지'
    },
    message: {
      control: 'text',
      description: '일반 안내 메시지'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태'
    },
    title: {
      control: 'text',
      description: 'Input 타이틀'
    },
    value: {
      control: 'text',
      description: 'Input 값'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          width: '600px'
        }}
      >
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Input>

// 기본 스토리
export const Default: Story = {
  args: {
    title: '이메일',
    placeholder: '이메일을 입력해 주세요.',
    type: 'email'
  }
}

// 에러 상태
export const Error: Story = {
  args: {
    title: '이메일',
    placeholder: '이메일을 입력해 주세요.',
    type: 'email',
    errorMessage: '올바른 이메일을 입력해 주세요.'
  },
  parameters: {
    docs: {
      description: {
        story:
          '유효성 검증 실패 시 에러 상태를 표시합니다. 빨간색 테두리와 에러 메시지가 표시됩니다.'
      }
    }
  }
}

// 비활성화 상태
export const Disabled: Story = {
  args: {
    title: '이메일',
    placeholder: '이메일을 입력해 주세요.',
    type: 'email',
    disabled: true
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화 상태의 입력 필드입니다. 사용자가 입력할 수 없습니다.'
      }
    }
  }
}

// 값이 있는 상태
export const WithValue: Story = {
  args: {
    title: '이메일',
    placeholder: '이메일을 입력해 주세요.',
    type: 'email',
    value: 'user@example.com'
  },
  parameters: {
    docs: {
      description: {
        story: '기본값이 있는 입력 필드입니다.'
      }
    }
  }
}

// 비밀번호 타입
export const Password: Story = {
  args: {
    title: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요.',
    type: 'password'
  },
  parameters: {
    docs: {
      description: {
        story: '비밀번호 입력 필드입니다. 입력 내용이 가려집니다.'
      }
    }
  }
}

// 일반 메시지
export const WithMessage: Story = {
  args: {
    title: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요.',
    type: 'password',
    message: '한글, 영문, 숫자 포함 8~20자 입력이 가능합니다.'
  },
  parameters: {
    docs: {
      description: {
        story: '일반 안내 메시지가 있는 입력 필드입니다.'
      }
    }
  }
}

// Validation 통과 (체크 아이콘)
export const WithValidation: Story = {
  args: {
    title: '닉네임',
    placeholder: '닉네임을 입력해 주세요.',
    type: 'text',
    regex: /^[a-zA-Z0-9]{3,}$/,
    defaultValue: 'myNickname'
  },
  parameters: {
    docs: {
      description: {
        story:
          'regex prop으로 정규식을 전달하면 입력값이 패턴과 일치할 때 체크 아이콘이 표시됩니다. 닉네임 예시: 영문/숫자 3자 이상'
      }
    }
  }
}

// Password + Validation
export const PasswordWithValidation: Story = {
  args: {
    title: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요.',
    type: 'password',
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    defaultValue: 'myPassword123',
    message: '영문, 숫자 포함 8~20자 입력이 가능합니다.'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Password 타입에서 validation이 통과되면 체크 아이콘과 토글 버튼이 함께 표시됩니다.'
      }
    }
  }
}

// 모든 상태 쇼케이스
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Input title='기본' placeholder='이메일을 입력해 주세요.' type='email' />
      <Input
        title='일반 메시지'
        placeholder='비밀번호를 입력해 주세요.'
        type='password'
        message='한글, 영문, 숫자 포함 8~20자 입력이 가능합니다.'
      />
      <Input
        title='에러'
        placeholder='이메일을 입력해 주세요.'
        type='email'
        errorMessage='올바른 이메일을 입력해 주세요.'
      />
      <Input
        title='비활성화'
        placeholder='이메일을 입력해 주세요.'
        type='email'
        disabled={true}
      />
      <Input
        title='Validation 통과'
        placeholder='닉네임을 입력해 주세요.'
        type='text'
        regex={/^[a-zA-Z0-9]{3,}$/}
        defaultValue='myNickname'
      />
      <Input
        title='Password + Validation'
        placeholder='비밀번호를 입력해 주세요.'
        type='password'
        regex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/}
        defaultValue='myPassword123'
        message='영문, 숫자 포함 8~20자 입력이 가능합니다.'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input 컴포넌트의 모든 상태를 한눈에 볼 수 있습니다.'
      }
    }
  }
}
