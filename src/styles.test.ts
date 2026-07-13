import { describe, expect, it } from 'vitest'
import css from './styles.css?raw'

describe('luminous paper visual contract', () => {
  it('defines the approved light tokens and motion fallbacks', () => {
    expect(css).toContain('--paper:#f7f5ef')
    expect(css).toContain('--ink:#1d1825')
    expect(css).toContain('--violet:#7047e8')
    expect(css).toContain('--cyan:#4bbfe8')
    expect(css).toContain('@media (hover:none),(pointer:coarse)')
    expect(css).toContain('@media (prefers-reduced-motion:reduce)')
    expect(css).toContain('.reveal[data-visible="true"]')
  })
})
