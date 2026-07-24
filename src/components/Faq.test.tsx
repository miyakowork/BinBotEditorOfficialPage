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
    expect(screen.getByText('v0.9.0 适用于搭载 Apple Silicon 的 Mac；AI 翻译需要用户自行配置受支持服务商的 API Key。')).toBeVisible()

    const localFilesQuestion = screen.getByRole('button', {
      name: '代码会上传到云端吗？',
    })

    await user.click(localFilesQuestion)

    expect(
      screen.getByText(
        '核心编辑、格式化、时间和 cURL 工具无需云端；AI 翻译仅在用户主动使用时，将待翻译内容发送给所选服务商。',
      ),
    ).toBeVisible()
  })
})
