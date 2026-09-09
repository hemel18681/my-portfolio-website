'use client'

import { useState } from 'react'
import { generateContentStream, isGeminiConfigured } from '@/lib/gemini'
import { Brain, Loader2, Send } from 'lucide-react'
import OutputBox from './OutputBox'
import { playClick } from '@/hooks/useSound'

export default function AITechQuiz() {
  const [topic, setTopic] = useState('')
  const [quiz, setQuiz] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim() || loading) return
    playClick()
    setLoading(true)
    setQuiz('')

    const prompt = `Generate 5 multiple-choice technical interview questions about: ${topic}

Format each question as:
Q1. [Question]
A) [Option]
B) [Option]
C) [Option]
D) [Option]
Answer: [Correct Letter]
Explanation: [Brief explanation]

Make questions progressively harder. Cover both fundamentals and advanced concepts.`

    await generateContentStream(prompt, (chunk) => {
      setQuiz((prev) => prev + chunk)
    })

    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-4 h-4 text-emerald-400" />
        <h3 className="font-heading text-sm font-bold text-white">Tech Quiz</h3>
        <ConnectionBadge />
      </div>
      <p className="text-xs text-slate-400 font-sans">
        Choose a topic and test your knowledge with AI-generated technical questions.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-[#080b18] border border-indigo-500/25 text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none transition-colors text-sm font-mono"
          placeholder="e.g., React Hooks, System Design, SQL Optimization..."
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? 'Generating...' : 'Start Quiz'}
        </button>
      </div>

      {/* Quick topic chips */}
      <div className="flex flex-wrap gap-2">
        {['React', 'TypeScript', 'System Design', 'SQL', 'Node.js', 'AWS', 'Docker', 'Algorithms'].map((t) => (
          <button
            key={t}
            onClick={() => {
              playClick()
              setTopic(t)
            }}
            className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-[#080b18] border border-indigo-500/20 text-slate-300 hover:text-white hover:border-indigo-400/50 transition-colors cursor-pointer"
          >
            {t}
          </button>
        ))}
      </div>

      {quiz && <OutputBox loading={loading}>{quiz}</OutputBox>}
    </div>
  )
}

function ConnectionBadge() {
  const connected = isGeminiConfigured()
  return (
    <span
      className={`ml-auto inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest border ${
        connected
          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
          : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
      }`}
      title={connected ? 'Gemini API key detected' : 'Gemini API key not set — using offline preview'}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
      {connected ? 'Gemini Live' : 'Offline Preview'}
    </span>
  )
}
