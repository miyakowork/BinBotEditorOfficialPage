import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Faq } from './Faq'

describe('Faq', () => {
  it('reveals one answer through an accessible disclosure button', async () => {
    const user = userEvent.setup()
    render(<Faq />)

    const question = screen.getByRole('button', {
      name: 'BinBotEditor 支持哪些平台？',
    })
    expect(question).toHaveAttribute('aria-expanded', 'false')

    await user.click(question)

    expect(question).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('首版专注于 macOS。')).toBeVisible()
  })
})
