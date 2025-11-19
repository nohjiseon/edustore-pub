export interface ReviewReply {
  author: string
  date: string
  content: string
}

export interface Review {
  id: number
  rating: number
  author: string
  date: string
  content: string
  helpfulCount: number
  isHelpful: boolean
  images?: string[]
  imageCount?: number
  showReplyInput?: boolean
  reply?: ReviewReply
}

export const mockReviews: Review[] = [
  {
    id: 1,
    rating: 5.0,
    author: '단단**',
    date: '2025.06.30',
    content:
      '3학년 2학기 첫 글쓰기 수업에서 이 자료를 사용했어요. 아이들이 글의 구조를 처음 접하는데 효과적이었어요',
    helpfulCount: 1,
    isHelpful: true,
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=107&h=97&fit=crop&auto=format'
    ],
    imageCount: 3
  },
  {
    id: 2,
    rating: 5.0,
    author: '단단**',
    date: '2025.06.30',
    content:
      '3학년 2학기 첫 글쓰기 수업에서 이 자료를 사용했어요. 아이들이 글의 구조를 처음 접하는데 효과적이었어요',
    helpfulCount: 0,
    isHelpful: false,
    showReplyInput: true
  },
  {
    id: 3,
    rating: 5.0,
    author: '단단**',
    date: '2025.06.30',
    content:
      '3학년 2학기 첫 글쓰기 수업에서 이 자료를 사용했어요. 아이들이 글의 구조를 처음 접하는데 효과적이었어요',
    helpfulCount: 0,
    isHelpful: false,
    reply: {
      author: '업**',
      date: '2025.06.30',
      content: '감사합니다.'
    }
  }
]
