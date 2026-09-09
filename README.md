# Asif Uddin Ahmed Hemel — Portfolio

Personal portfolio of **Asif Uddin Ahmed Hemel**, Senior Software Engineer (4.5+ years). The site presents professional experience, projects, skills, and an AI tools suite.

**Live:** [asifhemel.dev](https://asifhemel.dev) · **GitHub:** [hemel18681](https://github.com/hemel18681)

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Three.js, React Three Fiber, Rapier (3D lanyard)
- GSAP and Motion
- Google Gemini (`@google/genai`) for the AI tools API

## What’s on the site

| Section | Contents |
| --- | --- |
| Hero / About | Profile, stats, and intro |
| Skills | Frontend, backend, cloud, and databases |
| Experience | Enosis Solutions (Senior + Software Engineer) and Implevista, aligned with the current resume |
| Projects | Banking, social, asset/file management, and other work |
| Achievements | Awards, contests, and research |
| AI Tools | Gemini-powered helpers with an offline fallback when no API key is set |
| Contact | Email and social links |

Content lives in `lib/data.ts`. Update that file to change roles, projects, or contact details without rewriting layout components.

## Getting started

**Requirements:** Node.js 18+

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional Gemini key (from [Google AI Studio](https://aistudio.google.com/apikey)):

```env
GOOGLE_GENAI_API_KEY=your_key_here
```

Without a key, the rest of the site still works; AI tools return a “not configured” response.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build (`output: 'standalone'`) |
| `npm start` | Serve the production build |
| `npm run type-check` | TypeScript check |

## Project layout

```
app/                 # App Router pages, layout, Gemini API route
components/          # Sections, layout, 3D, and UI
lib/data.ts          # Profile, experience, projects, skills
public/              # Images, resume, static assets
```

## License

Private personal portfolio. All rights reserved.
