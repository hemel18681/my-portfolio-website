'use client'

interface ShinyTextProps {
  children: React.ReactNode
  className?: string
}

export default function ShinyText({ children, className = '' }: ShinyTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-white via-white/80 to-white bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite] ${className}`}
    >
      {children}
    </span>
  )
}
