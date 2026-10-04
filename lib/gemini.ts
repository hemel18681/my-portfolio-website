/**
 * Google GenAI client with streaming and offline fallback.
 * Works seamlessly with server-side /api/gemini route, client-side key, or offline preview.
 */

import { profile } from '@/lib/data'

const CLIENT_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY || ''

export function isGeminiConfigured(): boolean {
  // If client has key or we assume server may have one
  return Boolean(CLIENT_API_KEY && CLIENT_API_KEY.trim().length > 0)
}

export async function generateContentStream(
  prompt: string,
  onChunk: (text: string) => void
): Promise<void> {
  try {
    // 1. First attempt to call the Next.js API route /api/gemini
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    if (res.ok && res.body) {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          onChunk(chunk)
        }
      }
      return
    }

    // If server returned an error (e.g. 503 NO_API_KEY or 500 error)
    if (!res.ok) {
      const errorData = await res.json().catch(() => null)
      if (errorData?.error === 'NO_API_KEY' && !CLIENT_API_KEY) {
        // Play offline stream preview
        await streamOfflineResponse(prompt, onChunk)
        return
      } else if (errorData?.message) {
        // API key error or authentication issue
        console.warn('Gemini Server Error:', errorData.message)
        await streamOfflineResponse(prompt, onChunk, true, errorData.message)
        return
      }
    }
  } catch (err: any) {
    console.warn('Gemini stream fetch error:', err)
  }

  // 2. Direct client fallback if client key exists
  if (CLIENT_API_KEY) {
    try {
      const { GoogleGenAI } = await import('@google/genai')
      const genAI = new GoogleGenAI({ apiKey: CLIENT_API_KEY })
      const response = await genAI.models.generateContentStream({
        model: 'gemini-3.6-flash',
        contents: prompt,
      })

      for await (const chunk of response) {
        if (chunk.text) {
          onChunk(chunk.text)
        }
      }
      return
    } catch (clientErr: any) {
      console.error('Gemini direct client error:', clientErr)
      await streamOfflineResponse(prompt, onChunk, true, clientErr?.message)
      return
    }
  }

  // 3. Fallback to offline preview simulation
  await streamOfflineResponse(prompt, onChunk)
}

async function streamOfflineResponse(
  prompt: string,
  onChunk: (text: string) => void,
  isError = false,
  errorMsg = ''
) {
  const response = getOfflineResponse(prompt, isError, errorMsg)
  const words = response.split(' ')
  for (let i = 0; i < words.length; i++) {
    await new Promise((r) => setTimeout(r, 15))
    onChunk((i === 0 ? '' : ' ') + words[i])
  }
}

function getOfflineResponse(prompt: string, isError = false, errorMsg = ''): string {
  const lower = prompt.toLowerCase()
  const noteSuffix = isError
    ? `\n\n---\n*⚠️ Gemini API returned an error (${errorMsg || 'Authentication failed'}). Check that your key at https://aistudio.google.com/apikey is valid and set as GOOGLE_GENAI_API_KEY in .env.local.*`
    : `\n\n---\n*📝 Offline preview. Set GOOGLE_GENAI_API_KEY in .env.local to activate real-time Gemini AI.*`

  if (lower.includes('pitch') || lower.includes('proposal') || lower.includes('job description')) {
    return `📋 **Tailored Proposal**

Based on the role requirements provided:

**Opening:**
"With ${profile.yearsOfExperience}+ years of experience in enterprise web architectures and full-stack engineering, I specialize in designing scalable systems, accelerating performance, and leading technical deliveries."

**Key Strengths for This Role:**
• **Frontend Architecture**: Expert in React, Next.js 15, and Angular with a focus on web vitals, having boosted application throughput by 200%
• **Full-Stack Mastery**: Deep expertise in Node.js, NestJS, and .NET Core microservices with clean DDD patterns
• **Cloud & Infrastructure**: AWS (EC2, Lambda, S3, RDS), Docker, and automated CI/CD deployment pipelines
• **High-Scale Impact**: Experience building banking systems serving 300+ branch networks nationwide

**Value Proposition:**
"I architect reliable, maintainable codebases from the ground up, reducing latency while ensuring zero-downtime reliability."

**Closing:**
"I'd welcome the chance to discuss how my skill set aligns with your roadmap. Looking forward to connecting!"${noteSuffix}`
  }

  if (lower.includes('resume') || lower.includes('cv') || lower.includes('validate')) {
    return `📊 **Resume Competency Report**

**Overall Score: 92/100**

**Strengths:**
✅ Strong demonstrated impact across enterprise full-stack engineering
✅ Quantified achievements (+200% speed improvement, 300+ branches deployed)
✅ Research track record (FCV 2022 Japan paper publication)
✅ Competitive programming background (ICPC, NCPC)
✅ Clear leadership in distributed architectures

**Areas for Improvement:**
⚠️ Add more recent metrics on cloud cost optimizations
⚠️ Specify automated test coverage percentages (Jest, Cypress)
⚠️ Highlight experience with GraphQL and message brokers (Kafka/RabbitMQ)

**ATS Optimization Keywords:**
• Cloud Architecture
• System Design & Scalability
• CI/CD Pipeline Automation
• Microservices Orchestration
• High-Availability Engineering

**Verdict:**
Strong senior engineering profile with great balance of enterprise delivery and technical depth.${noteSuffix}`
  }

  if (lower.includes('architecture') || lower.includes('tech stack') || lower.includes('project idea')) {
    return `🏗️ **Architecture Blueprint**

**Recommended Tech Stack:**

**Frontend:**
• Next.js 15 + React 19 + TypeScript (App Router, Server Components)
• Tailwind CSS v4 + Motion for fluid interactions

**Backend & APIs:**
• Node.js / NestJS or ASP.NET Core 9 (Modular Microservices)
• PostgreSQL + Prisma/Dapper for relational persistence
• Redis for caching and session management

**Infrastructure & DevOps:**
• AWS ECS / Lambda for elastic computing
• AWS S3 + CloudFront for global asset delivery
• Docker + GitHub Actions CI/CD pipeline

**Architecture Pattern:**
• Event-Driven Microservices with API Gateway pattern
• CQRS for high-throughput read/write separation

**Estimated MVP Timeline:** 6-8 weeks${noteSuffix}`
  }

  if (lower.includes('quiz') || lower.includes('question')) {
    return `🧠 **Technical Interview Challenge**

**Question:** In high-concurrency Node.js applications, how does the Event Loop handle CPU-intensive tasks without blocking I/O throughput?

**A)** By spawning new OS threads automatically for every async function
**B)** By delegating CPU tasks to Worker Threads or offloading to background worker queues
**C)** By running the V8 garbage collector in parallel
**D)** By using Promise.all() to parallelize CPU calculations

**Answer: B**

**Explanation:**
Node's main thread runs on a single event loop. Heavy CPU computations block this loop unless offloaded to Node Worker Threads (worker_threads), a child process, or dedicated background queue workers (e.g., BullMQ/Redis).${noteSuffix}`
  }

  return `I received your prompt. Here are the available AI tools:

1. **Matchmaker Pitch Generator** — Generate tailored job proposals
2. **CV Validator** — Analyze resumes and generate ATS competency reports
3. **Architecture Ideator** — Generate production tech stacks and architectural blueprints
4. **Tech Quiz** — Test knowledge with interactive multi-level challenges${noteSuffix}`
}
