import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { techPages } from '@/lib/tech-pages'
import { SITE_URL, profile } from '@/lib/data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return techPages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const tech = techPages.find((p) => p.slug === resolvedParams.slug)
  
  if (!tech) {
    return {}
  }

  const title = `Hire Top ${tech.role} Freelancer | ${profile.name}`
  const description = `${tech.description} Hire top-rated freelancer ${profile.name} on Upwork, Fiverr, or directly.`
  const url = `${SITE_URL}/hire/${tech.slug}`

  return {
    title,
    description,
    keywords: [...tech.keywords, 'Freelance', 'Upwork', 'Fiverr', profile.name],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
  }
}

export default async function TechHirePage({ params }: PageProps) {
  const resolvedParams = await params
  const tech = techPages.find((p) => p.slug === resolvedParams.slug)

  if (!tech) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Hire ${tech.role} - ${profile.name}`,
    description: tech.description,
    url: `${SITE_URL}/hire/${tech.slug}`,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: tech.role,
      url: SITE_URL,
    },
  }

  return (
    <main className="min-h-screen px-6 sm:px-10 lg:px-16 py-16 md:py-24 max-w-5xl mx-auto flex flex-col items-center text-center">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-sm font-mono text-slate-400 mb-8 w-full text-left">
        <Link href="/" className="hover:text-indigo-300">{profile.name}</Link>
        <span className="mx-2">/</span>
        <Link href="/hire" className="hover:text-indigo-300">Hire</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">{tech.slug}</span>
      </nav>

      <h1 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight">
        Looking for a Top <span className="text-indigo-400">{tech.role}</span>?
      </h1>
      
      <p className="mt-8 text-xl text-slate-300 max-w-3xl leading-relaxed">
        {tech.description} I am {profile.name}, a highly rated senior software engineer available for 
        freelance work on Upwork, Fiverr, or directly. 
      </p>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Link 
          href="/#contact"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all font-mono tracking-wider uppercase text-sm"
        >
          Contact Me Directly
        </Link>
        <Link 
          href="/#projects"
          className="bg-[#10131d] border border-indigo-500/30 text-white font-bold py-4 px-8 rounded-full hover:bg-indigo-600/10 transition-all font-mono tracking-wider uppercase text-sm"
        >
          View My Work
        </Link>
      </div>
    </main>
  )
}
