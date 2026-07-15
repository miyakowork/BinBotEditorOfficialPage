import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('presents product proof as three structured editorial metrics', () => {
    render(<Hero />)

    const metrics = screen.getByRole('list', { name: '产品能力摘要' })
    const items = within(metrics).getAllByRole('listitem')

    expect(items).toHaveLength(3)
    expect(within(items[0]).getByText('30+')).toBeVisible()
    expect(within(items[0]).getByText('语言支持')).toBeVisible()
    expect(within(items[1]).getByText('14')).toBeVisible()
    expect(within(items[1]).getByText('种离线格式化')).toBeVisible()
    expect(within(items[2]).getByText('核心编辑')).toBeVisible()
    expect(within(items[2]).getByText('无需云端')).toBeVisible()
  })
})
