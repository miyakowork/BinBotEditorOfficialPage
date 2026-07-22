import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CapabilitySections } from './CapabilitySections'
import { MacSection } from './MacSection'
import { WorkflowStrip } from './WorkflowStrip'

describe('product narrative sections', () => {
  it('describes verified editor capabilities without unsupported claims', () => {
    render(<><CapabilitySections /><WorkflowStrip /><MacSection /></>)

    const capabilities = screen.getByRole('region', { name: '产品能力' })
    expect(within(capabilities).getByText('30+ 种语言，打开即懂。')).toBeVisible()
    expect(within(capabilities).getByText('14 种格式化，全部离线。')).toBeVisible()
    expect(within(capabilities).getByText('JSON 不只是纯文本。')).toBeVisible()
    expect(within(capabilities).getByText('转换与解析，随手即用。')).toBeVisible()
    expect(within(capabilities).getByText('时间工具')).toBeVisible()
    expect(within(capabilities).getByText('cURL 解析')).toBeVisible()
    expect(screen.getByText('跨项目搜索')).toBeVisible()
    expect(screen.getByText('自动保存与会话恢复')).toBeVisible()
    expect(screen.getByText('智能功能适时出现，但不会接管你的工作流。')).toBeVisible()
  })
})
