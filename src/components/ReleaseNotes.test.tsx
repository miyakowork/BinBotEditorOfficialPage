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
    expect(within(entries[0]).getByRole('heading', { name: 'v0.10.5' })).toBeVisible()
    expect(within(entries[0]).getByText(/translate\/transform/)).toBeVisible()
    expect(within(entries[0]).getByText(/欢迎页与工具页/)).toBeVisible()
    expect(within(entries[0]).getByText(/动画祖先回归测试/)).toBeVisible()

    const archive = screen.getByText('展开 13 个历史版本')
    expect(region.querySelector('.release-archive')).not.toHaveAttribute('open')
    await user.click(archive)
    expect(region.querySelector('.release-archive')).toHaveAttribute('open')
    expect(screen.getByRole('heading', { name: 'v0.10.1' })).toBeVisible()
    expect(screen.getByText('修复 macOS 发布包启动后只显示透明窗口的问题。')).toBeVisible()
  })
})
