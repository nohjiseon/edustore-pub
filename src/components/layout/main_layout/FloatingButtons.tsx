'use client'

import { useRouter } from 'next/navigation'

import { FloatingActionButtons } from '@/components/ui'

const FloatingButtons = () => {
  const router = useRouter()

  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDisplayClick = () => {
    router.push('/upload')
  }

  return (
    <FloatingActionButtons
      onTopClick={handleTopClick}
      onDisplayClick={handleDisplayClick}
    />
  )
}

export default FloatingButtons
