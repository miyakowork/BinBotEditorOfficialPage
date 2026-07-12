import { useState } from 'react'
import { navigationItems } from '../content/site'
import { ReleaseButton } from './ReleaseButton'

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleLabel = menuOpen ? '关闭导航菜单' : '打开导航菜单'

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="主导航">
        <a className="brand" href="#top" aria-label="BinBotEditor 首页">
          <span className="brand-mark" aria-hidden="true">&lt;/&gt;</span>
          <span>BinBotEditor</span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={toggleLabel}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <div
          className={`nav-panel${menuOpen ? ' nav-panel--open' : ''}`}
          id="primary-navigation"
        >
          <div className="nav-links">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
          <ReleaseButton className="button button--small" compact />
        </div>
      </nav>
    </header>
  )
}
