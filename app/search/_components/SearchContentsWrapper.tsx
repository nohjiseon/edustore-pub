'use client'

import dynamic from 'next/dynamic'

import styles from './SearchContents.module.scss'

// 클라이언트 컴포넌트에서 dynamic import 사용 (SSR 비활성화)
const SearchContents = dynamic(() => import('./SearchContents'), {
  ssr: false,
  loading: () => (
    <section className={styles.loading_state}>
      검색 결과를 로드 중입니다...
    </section>
  )
})

const SearchContentsWrapper = () => {
  return <SearchContents />
}

export default SearchContentsWrapper
