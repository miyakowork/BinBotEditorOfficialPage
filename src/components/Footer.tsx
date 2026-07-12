import { ReleaseButton } from './ReleaseButton'

export function Footer() {
  return (
    <footer className="site-footer" id="release">
      <div className="release-panel">
        <img src="/binbot-editor.svg" alt="" />
        <p className="section-kicker">即将抵达 / 04</p>
        <h2>下一段代码，<br />从这里开始。</h2>
        <p>BinBotEditor for macOS 正在准备首次公开发布。</p>
        <ReleaseButton className="button button--primary" />
      </div>
      <div className="footer-row">
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">&lt;/&gt;</span><span>BinBotEditor</span></a>
        <p>为专注创作而生 · macOS 版即将发布</p>
        <a href="#top">回到顶部 ↑</a>
      </div>
    </footer>
  )
}
