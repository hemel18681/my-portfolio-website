'use client'

import Reveal from '@/components/interactive/Reveal'
import AIToolsSuite from '@/components/ai/AIToolsSuite'
import { Sparkles, Terminal } from 'lucide-react'

export default function AIToolsSection() {
  return (
    <section id="ai-tools" className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div>
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10131d] border border-indigo-500/20 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-3">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>// AI LAB &amp; INTERACTIVE TOOLS</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">
                Interactive AI Suite
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <p className="text-sm text-slate-400 font-sans">
                Interactive AI-powered tools built with Google Gemini.
              </p>
            </div>
          </div>
        </Reveal>

        {/* AI Tools Suite */}
        <Reveal delay={0.1}>
          <AIToolsSuite />
        </Reveal>
      </div>
    </section>
  )
}
