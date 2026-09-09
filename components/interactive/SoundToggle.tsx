'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { useSoundStore, playClick } from '@/hooks/useSound'

export default function SoundToggle() {
  const { enabled, toggle } = useSoundStore()

  const handleToggle = () => {
    toggle()
    if (!enabled) {
      setTimeout(() => playClick(), 50)
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="relative p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
      aria-label={enabled ? 'Mute sound effects' : 'Enable sound effects'}
      title={enabled ? 'Mute sound effects' : 'Enable sound effects'}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-emerald-400" />
      ) : (
        <VolumeX className="w-4 h-4 text-zinc-500" />
      )}
    </button>
  )
}
