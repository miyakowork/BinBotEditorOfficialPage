import { act, cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ProductDemo } from './ProductDemo'

describe('ProductDemo', () => {
  afterEach(() => {
    cleanup()
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

  it('keeps the first frame stable on a fine-primary hybrid touch device', () => {
    vi.useFakeTimers()
    vi.stubGlobal('IntersectionObserver', undefined)
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

    render(<ProductDemo />)
    const demo = screen.getByRole('region', { name: 'BinBotEditor 编辑工作流演示' })
    expect(demo).toHaveAttribute('data-demo-step', 'open')

    act(() => vi.advanceTimersByTime(5400))

    expect(demo).toHaveAttribute('data-demo-step', 'open')
  })

  it('lets visitors select a workflow step and updates the product stage', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
      matches: query === '(hover: hover) and (pointer: fine)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    const user = userEvent.setup()
    render(<ProductDemo />)
    const demo = screen.getByRole('region', { name: 'BinBotEditor 编辑工作流演示' })
    const formatStep = screen.getByRole('button', { name: '离线格式化' })

    await user.click(formatStep)

    expect(demo).toHaveAttribute('data-demo-step', 'format')
    expect(formatStep).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('格式化文档').closest('[data-demo-active]')).toHaveAttribute(
      'data-demo-active',
      'true',
    )
  })

  it('uses neutral spans for code syntax instead of semantic text elements', () => {
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
    const code = screen.getByLabelText('代码示例')

    expect(code.querySelectorAll('b, em, i, q, u')).toHaveLength(0)
    expect(code.querySelector('.code-string')).toHaveTextContent("'offline'")
  })
})
