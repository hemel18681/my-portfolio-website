'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { profile } from '@/lib/data'

/**
 * Holographic 3D tilt profile card with cursor-tracked glare overlay.
 * High-resolution rendering with lossless image fidelity.
 */
export default function ProfileCard3D() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const tiltX = (y - 0.5) * -16
    const tiltY = (x - 0.5) * 16
    setRotate({ x: tiltX, y: tiltY })
    setGlare({ x: x * 100, y: y * 100, opacity: 0.3 })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative w-64 h-80 sm:w-72 sm:h-96 cursor-pointer select-none"
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card face */}
        <div className="absolute inset-0 rounded-2xl bg-[#0e1015] border border-zinc-800 overflow-hidden shadow-2xl shadow-black/80">
          {/* Subtle holographic sheen */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{
              background: `linear-gradient(${135 + rotate.y * 2}deg,
                rgba(255,255,255,0.4),
                rgba(52,211,153,0.2),
                rgba(16,185,129,0.2))`,
            }}
          />

          {/* Profile image with lossless clarity */}
          <div className="relative h-48 sm:h-56 overflow-hidden bg-[#0a0c10]">
            <Image
              src="/assets/images/profile-1.png"
              alt={`${profile.name} — Profile`}
              fill
              unoptimized
              quality={100}
              priority
              className="object-cover object-top"
              sizes="288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-transparent opacity-90" />
          </div>

          {/* Info */}
          <div className="relative p-5 text-center" style={{ transform: 'translateZ(20px)' }}>
            <h3 className="font-heading text-lg font-bold text-white mb-1">
              {profile.name}
            </h3>
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              {profile.title}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                Available for hire
              </span>
            </div>
          </div>

          {/* Glare overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
