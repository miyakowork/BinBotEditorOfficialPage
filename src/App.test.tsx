import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('presents the complete macOS product story and consistent release state', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: '思考，在代码之前。' }),
    ).toBeVisible()
    expect(screen.getByRole('region', { name: '内置格式化' })).toBeVisible()
    expect(screen.getByText('你的代码，留在你的 Mac。')).toBeVisible()
    expect(
      screen.getAllByRole('button', { name: '首版试用即将发布' }),
    ).toHaveLength(3)
  })
})
