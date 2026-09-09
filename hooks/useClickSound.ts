'use client'

import { useCallback } from 'react'
import { playClick, playHover } from './useSound'

export function useClickSound() {
  const onClick = useCallback(() => playClick(), [])
  const onHover = useCallback(() => playHover(), [])
  return { onClick, onMouseEnter: onHover }
}
