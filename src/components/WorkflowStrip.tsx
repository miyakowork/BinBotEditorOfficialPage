import { workflowItems } from '../content/site'

export function WorkflowStrip() {
  return (
    <section className="workflow section" id="workflow" aria-labelledby="workflow-title">
      <header className="section-heading">
        <p className="section-kicker">工作流 / 05</p>
        <h2 id="workflow-title">上下文一直在，<br />思路不必重来。</h2>
      </header>
      <ol className="workflow-list">
        {workflowItems.map((item) => (
          <li key={item.id}>
            <span>{item.index}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
      <div className="workflow-visual" aria-hidden="true">
        <div className="workflow-search">
          <strong>全局搜索结果</strong>
          <span>src/App.tsx · 4</span>
          <span>src/content/site.ts · 2</span>
        </div>
        <div className="workflow-files">
          <strong>文件树</strong>
          <span>src</span>
          <span>components</span>
          <span>content</span>
        </div>
        <div className="workflow-tabs">
          <strong>已恢复标签</strong>
          <span>App.tsx</span>
          <span>site.ts</span>
          <span>README.md</span>
        </div>
      </div>
    </section>
  )
}
