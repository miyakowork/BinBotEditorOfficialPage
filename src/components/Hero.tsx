import { ReleaseButton } from './ReleaseButton'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <p className="eyebrow hero-eyebrow">为 macOS 打造的本地代码编辑器</p>
      <h1 id="hero-title" aria-label="思考，在代码之前。">
        <span aria-hidden="true">思考，</span>
        <span aria-hidden="true">在代码之前。</span>
      </h1>
      <div className="hero-bottom">
        <p className="hero-summary">
          快速、克制、完全本地。把复杂留给工具，
          <span>把空间还给创造者。</span>
        </p>
        <ReleaseButton className="button button--primary" />
      </div>
      <div className="hero-meta" aria-label="产品特性摘要">
        <span>MACOS NATIVE</span><span>LOCAL FIRST</span><span>BUILT-IN FORMATTERS</span>
      </div>
    </section>
  )
}
