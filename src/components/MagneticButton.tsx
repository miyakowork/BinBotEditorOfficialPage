import {
  forwardRef,
  type ButtonHTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

const maximumOffset = 4

function clampOffset(value: number) {
  return Math.max(-maximumOffset, Math.min(maximumOffset, value))
}

export const MagneticButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function MagneticButton(
    { onPointerMove, onPointerLeave, style, ...buttonProps },
    ref,
  ) {
    const { reducedMotion, finePointer } = useMotionPreferences()
    const baseTransform = style?.transform

    const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
      onPointerMove?.(event)
      if (event.defaultPrevented || reducedMotion || !finePointer) return

      const bounds = event.currentTarget.getBoundingClientRect()
      if (bounds.width === 0 || bounds.height === 0) return

      const offsetX = clampOffset(((event.clientX - bounds.left) / bounds.width - 0.5) * 8)
      const offsetY = clampOffset(((event.clientY - bounds.top) / bounds.height - 0.5) * 8)
      const translation = `translate(${offsetX}px, ${offsetY}px)`
      event.currentTarget.style.transform = baseTransform
        ? `${baseTransform} ${translation}`
        : translation
    }

    const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.currentTarget.style.transform = baseTransform ?? ''
      onPointerLeave?.(event)
    }

    return (
      <button
        {...buttonProps}
        ref={ref}
        style={style}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
    )
  },
)
