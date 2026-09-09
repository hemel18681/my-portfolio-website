'use client'

import { profile } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="mt-24 pt-12 pb-28 md:pb-32 border-t border-white/10 bg-[#0b0d13]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-base font-bold font-heading text-white tracking-tight">
            {profile.name}
            <span className="text-emerald-400">.</span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            © {new Date().getFullYear()} Asif Uddin Ahmed Hemel — All rights reserved.
          </p>
        </div>

        {/* Right side: System Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass font-mono text-[11px] text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="tracking-wider">SYSTEM.ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
