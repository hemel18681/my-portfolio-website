'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useInView, useAnimation } from 'motion/react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  distance?: number
  once?: boolean
}

const directionOffset = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  distance = 40,
  once = true,
}: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })
  const controls = useAnimation()
  const offset = directionOffset[direction]

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: offset.x ? (offset.x > 0 ? distance : -distance) : 0,
          y: offset.y ? (offset.y > 0 ? distance : -distance) : 0,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
