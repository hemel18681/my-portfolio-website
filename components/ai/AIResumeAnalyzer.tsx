'use client'

import { useState } from 'react'
import { generateContentStream, isGeminiConfigured } from '@/lib/gemini'
import { FileCheck, Loader2, Send } from 'lucide-react'
import OutputBox from './OutputBox'
import { playClick } from '@/hooks/useSound'

export default function AIResumeAnalyzer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!input.trim() || loading) return
    playClick()
    setLoading(true)
    setOutput('')

    const prompt = `You are an expert resume reviewer. Analyze the following resume/CV content and provide:
1. Overall score (out of 100)
2. Key strengths
3. Areas for improvement
4. Missing keywords for ATS
5. Specific recommendations

Resume Content:
${input}

Be specific, actionable, and constructive.`

    await generateContentStream(prompt, (chunk) => {
      setOutput((prev) => prev + chunk)
    })

    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FileCheck className="w-4 h-4 text-emerald-400" />
        <h3 className="font-heading text-sm font-bold text-white">CV Validator</h3>
        <ConnectionBadge />
      </div>
      <p className="text-xs text-slate-400 font-sans">
        Paste your resume content and get a detailed competency report with improvement suggestions.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        className="w-full px-4 py-3 rounded-xl bg-[#080b18] border border-indigo-500/25 text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none transition-colors text-sm resize-none font-mono"
        placeholder="Paste your resume content here..."
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {output && <OutputBox loading={loading}>{output}</OutputBox>}
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
