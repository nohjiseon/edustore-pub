import * as RadixTabs from '@radix-ui/react-tabs'
import { ReactNode } from 'react'

import styles from './Tabs.module.scss'

interface TabItem {
  value: string
  label: string
  badge?: number | string
  content?: ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultValue?: string
  value?: string
  className?: string
  onValueChange?: (value: string) => void
  // default: 언더라인 블랙 (ex. 자료 상세)
  // primary: 언더라인 청록 (ex. 구매 목록)
  // centerline: 언더라인 청록 가운데 라인 (ex. 정산 목록)
  type?: 'default' | 'primary' | 'centerline'
}

const Tabs = ({
  items,
  defaultValue,
  value,
  className,
  onValueChange,
  type = 'default'
}: TabsProps) => {
  const hasContent = items.some((item) => item.content !== undefined)

  // 타입별 클래스 매핑
  const typeClasses = {
    default: styles.default,
    primary: styles.primary,
    centerline: styles.centerline
  }

  const typeClass = typeClasses[type]

  return (
    <RadixTabs.Root
      defaultValue={defaultValue || items[0]?.value}
      value={value}
      className={className}
      onValueChange={onValueChange}
    >
      <RadixTabs.List className={`${styles.tab_list} ${typeClass}`}>
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={styles.tab_trigger}
          >
            <span className={styles.tab_label}>{item.label}</span>
            {item.badge !== undefined && (
              <span className={styles.tab_badge}>{item.badge}</span>
            )}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      {hasContent &&
        items.map((item) =>
          item.content ? (
            <RadixTabs.Content
              key={item.value}
              value={item.value}
              className={styles.tab_content}
            >
              {item.content}
            </RadixTabs.Content>
          ) : null
        )}
    </RadixTabs.Root>
  )
}

export default Tabs
