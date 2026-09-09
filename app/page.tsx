'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Preloader from '@/components/interactive/Preloader'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AchievementsSection from '@/components/sections/AchievementsSection'
import AIToolsSection from '@/components/sections/AIToolsSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import ContactSection from '@/components/sections/ContactSection'
import BackToTop from '@/components/ui/BackToTop'

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
