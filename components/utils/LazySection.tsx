'use client'

import { useState, useEffect, useRef } from 'react'

interface LazySectionProps {
  children: React.ReactNode
  minHeight?: string
}

export default function LazySection({ children, minHeight = '50vh' }: LazySectionProps) {
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasIntersected) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true)
          observer.disconnect()
        }
      },
      // rootMargin: 300px means it will trigger when the element is 300px below the viewport
      { rootMargin: '300px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasIntersected])

  if (hasIntersected) {
    return <>{children}</>
  }

  // Placeholder while loading, maintains layout structure to prevent CLS
  return <div ref={ref} style={{ minHeight, width: '100%' }} aria-hidden="true" />
}
