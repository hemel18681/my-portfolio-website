import { profile, socialLinks } from '@/lib/data'
import { services } from '@/lib/seo'
import { techPages } from '@/lib/tech-pages'
import Link from 'next/link'
import { Briefcase, ArrowUpRight } from 'lucide-react'

/**
 * Services section.
 *
 * Intentionally rendered WITHOUT LazySection/Reveal so the full text is present in the
 * server-rendered HTML. Googlebot's first pass and AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot...) generally do not execute IntersectionObserver-driven content.
 */
export default function HireSection() {
  const upwork = socialLinks.find((l) => l.name === 'Upwork')

  return (
    <section
      id="hire"
      aria-labelledby="hire-heading"
      className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 900px' }}
    >
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10131d] border border-indigo-500/20 text-xs font-mono uppercase tracking-widest text-indigo-300 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          <span>// HIRE ME &amp; SERVICES</span>
        </div>
        <h2
          id="hire-heading"
          className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight"
        >
          Hire a Freelance Full-Stack Developer
        </h2>
        <p className="mt-4 text-slate-400 leading-relaxed">
          I&apos;m {profile.name}, known professionally as Asif Hemel (Asif Uddin Ahmed Hemel), a senior software engineer in {profile.location} available for freelance,
          contract and remote roles worldwide. I build React, Next.js and Angular front ends,
          Node.js / NestJS / .NET back ends, and AWS-hosted systems for startups and enterprises.
        </p>

        <nav aria-label="Hire by technology" className="mt-6">
          <p className="text-sm text-slate-400 mb-3">Hire by technology:</p>
          <ul className="flex flex-wrap gap-2 list-none p-0">
            {techPages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/hire/${p.slug}`}
                  className="inline-block px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-slate-200 hover:border-indigo-400/50 hover:text-indigo-200 transition-colors"
                >
                  {p.role}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {services.map((s) => (
            <li
              key={s.id}
              className="rounded-2xl border border-white/10 bg-[#0e1119] p-6 transition-colors hover:border-indigo-400/40"
            >
              <h3 className="text-lg font-bold font-heading text-white">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.description}</p>
              <p className="mt-4 flex flex-wrap gap-2">
                {s.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-200"
                  >
                    {t}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-colors"
          >
            Start a project <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
          {upwork && (
            <a
              href={upwork.url}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-slate-200 text-sm font-semibold hover:border-emerald-400/50 transition-colors"
            >
              Hire me on Upwork <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
