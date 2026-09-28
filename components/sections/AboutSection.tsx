'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { profile, conferences, education } from '@/lib/data'
import { MapPin, Globe, BookOpen, GraduationCap, Sparkles, Terminal } from 'lucide-react'
import { playClick } from '@/hooks/useSound'

const Lanyard3D = dynamic(() => import('@/components/3d/Lanyard3D'), { ssr: false })

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [visible, ref] as const
}

export default function AboutSection() {
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d')
  const [lanyardReady, setLanyardReady] = useState(false)
  const [inView, sectionRef] = useInView(0.25)

  useEffect(() => { if (inView) setLanyardReady(true); }, [inView])

  const handleModeChange = (mode: '3d' | 'photo') => {
    playClick()
    setViewMode(mode)
  }

  return (
    <section
      id="about"
      className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative"
    >
      <div ref={sectionRef} className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 relative z-10">
        {/* Left Column — Bio & Highlights */}
        <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10131d] border border-indigo-500/20 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>// PROFILE &amp; ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-6 tracking-tight leading-tight">
            Architecting Resilient, Distributed &amp; Scalable Systems
          </h2>

          <p className="text-base md:text-lg leading-relaxed mb-6 text-slate-300 font-sans">
            I&apos;m a <span className="text-white font-semibold">{profile.title}</span> with{' '}
            <span className="text-white font-semibold">{profile.yearsOfExperience}+ years</span> of
            experience architecting and deploying mission-critical systems. My work focuses on high-concurrency enterprise microservices, reactive user interfaces, and automated cloud workflows that deliver quantifiable business outcomes.
          </p>

          <p className="text-sm md:text-base leading-relaxed mb-8 text-slate-400 font-sans">
            From leading the modernization of banking systems serving <span className="text-white font-medium">300+ branches</span> with 200% speedup, to presenting deep learning research at <span className="text-indigo-200 font-medium">FCV Japan</span> and publishing competitive programming literature, I bridge complex computer science theory with high-performance production engineering.
          </p>

          {/* Quick facts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl glass border border-white/10 hover:border-indigo-400/40 transition-all">
              <div className="p-2.5 rounded-xl bg-indigo-950/70 border border-indigo-500/30 text-indigo-300">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Location</div>
                <div className="text-sm font-semibold text-white">{profile.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl glass border border-white/10 hover:border-indigo-400/40 transition-all">
              <div className="p-2.5 rounded-xl bg-indigo-950/70 border border-indigo-500/30 text-indigo-300">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Languages</div>
                <div className="text-sm font-semibold text-white">{profile.languages.join(', ')}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl glass border border-white/10 hover:border-indigo-400/40 transition-all">
              <div className="p-2.5 rounded-xl bg-indigo-950/70 border border-indigo-500/30 text-indigo-300">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Education</div>
                <div className="text-sm font-semibold text-white">{education[0].degree}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl glass border border-white/10 hover:border-indigo-400/40 transition-all">
              <div className="p-2.5 rounded-xl bg-indigo-950/70 border border-indigo-500/30 text-indigo-300">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Research</div>
                <div className="text-sm font-semibold text-white">{conferences[0].year} {conferences[0].location}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-mono text-slate-400 pt-2 border-t border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span>Working with passion, engineering with mathematical rigor.</span>
          </div>
        </div>

        {/* Right Column — 3D Lanyard & Portrait Switcher */}
        <div className="basis-full md:basis-5/12 pl-0 md:pl-4 overflow-hidden max-w-full flex flex-col items-center justify-center">
          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-[#10131d] border border-indigo-500/20 mb-4">
            <button
              onClick={() => handleModeChange('3d')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30 border border-indigo-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D Physics Badge
            </button>
            <button
              onClick={() => handleModeChange('photo')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                viewMode === 'photo'
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30 border border-indigo-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Portrait View
            </button>
          </div>

          {viewMode === '3d' ? (
            <div className="w-full flex flex-col items-center">
              {lanyardReady ? (
                <Lanyard3D className="w-full h-[450px]" />
              ) : (
                <div className="w-full h-[450px] rounded-3xl border border-white/10 bg-[#0b0d13] flex items-center justify-center text-slate-300 font-mono text-xs">
                  3D badge — scroll to load
                </div>
              )}
              <p className="text-xs font-mono text-indigo-300 text-center mt-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interactive 3D Rapier Physics • Click &amp; drag to swing</span>
              </p>
            </div>
          ) : (
            <div className="w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl group bg-[#0b0d13]">
              <Image
                src="/assets/images/profile-2.webp"
                alt={`${profile.name} — Portrait`}
                fill
                unoptimized
                quality={100}
                priority
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl glass border border-white/10 backdrop-blur-md">
                <div className="text-sm font-bold text-white font-heading">{profile.name}</div>
                <div className="text-xs font-mono text-indigo-300">{profile.title}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
