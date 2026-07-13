import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useInView } from './useInView'

describe('useInView', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('keeps content visible when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)

    const { result } = renderHook(() => useInView())

    expect(result.current.inView).toBe(true)
  })
})
