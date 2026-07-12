const codeLines = [
  ['01', 'import', " { focus } ", 'from', " '@binbot/editor'"],
  ['02', ''],
  ['03', 'const', ' workspace = ', 'createEditor', '({'],
  ['04', '  theme: ', "'midnight'", ','],
  ['05', '  local: ', 'true', ','],
  ['06', '  distractions: ', 'false', ','],
  ['07', '})'],
  ['08', ''],
  ['09', 'workspace.', 'open', "('idea.ts')"],
] as const

export function EditorPreview() {
  return (
    <section className="preview-section" aria-label="BinBotEditor 产品界面">
      <div className="preview-orbit preview-orbit--one" aria-hidden="true" />
      <div className="preview-orbit preview-orbit--two" aria-hidden="true" />
      <div className="editor-window">
        <div className="window-bar">
          <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
          <span>BinBotEditor — workspace</span>
          <span className="window-status">本地</span>
        </div>
        <div className="editor-body">
          <aside className="file-panel" aria-label="文件列表">
            <div className="panel-title">EXPLORER</div>
            <div className="folder">⌄ &nbsp; BINBOT</div>
            <div className="file active"><span>TS</span> idea.ts</div>
            <div className="file"><span>TSX</span> workspace.tsx</div>
            <div className="file"><span>MD</span> README.md</div>
            <div className="file"><span>⚙</span> package.json</div>
          </aside>
          <div className="code-panel">
            <div className="tab-row"><span className="tab active">idea.ts&nbsp;&nbsp;×</span><span className="tab">README.md</span></div>
            <div className="breadcrumbs">src&nbsp; › &nbsp;idea.ts&nbsp; › &nbsp;workspace</div>
            <pre aria-label="代码示例">
              {codeLines.map(([number, ...tokens]) => (
                <span className="code-line" key={number}>
                  <b>{number}</b>
                  <span>{tokens.map((token, index) => <i key={`${number}-${index}`}>{token}</i>)}</span>
                </span>
              ))}
            </pre>
            <div className="command-palette">
              <span>⌘</span><strong>格式化文档</strong><kbd>⇧ ⌥ F</kbd>
            </div>
          </div>
          <aside className="outline-panel">
            <div className="panel-title">OUTLINE</div>
            <p><span>◇</span> workspace</p><p><span>ƒ</span> open</p><p><span>ƒ</span> format</p>
          </aside>
        </div>
        <div className="status-bar"><span>main*</span><span>Ln 9, Col 28&nbsp;&nbsp; UTF-8&nbsp;&nbsp; TypeScript</span></div>
      </div>
    </section>
  )
}
