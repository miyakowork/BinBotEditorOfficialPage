import { ReleaseButton } from './ReleaseButton'
import { assetUrl } from '../config/assets'

export function Footer() {
  return (
    <footer className="site-footer" id="release">
      <div className="release-panel">
        <img src={assetUrl('binbot-editor.svg')} alt="" />
        <p className="section-kicker">立即下载 / 07</p>
        <h2>把复杂留在编辑器里，把专注留给你。</h2>
        <p>BinBotEditor v0.1.0-beta 已开放试用。</p>
        <ReleaseButton className="button button--primary" />
      </div>
      <div className="footer-row">
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">&lt;/&gt;</span><span>BinBotEditor</span></a>
        <p>为专注创作而生 · macOS Apple Silicon 试用版</p>
        <a href="#top">回到顶部 ↑</a>
      </div>
    </footer>
  )
}
