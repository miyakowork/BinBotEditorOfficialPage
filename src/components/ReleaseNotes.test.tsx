import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ReleaseNotes } from './ReleaseNotes'

describe('ReleaseNotes', () => {
  it('keeps the latest release visible and compacts the complete history behind native disclosures', async () => {
    const user = userEvent.setup()
    render(<ReleaseNotes />)

    const region = screen.getByRole('region', { name: '把最新变化，留在眼前。' })
    const entries = within(region).getAllByRole('article')
    expect(entries).toHaveLength(1)
    expect(within(entries[0]).getByText('最新版本')).toBeVisible()
    expect(within(entries[0]).getByRole('heading', { name: 'v0.10.1' })).toBeVisible()
    expect(within(entries[0]).getByText(/Vite 前端资源/)).toBeVisible()
    expect(within(entries[0]).getByText(/启动失败兜底/)).toBeVisible()
    expect(within(entries[0]).getByText(/回归验证/)).toBeVisible()

    const archive = screen.getByText('展开 9 个历史版本')
    expect(region.querySelector('.release-archive')).not.toHaveAttribute('open')
    await user.click(archive)
    expect(region.querySelector('.release-archive')).toHaveAttribute('open')
    expect(screen.getByRole('heading', { name: 'v0.10.0' })).toBeVisible()
    expect(screen.getByText('把调试请求、编码与加密能力安全地收进独立工具工作区。')).toBeVisible()
  })
})
