import {
  capabilityChapters,
  offlineFormatters,
  supportedLanguages,
  type CapabilityChapter,
} from '../content/site'

function renderCapabilityVisual(id: CapabilityChapter['id']) {
  switch (id) {
    case 'languages':
      return (
        <div className="capability-tags" aria-label="支持的语法语言">
          {supportedLanguages.map((language) => <span key={language}>{language}</span>)}
        </div>
      )
    case 'formatters':
      return (
        <div className="capability-tags" aria-label="支持的离线格式化">
          {offlineFormatters.map((formatter) => <span key={formatter}>{formatter}</span>)}
        </div>
      )
    case 'markdown':
      return (
        <div className="document-outline">
          <div className="document-outline__preview">
            <span>实时预览</span>
            <strong>文档大纲</strong>
            <span>GFM</span>
          </div>
          <span className="document-outline__code">代码块高亮</span>
        </div>
      )
    case 'json':
      return (
        <div className="json-tools">
          {['格式化', '深度解析', '全部折叠', '转义', '压缩复制'].map((tool) => <span key={tool}>{tool}</span>)}
        </div>
      )
    case 'tools':
      return (
        <div className="local-tools-board" aria-label="本地常用工具">
          <div className="local-tools-board__bar"><span>TOOLS</span><strong>工具 Tab · 5 个工作台</strong></div>
          <div className="local-tools-board__grid">
            {[
              ['时间工具', '时间戳 · 本地', 'local'],
              ['cURL 解析', '只解析 · 不执行', 'local'],
              ['HTTP 请求', '导入 cURL · 显式发送', 'network'],
              ['编码与加密', 'SHA-2 · AES-GCM', 'local'],
              ['AI 翻译', '自备 Key · 主动联网', 'network'],
            ].map(([name, detail, scope]) => (
              <div className="local-tool-card" data-scope={scope} key={name}>
                <strong>{name}</strong>
                <span>{detail}</span>
              </div>
            ))}
          </div>
          <p>输入仅留在当前工具 Tab；网络能力始终由你主动触发。</p>
        </div>
      )
    default: {
      const exhaustiveId: never = id
      return exhaustiveId
    }
  }
}

export function CapabilitySections() {
  return (
    <section className="capabilities section" id="capabilities" aria-label="产品能力">
      <header className="section-heading">
        <p className="section-kicker">产品能力 / 01—05</p>
        <h2 id="capabilities-title">从第一行，到最后一次保存。</h2>
      </header>
      <div className="capability-list">
        {capabilityChapters.map((chapter) => (
          <article className={`capability capability--${chapter.id}`} key={chapter.id}>
            <div className="capability-copy">
              <span>{chapter.index}</span>
              <p>{chapter.eyebrow}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
            </div>
            <div className="capability-visual" aria-label={`${chapter.eyebrow}功能示意`}>
              <b>{chapter.metric}</b>
              {renderCapabilityVisual(chapter.id)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
