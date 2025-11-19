export interface InquiryAnswer {
  author: string
  date: string
  content: string
}

export interface Inquiry {
  id: number
  category: string
  status: string
  statusColor: 'primary' | 'default'
  author: string
  date: string
  question: string
  images?: string[]
  imageCount?: number
  answer?: InquiryAnswer
  isOpen?: boolean
}

export const mockInquiries: Inquiry[] = [
  {
    id: 1,
    category: '구매',
    status: '답변완료',
    statusColor: 'primary',
    author: '후기작성ID',
    date: '2025.06.30',
    question: '첨부된 파일이 오류로 열리지 않아요.',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=107&h=97&fit=crop&auto=format'
    ],
    imageCount: 3,
    answer: {
      author: '장**',
      date: '2025.06.30',
      content:
        '안녕하세요, 파일 재업로드 했으니 다시 확인 부탁드립니다. 불편을 드려 죄송합니다.'
    },
    isOpen: true
  },
  {
    id: 2,
    category: '구매',
    status: '답변대기',
    statusColor: 'default',
    author: '후기작성ID',
    date: '2025.06.30',
    question: '첨부된 파일이 오류로 열리지 않아요.',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=107&h=97&fit=crop&auto=format'
    ],
    imageCount: 3,
    isOpen: false
  }
]
