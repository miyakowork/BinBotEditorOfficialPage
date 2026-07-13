import { useEffect } from 'react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

const pointerProperties = ['--pointer-x', '--pointer-y', '--tilt-x', '--tilt-y'] as const

function removePointerProperties(root: HTMLElement) {
  for (const property of pointerProperties) root.style.removeProperty(property)
}

export function PointerMotion() {
  const { reducedMotion, finePointer } = useMotionPreferences()

  useEffect(() => {
    const root = document.documentElement
    if (reducedMotion || !finePointer) {
      removePointerProperties(root)
      return
    }

    let x = 0
    let y = 0
    let frame: number | null = null

    const commitPointerPosition = () => {
      frame = null
      root.style.setProperty('--pointer-x', `${x}px`)
      root.style.setProperty('--pointer-y', `${y}px`)
      root.style.setProperty('--tilt-x', `${((y / window.innerHeight) - 0.5) * -3}deg`)
      root.style.setProperty('--tilt-y', `${((x / window.innerWidth) - 0.5) * 3}deg`)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        if (frame !== null) {
          window.cancelAnimationFrame(frame)
          frame = null
        }
        removePointerProperties(root)
        return
      }

      x = event.clientX
      y = event.clientY
      if (frame === null) frame = window.requestAnimationFrame(commitPointerPosition)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frame !== null) window.cancelAnimationFrame(frame)
      removePointerProperties(root)
    }
  }, [finePointer, reducedMotion])

  return null
}
