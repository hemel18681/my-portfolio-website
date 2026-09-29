'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// All components are dynamically imported to minimise the initial JS payload
// and eliminate main-thread blocking on first paint.
const Navbar = dynamic(() => import('@/components/layout/Navbar'))
const Footer = dynamic(() => import('@/components/layout/Footer'))
const BackToTop = dynamic(() => import('@/components/ui/BackToTop'))
import LazySection from '@/components/utils/LazySection'

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
  return (
    <>
      {/* Main App Content */}
      <div>
        {/* Interactive Custom Mouse Cursor */}
        <CustomCursor />

        {/* Top Navigation */}
        <Navbar />

        {/* Main content - fluid, generous width for seamless immersive flow */}
        <main className="w-full relative z-10 overflow-hidden">
          <HeroSection />

          {/* Below-the-fold sections are strictly scroll-lazy-loaded using IntersectionObserver. 
              This prevents the massive hydration spike (TBT) during initial load,
              because their JS chunks aren't even fetched until the user scrolls near them. */}
          <LazySection id="about" minHeight="80vh"><AboutSection /></LazySection>
          <LazySection id="skills" minHeight="80vh"><SkillsSection /></LazySection>
          <LazySection id="experience" minHeight="80vh"><ExperienceSection /></LazySection>
          <LazySection id="projects" minHeight="80vh"><ProjectsSection /></LazySection>
          <LazySection id="achievements" minHeight="80vh"><AchievementsSection /></LazySection>
          <LazySection id="ai-tools" minHeight="80vh"><AIToolsSection /></LazySection>
          <LazySection id="reviews" minHeight="80vh"><ReviewsSection /></LazySection>
          <LazySection id="contact" minHeight="40vh"><ContactSection /></LazySection>
        </main>

        {/* Floating macOS Spring Dock */}
        <Dock />

        {/* Back To Top Action */}
        <BackToTop />

        {/* Global Footer is also lazy-loaded as it's at the very bottom */}
        <LazySection minHeight="20vh"><Footer /></LazySection>
      </div>
    </>
  )
}
