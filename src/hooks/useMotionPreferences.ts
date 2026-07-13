import { useEffect, useState } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
const finePointerQuery = '(hover: hover) and (pointer: fine)'

export interface MotionPreferences {
  reducedMotion: boolean
  finePointer: boolean
}

function readPreferences(): MotionPreferences {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return { reducedMotion: false, finePointer: false }
  }

  return {
    reducedMotion: window.matchMedia(reducedMotionQuery).matches,
    finePointer: window.matchMedia(finePointerQuery).matches,
  }
}

export function useMotionPreferences(): MotionPreferences {
  const [preferences, setPreferences] = useState(readPreferences)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const reducedMotionMedia = window.matchMedia(reducedMotionQuery)
    const finePointerMedia = window.matchMedia(finePointerQuery)
    const updatePreferences = () => {
      setPreferences({
        reducedMotion: reducedMotionMedia.matches,
        finePointer: finePointerMedia.matches,
      })
    }

    updatePreferences()
    reducedMotionMedia.addEventListener('change', updatePreferences)
    finePointerMedia.addEventListener('change', updatePreferences)

    return () => {
      reducedMotionMedia.removeEventListener('change', updatePreferences)
      finePointerMedia.removeEventListener('change', updatePreferences)
    }
  }, [])

  return preferences
}
