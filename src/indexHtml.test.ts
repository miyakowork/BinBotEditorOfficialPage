import { describe, expect, it } from 'vitest'
import indexHtml from '../index.html?raw'

describe('index.html metadata', () => {
  it('describes the current local-first macOS product story', () => {
    expect(indexHtml).toContain(
      '<title>BinBotEditor — 本地优先的 macOS 编辑器</title>',
    )
    expect(indexHtml).toContain(
      '<meta name="description" content="BinBotEditor 是一款面向 macOS 的本地优先编辑器，支持 30+ 种语言、14 种离线格式化、全局搜索、Markdown 实时预览与 JSON 工具。" />',
    )
  })
})
