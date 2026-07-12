const languages = ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Java', 'Kotlin', 'PHP', 'HTML', 'CSS', 'JSON', 'Markdown', 'SQL', 'Shell', 'YAML']

export function FeatureSections() {
  return (
    <>
      <section className="section features" id="features" aria-labelledby="features-title">
        <div className="section-heading">
          <p className="section-kicker">核心体验 / 01</p>
          <h2 id="features-title">少一点界面，<br />多一点思路。</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card feature-card--wide">
            <span className="feature-index">01</span>
            <div className="focus-visual" aria-hidden="true"><span /><span /><span /><b>idea.ts</b></div>
            <h3>专注编辑</h3><p>清晰的层级、准确的语法高亮，以及不会打断思路的工作区。</p>
          </article>
          <article className="feature-card">
            <span className="feature-index">02</span>
            <div className="tabs-visual" aria-hidden="true"><span>app.tsx</span><span>editor.ts</span><span>notes.md</span></div>
            <h3>多标签工作区</h3><p>在文件之间自然流动，路径、状态和上下文始终清楚。</p>
          </article>
          <article className="feature-card feature-card--violet">
            <span className="feature-index">03</span>
            <div className="native-visual" aria-hidden="true"><img src="/binbot-editor.svg" alt="" /><span>⌘ K</span></div>
            <h3>为 Mac 而生</h3><p>熟悉的快捷键、窗口行为和桌面节奏，顺手得像系统本身。</p>
          </article>
        </div>
      </section>

      <section className="section formatting" id="formatting" aria-label="内置格式化">
        <div className="formatting-copy">
          <p className="section-kicker">内置格式化 / 02</p>
          <h2 id="formatting-title">保存之前，<br />已经整齐。</h2>
          <p>格式化引擎随应用一起提供，无需寻找插件，无需配置外部命令，也不依赖网络。</p>
          <div className="format-command"><kbd>⇧</kbd><kbd>⌥</kbd><kbd>F</kbd><span>格式化当前文档</span></div>
        </div>
        <div className="language-cloud" aria-label="支持的编程语言">
          {languages.map((language, index) => <span key={language} style={{ '--i': index } as React.CSSProperties}>{language}</span>)}
          <div className="language-center"><b>14+</b><small>语言</small></div>
        </div>
      </section>

      <section className="section privacy" id="privacy" aria-labelledby="privacy-title">
        <div className="privacy-lock" aria-hidden="true"><div className="lock-ring" /><div className="lock-core">⌂</div></div>
        <div className="privacy-copy">
          <p className="section-kicker">本地优先 / 03</p>
          <h2 id="privacy-title">你的代码，留在你的 Mac。</h2>
          <p>BinBotEditor 围绕本地文件工作。没有账号门槛，没有不透明的同步流程，创作空间始终由你掌控。</p>
          <ul><li><span>01</span> 本地文件直接读写</li><li><span>02</span> 格式化无需联网</li><li><span>03</span> 不收集网站访问数据</li></ul>
        </div>
      </section>
    </>
  )
}
