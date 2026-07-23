import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('App', () => {
  it('lets every post-hero section title wrap naturally', () => {
    render(<App />)

    const sectionTitles = screen.getAllByRole('heading', { level: 2 })

    expect(sectionTitles).toHaveLength(6)
    sectionTitles.forEach((title) => expect(title.querySelector('br')).toBeNull())
  })

  it('presents the complete local-first macOS story', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: '一台 Mac，就是完整工作台。' })).toBeVisible()
    const metrics = screen.getByRole('list', { name: '产品能力摘要' })
    expect(within(metrics).getByText('30+')).toBeVisible()
    expect(within(metrics).getByText('14')).toBeVisible()
    expect(within(metrics).getByText('核心编辑')).toBeVisible()
    expect(screen.getByRole('link', { name: '探索产品能力' })).toHaveAttribute('href', '#capabilities')
    expect(screen.getByRole('region', { name: 'BinBotEditor 编辑工作流演示' })).toBeVisible()
    expect(screen.getByRole('button', { name: '打开文件' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { level: 3, name: '本地优先的工作流' })).toBeVisible()
    expect(screen.getByText('无需离开工作区，即可完成编写、格式化与预览。')).toBeVisible()
    expect(screen.getByRole('heading', { name: '把复杂留在编辑器里，把专注留给你。' })).toBeVisible()
    expect(screen.getAllByText('settings.json')).toHaveLength(2)
    expect(screen.getAllByRole('link', { name: '下载 macOS 正式版' })).toHaveLength(3)
    expect(screen.getByRole('heading', { name: '每次更新，都有迹可循。' })).toBeVisible()
    expect(screen.getByText('BinBotEditor v0.7.1 已开放下载。')).toBeVisible()
  })
})
