import { releaseHistory } from '../content/site'

export function ReleaseNotes() {
  const latestRelease = releaseHistory.find(({ latest }) => latest)
  const previousReleases = releaseHistory.filter(({ latest }) => !latest)

  if (!latestRelease) return null

  return (
    <section className="release-notes section" id="updates" aria-labelledby="updates-title">
      <header className="section-heading">
        <p className="section-kicker">版本更新 / CHANGELOG</p>
        <h2 id="updates-title">把最新变化，留在眼前。</h2>
      </header>
      <article className="release-latest">
        <div className="release-latest__meta">
          <span>最新版本</span>
          <time dateTime={latestRelease.date}>{latestRelease.date.replaceAll('-', '.')}</time>
        </div>
        <div className="release-latest__body">
          <h3>{latestRelease.version}</h3>
          <p>{latestRelease.summary}</p>
          <ul>
            {latestRelease.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </div>
      </article>
      <details className="release-archive">
        <summary>
          <span className="release-archive__eyebrow">历史归档</span>
          <strong>展开 {previousReleases.length} 个历史版本</strong>
          <span className="release-archive__hint">按需查看完整更新</span>
        </summary>
        <ol className="release-archive__list">
          {previousReleases.map((release) => (
            <li key={release.version}>
              <details className="release-archive-entry">
                <summary>
                  <time dateTime={release.date}>{release.date.replaceAll('-', '.')}</time>
                  <div>
                    <h3>{release.version}</h3>
                    <p>{release.summary}</p>
                  </div>
                  <span aria-hidden="true">+</span>
                </summary>
                <ul>
                  {release.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      </details>
    </section>
  )
}
