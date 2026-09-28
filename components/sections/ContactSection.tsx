'use client'

import { useState } from 'react'
import { profile, socialLinks } from '@/lib/data'
import { Mail, Send, Github, Linkedin, Facebook, ExternalLink, Copy, Check, MapPin, Sparkles, Terminal } from 'lucide-react'
import { playClick, playHover, playSuccess } from '@/hooks/useSound'

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  facebook: <Facebook className="w-4 h-4" />,
  upwork: <ExternalLink className="w-4 h-4" />,
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    playSuccess()
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative mb-24">
      {/* Background glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-purple-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10131d] border border-indigo-500/20 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-3">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>// LET&apos;S CONNECT &amp; BUILD</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">
              Initiate Contact
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md font-sans">
            Have an enterprise product to build, architecture to scale, or looking to hire for a senior role? Let&apos;s talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left — Contact form (7 cols) */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              playClick()
              const form = e.target as HTMLFormElement
              const name = (form.elements.namedItem('name') as HTMLInputElement).value
              const email = (form.elements.namedItem('email') as HTMLInputElement).value
              const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value
              const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`)
              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
              window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`)
            }}
            className="lg:col-span-7 p-6 md:p-8 rounded-3xl glass border shadow-2xl shadow-black/60 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Your Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0d13] border border-white/15 text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none transition-colors text-sm"
                  placeholder="e.g. Alex Morgan"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Your Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0d13] border border-white/15 text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none transition-colors text-sm"
                  placeholder="alex@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-[#0b0d13] border border-white/15 text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none transition-colors text-sm resize-none font-sans"
                placeholder="Tell me about your project scope, timeline, and tech stack..."
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => playHover()}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest font-mono shadow-lg shadow-indigo-600/30 border border-indigo-400/40 hover:scale-[1.01] transition-all group cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              <span>Send Direct Message</span>
            </button>
          </form>

          {/* Right — Info & Socials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl glass border hover:border-indigo-400/40 transition-all shadow-md">
              <div className="p-3 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/25 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-0.5">Direct Email</div>
                <div className="text-white font-mono text-sm truncate">{profile.email}</div>
              </div>
              <button
                onClick={copyEmail}
                className="p-2.5 rounded-lg hover:bg-indigo-950/50 transition-colors text-slate-400 hover:text-white cursor-pointer"
                aria-label="Copy email address"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl glass border shadow-md">
              <div className="p-3 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/25 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-0.5">Based In</div>
                <div className="text-white font-medium text-sm">{profile.location} (Open to Global Remote)</div>
              </div>
            </div>

            {/* Availability pill */}
            <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3.5 shadow-md">
              <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white mb-1">Available for Contract &amp; Full-Time</div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Currently taking on select engineering architecture consulting and senior development engagements worldwide.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 mb-3">
                Connect Across Platforms
              </div>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="p-3.5 rounded-xl glass border text-slate-300 hover:text-white hover:border-indigo-400 hover:-translate-y-0.5 transition-all shadow-sm"
                    aria-label={link.name}
                  >
                    {socialIconMap[link.icon]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
