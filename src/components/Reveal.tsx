import { useEffect, useState, type ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

export interface RevealProps {
  children: ReactNode
  className?: string
}

export function Reveal({ children, className }: RevealProps) {
  const [ready, setReady] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>()

  useEffect(() => setReady(true), [])

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : 'reveal'}
      data-ready={ready}
      data-visible={inView}
    >
      {children}
    </div>
  )
}
