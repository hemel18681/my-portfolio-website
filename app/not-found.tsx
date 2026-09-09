'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md animate-[fadeInUp_0.8s_ease_both]">
        {/* 404 */}
        <div className="font-heading text-8xl font-black text-[#CCFF00] mb-4">
          404
        </div>

        <h1 className="font-heading text-2xl font-bold text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-zinc-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#CCFF00] text-black font-semibold text-sm hover:shadow-lg hover:shadow-[#CCFF00]/20 hover:scale-105 transition-all"
        >
          ← Back to Home
        </Link>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
