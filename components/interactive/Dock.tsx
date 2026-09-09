'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { navLinks } from '@/lib/data'
import SoundToggle from './SoundToggle'
import { useNavStore } from '@/hooks/useNavState'
import { playClick, playHover } from '@/hooks/useSound'

interface DockProps {
  className?: string
}

export default function Dock({ className = '' }: DockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const isTopNavVisible = useNavStore((s) => s.isTopNavVisible)

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    playClick()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {!isTopNavVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block select-none"
        >
          <div
            ref={containerRef}
            className={`flex items-center gap-1 px-3.5 py-2 rounded-2xl glass backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] border border-white/10 ${className}`}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, i) => {
              const isHovered = hoveredIndex === i
              const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1

              return (
                <motion.div
                  key={link.name}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  animate={{
                    scale: isHovered ? 1.18 : isNeighbor ? 1.08 : 1,
                    y: isHovered ? -6 : isNeighbor ? -3 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                  onMouseEnter={() => {
                    setHoveredIndex(i)
                    playHover()
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="relative flex flex-col items-center px-3 py-1.5 rounded-xl hover:bg-indigo-950/60 transition-colors group cursor-pointer"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                      {link.name}
                    </span>

                    {/* Tooltip on magnify */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: -10 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-indigo-600 text-white font-bold text-[10px] font-mono uppercase whitespace-nowrap pointer-events-none shadow-lg shadow-indigo-600/40 border border-indigo-400/30"
                      >
                        {link.name}
                      </motion.div>
                    )}
                  </a>
                </motion.div>
              )
            })}

            <div className="w-px h-6 bg-indigo-500/30 mx-1.5" />
            <SoundToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
