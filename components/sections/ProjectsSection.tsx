'use client'

import { useState, useRef, useEffect } from 'react'
import ChromaGrid from '@/components/interactive/ChromaGrid'
import ProjectModal from '@/components/interactive/ProjectModal'
import { projects } from '@/lib/data'
import { Briefcase, Code, Sparkles, FolderGit2, Terminal, ChevronDown, Check, Smartphone } from 'lucide-react'
import { playClick } from '@/hooks/useSound'
import { motion, AnimatePresence } from 'motion/react'

type ProjectCategory = 'all' | 'enterprise' | 'fullstack' | 'mobile' | 'ai'

interface FilterOption {
  id: ProjectCategory
  label: string
  icon: React.ReactNode
  count: number
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [filter, setFilter] = useState<ProjectCategory>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filterOptions: FilterOption[] = [
    {
      id: 'all',
      label: 'All Work',
      icon: <FolderGit2 className="w-4 h-4 text-indigo-400" />,
      count: projects.length,
    },
    {
      id: 'enterprise',
      label: 'Enterprise & FinTech',
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      count: projects.filter((p) => p.id === 'banking-core' || p.id === 'asset-management' || p.id === 'file-management').length,
    },
    {
      id: 'fullstack',
      label: 'Full Stack & Cloud',
      icon: <Code className="w-4 h-4 text-purple-400" />,
      count: projects.filter((p) => p.id === 'social-media' || p.id === 'product-management').length,
    },
    {
      id: 'ai',
      label: 'Research & AI',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      count: projects.filter((p) => p.id === 'hostility-detection').length,
    },
    {
      id: 'mobile',
      label: 'Mobile',
      icon: <Smartphone className="w-4 h-4 text-emerald-400" />,
      count: projects.filter((p) => p.id === 'expense-tracker-mobile').length,
    },
  ]

  const currentOption = filterOptions.find((opt) => opt.id === filter) || filterOptions[0]

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true
    if (filter === 'enterprise') return p.id === 'banking-core' || p.id === 'asset-management' || p.id === 'file-management'
    if (filter === 'fullstack') return p.id === 'social-media' || p.id === 'product-management'
    if (filter === 'mobile') return p.id === 'expense-tracker-mobile'
    if (filter === 'ai') return p.id === 'hostility-detection'
    return true
  })

  const handleFilterSelect = (newFilter: ProjectCategory) => {
    playClick()
    setFilter(newFilter)
    setIsDropdownOpen(false)
  }

  const handleProjectClick = (p: typeof projects[0]) => {
    playClick()
    setSelectedProject(p)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section id="projects" className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
      {/* Section Ambient Glow */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-purple-600/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10131d] border border-indigo-500/20 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-3 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>// FEATURED WORK &amp; CASE STUDIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">
            Engineered Projects
          </h2>
        </div>
        <p className="text-sm md:text-base text-slate-400 max-w-md font-sans">
          Enterprise platforms, high-throughput microservices, interactive WebGL tools, and published AI research.
        </p>
      </div>

      {/* Desktop Filter Tabs (hidden on mobile) */}
      <div className="hidden md:flex flex-wrap items-center gap-2 mb-10 p-1.5 rounded-2xl bg-[#10131d]/90 border border-white/10 w-fit backdrop-blur-md">
        {filterOptions.map((opt) => {
          const isActive = filter === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => handleFilterSelect(opt.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-indigo-700/80 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {opt.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Mobile Cool Dropdown Filter (md:hidden) */}
      <div className="md:hidden relative mb-8" ref={dropdownRef}>
        <button
          onClick={() => {
            playClick()
            setIsDropdownOpen((prev) => !prev)}
          }
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#10131d]/95 border border-white/15 text-white shadow-xl backdrop-blur-xl active:scale-[0.99] transition-all cursor-pointer"
          aria-expanded={isDropdownOpen}
          aria-label="Filter projects"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/25">
              {currentOption.icon}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Filter By Category</span>
              <span className="text-sm font-bold font-heading text-white flex items-center gap-2">
                {currentOption.label}
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                  {currentOption.count}
                </span>
              </span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="p-1.5 rounded-lg bg-indigo-900/40 border border-indigo-500/20 text-indigo-300"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        {/* Dropdown Menu Popup */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute top-full inset-x-0 mt-2 p-2 rounded-2xl bg-[#10131d] border border-white/15 shadow-2xl shadow-black/90 z-40 backdrop-blur-2xl space-y-1"
            >
              {filterOptions.map((opt) => {
                const isSelected = filter === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleFilterSelect(opt.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                        : 'text-slate-300 hover:text-white hover:bg-indigo-950/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-700 text-white' : 'bg-[#0b0d13] text-slate-300'}`}>
                        {opt.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono uppercase tracking-wider">{opt.label}</span>
                        <span className={`text-[11px] ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {opt.count} {opt.count === 1 ? 'Project' : 'Projects'}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white flex-shrink-0" />}
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Projects ChromaGrid */}
      <div className="proyek-box">
        <ChromaGrid
          items={filteredProjects.map((p) => ({
            id: p.id,
            title: p.title,
            category:
              p.id === 'banking-core' || p.id === 'social-media' || p.id === 'asset-management' || p.id === 'file-management'
                ? 'Enterprise / Production'
                : p.id === 'hostility-detection'
                ? 'FCV Japan / Research'
                : p.id === 'expense-tracker-mobile'
                ? 'Android / Local-first'
                : 'Full Stack App',
            description: p.description,
            image: p.image,
            tech: p.tech,
            liveUrl: p.liveUrl,
            githubUrl: p.githubUrl,
            onClick: () => handleProjectClick(p),
          }))}
          columns={3}
        />
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={
          selectedProject
            ? {
                ...selectedProject,
                image: selectedProject.image || 'https://picsum.photos/seed/project/800/600',
              }
            : null
        }
        onClose={() => {
          playClick()
          setSelectedProject(null)
        }}
      />
    </section>
  )
}
