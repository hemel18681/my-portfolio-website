/**
 * Central SEO / GEO (Generative Engine Optimization) content.
 *
 * Single source of truth used by:
 *  - app/layout.tsx          (keywords + JSON-LD)
 *  - components/sections/HireSection.tsx (visible, crawlable HTML)
 *
 * Keep everything here factual — search engines and AI assistants
 * cross-check structured data against visible page content.
 */

export interface Service {
  id: string
  name: string
  description: string
  tech: string[]
}

export const services: Service[] = [
  {
    id: 'frontend-development',
    name: 'React, Next.js & Angular Web Development',
    description:
      'Production-grade front ends with React, Next.js (App Router, SSR/SSG) and Angular (RxJS, NgRx, Signals): dashboards, SaaS products, portfolios and enterprise UIs with strong Core Web Vitals.',
    tech: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'backend-api-development',
    name: 'Backend & API Development (Node.js, NestJS, .NET)',
    description:
      'Secure, scalable REST and GraphQL APIs and microservices using Node.js, NestJS, ASP.NET Core and C#, backed by PostgreSQL, MongoDB, MySQL and Redis.',
    tech: ['Node.js', 'NestJS', '.NET', 'C#', 'GraphQL', 'PostgreSQL'],
  },
  {
    id: 'full-stack-saas',
    name: 'Full-Stack MVP & SaaS Development',
    description:
      'End-to-end delivery of MVPs and SaaS platforms: architecture, database design, authentication, payments, e-commerce (Medusa.js) and deployment.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Medusa.js', 'Vercel'],
  },
  {
    id: 'cloud-devops',
    name: 'Cloud, AWS & DevOps',
    description:
      'AWS infrastructure (EC2, S3, Lambda, CloudFront, RDS), Docker containers, serverless architecture and CI/CD pipelines with GitHub Actions.',
    tech: ['AWS', 'Docker', 'CI/CD', 'Serverless', 'Netlify', 'Vercel'],
  },
  {
    id: 'modernization-performance',
    name: 'Legacy Modernization & Performance Optimization',
    description:
      'Angular/framework upgrades, SQL-to-NoSQL migrations, query optimization and caching. Delivered measurable gains such as a 70% faster response time and a 200%+ performance boost on banking software used across 300+ branches.',
    tech: ['Angular', 'NgRx', 'SQL', 'NoSQL', 'Redis'],
  },
  {
    id: 'ai-integration',
    name: 'AI-Powered Features (Gemini & LLM Integration)',
    description:
      'Adding AI features to web apps with Google Gemini and other LLM APIs: assistants, content tools and NLP pipelines.',
    tech: ['Google Gemini', 'LLM APIs', 'Python', 'Next.js'],
  },
]

/**
 * Long-tail, intent-based keywords. These are secondary signals —
 * the real ranking value comes from the visible copy in HireSection
 * and from the structured data in layout.tsx.
 */
export const hireKeywords = [
  'Hire React Developer',
  'Hire Next.js Developer',
  'Hire Angular Developer',
  'Hire Node.js Developer',
  'Hire .NET Developer',
  'Freelance Full Stack Developer',
  'Freelance React Developer',
  'Freelance Next.js Developer',
  'Upwork Full Stack Developer',
  'Remote Full Stack Developer Bangladesh',
  'Full Stack Developer for Hire',
  'SaaS MVP Developer',
  'AWS Cloud Developer Freelance',
  'Freelance Software Engineer Dhaka',
  'Bangladeshi Freelance Web Developer',
]
