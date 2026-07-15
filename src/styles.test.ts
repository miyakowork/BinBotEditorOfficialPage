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

function customProperty(block: string, property: string) {
  return block.match(new RegExp(`${property}:([^;]+);`))?.[1] ?? ''
}

function relativeLuminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => (
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4
    ))

  if (!channels || channels.length !== 3 || channels.some(Number.isNaN)) return Number.NaN
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background))
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background))
  return (lighter + 0.05) / (darker + 0.05)
}

describe('luminous paper visual contract', () => {
  it('centers download labels with a crisp dedicated text layer', () => {
    const button = blockFor(compactCss, '.button')

    expect(button).toContain('display:inline-flex;')
    expect(button).toContain('align-items:center;')
    expect(button).toContain('justify-content:center;')
    expect(button).toContain('line-height:1;')
    expect(compactCss).toContain('.button-label{display:inline-block;-webkit-font-smoothing:antialiased;')
  })

  it('defines the approved light tokens and reveal state', () => {
    expect(css).toContain('--paper:#f7f5ef')
    expect(css).toContain('--ink:#1d1825')
    expect(css).toContain('--violet:#7047e8')
    expect(css).toContain('--cyan:#4bbfe8')
    expect(css).toContain('.reveal[data-visible="true"]')
  })

  it('hooks motion fallbacks to the interactive selectors inside each media query', () => {
    const coarsePointer = blockFor(
      compactCss,
      '@media(hover:none),(pointer:coarse),(any-pointer:coarse)',
    )
    expect(coarsePointer).toContain('.hero-light-field{display:none;}')
    const coarseEditor = blockFor(coarsePointer, '.editor-window')
    expect(coarseEditor).toContain('transform:none!important;')
    expect(coarseEditor).toContain('animation:none!important;')
    expect(coarsePointer).toContain('.magnetic-button{transform:none!important;}')
    expect(coarsePointer).toContain('.reveal{opacity:1!important;transform:none!important;transition:none!important;}')

    const reducedMotion = blockFor(compactCss, '@media(prefers-reduced-motion:reduce)')
    expect(reducedMotion).toContain('html{scroll-behavior:auto;}')
    expect(reducedMotion).toContain('.hero-light-field{display:none;}')
    expect(reducedMotion).toContain('.editor-window,.magnetic-button,.reveal,.hero-copy>*{')
  })

  it('uses an AA-compliant cyan token for meaningful product-stage text', () => {
    const root = blockFor(compactCss, ':root')
    const paper = customProperty(root, '--paper')
    const cyanText = customProperty(root, '--cyan-text')
    const caption = blockFor(css, '.product-stage-caption strong').replace(/\s+/g, '')

    expect(paper).toMatch(/^#[\da-f]{6}$/i)
    expect(cyanText).toMatch(/^#[\da-f]{6}$/i)
    expect(contrastRatio(cyanText, paper)).toBeGreaterThanOrEqual(4.5)
    expect(caption).toContain('color:var(--cyan-text);')
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

  it('keeps the phone hero readable without overlapping release actions', () => {
    const phone = blockFor(compactCss, '@media(max-width:760px)')

    expect(blockFor(phone, '.heroh1')).toContain('font-size:clamp(42px,11vw,56px);')
    expect(blockFor(phone, '.hero-actions')).toContain('padding-bottom:0;')
    expect(blockFor(phone, '.hero.release-notice')).toContain('position:static;')
    expect(blockFor(phone, '.hero.release-notice')).toContain('width:100%;')
  })

  it('shows the preview result when visitors select that step on phones', () => {
    const phone = blockFor(compactCss, '@media(max-width:760px)')

    expect(phone).toContain('.product-stage[data-demo-step="preview"].editor-main{display:none;}')
    expect(phone).toContain('.product-stage[data-demo-step="preview"].preview-pane{display:block;grid-column:2;')
    expect(phone).toContain('.editor-main.code-line-number{width:21px;}')
    expect(phone).not.toContain('.editor-maincodei{')
  })

  it('defines the editorial hero stage and interactive demo motion contract', () => {
    const root = blockFor(compactCss, ':root')
    const productStage = blockFor(compactCss, '.product-stage')
    const phone = blockFor(compactCss, '@media(max-width:760px)')
    const reducedMotion = blockFor(compactCss, '@media(prefers-reduced-motion:reduce)')

    expect(customProperty(root, '--hero-stage-width')).toBe('min(900px,60vw)')
    expect(customProperty(root, '--hero-stage-overlap')).toBe('-700px')
    expect(productStage).toContain('width:var(--hero-stage-width);')
    expect(productStage).toContain('margin:var(--hero-stage-overlap)32px0auto;')
    expect(compactCss).toContain('@keyframeseditor-settle')
    expect(compactCss).toContain('.demo-step-listbutton')
    expect(blockFor(compactCss, '.preview-pane')).toContain('background:#19171f;')
    expect(blockFor(compactCss, '.preview-pane')).toContain('color:#f6f1fb;')
    expect(phone).toContain('.product-stage{width:100%;margin-top:-86px;')
    const reducedHero = blockFor(
      reducedMotion,
      '.editor-window,.magnetic-button,.reveal,.hero-copy>*',
    )
    expect(reducedHero).toContain('opacity:1!important;')
    expect(reducedHero).toContain('transform:none!important;')
    expect(reducedHero).toContain('animation:none!important;')
  })
})
