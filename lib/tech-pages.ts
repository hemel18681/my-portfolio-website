export interface TechPage {
  slug: string
  role: string
  description: string
  keywords: string[]
}

export const techPages: TechPage[] = [
  {
    slug: 'react',
    role: 'React Developer',
    description: 'Expert freelance React developer for building interactive, high-performance web applications.',
    keywords: ['React', 'React.js', 'Frontend Developer', 'Freelance React Developer', 'Hire React Developer', 'Top React Developer Upwork', 'Fiverr React Expert']
  },
  {
    slug: 'nextjs',
    role: 'Next.js Developer',
    description: 'Hire a top-rated freelance Next.js developer for scalable, SEO-friendly SSR and SSG web applications.',
    keywords: ['Next.js', 'SSR', 'SSG', 'React Framework', 'Hire Next.js Developer', 'Top Next.js Developer Upwork']
  },
  {
    slug: 'angular',
    role: 'Angular Developer',
    description: 'Senior freelance Angular developer for enterprise-grade applications and robust architectures.',
    keywords: ['Angular', 'TypeScript', 'Frontend', 'Hire Angular Developer', 'Freelance Angular Expert']
  },
  {
    slug: 'nodejs',
    role: 'Node.js Developer',
    description: 'Specialized freelance Node.js developer for fast, scalable backend systems and APIs.',
    keywords: ['Node.js', 'Backend', 'Express', 'Hire Node.js Developer', 'Top Node.js Freelancer']
  },
  {
    slug: 'dotnet',
    role: '.NET Developer',
    description: 'Enterprise freelance .NET and C# developer for secure, high-throughput backend services.',
    keywords: ['.NET', 'C#', 'ASP.NET Core', 'Hire .NET Developer', 'Top .NET Freelancer']
  },
  {
    slug: 'aws',
    role: 'AWS Cloud Engineer',
    description: 'Freelance AWS Cloud Engineer for architecting scalable serverless and microservices solutions.',
    keywords: ['AWS', 'Cloud', 'Serverless', 'Hire AWS Expert', 'Freelance Cloud Architect']
  }
]
