import { releaseHistory } from '../content/site'

export function ReleaseNotes() {
  return (
    <section className="release-notes section" id="updates" aria-labelledby="updates-title">
      <header className="section-heading">
        <p className="section-kicker">版本更新 / CHANGELOG</p>
        <h2 id="updates-title">每次更新，都有迹可循。</h2>
      </header>
      <div className="release-timeline">
        {releaseHistory.map((release) => (
          <article
            className={`release-entry${release.latest ? ' release-entry--latest' : ''}`}
            key={release.version}
          >
            <div className="release-entry__meta">
              <time dateTime={release.date}>{release.date.replaceAll('-', '.')}</time>
              {release.latest ? <span>最新版本</span> : null}
            </div>
            <div className="release-entry__body">
              <h3>{release.version}</h3>
              <p>{release.summary}</p>
              <ul>
                {release.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
