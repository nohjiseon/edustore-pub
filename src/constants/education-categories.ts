import {
  GRADE_ITEMS,
  SUBJECT_ITEMS,
  OTHER_ITEMS,
  ADMIN_ITEMS,
  FILTER_EXPANSIONS
} from './education-filter-options'

import type { DropdownCategory } from '@/types/education'
import { createItems } from '@/utils/education-mapping'

// 네비게이션 ID → 카테고리 데이터
export const DROPDOWN_CATEGORIES: Record<string, DropdownCategory> = {
  grade: {
    label: '학년별',
    searchParam: 'grade',
    sections: [
      {
        title: '유아교육',
        gradeLevel: 'kindergarten-grades',
        items: createItems([...FILTER_EXPANSIONS['K_ALL']], GRADE_ITEMS)
      },
      {
        title: '초등학교',
        gradeLevel: 'elementary-grades',
        items: createItems([...FILTER_EXPANSIONS['E_ALL']], GRADE_ITEMS)
      },
      {
        title: '중학교',
        gradeLevel: 'middle-grades',
        items: createItems([...FILTER_EXPANSIONS['M_ALL']], GRADE_ITEMS)
      },
      {
        title: '고등학교',
        gradeLevel: 'high-grades',
        items: createItems([...FILTER_EXPANSIONS['H_ALL']], GRADE_ITEMS)
      },
      {
        title: '이 외 교육',
        gradeLevel: 'other-education',
        items: createItems(['AD01'], GRADE_ITEMS)
      }
    ]
  },
  kindergarten: {
    label: '유아',
    searchParam: 'kindergarten',
    sections: [
      {
        items: createItems(
          ['KS01', 'KS02', 'KS03', 'KS04', 'KS05'],
          SUBJECT_ITEMS
        )
      }
    ]
  },
  elementary: {
    label: '초등',
    searchParam: 'elementary',
    sections: [
      {
        items: createItems(
          [
            'S01', //국어
            'S08', //미술
            'S02', //도덕
            'S09', //체육
            'S03', //사회
            'S10', //영어
            'S04', //수학
            'S11', //통합교과
            'S05', //과학
            'S12', //창의적 체험활동
            'S06', //실과
            'S13', //학교자율시간
            'S07', //음악
            'S14' //교과통합
          ],
          SUBJECT_ITEMS
        )
      }
    ]
  },
  middle: {
    label: '중등',
    searchParam: 'middle',
    sections: [
      {
        items: createItems(
          [
            'S01', //국어
            'S07', //음악
            'S15', //사회
            'S08', //미술
            'S02', //도덕
            'S10', //영어
            'S04', //수학
            'S18', //선택
            'S05', //과학
            'S12', //창의적 체험활동
            'S16', //기술가정
            'S13', //학교자율시간
            'S17', //정보
            'S14', //교과통합
            'S09' //체육
          ],
          SUBJECT_ITEMS
        )
      }
    ]
  },
  high: {
    label: '고등',
    searchParam: 'high',
    sections: [
      {
        items: createItems(
          [
            'S01', //국어
            'S17', //정보
            'S04', //수학
            'S21', //제2외국어
            'S10', //영어
            'S22', //한문
            'S19', //사회
            'S23', //교양
            'S05', //과학
            'S24', //전문교과
            'S09', //체육
            'S12', //창의적 체험활동
            'S20', //예술
            'S13', //학교자율시간
            'S16', //기술가정
            'S14' //교과통합
          ],
          SUBJECT_ITEMS
        )
      }
    ]
  },
  special: {
    label: '특수교육',
    searchParam: 'special',
    sections: []
  },
  other: {
    label: '기타',
    searchParam: 'other',
    sections: [
      {
        items: createItems(
          [
            'OT01',
            'OT02',
            'OT03',
            'OT04',
            'OT05',
            'OT06',
            'OT07',
            'OT08',
            'OT09',
            'OT10',
            'OT99'
          ],
          OTHER_ITEMS
        )
      }
    ]
  },
  admin: {
    label: '행정·업무',
    searchParam: 'admin',
    sections: [
      {
        items: createItems(
          [
            'AD01',
            'AD02',
            'AD03',
            'AD04',
            'AD05',
            'AD06',
            'AD07',
            'AD08',
            'AD09',
            'AD10',
            'AD11',
            'AD99'
          ],
          ADMIN_ITEMS
        )
      }
    ]
  }
}

/**
 * 네비게이션 메뉴 데이터
 * DROPDOWN_CATEGORIES에서 자동 생성되어 중복 제거
 */
export const NAVIGATION_ITEMS = Object.entries(DROPDOWN_CATEGORIES).map(
  ([key, category]) => ({
    id: key,
    label: category.label,
    href: `/${key}`
  })
)
