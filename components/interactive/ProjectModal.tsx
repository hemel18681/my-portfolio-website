'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  tech: string[]
  image: string
  metrics?: Record<string, string | undefined>
  liveUrl?: string
  githubUrl?: string
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-[#050711]/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-8 lg:inset-16 z-[9999] bg-[#0c1228] rounded-3xl overflow-hidden border border-indigo-500/30 shadow-2xl shadow-black/90 flex flex-col"
          >
            {/* Header */}
            <div className="relative h-64 sm:h-80 flex-shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1228] via-[#0c1228]/60 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#080b18]/80 backdrop-blur-md text-white hover:bg-indigo-600 transition-colors z-10 border border-indigo-500/30 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Links */}
              <div className="flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/40 transition-all font-mono uppercase tracking-wider"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#080b18] border border-indigo-500/30 text-white text-sm font-medium hover:border-indigo-400 transition-colors font-mono uppercase tracking-wider"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed text-base font-sans">
                {project.fullDescription}
              </p>

              {/* Metrics */}
              {project.metrics && (
                <div>
                  <h3 className="font-heading text-xs font-mono uppercase tracking-widest text-indigo-300 mb-3">
                    // KEY METRICS &amp; IMPACT
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-3.5 rounded-xl bg-[#080b18]/80 border border-indigo-500/20"
                      >
                        <div className="text-emerald-400 font-heading text-xl font-black">
                          {value}
                        </div>
                        <div className="text-slate-400 text-[10px] font-mono uppercase tracking-wider mt-0.5">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h3 className="font-heading text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                  // TECHNOLOGIES USED
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg bg-[#080b18] text-indigo-200 border border-indigo-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
