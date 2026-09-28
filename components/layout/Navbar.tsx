'use client'

import { useEffect, useState, useRef } from 'react'
import { navLinks, profile } from '@/lib/data'
import { useNavStore } from '@/hooks/useNavState'
import { playClick } from '@/hooks/useSound'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollRef = useRef(0)
  const setIsTopNavVisible = useNavStore((s) => s.setIsTopNavVisible)

  useEffect(() => {
    const handler = () => {
      const current = window.scrollY
      setScrolled(current > 50)

      // Auto-hide: hide on scroll down past 120px, show on scroll up
      if (current > lastScrollRef.current && current > 120) {
        setHidden(true)
        setIsTopNavVisible(false)
      } else if (current < lastScrollRef.current || current <= 120) {
        setHidden(false)
        setIsTopNavVisible(true)
      }
      lastScrollRef.current = current
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [setIsTopNavVisible])

  const handleNavClick = (href: string) => {
    playClick()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-[transform,opacity] ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'bg-[#090b10]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/60'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#hero')
            }}
            className="text-xl font-bold font-heading text-white tracking-tight group flex items-center gap-1 cursor-pointer"
          >
            <span>{profile.firstName}</span>
            <span className="text-indigo-300 group-hover:text-white transition-colors">{profile.lastName}</span>
            <span className="text-emerald-400 group-hover:scale-125 transition-transform">.</span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className="text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-400 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => {
              playClick()
              setMobileOpen(!mobileOpen)
            }}
            className="md:hidden flex flex-col gap-1.5 p-2.5 rounded-xl bg-[#0c1228] border border-indigo-500/30 text-white shadow-md"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu modal */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#090b10]/95 backdrop-blur-2xl flex items-center justify-center md:hidden">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="text-2xl font-bold font-heading text-slate-200 hover:text-indigo-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Scroll progress bar */}
      <ScrollProgressBar />
    </>
  )
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 z-[9999] origin-left shadow-[0_0_8px_rgba(99,102,241,0.6)]"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
