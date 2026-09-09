'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { playClick } from '@/hooks/useSound'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      onClick={() => {
        playClick()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#12151c]/90 border border-zinc-700/80 text-zinc-300 shadow-2xl backdrop-blur-md hover:text-white hover:border-zinc-500 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  )
}
