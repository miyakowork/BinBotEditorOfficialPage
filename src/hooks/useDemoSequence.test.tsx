import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDemoSequence } from './useDemoSequence'

describe('useDemoSequence', () => {
  afterEach(() => vi.useRealTimers())

  it('advances only while active and motion is allowed', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ active, reducedMotion }) => useDemoSequence({ active, reducedMotion, stepCount: 4, intervalMs: 1000 }),
      { initialProps: { active: true, reducedMotion: false } },
    )

    act(() => vi.advanceTimersByTime(1000))
    expect(result.current).toBe(1)

    rerender({ active: false, reducedMotion: false })
    act(() => vi.advanceTimersByTime(2000))
    expect(result.current).toBe(1)

    rerender({ active: true, reducedMotion: true })
    act(() => vi.advanceTimersByTime(2000))
    expect(result.current).toBe(0)
  })
})
