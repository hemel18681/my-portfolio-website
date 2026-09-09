'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { testimonials } from '@/lib/data'
import { Star, ChevronLeft, ChevronRight, Quote, Terminal } from 'lucide-react'
import Image from 'next/image'
import { playClick } from '@/hooks/useSound'

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = useCallback(() => {
    playClick()
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    playClick()
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const currentTestimonial = testimonials[current]

  return (
    <section id="reviews" className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10131d] border border-indigo-500/20 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-3 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>// ENDORSEMENTS &amp; FEEDBACK</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">
            Client &amp; Peer Reviews
          </h2>
        </div>
        <p className="text-sm md:text-base text-slate-400 max-w-md font-sans">
          Feedback from clients, tech leads, engineering directors, and project collaborators across global engagements.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-3xl mx-auto w-full flex flex-col items-center">
        <div className="w-full relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 30 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full p-6 sm:p-8 md:p-10 rounded-3xl glass border border-indigo-500/20 text-center shadow-2xl shadow-black/50 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-indigo-500/40 mx-auto mb-4" />
                <p className="text-slate-200 leading-relaxed text-base md:text-lg italic mb-6 font-sans">
                  &ldquo;{currentTestimonial.text}&rdquo;
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1.5 mb-4">
                  {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-indigo-500/30 flex-shrink-0">
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white font-heading">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-xs text-indigo-300 font-mono">
                      {currentTestimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-3 rounded-xl glass border hover:border-indigo-400/50 transition-all text-indigo-300 hover:text-white cursor-pointer shadow-md"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  playClick()
                  setDirection(i > current ? 1 : -1)
                  setCurrent(i)
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === current
                    ? 'bg-indigo-500 w-8 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                    : 'bg-indigo-950/80 w-2 hover:bg-indigo-800'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-xl glass border hover:border-indigo-400/50 transition-all text-indigo-300 hover:text-white cursor-pointer shadow-md"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
