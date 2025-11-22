import { SearchResultModelSchema } from '@/entities/search/model'
import {
  ContentCardData,
  SearchResultModel,
  SearchResultItemModel
} from '@/types/search'

export const mockSearchContents: ContentCardData[] = [
  {
    id: 1,
    rating: 4.8,
    tags: {
      grade: '초등 3학년',
      subject: '수학',
      type: '개념 학습',
      format: 'PDF'
    },
    title: '분수의 기초 개념과 활용',
    description:
      '분수의 개념을 쉽게 이해하고 실생활에 적용할 수 있는 학습 자료입니다. 시각적 자료와 함께 단계별로 학습할 수 있습니다.',
    author: {
      name: '김수학',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 12000,
    imageSrc:
      'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 2,
    rating: 4.6,
    tags: {
      grade: '중학 1학년',
      subject: '영어',
      type: '문법',
      format: '동영상'
    },
    title: '영어 현재완료 시제 완벽 정리',
    description:
      '현재완료 시제의 세 가지 용법을 예문과 함께 자세히 설명하고, 실제 문제 풀이까지 포함된 완벽한 학습 자료입니다.',
    author: {
      name: '이영어',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b2e2e005?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 15000,
    imageSrc:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 3,
    rating: 4.9,
    tags: {
      grade: '고등 2학년',
      subject: '물리',
      type: '실험',
      format: '워크북'
    },
    title: '전자기학 실험과 원리 탐구',
    description:
      '전자기학의 핵심 개념을 실험을 통해 직접 체험하고 이해할 수 있는 실습형 학습 자료입니다.',
    author: {
      name: '박물리',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 25000,
    imageSrc:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 4,
    rating: 4.7,
    tags: {
      grade: '초등 5학년',
      subject: '과학',
      type: '탐구 활동',
      format: '키트'
    },
    title: '식물의 한살이 관찰 키트',
    description:
      '식물이 씨앗에서 꽃이 피기까지의 전 과정을 직접 관찰하고 기록할 수 있는 체험형 학습 키트입니다.',
    author: {
      name: '정생물',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 18000,
    imageSrc:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 5,
    rating: 4.5,
    tags: {
      grade: '중학 3학년',
      subject: '국어',
      type: '문학',
      format: 'PDF'
    },
    title: '고전 소설 해석과 감상 가이드',
    description:
      '중학교 교과서에 수록된 고전 소설 작품들의 주제 의식과 문학적 기법을 체계적으로 분석한 학습 자료입니다.',
    author: {
      name: '최국어',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 14000,
    imageSrc:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 6,
    rating: 4.8,
    tags: {
      grade: '고등 1학년',
      subject: '화학',
      type: '개념 정리',
      format: '동영상'
    },
    title: '원자 구조와 주기율표 완벽 이해',
    description:
      '원자의 구조부터 주기율표의 원리까지, 화학의 기초를 탄탄히 다질 수 있는 체계적인 학습 프로그램입니다.',
    author: {
      name: '강화학',
      avatar:
        'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 20000,
    imageSrc:
      'https://images.unsplash.com/photo-1516383074088-5e0c65eb2e64?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 7,
    rating: 4.4,
    tags: {
      grade: '초등 6학년',
      subject: '사회',
      type: '지리',
      format: '워크북'
    },
    title: '우리나라 지형과 기후 탐험',
    description:
      '우리나라의 다양한 지형과 기후의 특징을 지도와 사진 자료를 통해 생생하게 학습할 수 있는 교재입니다.',
    author: {
      name: '윤지리',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 16000,
    imageSrc:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 8,
    rating: 4.6,
    tags: {
      grade: '중학 2학년',
      subject: '수학',
      type: '문제 해결',
      format: '문제집'
    },
    title: '일차함수 마스터 문제집',
    description:
      '일차함수의 개념부터 응용 문제까지 단계별로 구성된 체계적인 문제 해결 훈련서입니다.',
    author: {
      name: '서함수',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 13000,
    imageSrc:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 9,
    rating: 4.9,
    tags: {
      grade: '고등 3학년',
      subject: '생물',
      type: '심화 학습',
      format: 'PDF'
    },
    title: 'DNA와 유전 심화 연구 자료',
    description:
      '대학 입시에 필요한 DNA 구조와 유전 원리에 대한 심화 내용을 다룬 고급 학습 자료입니다.',
    author: {
      name: '임유전',
      avatar:
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 22000,
    imageSrc:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 10,
    rating: 4.3,
    tags: {
      grade: '초등 4학년',
      subject: '미술',
      type: '창작 활동',
      format: '키트'
    },
    title: '나만의 도자기 만들기 체험',
    description:
      '점토를 이용해 나만의 도자기 작품을 만들어보는 창의적 미술 체험 키트입니다.',
    author: {
      name: '한미술',
      avatar:
        'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 24000,
    imageSrc:
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 11,
    rating: 4.7,
    tags: {
      grade: '중학 1학년',
      subject: '역사',
      type: '시대사',
      format: '동영상'
    },
    title: '고구려 역사와 문화 완전 정복',
    description:
      '고구려의 건국부터 멸망까지의 역사와 찬란했던 문화유산을 영상과 함께 생생하게 학습할 수 있습니다.',
    author: {
      name: '조역사',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 17000,
    imageSrc:
      'https://images.unsplash.com/photo-1520637836862-4d197d17c16a?w=400&h=240&fit=crop&auto=format'
  },
  {
    id: 12,
    rating: 4.8,
    tags: {
      grade: '고등 1학년',
      subject: '음악',
      type: '이론',
      format: '워크북'
    },
    title: '서양 음악사 핵심 정리',
    description:
      '바로크 시대부터 현대까지 서양 음악의 흐름과 주요 작곡가들의 작품 세계를 체계적으로 정리한 학습서입니다.',
    author: {
      name: '송음악',
      avatar:
        'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=64&h=64&fit=crop&crop=face&auto=format'
    },
    price: 19000,
    imageSrc:
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=240&fit=crop&auto=format'
  }
]

/**
 * ContentCardData를 SearchResultItemModel로 변환
 */
const convertContentCardToSearchResultItem = (
  content: ContentCardData,
  index: number
): SearchResultItemModel => {
  return {
    id: content.id,
    title: content.title,
    description: content.description,
    price: content.price,
    rating: content.rating,
    imageSrc: content.imageSrc || '',
    author: {
      name: content.author.name,
      avatar: content.author.avatar
    },
    tags: {
      grade: content.tags.grade,
      subject: content.tags.subject,
      type: content.tags.type,
      format: content.tags.format
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

/**
 * 검색 결과 목업 데이터 생성
 * ContentCardData 배열을 SearchResultModel로 변환
 */
export const createMockSearchResult = (command: {
  searchKeyword?: string
  page?: number
  size?: number
}): SearchResultModel => {
  const page = command.page || 0
  const size = command.size || 10

  // 검색어에 따라 필터링
  let filteredContents = mockSearchContents
  if (command.searchKeyword) {
    const keyword = command.searchKeyword.toLowerCase()
    filteredContents = mockSearchContents.filter(
      (content) =>
        content.title.toLowerCase().includes(keyword) ||
        content.description.toLowerCase().includes(keyword) ||
        content.tags.grade?.toLowerCase().includes(keyword) ||
        content.tags.subject?.toLowerCase().includes(keyword)
    )
  }

  // 페이지네이션 적용
  const start = page * size
  const end = start + size
  const paginatedContents = filteredContents.slice(start, end)

  // SearchResultItemModel로 변환
  const items: SearchResultItemModel[] = paginatedContents.map(
    (content, index) =>
      convertContentCardToSearchResultItem(content, start + index)
  )

  const total = filteredContents.length
  const totalPages = Math.max(1, Math.ceil(total / size))
  const hasNext = page < totalPages - 1

  const result: SearchResultModel = {
    items,
    total,
    page,
    size,
    hasNext,
    totalPages
  }

  // Zod 스키마로 검증
  return SearchResultModelSchema.parse(result) as SearchResultModel
}
