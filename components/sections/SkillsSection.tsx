'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { skills } from '@/lib/data'
import { Cpu, Server, Cloud, Database, Layers, Terminal, ChevronDown, Check } from 'lucide-react'
import {
  SiReact,
  SiAngular,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiDotnet,
  SiGraphql,
  SiDocker,
  SiGithubactions,
  SiFirebase,
  SiVercel,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
} from 'react-icons/si'
import { TbSql, TbBrandDatabricks, TbBrandCSharp, TbServerless } from 'react-icons/tb'
import { GiServerRack, GiShoppingCart } from 'react-icons/gi'
import { VscCode } from 'react-icons/vsc'
import { FaAws } from 'react-icons/fa'
import { playClick, playHover } from '@/hooks/useSound'

type CategoryKey = 'all' | 'frontend' | 'backend' | 'cloud' | 'databases'

const categoryIcons: Record<string, React.ReactNode> = {
  all: <Layers className="w-5 h-5 text-indigo-400" />,
  frontend: <Cpu className="w-5 h-5 text-cyan-400" />,
  backend: <Server className="w-5 h-5 text-purple-400" />,
  cloud: <Cloud className="w-5 h-5 text-amber-400" />,
  databases: <Database className="w-5 h-5 text-emerald-400" />,
}

