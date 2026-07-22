import { describe, expect, it } from 'vitest'
import {
  capabilityChapters,
  navigationItems,
  offlineFormatters,
  releaseHistory,
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
      notice: 'v0.7.0 适用于 Apple Silicon，当前版本未经 Apple 公证；首次启动时可能需要在“隐私与安全性”中确认打开。',
      available: true,
      downloadUrl: 'https://github.com/miyakowork/BinBotEditorOfficialPage/releases/download/v0.7.0/BinBotEditor-0.7.0-macOS-arm64.dmg',
    })
    expect(navigationItems.map(({ label }) => label)).toEqual([
      '产品能力',
      '工作流',
      '为 Mac 而生',
      '版本更新',
      '下载',
    ])
    expect(capabilityChapters.map(({ id }) => id)).toEqual([
      'languages',
      'formatters',
      'markdown',
      'json',
      'tools',
    ])
    expect(workflowItems).toHaveLength(3)
    const tools = capabilityChapters.find(({ id }) => id === 'tools')
    expect(tools?.description).toContain('yyyy-MM-dd HH:mm:ss')
    expect(tools?.description).toContain('JSON')
    expect(tools?.description).toContain('高亮')
  })

  it('keeps release history newest first and highlights the current release', () => {
    expect(releaseHistory.map(({ version }) => version)).toEqual(['v0.7.0', 'v0.6.1', 'v0.6.0', 'v0.5.0'])
    expect(releaseHistory[0]).toMatchObject({ version: 'v0.7.0', latest: true })
    expect(releaseHistory.slice(1).every(({ latest }) => !latest)).toBe(true)
    expect(releaseHistory[0].highlights).toEqual(expect.arrayContaining([
      expect.stringContaining('yyyy-MM-dd HH:mm:ss'),
      expect.stringContaining('JSON'),
      expect.stringContaining('Query'),
    ]))
    expect(releaseHistory[1].highlights).toEqual(expect.arrayContaining([
      expect.stringContaining('工具栏'),
      expect.stringContaining('图标'),
    ]))
  })
})
