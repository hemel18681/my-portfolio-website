'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// All components are dynamically imported to minimise the initial JS payload
// and eliminate main-thread blocking on first paint.
const Preloader = dynamic(() => import('@/components/interactive/Preloader'))
const Navbar = dynamic(() => import('@/components/layout/Navbar'))
const Footer = dynamic(() => import('@/components/layout/Footer'))
const BackToTop = dynamic(() => import('@/components/ui/BackToTop'))

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'))
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'))
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection'))
const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'))
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'))
const AchievementsSection = dynamic(() => import('@/components/sections/AchievementsSection'))
const AIToolsSection = dynamic(() => import('@/components/sections/AIToolsSection'))
const ReviewsSection = dynamic(() => import('@/components/sections/ReviewsSection'))
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'))

const CustomCursor = dynamic(() => import('@/components/interactive/CustomCursor'), { ssr: false })
const Dock = dynamic(() => import('@/components/interactive/Dock'), { ssr: false })

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Preloader */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Interactive Custom Mouse Cursor */}
      <CustomCursor />

      {/* Top Navigation */}
      <Navbar />

      {/* Main content - fluid, generous width for seamless immersive flow */}
      <main className="w-full relative z-10 overflow-hidden">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <AIToolsSection />
        <ReviewsSection />
        <ContactSection />
      </main>

      {/* Floating macOS Spring Dock (Visible when top navbar is hidden) */}
      <Dock />

      {/* Back To Top Action */}
      <BackToTop />

      {/* Global Footer */}
      <Footer />
    </>
  )
}
