'use client'

import { useEffect, useRef, useState } from 'react'

import Tabs from '@/components/ui/Tabs'

interface Props {
  className?: string
}

const TabsSection = ({ className }: Props) => {
  const [activeTab, setActiveTab] = useState('intro')
  const tabsRef = useRef<HTMLDivElement>(null)
  const isClickScrolling = useRef(false)

  const TAB_ITEMS = [
    { value: 'intro', label: '자료소개' },
    { value: 'uploader', label: '업로더정보' },
    { value: 'review', label: '자료후기', badge: 20 },
    { value: 'inquiry', label: '자료문의' }
  ]

  const handleTabChange = (value: string) => {
    const element = document.getElementById(value)
    if (!element || !tabsRef.current) return

    isClickScrolling.current = true
    setActiveTab(value)

    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - 50

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    setTimeout(() => {
      isClickScrolling.current = false
    }, 1000)
  }

  useEffect(() => {
    if (!tabsRef.current) return

    const handleScroll = () => {
      if (isClickScrolling.current) return

      const tabsHeight = tabsRef.current?.offsetHeight || 0
      const scrollPosition = window.scrollY + tabsHeight + 100

      const sectionPositions = TAB_ITEMS.map((item) => {
        const element = document.getElementById(item.value)
        if (!element) return { value: item.value, top: Infinity }

        return {
          value: item.value,
          top: element.offsetTop,
          bottom: element.offsetTop + element.offsetHeight
        }
      }).filter((section) => section.top !== Infinity)

      let currentSection = sectionPositions[0]?.value || 'intro'

      for (let i = sectionPositions.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionPositions[i].top) {
          currentSection = sectionPositions[i].value
          break
        }
      }

      if (currentSection !== activeTab) {
        setActiveTab(currentSection)
      }
    }

    handleScroll()

    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [activeTab])

  return (
    <div ref={tabsRef} className={className}>
      <Tabs
        items={TAB_ITEMS}
        value={activeTab}
        onValueChange={handleTabChange}
      />
    </div>
  )
}

export default TabsSection