const allTools = Object.entries(skills).flatMap(([catKey, category]) =>
  category.items.map((item) => ({
    ...item,
    catKey,
    categoryLabel: category.label,
  }))
)

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<CategoryKey>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const categories: Array<{ id: CategoryKey; label: string; count: number }> = [
    { id: 'all', label: 'All Technologies', count: allTools.length },
    ...Object.entries(skills).map(([key, cat]) => ({
      id: key as CategoryKey,
      label: cat.label,
      count: cat.items.length,
    })),
  ]

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0]

  const filteredTools =
    activeTab === 'all'
      ? allTools
      : allTools.filter((tool) => tool.catKey === activeTab)

  const handleTabChange = (tab: CategoryKey) => {
    playClick()
    setActiveTab(tab)
    setIsDropdownOpen(false)
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
    <section id="skills" className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-purple-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10131d] border border-indigo-500/20 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-3">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>// TECH STACK &amp; MASTERY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">
              Tools &amp; Technologies
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md font-sans">
            Curated collection of languages, frameworks, cloud infrastructures, and database architectures used to build high-scale production systems.
          </p>
        </div>

        {/* Desktop Category Tabs (hidden on mobile) */}
        <div className="hidden md:flex flex-wrap items-center gap-2 mb-10 p-1.5 rounded-2xl bg-[#10131d]/90 border border-indigo-500/20 w-fit backdrop-blur-md">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {categoryIcons[cat.id]}
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-indigo-700/80 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {cat.count}
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
              setIsDropdownOpen((prev) => !prev)
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#10131d]/95 border border-indigo-500/25 text-white shadow-xl backdrop-blur-xl active:scale-[0.99] transition-all cursor-pointer"
            aria-expanded={isDropdownOpen}
            aria-label="Filter technologies"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/30">
                {categoryIcons[activeTab]}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Select Category</span>
                <span className="text-sm font-bold font-heading text-white flex items-center gap-2">
                  {currentCategory.label}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                    {currentCategory.count}
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
                className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-[#10131d] border border-white/15 shadow-2xl shadow-black/90 z-50 backdrop-blur-2xl space-y-1"
              >
                {categories.map((cat) => {
                  const isSelected = activeTab === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleTabChange(cat.id)}
                      className={`flex w-full items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/60'
                          : 'text-slate-200 hover:text-white hover:bg-[#0b0d13]'
                      }`}
                      title={cat.label}
                      aria-label={cat.label}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg ${isSelected ? 'bg-indigo-700/80 text-white' : 'bg-[#161a28] border border-white/10'}`}>
                          {categoryIcons[cat.id]}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-mono uppercase tracking-wider truncate">{cat.label}</span>
                          <span className={`text-[11px] ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                            {cat.count} {cat.count === 1 ? 'Technology' : 'Technologies'}
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

        {/* Tools Grid: On mobile, only icons are shown; on desktop full item with name, level, category */}
        <motion.div
          layout
          className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                layout
                key={tool.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => playHover()}
                title={`${tool.name} (${tool.level}%)`}
                className="flex items-center justify-center sm:justify-start p-3 sm:p-4 border border-indigo-500/15 rounded-2xl bg-[#10131d] hover:bg-[#161a28] hover:border-indigo-500/35 transition-all duration-200 group cursor-default shadow-lg shadow-black/40"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 flex items-center justify-center bg-[#0b0d13] border border-indigo-500/20 p-2.5 rounded-xl flex-shrink-0 group-hover:scale-105 group-hover:border-indigo-400/40 transition-all shadow-inner">
                  {getToolIcon(tool.name)}
                </div>

                {/* Desktop: full details (hidden on mobile) */}
                <div className="hidden sm:flex flex-col overflow-hidden flex-1 min-w-0 ml-3.5">
                  <div className="truncate">
                    <span className="text-sm font-semibold block text-white group-hover:text-indigo-200 transition-colors">
                      {tool.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-slate-400 truncate font-mono">
                      {tool.categoryLabel}
                    </p>
                    <span className="text-slate-600 text-[10px]">•</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-medium">
                      {tool.level}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function getToolIcon(name: string): React.ReactNode {
  const map: Record<string, React.ReactNode> = {
    'React / Next.js': <SiReact className="w-6 h-6 text-[#61DAFB]" role="img" aria-label="React" />,
    'Angular / RxJS': <SiAngular className="w-6 h-6 text-[#DD0031]" role="img" aria-label="Angular" />,
    'TypeScript': <SiTypescript className="w-6 h-6 text-[#3178C6]" role="img" aria-label="TypeScript" />,
    'Tailwind CSS': <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" role="img" aria-label="Tailwind CSS" />,
    'HTML5 / CSS3': <SiHtml5 className="w-6 h-6 text-[#E34F26]" role="img" aria-label="HTML5" />,
    'JavaScript (ES6+)': <SiJavascript className="w-6 h-6 text-[#F7DF1E]" role="img" aria-label="JavaScript" />,
    'Node.js / NestJS': <SiNodedotjs className="w-6 h-6 text-[#339933]" role="img" aria-label="Node.js" />,
    '.NET / ASP.NET Core': <SiDotnet className="w-6 h-6 text-[#512BD4]" role="img" aria-label=".NET" />,
    'C# / Entity Framework': <TbBrandCSharp className="w-6 h-6 text-[#239120]" role="img" aria-label="CSharp" />,
    'REST APIs / GraphQL': <SiGraphql className="w-6 h-6 text-[#E10098]" role="img" aria-label="GraphQL" />,
    'Microservices Architecture': <GiServerRack className="w-6 h-6 text-indigo-400" role="img" aria-label="Microservices" />,
    'Medusa.js / E-commerce': <GiShoppingCart className="w-6 h-6 text-amber-400" role="img" aria-label="Ecommerce" />,
    'AWS (EC2, S3, Lambda)': <FaAws className="w-6 h-6 text-[#FF9900]" role="img" aria-label="AWS" />,
    'Docker / Containers': <SiDocker className="w-6 h-6 text-[#2496ED]" role="img" aria-label="Docker" />,
    'CI/CD Pipelines': <SiGithubactions className="w-6 h-6 text-[#2088FF]" role="img" aria-label="CI/CD" />,
    'Serverless Architecture': <TbServerless className="w-6 h-6 text-[#FF9900]" role="img" aria-label="Serverless" />,
    'Firebase': <SiFirebase className="w-6 h-6 text-[#FFCA28]" role="img" aria-label="Firebase" />,
    'Vercel / Netlify': <SiVercel className="w-6 h-6 text-white" role="img" aria-label="Vercel" />,
    'PostgreSQL': <SiPostgresql className="w-6 h-6 text-[#336791]" role="img" aria-label="PostgreSQL" />,
    'MongoDB / NoSQL': <SiMongodb className="w-6 h-6 text-[#47A248]" role="img" aria-label="MongoDB" />,
    'MySQL / MariaDB': <SiMysql className="w-6 h-6 text-[#4479A1]" role="img" aria-label="MySQL" />,
    'Redis / Caching': <SiRedis className="w-6 h-6 text-[#DC382D]" role="img" aria-label="Redis" />,
    'Data Modeling': <TbBrandDatabricks className="w-6 h-6 text-emerald-400" role="img" aria-label="Databricks" />,
    'Query Optimization': <TbSql className="w-6 h-6 text-cyan-400" role="img" aria-label="SQL" />,
  }
  return map[name] || <VscCode className="w-6 h-6 text-indigo-400" role="img" aria-label="Code" />
}
