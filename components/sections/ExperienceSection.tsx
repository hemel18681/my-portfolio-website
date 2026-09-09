'use client'

import { experience } from '@/lib/data'
import { Briefcase, MapPin, CheckCircle2, Terminal } from 'lucide-react'

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
      {/* Background glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-purple-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10131d] border border-indigo-500/20 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-3">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>// CAREER &amp; TRACK RECORD</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">
              Professional Experience
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md font-sans">
            Proven history of delivering mission-critical enterprise systems, leading frontend architecture, and scaling cloud infrastructures.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-10 pl-6 md:pl-10">
          {/* Timeline line */}
          <div className="absolute left-2.5 md:left-4.5 top-2 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-900/60 to-transparent" />

          {experience.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[23px] md:-left-[31px] top-6 w-4 h-4 rounded-full bg-[#0b0d13] border-2 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10 group-hover:border-emerald-400 group-hover:scale-110 transition-all" />

              <div className="p-6 md:p-8 rounded-2xl glass border hover:border-indigo-400/40 transition-all duration-300 shadow-xl shadow-black/50">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm md:text-base text-slate-300 font-semibold">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#0b0d13] border border-indigo-500/30 font-mono text-xs text-indigo-300 uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <div className="flex items-center gap-1.5 mt-2 justify-start md:justify-end text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-xs font-mono">{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 font-sans">
                  {exp.description}
                </p>

                {/* Enterprise Metrics Badges */}
                {exp.metrics && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {exp.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0b0d13]/80 border border-indigo-500/25"
                      >
                        <span className="font-heading text-base font-black text-white">
                          {m.value}
                        </span>
                        <span className="text-xs font-mono text-indigo-300 uppercase tracking-wider">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Bullet Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2 mb-6 pt-2 border-t border-white/10">
                    {exp.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-lg bg-[#0b0d13] text-indigo-200 border border-indigo-500/20 hover:border-indigo-400/40 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
