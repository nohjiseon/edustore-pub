export interface ClassReview {
  id: number
  nickname: string
  rating: number
  content: string
}

export interface AchievementStandard {
  id: number
  code: string
  description: string
}

export interface ContentIntroSection {
  shortText: string
  longText: string
  fullText: string
  images: {
    primary: string
    secondary: string
  }
}

export interface UploaderInfo {
  profileImage: string
  name: string
  introduction: string
  likeCount: number
  rating: number
  reviewCount: number
}

export interface ContentDetail {
  id: string
  title: string
  description: string
  rating: number
  reviewCount: number
  price: number
  tags: {
    grade: string
    subject: string
    type: string
    format: string
  }
  author: {
    name: string
    title: string
    experience: string
    avatar: string
    bio: string
  }
  curriculum: {
    id: number
    title: string
    duration: string
    description: string
  }[]
  thumbnails: string[]
  classReviews: ClassReview[]
  achievementStandards: AchievementStandard[]
  contentIntro: ContentIntroSection
  uploaderInfo: UploaderInfo
  reviews: {
    id: number
    author: {
      name: string
      avatar: string
    }
    rating: number
    content: string
    date: string
  }[]
  relatedContents: {
    id: string
    title: string
    author: string
    rating: number
    price: number
    thumbnail: string
  }[]
}

