'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import { playClick, playHover } from '@/hooks/useSound'

interface ChromaGridItem {
  id: string
  title: string
  category: string
  description: string
  image: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  onClick?: () => void
}

interface ChromaGridProps {
  items: ChromaGridItem[]
  className?: string
  columns?: 2 | 3 | 4
}

export default function ChromaGrid({ items, className = '', columns = 3 }: ChromaGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const rafId = useRef<number>(0)

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    if (rafId.current) return
    const clientX = e.clientX
    const clientY = e.clientY
    rafId.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      card.style.setProperty('--mx', `${x}px`)
      card.style.setProperty('--my', `${y}px`)
      rafId.current = 0
    })
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div
      ref={containerRef}
      className={cn('grid gap-5', gridCols[columns], className)}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          data-card
          className="relative group rounded-2xl overflow-hidden bg-[#0c1228] border border-indigo-500/20 cursor-pointer shadow-xl shadow-indigo-950/30 hover:border-indigo-400/50 transition-colors"
          style={{
            '--mx': '50%',
            '--my': '50%',
          } as React.CSSProperties}
          onMouseMove={handleCardMouseMove}
          onMouseEnter={() => {
            setHoveredId(item.id)
            playHover()
          }}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => {
            playClick()
            item.onClick?.()
          }}
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.2 }}
        >
          {/* Subtle cursor-following spotlight overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 rounded-2xl"
            style={{
              background: `radial-gradient(350px circle at var(--mx) var(--my), rgba(129, 140, 248, 0.08), transparent 70%)`,
              opacity: hoveredId === item.id ? 1 : 0,
            }}
          />

          {/* Project Thumbnail Image */}
          <div className="relative h-48 overflow-hidden bg-[#080b18]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1228] via-[#0c1228]/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-20 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300">
                {item.category}
              </span>
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2 font-sans">
              {item.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md bg-[#080b18] text-indigo-200 border border-indigo-500/20"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-2 border-t border-indigo-500/20">
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-indigo-300 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    playClick()
                  }}
                >
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                  Live Demo
                </a>
              )}
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    playClick()
                  }}
                >
                  <Github className="w-3 h-3" />
                  Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
