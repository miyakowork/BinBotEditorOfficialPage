import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ProductDemo } from './ProductDemo'

describe('ProductDemo', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('does not advance the looping demo on a coarse pointer', () => {
    vi.useFakeTimers()
    vi.stubGlobal('IntersectionObserver', undefined)
    vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    render(<ProductDemo />)
    const demo = screen.getByRole('region', { name: 'BinBotEditor 编辑工作流演示' })
    expect(demo).toHaveAttribute('data-demo-step', 'open')

    act(() => vi.advanceTimersByTime(5400))

    expect(demo).toHaveAttribute('data-demo-step', 'open')
  })
})
