import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useMotionPreferences } from './useMotionPreferences'

describe('useMotionPreferences', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('reports reduced motion and fine pointer preferences', () => {
    const mediaQueries = new Map<string, MediaQueryList>()
    const matchMedia = vi.fn((query: string) => {
      const mediaQuery = {
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      } as MediaQueryList
      mediaQueries.set(query, mediaQuery)
      return mediaQuery
    })
    vi.stubGlobal('matchMedia', matchMedia)

    const { result, unmount } = renderHook(() => useMotionPreferences())

    expect(result.current).toEqual({
      reducedMotion: true,
      finePointer: false,
      touchCapable: false,
    })
    expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
    expect(matchMedia).toHaveBeenCalledWith('(hover: hover) and (pointer: fine)')
    expect(matchMedia).toHaveBeenCalledWith('(any-pointer: coarse)')

    for (const mediaQuery of mediaQueries.values()) {
      expect(mediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    }
    unmount()
    for (const mediaQuery of mediaQueries.values()) {
      expect(mediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    }
  })

  it('reports touch capability when a fine-primary device also has a coarse pointer', () => {
    vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
      matches: [
        '(hover: hover) and (pointer: fine)',
        '(any-pointer: coarse)',
      ].includes(query),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    const { result } = renderHook(() => useMotionPreferences())

    expect(result.current).toEqual({
      reducedMotion: false,
      finePointer: true,
      touchCapable: true,
    })
  })
})
