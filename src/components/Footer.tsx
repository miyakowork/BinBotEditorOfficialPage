import { ReleaseButton } from './ReleaseButton'
import { assetUrl } from '../config/assets'

export function Footer() {
  return (
    <footer className="site-footer" id="release">
      <div className="release-panel">
        <img src={assetUrl('binbot-editor.svg')} alt="" />
        <p className="section-kicker">立即下载 / 09</p>
        <h2>把复杂留在编辑器里，把专注留给你。</h2>
        <p>BinBotEditor v0.6.1 已开放下载。</p>
        <ReleaseButton className="button button--primary" />
      </div>
      <div className="footer-row">
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">&lt;/&gt;</span><span>BinBotEditor</span></a>
        <p>为专注创作而生 · macOS Apple Silicon 正式版</p>
        <a href="#top">回到顶部 ↑</a>
      </div>
    </footer>
  )
}
