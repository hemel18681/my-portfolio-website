'use client'

import { create } from 'zustand'

interface SoundState {
  enabled: boolean
  toggle: () => void
  setEnabled: (v: boolean) => void
}

export const useSoundStore = create<SoundState>((set) => ({
  enabled: true,
  toggle: () => set((s) => ({ enabled: !s.enabled })),
  setEnabled: (v) => set({ enabled: v }),
}))

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return null

    if (!audioCtx) {
      audioCtx = new AudioContextClass()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {})
    }
    return audioCtx
  } catch {
    return null
  }
}

// Global unlock on first user gesture
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = getAudioContext()
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
  }
  window.addEventListener('click', unlockAudio, { once: true, passive: true })
  window.addEventListener('keydown', unlockAudio, { once: true, passive: true })
  window.addEventListener('touchstart', unlockAudio, { once: true, passive: true })
}

/** Crisp, tech-y mechanical click sound */
export function playClick() {
  if (!useSoundStore.getState().enabled) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.08)

    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.08)
  } catch {
    // audio context muted or user gesture pending
  }
}

/** Subtle high-tech hover sound */
export function playHover() {
  if (!useSoundStore.getState().enabled) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(240, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.06)

    gain.gain.setValueAtTime(0.02, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.06)
  } catch {}
}

/** Success / completion chime */
export function playSuccess() {
  if (!useSoundStore.getState().enabled) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(523.25, now) // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.08) // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.16) // G5

    gain.gain.setValueAtTime(0.06, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    osc1.connect(gain)
    gain.connect(ctx.destination)

    osc1.start(now)
    osc1.stop(now + 0.35)
  } catch {}
}

export function useSound() {
  return {
    playClick,
    playHover,
    playSuccess,
    enabled: useSoundStore((s) => s.enabled),
    toggle: useSoundStore((s) => s.toggle),
  }
}
