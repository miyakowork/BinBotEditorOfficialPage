import { describe, expect, it } from 'vitest'
import { assetUrl } from './assets'

describe('assetUrl', () => {
  it('resolves public assets below the GitHub Pages project path', () => {
    expect(assetUrl('binbot-editor.svg', '/BinBotEditorOfficialPage/')).toBe(
      '/BinBotEditorOfficialPage/binbot-editor.svg',
    )
  })

  it('normalizes a leading slash in the asset path', () => {
    expect(assetUrl('/binbot-editor.svg', '/BinBotEditorOfficialPage/')).toBe(
      '/BinBotEditorOfficialPage/binbot-editor.svg',
    )
  })
})
