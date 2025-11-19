import type { StaticImageData } from 'next/image'

import Teacher_01 from '@/assets/images/main/teacher_01.png'
import Teacher_02 from '@/assets/images/main/teacher_02.png'
import Teacher_03 from '@/assets/images/main/teacher_03.png'
import Teacher_04 from '@/assets/images/main/teacher_04.png'
import Teacher_05 from '@/assets/images/main/teacher_05.png'
import Teacher_06 from '@/assets/images/main/teacher_06.png'
import Teacher_07 from '@/assets/images/main/teacher_07.png'

export interface TeacherItem {
  id: number
  name: string
  description: string
  imageSrc: string | StaticImageData
}

export interface TeacherSection {
  idx: number
  type: 'type_01' | 'type_02' | 'type_03' | 'type_04'
  items: TeacherItem[]
}

export const teacherSections: TeacherSection[] = [
  {
    idx: 1,
    type: 'type_01',
    items: [
      {
        id: 1,
        name: '이초홍',
        description: '중등전체, 고등1학년',
        imageSrc: Teacher_01
      },
      {
        id: 2,
        name: '신하람',
        description: '초등전체, 중등1학년 외1',
        imageSrc: Teacher_02
      }
    ]
  },
  {
    idx: 2,
    type: 'type_02',
    items: [
      { id: 3, name: '최주원', description: '고등전체', imageSrc: Teacher_03 }
    ]
  },
  {
    idx: 3,
    type: 'type_03',
    items: [
      {
        id: 4,
        name: '윤서진',
        description: '유아전체, 초등1학년',
        imageSrc: Teacher_04
      },
      {
        id: 5,
        name: '박하준',
        description: '만6세, 초등1학년 외 2',
        imageSrc: Teacher_05
      }
    ]
  },
  {
    idx: 4,
    type: 'type_04',
    items: [
      {
        id: 6,
        name: '신도윤',
        description: '중등전체',
        imageSrc: Teacher_06
      },
      {
        id: 7,
        name: '윤다희',
        description: '고등1학년, 고등3학년 외1',
        imageSrc: Teacher_07
      }
    ]
  },
  {
    idx: 5,
    type: 'type_01',
    items: [
      {
        id: 8,
        name: '이초홍',
        description: '중등전체, 고등1학년',
        imageSrc: Teacher_01
      },
      {
        id: 9,
        name: '신하람',
        description: '초등전체, 중등1학년 외1',
        imageSrc: Teacher_02
      }
    ]
  },
  {
    idx: 6,
    type: 'type_02',
    items: [
      { id: 10, name: '최주원', description: '고등전체', imageSrc: Teacher_03 }
    ]
  },
  {
    idx: 7,
    type: 'type_03',
    items: [
      {
        id: 11,
        name: '윤서진',
        description: '유아전체, 초등1학년',
        imageSrc: Teacher_04
      },
      {
        id: 12,
        name: '박하준',
        description: '만6세, 초등1학년 외 2',
        imageSrc: Teacher_05
      }
    ]
  },
  {
    idx: 8,
    type: 'type_04',
    items: [
      {
        id: 13,
        name: '신도윤',
        description: '중등전체',
        imageSrc: Teacher_06
      },
      {
        id: 14,
        name: '윤다희',
        description: '고등1학년, 고등3학년 외1',
        imageSrc: Teacher_07
      }
    ]
  }
]
