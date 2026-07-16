import { describe, expect, it } from 'vitest'
import {
  capabilityChapters,
  navigationItems,
  offlineFormatters,
  releaseStatus,
  supportedLanguages,
  workflowItems,
} from './site'

describe('site content contract', () => {
  it('publishes verified language and offline formatter counts', () => {
    expect(supportedLanguages).toHaveLength(31)
    expect(offlineFormatters).toHaveLength(14)
    expect(supportedLanguages).toContain('Markdown')
    expect(offlineFormatters).toEqual(expect.arrayContaining(['Python', 'Kotlin']))
  })

  it('keeps product and release claims consistent', () => {
    expect(releaseStatus).toEqual({
      label: '下载 macOS 正式版',
      notice: 'v0.2.2 适用于 Apple Silicon，当前版本未经 Apple 公证；首次启动时可能需要在“隐私与安全性”中确认打开。',
      available: true,
      downloadUrl: 'https://github.com/miyakowork/BinBotEditorOfficialPage/releases/download/v0.2.2/BinBotEditor-0.2.2-macOS-arm64.dmg',
    })
    expect(navigationItems.map(({ label }) => label)).toEqual([
      '产品能力',
      '工作流',
      '为 Mac 而生',
      '下载',
    ])
    expect(capabilityChapters.map(({ id }) => id)).toEqual([
      'languages',
      'formatters',
      'markdown',
      'json',
    ])
    expect(workflowItems).toHaveLength(3)
  })
})
