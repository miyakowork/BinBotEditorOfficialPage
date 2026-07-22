import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ReleaseButton } from './ReleaseButton'

afterEach(cleanup)

describe('ReleaseButton', () => {
  it('links directly to the public Apple Silicon release asset', () => {
    render(<ReleaseButton />)

    expect(screen.getByRole('link', { name: '下载 macOS 正式版' })).toHaveAttribute(
      'href',
      'https://github.com/miyakowork/BinBotEditorOfficialPage/releases/download/v0.6.0/BinBotEditor-0.6.0-macOS-arm64.dmg',
    )
    expect(screen.getByText('下载 macOS 正式版')).toHaveClass('button-label')
    expect(screen.getByText(
      'v0.6.0 适用于 Apple Silicon，当前版本未经 Apple 公证；首次启动时可能需要在“隐私与安全性”中确认打开。',
    )).toBeVisible()
  })

  it('preserves compact release-control styling', () => {
    const { getByRole } = render(
      <ReleaseButton compact className="button button--small" />,
    )

    expect(getByRole('link', { name: '下载 macOS 正式版' })).toHaveClass(
      'magnetic-button',
      'button',
      'button--small',
    )
  })
})
