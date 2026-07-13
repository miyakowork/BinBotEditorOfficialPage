import { describe, expect, it } from 'vitest'
import css from './styles.css?raw'

const compactCss = css.replace(/\s+/g, '')

function blockFor(source: string, marker: string) {
  const markerIndex = source.indexOf(marker)
  if (markerIndex === -1) return ''

  const openBrace = source.indexOf('{', markerIndex + marker.length)
  if (openBrace === -1) return ''

  let depth = 1
  for (let index = openBrace + 1; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1
    if (source[index] === '}') depth -= 1
    if (depth === 0) return source.slice(openBrace + 1, index)
  }

  return ''
}

describe('luminous paper visual contract', () => {
  it('defines the approved light tokens and reveal state', () => {
    expect(css).toContain('--paper:#f7f5ef')
    expect(css).toContain('--ink:#1d1825')
    expect(css).toContain('--violet:#7047e8')
    expect(css).toContain('--cyan:#4bbfe8')
    expect(css).toContain('.reveal[data-visible="true"]')
  })

  it('hooks motion fallbacks to the interactive selectors inside each media query', () => {
    const coarsePointer = blockFor(compactCss, '@media(hover:none),(pointer:coarse)')
    expect(coarsePointer).toContain('.hero-light-field{display:none;}')
    expect(coarsePointer).toContain('.editor-window{transform:none!important;}')
    expect(coarsePointer).toContain('.magnetic-button{transform:none!important;}')

    const reducedMotion = blockFor(compactCss, '@media(prefers-reduced-motion:reduce)')
    expect(reducedMotion).toContain('html{scroll-behavior:auto;}')
    expect(reducedMotion).toContain('.hero-light-field{display:none;}')
    expect(reducedMotion).toContain('.editor-window,.magnetic-button,.reveal{opacity:1!important;transform:none!important;}')
  })

  it('moves the hero light field with transform-only pointer positioning', () => {
    const lightField = blockFor(compactCss, '.hero-light-field')
    expect(lightField).toContain('top:0;')
    expect(lightField).toContain('left:0;')
    expect(lightField).toContain(
      'transform:translate3d(calc(var(--pointer-x,72vw)-280px),calc(var(--pointer-y,20vh)-280px),0);',
    )
    expect(lightField).not.toMatch(/(?:top|left):[^;]*var\(--pointer-/)
    expect(lightField).not.toMatch(/transition:[^;]*(?:top|left)/)
  })

  it('keeps brand anchors at least 44px tall on phone layouts', () => {
    const phone = blockFor(compactCss, '@media(max-width:760px)')
    expect(phone).toContain('.brand{min-height:44px;}')
  })
})
