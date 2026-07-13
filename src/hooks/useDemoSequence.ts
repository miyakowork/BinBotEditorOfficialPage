import { useEffect, useState } from 'react'

export interface DemoSequenceOptions {
  active: boolean
  reducedMotion: boolean
  stepCount: number
  intervalMs?: number
}

export function useDemoSequence({
  active,
  reducedMotion,
  stepCount,
  intervalMs = 1800,
}: DemoSequenceOptions) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      setStep(0)
      return
    }
    if (!active || stepCount < 2) return

    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % stepCount),
      intervalMs,
    )

    return () => window.clearInterval(timer)
  }, [active, intervalMs, reducedMotion, stepCount])

  return step
}
