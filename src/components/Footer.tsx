import { ReleaseButton } from './ReleaseButton'
import { assetUrl } from '../config/assets'

export function Footer() {
  return (
    <footer className="site-footer" id="release">
      <div className="release-panel">
        <img src={assetUrl('binbot-editor.svg')} alt="" />
        <p className="section-kicker">发布计划 / 07</p>
        <h2>把复杂留在编辑器里，把专注留给你。</h2>
        <p>首版仅支持 macOS，试用版本即将发布。</p>
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
