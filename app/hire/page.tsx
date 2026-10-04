import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, profile } from '@/lib/data'
import { techPages } from '@/lib/tech-pages'

const base = SITE_URL.replace(/\/$/, '')

export const metadata: Metadata = {
  title: { absolute: 'Hire Asif Hemel \u2014 Freelance Developer by Technology' },
  description:
    'Hire Asif Uddin Ahmed Hemel for freelance React, Next.js, Angular, Node.js, .NET, AWS, TypeScript, PostgreSQL, React Native, microservices and AI projects.',
  alternates: { canonical: `${base}/hire` },
}

export default function HireIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Freelance development services by Asif Uddin Ahmed Hemel',
    itemListElement: techPages.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Freelance ${p.role}`,
      url: `${base}/hire/${p.slug}`,
    })),
  }

  return (
    <main className="min-h-screen px-6 sm:px-10 lg:px-16 py-16 md:py-24 max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-sm font-mono text-slate-400 mb-8">
        <Link href="/" className="hover:text-indigo-300">{profile.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">Hire</span>
      </nav>
      <h1 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight">
        Hire Asif Hemel by Technology
      </h1>
      <p className="mt-6 text-lg text-slate-300 max-w-3xl leading-relaxed">
        {profile.name} is a senior freelance software engineer from {profile.location}. Pick the technology you
        need to see relevant experience and how to get started.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 list-none p-0">
        {techPages.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/hire/${p.slug}`}
              className="block h-full rounded-2xl border border-white/10 bg-[#0e1119] p-5 hover:border-indigo-400/50 transition-colors"
            >
              <h2 className="text-lg font-bold font-heading text-white">Freelance {p.role}</h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
