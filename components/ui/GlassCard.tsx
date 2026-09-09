'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl glass p-6',
        hover && 'transition-all duration-300 hover:bg-white/[0.06] hover:border-zinc-700 hover:shadow-lg hover:shadow-black/40',
        className
      )}
    >
      {children}
    </div>
  )
}
