import { useEffect, useRef, useState, type RefObject } from 'react'

export function useInView<T extends Element>(options?: IntersectionObserverInit): {
  ref: RefObject<T>
  inView: boolean
} {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(
    () => typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    if (typeof window.IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const target = ref.current
    if (!target) return

    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options,
    )
    observer.observe(target)

    return () => observer.disconnect()
  }, [options])

  return { ref, inView }
}
