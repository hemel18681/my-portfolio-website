import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { SITE_URL, profile, socialLinks } from '@/lib/data'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

/* ------------------------------------------------------------------ */
/*  SEO — Metadata                                                     */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — Senior Software Engineer & Architect | React, Angular, Next.js, .NET, AWS`,
    template: `%s | ${profile.name}`,
  },
  description:
    `${profile.name} is a Senior Software Engineer & Architect with ${profile.yearsOfExperience}+ years of experience building enterprise-grade web applications and high-throughput systems. Specializing in React, Angular, Next.js, Node.js, .NET Core, AWS, Docker, PostgreSQL, and microservices architecture. Available for remote, freelance, and contract roles worldwide.`,
  keywords: [
    'Asif Uddin Ahmed Hemel',
    'Senior Software Engineer',
    'Software Architect',
    'Full Stack Developer',
    'React Developer',
    'Angular Developer',
    'Next.js Developer',
    'Node.js Developer',
    '.NET Developer',
    'ASP.NET Core',
    'TypeScript Expert',
    'JavaScript Expert',
    'C# Developer',
    'REST API Developer',
    'GraphQL Developer',
    'Microservices Architect',
    'NestJS Developer',
    'Entity Framework',
    'AWS Cloud Engineer',
    'Docker Expert',
    'CI/CD Pipeline',
    'Serverless Architecture',
    'Cloud Infrastructure',
    'PostgreSQL Expert',
    'MongoDB Developer',
    'FinTech Developer',
    'Banking Software Engineer',
    'Enterprise Application Developer',
    'SaaS Platform Developer',
    'Software Engineer Bangladesh',
    'Remote Software Engineer',
    'Hire Full Stack Developer',
    'ICPC Programmer',
    'Deep Learning Researcher',
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — Senior Software Engineer & Architect`,
    description:
      `Senior Software Engineer with ${profile.yearsOfExperience}+ years experience in React, Angular, Next.js, .NET, Node.js, AWS. Building enterprise-grade web applications and scalable cloud solutions.`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${profile.name} — Senior Software Engineer Portfolio`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Senior Software Engineer & Architect`,
    description:
      `Senior Software Engineer with ${profile.yearsOfExperience}+ years in React, Angular, Next.js, .NET, AWS. Enterprise-grade web applications.`,
    images: ['/twitter-image'],
    creator: '@hemel18681',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    'theme-color': '#080b18',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': profile.name,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080b18',
}

/* ------------------------------------------------------------------ */
/*  JSON-LD Structured Data                                            */
/* ------------------------------------------------------------------ */
const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: 'Asif Hemel',
  jobTitle: 'Senior Software Engineer & Architect',
  description: metadata.description,
  url: SITE_URL,
  image: `${SITE_URL}/assets/images/profile-1.png`,
  email: profile.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressRegion: 'Dhaka Division',
    addressCountry: 'BD',
  },
  sameAs: socialLinks.map((l) => l.url),
  knowsAbout: [
    'React', 'Angular', 'Next.js', 'Node.js', 'NestJS', '.NET', 'ASP.NET Core',
    'TypeScript', 'JavaScript', 'C#', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB',
    'Microservices Architecture', 'Serverless Architecture', 'Cloud Computing',
    'REST API Design', 'GraphQL', 'CI/CD', 'DevOps', 'Web Development',
    'Enterprise Software Development', 'SaaS Platform Development',
    'Real-time Applications', 'Performance Optimization',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'IUBAT — International University of Business Agriculture and Technology',
    url: 'https://iubat.edu',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Enosis Solutions',
  },
  award: [
    'ICPC Dhaka Regional 2020 Honorable Mention',
    'NCPC 2020 Honorable Mention',
    'Champion of IUBAT Intra University Programming Contest 2021',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: 'Bachelor\'s Degree',
      name: 'Bachelor of Science in Computer Science & Engineering',
    },
  ],
  nationality: {
    '@type': 'Country',
    name: 'Bangladesh',
  },
}

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${profile.name} — Portfolio`,
  url: SITE_URL,
  description: metadata.description,
  author: {
    '@type': 'Person',
    name: profile.name,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const jsonLdProfilePage = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: profile.name,
    jobTitle: 'Senior Software Engineer & Architect',
    url: SITE_URL,
  },
  about: {
    '@type': 'Person',
    name: profile.name,
  },
  lastReviewed: new Date().toISOString(),
}

const jsonLdExpenseTracker = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Expense Tracker Mobile',
  applicationCategory: 'Finance Application',
  operatingSystem: 'Android',
  description:
    'Local-first Android finance app for expenses, accounts, investments, loans, reports, and multi-currency tracking — built with Expo, React Native & TypeScript.',
  url: 'https://expense-tracker-mobile-portfolio.vercel.app/',
  downloadUrl: 'https://expense-tracker-mobile-portfolio.vercel.app/',
  softwareVersion: '1.0.0',
  author: {
    '@type': 'Person',
    name: 'Asif Uddin Ahmed Hemel',
    url: SITE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  keywords: [
    'Expense Tracker Android',
    'React Native Finance App',
    'Expo Mobile App',
    'Local-first Finance App',
    'Personal Finance Manager',
    'Expense Tracker App',
    'Multi-currency Tracker',
    'Expo TypeScript App',
    'Zustand State Management',
    'Android Finance App',
    'Expense Manager Mobile',
    'Budget Tracker App',
    'Financial Dashboard Mobile',
  ],
  features: [
    'Expense tracking',
    'Account management',
    'Investment tracking',
    'Loan management',
    'Multi-currency support',
    'Light/dark themes',
    'Portable JSON backup & restore',
    'On-device local-first storage',
  ],
}

/* ------------------------------------------------------------------ */
/*  Root Layout                                                         */
/* ------------------------------------------------------------------ */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Documentation" />
        <link
          rel="icon"
          href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
        />
        <meta name="msapplication-TileColor" content="#080b18" />
      </head>
      <body
        className="font-sans bg-[#080b18] text-slate-200 antialiased selection:bg-indigo-500 selection:text-white"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfilePage) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdExpenseTracker) }}
        />

        {children}
      </body>
    </html>
  )
}
