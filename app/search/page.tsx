import { Suspense } from 'react'

import FiltersPanel from './_components/FiltersPanel'
import SearchContentsWrapper from './_components/SearchContentsWrapper'
import { parseSearchFilters } from './_utils/searchParams'
import styles from './page.module.scss'

import { BaseLayout, BaseLayoutTitle } from '~/components/layout'

type Params = Record<string, string | string[] | undefined>

interface Props {
  searchParams: Promise<Params>
}

// SearchContents 로딩 폴백 컴포넌트
const SearchContentsFallback = () => (
  <section style={{ padding: '60px 20px', textAlign: 'center' }}>
    <div style={{ fontSize: '16px', color: '#666666' }}>
      검색 결과를 로드 중입니다...
    </div>
  </section>
)

const SearchListPage = async ({ searchParams }: Props) => {
  const resolved = await searchParams
  const filters = parseSearchFilters(resolved)

  return (
    <BaseLayout background='radial-gradient(42.11% 38.96% at 85.47% 32.95%, rgba(184, 224, 229, 0.17) 0%, rgba(217, 244, 247, 0.00) 100%), radial-gradient(41.25% 37.32% at 16.15% 70.19%, rgba(184, 224, 229, 0.22) 0%, rgba(217, 244, 247, 0.00) 100%), #F6F7F9'>
      <div className={styles.container}>
        <BaseLayoutTitle>
          수업자료 <span className={styles.sub_title}>검색 결과</span>
        </BaseLayoutTitle>
        <section className={styles.filter_section}>
          <FiltersPanel />
        </section>
        <Suspense fallback={<SearchContentsFallback />}>
          <SearchContentsWrapper />
        </Suspense>
      </div>
    </BaseLayout>
  )
}

export default SearchListPage
