const demoSteps = [
  { id: 'open', label: '打开文件' },
  { id: 'edit', label: '专注编辑' },
  { id: 'format', label: '离线格式化' },
  { id: 'preview', label: '实时预览' },
] as const

export interface ProductDemoProps {
  step?: number
}

export function ProductDemo({ step = 0 }: ProductDemoProps) {
  const activeStep = Math.max(0, Math.min(step, demoSteps.length - 1))

  return (
    <section
      className="product-stage"
      aria-label="BinBotEditor 编辑工作流演示"
      data-demo-step={demoSteps[activeStep].id}
    >
      <div className="product-stage-caption">
        <span>LOCAL WORKFLOW</span>
        <strong>{demoSteps[activeStep].label}</strong>
      </div>
      <div className="editor-window">
        <div className="window-bar">
          <span aria-hidden="true">● ● ●</span>
          <strong>BinBotEditor — workspace</strong>
          <span>本地</span>
        </div>
        <div className="editor-workspace">
          <aside aria-label="文件列表">
            <b>BINBOT</b>
            <span>workspace.ts</span>
            <span>README.md</span>
            <span>settings.json</span>
          </aside>
          <div className="editor-main">
            <div className="tab-row">
              <span>workspace.ts</span>
              <span>README.md</span>
              <span>settings.json</span>
            </div>
            <pre aria-label="代码示例"><code>{`const workspace = createEditor({\n  local: true,\n  formatter: 'offline',\n  restoreSession: true,\n})`}</code></pre>
            <div className="format-command-demo">⇧ ⌥ F <strong>格式化文档</strong></div>
          </div>
          <aside className="preview-pane" aria-label="Markdown 实时预览">
            <b>实时预览</b>
            <h3>本地优先的工作流</h3>
            <p>无需离开工作区，即可完成编写、格式化与预览。</p>
          </aside>
        </div>
        <div className="status-bar">
          <span>main*</span>
          <span>TypeScript · UTF-8 · 本地</span>
        </div>
      </div>
      <ol className="demo-step-list">
        {demoSteps.map((item, index) => (
          <li key={item.id} data-active={index === activeStep}>{item.label}</li>
        ))}
      </ol>
    </section>
  )
}