export const mockContentDetail: ContentDetail = {
  id: '1',
  title: '분수의 기초 개념과 활용',
  description: `분수의 개념을 쉽게 이해하고 실생활에 적용할 수 있는 학습 자료입니다.
시각적 자료와 함께 단계별로 학습할 수 있으며, 다양한 문제 해결을 통해
분수에 대한 이해를 높일 수 있습니다.

이 강의는 분수의 기본 개념부터 시작하여 분수의 덧셈, 뺄셈, 곱셈, 나눗셈까지
체계적으로 학습할 수 있도록 구성되어 있습니다.`,
  rating: 4.8,
  reviewCount: 324,
  price: 12000,
  tags: {
    grade: '초등 3학년',
    subject: '수학',
    type: '개념 학습',
    format: 'PDF'
  },
  author: {
    name: '김수학',
    title: '초등수학 전문 강사',
    experience: '15년 경력',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format',
    bio: '서울교육대학교 수학교육과를 졸업하고 15년간 초등학교에서 아이들을 가르쳐왔습니다. 특히 수학을 어려워하는 아이들도 쉽게 이해할 수 있는 교육 방법 개발에 힘쓰고 있습니다.'
  },
  curriculum: [
    {
      id: 1,
      title: '분수의 개념 이해하기',
      duration: '15분',
      description: '분수가 무엇인지, 분자와 분모의 의미를 학습합니다.'
    },
    {
      id: 2,
      title: '분수의 크기 비교하기',
      duration: '20분',
      description: '다양한 분수의 크기를 비교하는 방법을 익힙니다.'
    },
    {
      id: 3,
      title: '분수의 덧셈과 뺄셈',
      duration: '25분',
      description: '같은 분모와 다른 분모의 분수 계산을 학습합니다.'
    },
    {
      id: 4,
      title: '분수의 곱셈과 나눗셈',
      duration: '30분',
      description: '분수의 곱셈과 나눗셈 원리를 이해하고 계산합니다.'
    },
    {
      id: 5,
      title: '실생활 속 분수 문제',
      duration: '20분',
      description: '실제 생활에서 만날 수 있는 분수 문제를 해결해봅니다.'
    }
  ],
  thumbnails: [
    'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=240&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=240&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=240&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=240&fit=crop&auto=format'
  ],
  classReviews: [
    {
      id: 1,
      nickname: '홍**',
      rating: 5.0,
      content:
        '3학년 2학기 첫 글쓰기 수업에서 이 자료를 사용했어요. 아이들이 글의 구조를 처음 접하는데 효과적이었어요'
    },
    {
      id: 2,
      nickname: '홍**',
      rating: 4.5,
      content:
        '분수 개념을 설명하는데 아주 유용했습니다. 시각적 자료가 많아서 학생들이 쉽게 이해했어요'
    },
    {
      id: 3,
      nickname: '홍**',
      rating: 5.0,
      content:
        '수업 준비 시간을 많이 줄여주는 자료입니다. 활용도가 높고 학생들 반응도 좋았어요'
    },
    {
      id: 4,
      nickname: '홍**',
      rating: 4.0,
      content:
        '학생들 수준에 맞춰 난이도 조절이 가능해서 좋았습니다. 다양한 활동지도 포함되어 있어요'
    }
  ],
  achievementStandards: [
    {
      id: 1,
      code: '[2국01-01]',
      description: '중요한 내용이나 일이 일어난 순서를 고려하며 듣고 말한다.'
    }
  ],
  contentIntro: {
    shortText:
      '<p>시간 관리를 위한 디지털 도구 활용법에는 생산성 앱과 소프트웨어가 추천됩니다. 예를 들어, <strong>Todoist</strong>나 <strong>Trello</strong>와 같은 작업 관리 앱은 할 일을 체계적으로 정리하고 우선순위를 설정하는 데 유용합니다.</p>',
    longText:
      '<p>시간 관리를 위한 디지털 도구 활용법에는 생산성 앱과 소프트웨어가 추천됩니다. 예를 들어, <strong>Todoist</strong>나 <strong>Trello</strong>와 같은 작업 관리 앱은 할 일을 체계적으로 정리하고 우선순위를 설정하는 데 유용합니다. <strong>Google Calendar</strong>는 일정 관리를 효율적으로 도와주며, <strong>Notion</strong>은 노트 작성과 프로젝트 관리를 통합적으로 지원합니다. 이러한 디지털 도구들을 활용하면 시간 관리를 더욱 효과적으로 할 수 있으며, 생산성을 크게 향상시킬 수 있습니다.</p>',
    fullText:
      '<p>시간 관리를 위한 디지털 도구 활용법에는 생산성 앱과 소프트웨어가 추천됩니다. 예를 들어, <strong>Todoist</strong>나 <strong>Trello</strong>와 같은 작업 관리 앱은 할 일을 체계적으로 정리하고 우선순위를 설정하는 데 유용합니다. <strong>Google Calendar</strong>는 일정 관리를 효율적으로 도와주며, <strong>Notion</strong>은 노트 작성과 프로젝트 관리를 통합적으로 지원합니다.</p><p><br></p><p>이러한 디지털 도구들을 활용하면 시간 관리를 더욱 효과적으로 할 수 있으며, 생산성을 크게 향상시킬 수 있습니다. 또한, <strong>Focus@Will</strong>이나 <strong>Forest</strong> 같은 집중력 향상 앱은 작업 시간 동안 방해 요소를 최소화하고 몰입도를 높이는 데 도움을 줍니다.</p><p><br></p><p><strong>RescueTime</strong>은 시간 사용 패턴을 분석하여 어디에 시간을 많이 소비하는지 파악할 수 있게 해주며, 이를 통해 시간 낭비 요소를 줄일 수 있습니다. 시간 추적 도구인 <strong>Toggl</strong>이나 <strong>Clockify</strong>를 사용하면 프로젝트별로 투입된 시간을 정확히 측정할 수 있어 시간 관리의 효율성을 높일 수 있습니다.</p><p><br></p><p>이러한 도구들은 개인의 작업 스타일과 목표에 맞게 조합하여 사용하면 더욱 효과적입니다.</p>',
    images: {
      primary:
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=952&h=440&fit=crop&auto=format',
      secondary:
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=952&h=796&fit=crop&auto=format'
    }
  },
  uploaderInfo: {
    profileImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=103&h=103&fit=crop&crop=face&auto=format',
    name: '수업가게',
    introduction: '안녕하세요, 수업가게입니다',
    likeCount: 324,
    rating: 4.8,
    reviewCount: 200
  },
  reviews: [
    {
      id: 1,
      author: {
        name: '박지영',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b2e2e005?w=40&h=40&fit=crop&crop=face&auto=format'
      },
      rating: 5,
      content:
        '아이가 분수를 정말 어려워했는데, 이 교재로 공부한 후 확실히 이해도가 높아졌어요. 설명이 정말 쉽고 단계별로 잘 구성되어 있습니다.',
      date: '2024-01-15'
    },
    {
      id: 2,
      author: {
        name: '이민호',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format'
      },
      rating: 4,
      content:
        '시각적 자료가 많아서 아이가 재미있게 공부할 수 있었습니다. 다만 좀 더 많은 연습문제가 있었으면 좋겠어요.',
      date: '2024-01-10'
    },
    {
      id: 3,
      author: {
        name: '최수진',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format'
      },
      rating: 5,
      content:
        '강사님의 설명이 정말 명확하고 이해하기 쉬워요. 분수 개념을 확실하게 잡을 수 있었습니다.',
      date: '2024-01-08'
    },
    {
      id: 4,
      author: {
        name: '김태현',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&auto=format'
      },
      rating: 4,
      content:
        '내용은 좋은데 PDF 형태라서 아이가 집중하기가 조금 어려운 것 같아요. 하지만 전반적으로 만족합니다.',
      date: '2024-01-05'
    }
  ],
  relatedContents: [
    {
      id: '2',
      title: '소수의 기초 개념과 활용',
      author: '김수학',
      rating: 4.7,
      price: 14000,
      thumbnail:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=180&fit=crop&auto=format'
    },
    {
      id: '3',
      title: '곱셈구구 완벽 마스터',
      author: '이계산',
      rating: 4.9,
      price: 10000,
      thumbnail:
        'https://images.unsplash.com/photo-1516383074088-5e0c65eb2e64?w=300&h=180&fit=crop&auto=format'
    },
    {
      id: '4',
      title: '도형의 넓이와 둘레',
      author: '박기하',
      rating: 4.6,
      price: 13000,
      thumbnail:
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=180&fit=crop&auto=format'
    }
  ]
}
