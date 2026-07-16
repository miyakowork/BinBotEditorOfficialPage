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
    expect(screen.getByText('v0.2.3 适用于搭载 Apple Silicon 的 Mac。')).toBeVisible()

    const localFilesQuestion = screen.getByRole('button', {
      name: '代码会上传到云端吗？',
    })

    await user.click(localFilesQuestion)

    expect(
      screen.getByText(
        '核心编辑和格式化无需云端；可选智能功能仅在启用时参与工作流。',
      ),
    ).toBeVisible()
  })
})
