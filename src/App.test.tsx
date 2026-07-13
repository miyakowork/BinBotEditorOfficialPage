import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('presents the complete local-first macOS story', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: '一台 Mac，就是完整工作台。' })).toBeVisible()
    expect(screen.getByText('30+ 语言支持')).toBeVisible()
    expect(screen.getByText('14 种离线格式化')).toBeVisible()
    expect(screen.getByText('核心编辑无需云端')).toBeVisible()
    expect(screen.getByRole('link', { name: '探索产品能力' })).toHaveAttribute('href', '#capabilities')
    expect(screen.getByRole('region', { name: 'BinBotEditor 编辑工作流演示' })).toBeVisible()
    expect(screen.getAllByRole('button', { name: '首版试用即将发布' })).toHaveLength(3)
  })
})
