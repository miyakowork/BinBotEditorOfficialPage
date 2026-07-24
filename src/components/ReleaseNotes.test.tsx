import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ReleaseNotes } from './ReleaseNotes'

describe('ReleaseNotes', () => {
  it('highlights the latest release while preserving older entries', () => {
    render(<ReleaseNotes />)

    const region = screen.getByRole('region', { name: '每次更新，都有迹可循。' })
    const entries = within(region).getAllByRole('article')
    expect(entries).toHaveLength(6)
    expect(within(entries[0]).getByText('最新版本')).toBeVisible()
    expect(within(entries[0]).getByRole('heading', { name: 'v0.7.2' })).toBeVisible()
    expect(within(entries[1]).getByRole('heading', { name: 'v0.7.1' })).toBeVisible()
    expect(within(entries[2]).getByRole('heading', { name: 'v0.7.0' })).toBeVisible()
    expect(within(entries[3]).getByRole('heading', { name: 'v0.6.1' })).toBeVisible()
    expect(within(entries[4]).getByRole('heading', { name: 'v0.6.0' })).toBeVisible()
    expect(within(entries[5]).getByRole('heading', { name: 'v0.5.0' })).toBeVisible()
    expect(within(entries[0]).getByText(/Pointer Events/)).toBeVisible()
    expect(within(entries[0]).getByText(/激活/)).toBeVisible()
    expect(within(entries[0]).getByText('cURL Command Deck 输入区域完整适配亮色与暗色主题。')).toBeVisible()
  })
})
