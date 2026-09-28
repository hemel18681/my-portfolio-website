'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
  springConfig?: { stiffness: number; damping: number; mass: number }
}

export default function Magnetic({
  children,
  className = '',
  strength = 0.3,
  springConfig = { stiffness: 150, damping: 15, mass: 0.1 },
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
    }
    const { left, top, width, height } = rectRef.current
    const centerX = left + width / 2
    const centerY = top + height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    rectRef.current = null
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
