'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(hover: hover)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    let rafId: number
    let scheduled = false

    const moveCursor = () => {
      cursor.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
      scheduled = false
    }

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
      if (!scheduled) {
        scheduled = true
        rafId = requestAnimationFrame(moveCursor)
      }
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const hoverable = target.closest('a, button, [role="button"], select, .group, [data-cursor-hover]')
      setIsHovered(!!hoverable)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.documentElement.style.setProperty('cursor', 'none', 'important')

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.documentElement.style.removeProperty('cursor')
      cancelAnimationFrame(rafId)
    }
  }, [isVisible])

  return (
    <>
      <style jsx global>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      <div
        ref={cursorRef}
        className={`pointer-events-none fixed z-[999999] transition-opacity duration-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ top: 0, left: 0, willChange: 'transform' }}
      >
        {!isHovered ? (
          /* Exact shape from default-theme-cursor.svg — indigo fill, indigo stroke */
          <svg xmlns="http://www.w3.org/2000/svg" width="16.019" height="18" viewBox="0 0 16.019 18"
            style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.9))', transition: 'filter 0.15s ease' }}
          >
            <g transform="translate(-2696 -918)">
              <path
                d="M-32.6,14.588l-.685-4.295-.242-6.177.914-5.371a.493.493,0,0,1,.272-.441.493.493,0,0,1,.517.046l5.173,2.731L-21.9,4.868l2.761,2.988a.494.494,0,0,1-.255.886l-7.408.617-4.939,5.556a.493.493,0,0,1-.862-.327Zm0,0"
                transform="translate(2730.549 920.622)"
                fill="#ffffff"
              />
              <path
                d="M16.541.653A2.8,2.8,0,0,0,14.12.036,40.357,40.357,0,0,0,6.865,1.929c-1.8.626-5,1.845-6.122,2.969A1.943,1.943,0,0,0,.724,7.939a13.842,13.842,0,0,0,4.92,2.286,1.956,1.956,0,0,1,1.322,1.321c.649,1.988,1.675,5.582,3.782,5.647A2.2,2.2,0,0,0,12.3,16.45c2.33-2.748,4.433-10.327,4.862-13.377a2.8,2.8,0,0,0-.617-2.42Zm-.717,2.262c-.405,3.413-3.016,11.124-4.478,12.585-.489.489-.738.416-1.079.082a11.942,11.942,0,0,1-2.012-4.418A3.3,3.3,0,0,0,6.028,8.938,12.437,12.437,0,0,1,1.654,6.97a.871.871,0,0,1-.311-.52c.287-1.817,9.989-4.741,12.936-5.08a1.7,1.7,0,0,1,1.312.233,1.7,1.7,0,0,1,.233,1.312Z"
                transform="translate(2692.152 933.829) rotate(-72)"
                fill="#6366f1"
              />
            </g>
          </svg>
        ) : (
          /* Exact shape from default-theme-pointer.svg — indigo fill, indigo stroke */
          <svg xmlns="http://www.w3.org/2000/svg" width="18.307" height="19.315" viewBox="0 0 18.307 19.315"
            style={{ filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.75))', transition: 'filter 0.15s ease' }}
          >
            <g transform="translate(-37.275 -37.024)">
              <path
                d="M11.817,22.566c-.354-.472-.708-1.3-1.417-2.361-.354-.59-1.417-1.771-1.771-2.243a1.4,1.4,0,0,1-.118-1.18,1.665,1.665,0,0,1,1.653-1.3,3.147,3.147,0,0,1,1.653.826c.236.236.59.708.826.944s.236.354.472.59c.236.354.354.59.236.118-.118-.59-.236-1.535-.472-2.479a9.576,9.576,0,0,0-.354-1.3c-.118-.59-.236-.944-.354-1.535-.118-.354-.236-1.3-.354-1.771a2.684,2.684,0,0,1,.354-2.125,1.449,1.449,0,0,1,1.535-.236,3.031,3.031,0,0,1,1.062,1.535,9.8,9.8,0,0,1,.59,2.361c.236,1.18.59,2.951.59,3.305a8.876,8.876,0,0,1,0-1.771A1.322,1.322,0,0,1,16.775,13a3.268,3.268,0,0,1,1.062-.118,2.57,2.57,0,0,1,.944.59,5.121,5.121,0,0,1,.472,2.125,10.63,10.63,0,0,1,.354-1.889,2.117,2.117,0,0,1,.826-.59,2.012,2.012,0,0,1,1.18,0,1.366,1.366,0,0,1,.826.59,10,10,0,0,1,.472,2.007,7.02,7.02,0,0,1,.354-.826,1.221,1.221,0,0,1,2.243.708v2.715a11.63,11.63,0,0,1-.236,2.007,7.163,7.163,0,0,1-.826,1.653A7.164,7.164,0,0,0,23.031,24.1a4.89,4.89,0,0,0-.118,1.18,6.525,6.525,0,0,0,.118,1.062,5.337,5.337,0,0,1-1.417,0,2.516,2.516,0,0,1-1.18-1.3.454.454,0,0,0-.826,0c-.236.472-.826,1.3-1.3,1.3-.826.118-2.479,0-3.659,0,0,0,.236-1.18-.236-1.653l-1.3-1.3Z"
                transform="translate(29.446 29.313)"
                fill="#ffffff"
              />
              <path
                d="M11.817,22.566c-.354-.472-.708-1.3-1.417-2.361-.354-.59-1.417-1.771-1.771-2.243a1.4,1.4,0,0,1-.118-1.18,1.665,1.665,0,0,1,1.653-1.3,3.147,3.147,0,0,1,1.653.826c.236.236.59.708.826.944s.236.354.472.59c.236.354.354.59.236.118-.118-.59-.236-1.535-.472-2.479a9.576,9.576,0,0,0-.354-1.3c-.118-.59-.236-.944-.354-1.535-.118-.354-.236-1.3-.354-1.771a2.684,2.684,0,0,1,.354-2.125,1.449,1.449,0,0,1,1.535-.236,3.031,3.031,0,0,1,1.062,1.535,9.8,9.8,0,0,1,.59,2.361c.236,1.18.59,2.951.59,3.305a8.876,8.876,0,0,1,0-1.771A1.322,1.322,0,0,1,16.775,13a3.268,3.268,0,0,1,1.062-.118,2.57,2.57,0,0,1,.944.59,5.121,5.121,0,0,1,.472,2.125,10.63,10.63,0,0,1,.354-1.889,2.117,2.117,0,0,1,.826-.59,2.012,2.012,0,0,1,1.18,0,1.366,1.366,0,0,1,.826.59,10,10,0,0,1,.472,2.007,7.02,7.02,0,0,1,.354-.826,1.221,1.221,0,0,1,2.243.708v2.715a11.63,11.63,0,0,1-.236,2.007,7.163,7.163,0,0,1-.826,1.653A7.164,7.164,0,0,0,23.031,24.1a4.89,4.89,0,0,0-.118,1.18,6.525,6.525,0,0,0,.118,1.062,5.337,5.337,0,0,1-1.417,0,2.516,2.516,0,0,1-1.18-1.3.454.454,0,0,0-.826,0c-.236.472-.826,1.3-1.3,1.3-.826.118-2.479,0-3.659,0,0,0,.236-1.18-.236-1.653l-1.3-1.3Z"
                transform="translate(29.446 29.313)"
                fill="none"
                stroke="#6366f1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              />
              <line y1="3.414" transform="translate(51.141 48.118)" fill="none" stroke="#6366f1" strokeLinecap="round" strokeWidth="1.25" />
              <line x1="0.449" y1="3.414" transform="translate(48.453 48.118)" fill="none" stroke="#6366f1" strokeLinecap="round" strokeWidth="1.25" />
              <line y2="3.414" transform="translate(46.418 48.118)" fill="none" stroke="#6366f1" strokeLinecap="round" strokeWidth="1.25" />
            </g>
          </svg>
        )}
      </div>
    </>
  )
}
