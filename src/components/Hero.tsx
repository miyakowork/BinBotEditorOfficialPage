import { ReleaseButton } from './ReleaseButton'

const heroMetrics = [
  { value: '30+', label: '语言支持' },
  { value: '14', label: '种离线格式化' },
  { value: '核心编辑', label: '无需云端' },
] as const

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-paper-grid" aria-hidden="true" />
      <div className="hero-light-field" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">BinBotEditor for macOS · v0.6.0 已发布</p>
        <h1 id="hero-title" aria-label="一台 Mac，就是完整工作台。">
          <span aria-hidden="true">一台 Mac，</span>
          <span aria-hidden="true">就是<span className="accent-word">完整工作台。</span></span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-summary">从打开本地文件，到跨项目搜索、离线格式化与 Markdown 实时预览。BinBotEditor 把日常编辑需要的能力，收进一个快速、专注、可自由配置的 macOS 编辑器。</p>
          <div className="hero-actions">
            <ReleaseButton className="button button--primary" />
            <a className="text-link" href="#capabilities">探索产品能力 <span aria-hidden="true">↘</span></a>
          </div>
        </div>
        <ul className="hero-metrics" aria-label="产品能力摘要">
          {heroMetrics.map((metric) => (
            <li key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
