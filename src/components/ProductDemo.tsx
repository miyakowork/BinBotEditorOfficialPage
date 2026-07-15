import { useState } from 'react'
import { useDemoSequence } from '../hooks/useDemoSequence'
import { useInView } from '../hooks/useInView'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

const demoSteps = [
  { id: 'open', label: '打开文件' },
  { id: 'edit', label: '专注编辑' },
  { id: 'format', label: '离线格式化' },
  { id: 'preview', label: '实时预览' },
] as const

export function ProductDemo() {
  const { ref, inView } = useInView<HTMLElement>()
  const { reducedMotion, finePointer, touchCapable } = useMotionPreferences()
  const [manualStep, setManualStep] = useState<number | null>(null)
  const sequenceStep = useDemoSequence({
    active: inView && finePointer && !touchCapable && manualStep === null,
    reducedMotion: reducedMotion || touchCapable,
    stepCount: demoSteps.length,
  })
  const activeStep = manualStep ?? sequenceStep
  const activeStepId = demoSteps[activeStep].id

  return (
    <section
      ref={ref}
      className="product-stage"
      aria-label="BinBotEditor 编辑工作流演示"
      data-demo-step={activeStepId}
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
            <b>WORKSPACE</b>
            <span className="tree-folder">src</span>
            <span data-demo-active={activeStepId !== 'preview'}>workspace.ts</span>
            <span data-demo-active={activeStepId === 'preview'}>README.md</span>
            <span>settings.json</span>
          </aside>
          <div className="editor-main">
            <div className="tab-row">
              <span data-demo-active={activeStepId !== 'preview'}>workspace.ts</span>
              <span data-demo-active={activeStepId === 'preview'}>README.md</span>
              <span>settings.json</span>
            </div>
            <pre aria-label="代码示例"><code>
              <span><span className="code-line-number">01</span><span className="code-keyword">const</span> workspace = <span className="code-function">createEditor</span>({'{'}</span>
              <span data-demo-active={activeStepId === 'edit'}><span className="code-line-number">02</span>  local: <span className="code-boolean">true</span>,</span>
              <span data-demo-active={activeStepId === 'format'}><span className="code-line-number">03</span>  formatter: <span className="code-string">'offline'</span>,</span>
              <span><span className="code-line-number">04</span>  restoreSession: <span className="code-boolean">true</span>,</span>
              <span><span className="code-line-number">05</span>{'}'})</span>
            </code></pre>
            <div className="format-command-demo" data-demo-active={activeStepId === 'format'}>
              <span>⇧ ⌥ F</span><strong>格式化文档</strong>
            </div>
          </div>
          <aside
            className="preview-pane"
            aria-label="Markdown 实时预览"
            data-demo-active={activeStepId === 'preview'}
          >
            <b>实时预览</b>
            <h3>本地优先的工作流</h3>
            <p>无需离开工作区，即可完成编写、格式化与预览。</p>
            <ul>
              <li>30+ 语言支持</li>
              <li>14 种离线格式化</li>
              <li>Markdown 实时预览</li>
            </ul>
          </aside>
        </div>
        <div className="status-bar">
          <span>main*</span>
          <span>Ln 12, Col 22 · TypeScript · UTF-8</span>
          <span>本地</span>
        </div>
        <ol className="demo-step-list" aria-label="演示步骤">
          {demoSteps.map((item, index) => (
            <li key={item.id} data-active={index === activeStep}>
              <button
                type="button"
                aria-label={item.label}
                aria-pressed={index === activeStep}
                onClick={() => setManualStep(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
