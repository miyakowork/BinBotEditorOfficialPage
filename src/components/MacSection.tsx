export function MacSection() {
  return (
    <section className="mac-section section" id="mac" aria-labelledby="mac-title">
      <div className="mac-copy">
        <p className="section-kicker">为 Mac 而生 / 06</p>
        <h2 id="mac-title">为你的 Mac，<br />也为你的习惯。</h2>
        <p>本地文件直接读写，熟悉的桌面快捷键、主题、字号与换行方式都由你决定。</p>
        <blockquote>智能功能适时出现，但不会接管你的工作流。</blockquote>
        <ul>
          <li>本地文件工作流</li>
          <li>快捷键与主题可配置</li>
          <li>AI 自动命名可选启用</li>
        </ul>
      </div>
      <div className="mac-visual" aria-hidden="true">
        <span>⌘</span>
        <strong>本地优先</strong>
        <span>macOS</span>
      </div>
    </section>
  )
}
