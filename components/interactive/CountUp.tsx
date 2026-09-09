'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export default function CountUp({
  end,
  duration = 1.2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: CountUpProps) {
  const [count, setCount] = useState(end)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true
    setCount(0)

    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * end)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
    </span>
  )
}
