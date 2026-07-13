import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Navigation } from './Navigation'

describe('Navigation', () => {
  it('opens and closes the mobile navigation with accessible state', async () => {
    const user = userEvent.setup()
    render(<Navigation />)

    const openButton = screen.getByRole('button', { name: '打开导航菜单' })
    expect(openButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(openButton)

    const closeButton = screen.getByRole('button', { name: '关闭导航菜单' })
    expect(closeButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('link', { name: '产品能力' }))
    expect(screen.getByRole('button', { name: '打开导航菜单' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})
