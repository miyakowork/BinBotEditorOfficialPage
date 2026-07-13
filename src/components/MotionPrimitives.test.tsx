import { createRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MagneticButton } from './MagneticButton'
import { PointerMotion } from './PointerMotion'
import { Reveal } from './Reveal'

function mockMotionPreferences({ reducedMotion = false, finePointer = true } = {}) {
  vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? reducedMotion : finePointer,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))
}

describe('motion primitives', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    for (const property of ['--pointer-x', '--pointer-y', '--tilt-x', '--tilt-y']) {
      document.documentElement.style.removeProperty(property)
    }
  })

  it('coalesces pointer updates into one animation frame and cleans up', () => {
    mockMotionPreferences()
    const frames: FrameRequestCallback[] = []
    const requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
      frames.push(callback)
      return frames.length
    })
    const cancelAnimationFrame = vi.fn()
    vi.stubGlobal('requestAnimationFrame', requestAnimationFrame)
    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrame)

    const { unmount } = render(<PointerMotion />)
    fireEvent(window, new MouseEvent('pointermove', { clientX: 20, clientY: 40 }))
    fireEvent(window, new MouseEvent('pointermove', { clientX: 25, clientY: 45 }))

    expect(requestAnimationFrame).toHaveBeenCalledTimes(1)
    frames[0](0)
    expect(document.documentElement.style.getPropertyValue('--pointer-x')).toBe('25px')
    expect(document.documentElement.style.getPropertyValue('--pointer-y')).toBe('45px')

    fireEvent(window, new MouseEvent('pointermove', { clientX: 30, clientY: 50 }))
    unmount()
    fireEvent(window, new MouseEvent('pointermove', { clientX: 35, clientY: 55 }))

    expect(cancelAnimationFrame).toHaveBeenCalledWith(2)
    expect(requestAnimationFrame).toHaveBeenCalledTimes(2)
    expect(document.documentElement.style.getPropertyValue('--pointer-x')).toBe('')
    expect(document.documentElement.style.getPropertyValue('--pointer-y')).toBe('')
    expect(document.documentElement.style.getPropertyValue('--tilt-x')).toBe('')
    expect(document.documentElement.style.getPropertyValue('--tilt-y')).toBe('')
  })

  it('renders reveal content visible before effects initialize', () => {
    vi.stubGlobal('IntersectionObserver', undefined)

    const markup = renderToStaticMarkup(<Reveal>故事内容</Reveal>)

    expect(markup).toContain('class="reveal"')
    expect(markup).toContain('data-ready="false"')
    expect(markup).toContain('data-visible="true"')
    expect(markup).toContain('故事内容')
  })

  it('keeps magnetic controls as native buttons and forwards props and refs', () => {
    mockMotionPreferences()
    const ref = createRef<HTMLButtonElement>()
    const onClick = vi.fn()
    render(
      <MagneticButton ref={ref} type="button" aria-label="试用" onClick={onClick}>
        开始
      </MagneticButton>,
    )
    const button = screen.getByRole('button', { name: '试用' })
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 40,
      right: 100,
      bottom: 40,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    fireEvent(button, new MouseEvent('pointermove', { bubbles: true, clientX: 100, clientY: 40 }))
    expect(button).toHaveStyle({ transform: 'translate(4px, 4px)' })
    fireEvent.pointerLeave(button)
    expect(button.style.transform).toBe('')
    fireEvent.click(button)

    expect(ref.current).toBe(button)
    expect(onClick).toHaveBeenCalledOnce()
  })
})
