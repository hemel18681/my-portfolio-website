'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface OutputBoxProps {
  children: ReactNode
  loading?: boolean
}

export default function OutputBox({ children, loading }: OutputBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-5 rounded-2xl bg-[#080b18]/90 border border-indigo-500/20 shadow-inner max-h-[420px] sm:max-h-[480px] overflow-y-auto"
    >
      {loading && (
        <div className="flex items-center gap-2 mb-3 text-[11px] font-mono uppercase tracking-widest text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Streaming response...</span>
        </div>
      )}
      <div className="text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}
