'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import AIPitchGenerator from './AIPitchGenerator'
import AIResumeAnalyzer from './AIResumeAnalyzer'
import AIProjectIdeator from './AIProjectIdeator'
import AITechQuiz from './AITechQuiz'
import { Sparkles, FileCheck, Lightbulb, Brain } from 'lucide-react'
import { playClick } from '@/hooks/useSound'

const tools = [
  { id: 'pitch', name: 'Pitch Generator', icon: Sparkles, component: AIPitchGenerator },
  { id: 'resume', name: 'CV Validator', icon: FileCheck, component: AIResumeAnalyzer },
  { id: 'ideator', name: 'Architecture', icon: Lightbulb, component: AIProjectIdeator },
  { id: 'quiz', name: 'Tech Quiz', icon: Brain, component: AITechQuiz },
]

export default function AIToolsSuite() {
  const [active, setActive] = useState('pitch')
  const ActiveTool = tools.find((t) => t.id === active)?.component || AIPitchGenerator

  const handleToolChange = (id: string) => {
    playClick()
    setActive(id)
  }

  return (
    <div>
      {/* Tool tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = active === tool.id
          return (
            <button
              key={tool.id}
              onClick={() => handleToolChange(tool.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                  : 'bg-[#080b18] border border-indigo-500/20 text-slate-400 hover:text-white hover:bg-indigo-950/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tool.name}</span>
            </button>
          )
        })}
      </div>

      {/* Active tool */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ActiveTool />
      </motion.div>
    </div>
  )
}
