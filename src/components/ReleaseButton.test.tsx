import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ReleaseButton } from './ReleaseButton'

describe('ReleaseButton', () => {
  it('explains that the macOS release is still being prepared', async () => {
    const user = userEvent.setup()
    render(<ReleaseButton />)

    const button = screen.getByRole('button', { name: '首版试用即将发布' })
    expect(button).toBeEnabled()

    await user.click(button)

    expect(screen.getByRole('status')).toHaveTextContent(
      'BinBotEditor 首版 macOS 试用正在准备中，发布日期尚未公布。',
    )
  })
})
