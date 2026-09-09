'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface PreloaderProps {
  onComplete: () => void
}

const bootLines = [
  '> INITIALIZING SYSTEM...',
  '> LOADING PORTFOLIO MODULES...',
  '> CONNECTING TO NEURAL INTERFACE...',
  '> RENDERING 3D ENVIRONMENT...',
  '> CALIBRATING INTERACTIVE LAYER...',
  '> OPTIMIZING PERFORMANCE...',
  '> SYSTEM READY ✓',
]

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Show boot lines sequentially
    bootLines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i])
      }, i * 250)
    })

    // Animate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setIsExiting(true), 400)
      setTimeout(() => onComplete(), 1200)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="w-full max-w-lg px-8">
            {/* Terminal output */}
            <div className="font-mono text-xs sm:text-sm space-y-1 mb-8">
              {bootLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3 }}
                  className={`${i === bootLines.length - 1 && visibleLines.includes(i) ? 'text-emerald-400' : 'text-zinc-500'}`}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="relative h-[2px] bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>

            {/* Progress number */}
            <div className="flex justify-between items-center mt-3">
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                Loading
              </span>
              <span className="font-mono text-xs font-bold text-emerald-400">
                {progress}%
              </span>
            </div>

            {/* Name */}
            <div className="mt-8 text-center">
              <span className="font-heading text-sm text-zinc-500 uppercase tracking-[0.3em]">
                Asif Uddin Ahmed Hemel
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
