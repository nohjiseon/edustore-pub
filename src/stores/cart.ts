import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Tag } from '~/components/ui/TagList'

export interface CartItem {
  id: string
  title: string
  author: {
    name: string
    avatar?: string
  }
  price: number
  imageSrc?: string
  tags: Tag[]
}

interface CartStore {
  // 상태
  cartItems: CartItem[]
  selectedIds: string[]

  // 추가 관련
  addToCart: (item: CartItem) => void

  // 선택 관련
  selectAll: () => void
  selectItem: (id: string) => void

  // 삭제 관련
  deleteSelected: () => void
  deleteItem: (id: string) => void
}

// Mock 데이터
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    author: {
      name: '수업가게닉네임'
    },
    price: 10000,
    tags: [
      { name: '초3', color: 'green' },
      { name: '국어', color: 'yellow' },
      { name: '독서교육', color: 'blue' },
      { name: 'PDF', color: 'red' }
    ]
  },
  {
    id: '2',
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    author: {
      name: '수업가게닉네임'
    },
    price: 10000,
    tags: [
      { name: '초3', color: 'green' },
      { name: '국어', color: 'yellow' },
      { name: '독서교육', color: 'blue' },
      { name: 'PDF', color: 'red' }
    ]
  },
  {
    id: '3',
    title: '효율적인 업무 관리를 위한 시간 관리와 자기관리 목록들',
    author: {
      name: '수업가게닉네임'
    },
    price: 10000,
    tags: [
      { name: '초3', color: 'green' },
      { name: '국어', color: 'yellow' },
      { name: '독서교육', color: 'blue' },
      { name: 'PDF', color: 'red' }
    ]
  }
]

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // 초기 상태 - localStorage 우선, 없으면 빈 배열
      cartItems: [] as CartItem[],
      selectedIds: [] as string[],

      // 장바구니 추가
      addToCart: (item) => {
        const { cartItems } = get()
        // 이미 장바구니에 있는 상품인지 확인
        const existingItem = cartItems.find(
          (cartItem) => cartItem.id === item.id
        )

        if (existingItem) {
          // 이미 있으면 추가하지 않음 (중복 방지)
          console.log('이미 장바구니에 있는 상품입니다.')
          return
        }

        // 새 상품 추가
        set({ cartItems: [...cartItems, item] })
      },

      // 전체 선택/해제
      selectAll: () => {
        const { cartItems, selectedIds } = get()
        if (selectedIds.length === cartItems.length) {
          set({ selectedIds: [] })
        } else {
          set({ selectedIds: cartItems.map((item) => item.id) })
        }
      },

      // 개별 선택/해제
      selectItem: (id) => {
        const { selectedIds } = get()
        if (selectedIds.includes(id)) {
          set({ selectedIds: selectedIds.filter((itemId) => itemId !== id) })
        } else {
          set({ selectedIds: [...selectedIds, id] })
        }
      },

      // 선택 삭제
      deleteSelected: () => {
        const { cartItems, selectedIds } = get()
        const newItems = cartItems.filter(
          (item) => !selectedIds.includes(item.id)
        )
        set({ cartItems: newItems, selectedIds: [] })
      },

      // 개별 삭제
      deleteItem: (id) => {
        const { cartItems, selectedIds } = get()
        const newItems = cartItems.filter((item) => item.id !== id)
        const newSelectedIds = selectedIds.filter((itemId) => itemId !== id)
        set({ cartItems: newItems, selectedIds: newSelectedIds })
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)
