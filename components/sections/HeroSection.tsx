'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowRight,
  Download,
  Mail,
  RefreshCw,
} from 'lucide-react'
import { profile, stats, socialLinks } from '@/lib/data'
import CountUp from '@/components/interactive/CountUp'
import { Github, Linkedin, Facebook, ExternalLink } from 'lucide-react'
import { playClick, playHover } from '@/hooks/useSound'

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  facebook: <Facebook className="w-4 h-4" />,
  upwork: <ExternalLink className="w-4 h-4" />,
}

// Floating tech badges positioned around the avatar
const TECH_BADGES = [
  { name: 'React / Next.js', emoji: '⚛️', pos: 'top-2 -left-4', delay: '0s', speed: '5s' },
  { name: 'Angular / RxJS', emoji: '🅰️', pos: 'top-20 -right-6', delay: '0.4s', speed: '6s' },
  { name: 'TypeScript', emoji: '📘', pos: 'top-44 -left-8', delay: '0.8s', speed: '5.5s' },
  { name: '.NET / C#', emoji: '🟣', pos: 'bottom-32 -right-8', delay: '1.2s', speed: '6.5s' },
  { name: 'Node.js', emoji: '🟢', pos: 'bottom-16 -left-6', delay: '1.6s', speed: '5.8s' },
  { name: 'AWS Cloud', emoji: '☁️', pos: 'bottom-2 right-4', delay: '2.0s', speed: '6.2s' },
  { name: 'PostgreSQL', emoji: '🐘', pos: '-top-6 left-28', delay: '2.4s', speed: '5.2s' },
  { name: 'Docker', emoji: '🐳', pos: '-bottom-6 left-24', delay: '2.8s', speed: '6s' },
]

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const avatarCardRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 })

  const profileImages = [
    { src: '/assets/images/profile-1.webp', srcSet: '/assets/images/profile-1-420w.webp 420w, /assets/images/profile-1-840w.webp 840w', alt: `${profile.name} — Professional Portrait 1`, label: 'Portrait 1' },
    { src: '/assets/images/profile-2.webp', srcSet: '/assets/images/profile-2-420w.webp 420w, /assets/images/profile-2-840w.webp 840w', alt: `${profile.name} — Professional Portrait 2`, label: 'Portrait 2' },
  ]

  // Particle Canvas Background — deferred 1.5s after mount so it doesn't
  // compete with React hydration and initial paint (reduces TBT on Lighthouse).
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animationFrameId: number
    let timeoutId: ReturnType<typeof setTimeout>
    let width = 0
    let height = 0
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []
    let mouse = { x: -1000, y: -1000 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const render = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const distSq = dx * dx + dy * dy
        if (distSq < 12000) {
          const dist = Math.sqrt(distSq)
          const force = (110 - dist) / 110
          p.x -= dx * force * 0.015
          p.y -= dy * force * 0.015
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const ldx = p.x - p2.x
          const ldy = p.y - p2.y
          const ldistSq = ldx * ldx + ldy * ldy

          if (ldistSq < 8000) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#818cf8'
            ctx.globalAlpha = (1 - Math.sqrt(ldistSq) / 90) * 0.05
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(() => render(ctx))
    }

    // Defer startup by 1.5s — keeps the main thread free during hydration
    timeoutId = setTimeout(() => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight

      const count = Math.min(40, Math.floor(window.innerWidth / 30))
      const colors = ['#ffffff', '#c7d2fe', '#818cf8', '#a5b4fc', '#93c5fd']

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.35 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('resize', handleResize)

      render(ctx)
    }, 1500)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 3D Parallax Tilt for Avatar Card — batched via RAF to avoid forced reflow
  const rafId = useRef<number>(0)
  const rectCache = useRef({ left: 0, top: 0, width: 0, height: 0 })

  const handleCardMouseEnter = () => {
    const card = avatarCardRef.current
    if (card) {
      const rect = card.getBoundingClientRect()
      rectCache.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
    }
  }

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafId.current) return
    rafId.current = requestAnimationFrame(() => {
      const rect = rectCache.current
      if (rect.width === 0) { rafId.current = 0; return }
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const tiltX = (y - 0.5) * -14
      const tiltY = (x - 0.5) * 14
      setTilt({ x: tiltX, y: tiltY })
      setGlare({ x: x * 100, y: y * 100, opacity: 0.25 })
      rafId.current = 0
    })
  }

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  const toggleProfileImage = () => {
    playClick()
    setActiveImageIndex((prev) => (prev === 0 ? 1 : 0))
  }

  const scrollTo = (id: string) => {
    playClick()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-45"
      />

      {/* Subtle Obsidian Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-purple-600/8 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 my-auto">
        <div className="grid md:grid-cols-12 items-center gap-8 md:gap-6 lg:gap-12">
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Beacon Tag */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#10131d]/90 border border-indigo-500/25 mb-6 backdrop-blur-md hover:border-indigo-400/50 transition-colors shadow-lg shadow-black/40"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-indigo-300 uppercase font-semibold">
                Available for Global Roles &amp; Freelance
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4"
            >
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] font-heading text-white">
                Hi, I&apos;m <span className="text-white">Asif Uddin</span>
                <br />
                <span className="text-indigo-200">
                  Ahmed Hemel
                </span>
              </h1>
            </motion.div>

            {/* Role Monospace Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[2px] bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.2em] text-indigo-300 font-semibold uppercase">
                Senior Full-Stack Software Engineer &amp; Architect
              </span>
            </motion.div>

            {/* Subtitle Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl mb-8 font-sans"
            >
              Engineering robust, high-throughput digital systems with{' '}
              <strong className="text-white font-semibold">{profile.yearsOfExperience}+ years</strong> of proven excellence.
              Specialized in migrating and architecting enterprise banking platforms across{' '}
              <strong className="text-white font-semibold">300+ branches</strong>, delivering{' '}
              <strong className="text-white font-semibold">+200% performance</strong> improvements with{' '}
              <span className="text-indigo-200">React, Angular, Next.js, .NET Core, AWS &amp; AI integration</span>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
            >
              {/* Primary Action — Glowing Indigo Button */}
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('projects')
                }}
                onMouseEnter={() => playHover()}
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] hover:scale-105 transition-all text-xs uppercase tracking-widest font-mono cursor-pointer border border-indigo-400/40"
              >
                <span className="relative z-10">Explore Projects</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary Action — Dark Obsidian Glass */}
              <a
                href={profile.resumeUrl}
                download
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="inline-flex items-center justify-center gap-2.5 font-semibold bg-[#10131d]/90 border border-indigo-500/25 text-slate-200 px-7 py-4 rounded-full hover:border-indigo-400 hover:text-white hover:bg-[#161a28]/90 hover:scale-102 transition-all text-xs font-mono tracking-widest uppercase cursor-pointer group shadow-md"
              >
                <Download className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </a>

              {/* Get in Touch CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('contact')
                }}
                onMouseEnter={() => playHover()}
                className="inline-flex items-center justify-center gap-2 font-medium text-slate-400 hover:text-white px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contact</span>
              </a>
            </motion.div>

            {/* Counter Stats Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-indigo-500/20 w-full mb-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <div className="text-2xl sm:text-3xl font-black font-heading text-white flex items-baseline tracking-tight">
                    <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                    <span className="text-indigo-300 font-normal ml-0.5">{stat.suffix}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Social Icons Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="text-[10px] font-mono text-indigo-300 mr-2 uppercase tracking-widest">// SOCIAL</span>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className="p-2.5 rounded-xl bg-[#0c1228]/80 border border-indigo-500/25 text-slate-300 hover:text-white hover:border-indigo-400 hover:-translate-y-0.5 transition-all shadow-sm"
                  aria-label={link.name}
                >
                  {socialIconMap[link.icon]}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: High-Res 3D Avatar Card & Floating Badges (5 cols) */}
          <div className="md:col-span-5 lg:col-span-5 flex items-center justify-center relative mt-6 md:mt-0">
            {/* Outer Orbiting Ring */}
            <div className="absolute w-[440px] h-[440px] sm:w-[520px] sm:h-[520px] rounded-full border border-dashed border-indigo-500/15 pointer-events-none animate-[spin_40s_linear_infinite]" />

            {/* Floating Tech Badges */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none z-20">
              {TECH_BADGES.map((badge) => (
                <div
                  key={badge.name}
                  className={`absolute ${badge.pos} pointer-events-auto`}
                  style={{
                    animation: `floatBadge ${badge.speed} ease-in-out infinite`,
                    animationDelay: badge.delay,
                  }}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10131d]/95 border border-indigo-500/25 backdrop-blur-md shadow-xl shadow-black/50 hover:border-indigo-400 hover:scale-105 transition-all cursor-default group">
                    <span className="text-xs">{badge.emoji}</span>
                    <span className="text-[11px] font-mono font-medium text-slate-300 group-hover:text-white">
                      {badge.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive 3D Tilt Card Frame — Expanded & Uncropped */}
            <div
              ref={avatarCardRef}
              onMouseEnter={handleCardMouseEnter}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative w-[340px] sm:w-[400px] lg:w-[420px] h-[500px] sm:h-[560px] lg:h-[580px] rounded-3xl cursor-pointer select-none group z-10"
              style={{ perspective: 1000 }}
            >
              {/* Subtle Back Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-indigo-600/15 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* 3D Transform Container */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-[#0b0d13] shadow-2xl shadow-black/90 transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01, 1.01, 1.01)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Profile Image with Maximum Fidelity — Uncropped Framing */}
                <div className="relative w-full h-full overflow-hidden bg-[#090b10]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: activeImageIndex === 0 ? 1 : 0, scale: 1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: activeImageIndex === 0 ? 0 : 0.35, ease: 'easeInOut' }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={profileImages[activeImageIndex].src}
                        alt={profileImages[activeImageIndex].alt}
                        fill
                        priority
                        quality={80}
                        fetchPriority="high"
                        className="object-cover object-[center_12%]"
                        sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 420px"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-transparent to-transparent opacity-90 pointer-events-none" />
                </div>

                {/* Glare Lighting Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-200 z-20"
                  style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(129,140,248,${glare.opacity}), transparent 60%)`,
                  }}
                />

                {/* Interactive Image Switcher Overlay */}
                <div
                  className="absolute top-4 right-4 z-30"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleProfileImage()
                    }}
                    onMouseEnter={() => playHover()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b0d13]/85 border border-indigo-500/30 backdrop-blur-md text-slate-200 text-xs font-mono hover:border-indigo-400 hover:text-white transition-all shadow-lg"
                    title="Switch profile view"
                  >
                    <RefreshCw className="w-3 h-3 text-indigo-400" />
                    <span>{activeImageIndex === 0 ? 'Look 2' : 'Look 1'}</span>
                  </button>
                </div>

                {/* Card Footer Info */}
                <div
                  className="absolute bottom-0 inset-x-0 p-5 z-30 flex flex-col gap-1.5"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-white text-base tracking-tight">
                      {profile.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10131d]/95 border border-indigo-500/25 text-[10px] font-mono text-indigo-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{profile.title}</span>
                    <span className="text-slate-500">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
      `}</style>
    </section>
  )
}
