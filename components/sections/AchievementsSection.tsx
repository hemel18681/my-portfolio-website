'use client'

import { achievements, books, conferences } from '@/lib/data'
import { Trophy, Award, Medal, Globe, BookOpen, FileText, Terminal } from 'lucide-react'
import { playHover } from '@/hooks/useSound'

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy className="w-5 h-5 text-amber-400" />,
  award: <Award className="w-5 h-5 text-indigo-400" />,
  medal: <Medal className="w-5 h-5 text-purple-400" />,
  globe: <Globe className="w-5 h-5 text-cyan-400" />,
  book: <BookOpen className="w-5 h-5 text-emerald-400" />,
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-purple-600/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10131d] border border-indigo-500/20 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-3 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>// RECOGNITION &amp; SCHOLARSHIP</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">
            Honors &amp; Publications
          </h2>
        </div>
        <p className="text-sm md:text-base text-slate-400 max-w-md font-sans">
          Competitive programming awards (ICPC/NCPC), peer-reviewed AI research conferences in Japan, and authored publications.
        </p>
      </div>

      {/* Achievement cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            onMouseEnter={() => playHover()}
            className="group p-6 rounded-2xl glass border hover:border-indigo-400/40 transition-all duration-300 shadow-lg shadow-black/40"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/25 group-hover:border-indigo-400/50 group-hover:text-white transition-all flex-shrink-0">
                {iconMap[ach.icon]}
              </div>
              <div>
                <div className="font-mono text-[10px] text-indigo-400 font-semibold uppercase tracking-widest mb-1">
                  {ach.year}
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {ach.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Research & Publications Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Conference Papers */}
        {conferences.map((conf) => (
          <div
            key={conf.title}
            onMouseEnter={() => playHover()}
            className="p-6 rounded-2xl glass border hover:border-indigo-400/40 transition-all shadow-lg shadow-black/40"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/25 flex-shrink-0">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/25">
                    Conference Paper
                  </span>
                  <span className="text-xs font-mono text-slate-400">{conf.year}</span>
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-1.5">
                  {conf.title}
                </h3>
                <p className="text-xs text-indigo-300 font-mono mb-2">
                  {conf.conference} • {conf.location}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {conf.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Book publication */}
        {books.map((book) => (
          <div
            key={book.title}
            onMouseEnter={() => playHover()}
            className="p-6 rounded-2xl glass border hover:border-indigo-400/40 transition-all shadow-lg shadow-black/40"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/25 flex-shrink-0">
                <BookOpen className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/25">
                    Published Book
                  </span>
                  <span className="text-xs font-mono text-slate-400">{book.year}</span>
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-indigo-300 font-mono mb-2">{book.subtitle}</p>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {book.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
