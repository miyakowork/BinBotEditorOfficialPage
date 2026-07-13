# BinBotEditor Light Visual, Motion, and Copy Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Chinese BinBotEditor homepage as a high-impact light “luminous paper workbench” that truthfully presents the editor’s real macOS, language, offline-formatting, search, Markdown, JSON, session, and customization capabilities.

**Architecture:** Keep the existing static React 18 + TypeScript + Vite application and GitHub Pages workflow. Move product claims into a typed content contract, split the current large feature component into focused narrative sections, and add small motion primitives that use CSS, `IntersectionObserver`, media queries, and direct CSS-variable updates without adding a runtime dependency.

**Tech Stack:** React 18, TypeScript 5, Vite 5, Vitest 2, Testing Library, CSS, local SVG assets, GitHub Pages

## Global Constraints

- The site remains Chinese-only and the first release remains macOS-only.
- Use the approved light “发光纸面工作台” direction: warm-white paper, near-black copy, a dark editor window, purple brand emphasis, and cyan status accents.
- The hero headline is “一台 Mac，就是完整工作台。” and the closing headline is “把复杂留在编辑器里，把专注留给你。”
- Present exactly 31 verified syntax-language labels and exactly 14 verified offline formatter labels; do not invent speed, size, user-count, or performance claims.
- Use “核心编辑无需云端” only for core editing; present AI auto naming as optional and never claim that all AI behavior is offline.
- Every release control displays “首版试用即将发布” and never links to an empty or fabricated installer URL.
- Do not add a backend, analytics, subscriptions, accounts, remote images, a 3D engine, a video background, or a large animation framework.
- Pointer motion writes CSS variables directly and must not cause React rendering on every frame.
- Use `transform` and `opacity` for primary motion; pause the product demo outside the viewport.
- Disable parallax, magnetic movement, looping demos, and spatial tilt under `prefers-reduced-motion: reduce`, on coarse pointers, and on touch layouts.
- Preserve the existing Vite base `/BinBotEditorOfficialPage/` and GitHub Pages workflow.

## File Structure

- `src/content/site.ts`: single source of truth for release state, navigation, capability copy, language labels, formatter labels, workflow items, and FAQ copy.
- `src/content/site.test.ts`: verifies exact capability counts and release/navigation copy.
- `src/components/Hero.tsx`: light hero story, capability pills, and release/discovery actions.
- `src/components/ProductDemo.tsx`: truthful, step-driven editor demonstration; replaces `EditorPreview.tsx`.
- `src/components/CapabilitySections.tsx`: language, formatter, Markdown, and JSON narrative chapters.
- `src/components/WorkflowStrip.tsx`: file tree, global search, tabs, autosave, and session-restore flow.
- `src/components/MacSection.tsx`: macOS-local workflow and optional AI auto-name copy.
- `src/components/Footer.tsx`: closing release chapter and footer links.
- `src/components/Reveal.tsx`: progressive `IntersectionObserver` reveal with visible-by-default fallback.
- `src/components/PointerMotion.tsx`: one global fine-pointer animation-frame controller for light-field and tilt CSS variables.
- `src/components/MagneticButton.tsx`: accessible button primitive with small fine-pointer translation and complete cleanup.
- `src/hooks/useMotionPreferences.ts`: media-query state for reduced motion, hover, and fine pointer.
- `src/hooks/useInView.ts`: generic visibility state with unsupported-browser fallback.
- `src/hooks/useDemoSequence.ts`: interval-driven demo step that pauses while inactive.
- `src/styles.css`: complete light visual system, responsive layout, motion states, and fallbacks.
- `src/styles.test.ts`: source-level guard for the approved color and motion media-query contracts.
- `src/App.tsx`: composes the final semantic page and mounts the single pointer controller.
- `src/App.test.tsx`: verifies the complete public product story and release-state consistency.
- `src/components/Navigation.tsx`: uses the new navigation labels and retains accessible mobile behavior.
- `src/components/ReleaseButton.tsx`: uses the shared release state and `MagneticButton`.
- `README.md`: reflects the new product story and release label.
- Delete `src/components/EditorPreview.tsx` and `src/components/FeatureSections.tsx` after their replacements are composed.

---

### Task 1: Lock the Truthful Product Content Contract

**Files:**
- Create: `src/content/site.test.ts`
- Modify: `src/content/site.ts:1-35`
- Modify: `src/components/ReleaseButton.test.tsx:6-20`
- Modify: `src/components/Navigation.test.tsx:6-25`
- Modify: `src/components/Faq.test.tsx:6-21`

**Interfaces:**
- Produces: `releaseStatus: { label: '首版试用即将发布'; notice: string; available: false }`
- Produces: `supportedLanguages: readonly string[]`
- Produces: `offlineFormatters: readonly string[]`
- Produces: `capabilityChapters: readonly CapabilityChapter[]`
- Produces: `workflowItems: readonly WorkflowItem[]`
- Produces: `navigationItems` with targets `#capabilities`, `#workflow`, `#mac`, and `#release`

- [ ] **Step 1: Write failing content-contract tests**

```ts
import { describe, expect, it } from 'vitest'
import {
  capabilityChapters,
  navigationItems,
  offlineFormatters,
  releaseStatus,
  supportedLanguages,
  workflowItems,
} from './site'

describe('site content contract', () => {
  it('publishes verified language and offline formatter counts', () => {
    expect(supportedLanguages).toHaveLength(31)
    expect(offlineFormatters).toHaveLength(14)
    expect(supportedLanguages).toContain('Markdown')
    expect(offlineFormatters).toEqual(expect.arrayContaining(['Python', 'Kotlin']))
  })

  it('keeps product and release claims consistent', () => {
    expect(releaseStatus).toEqual({
      label: '首版试用即将发布',
      notice: 'BinBotEditor 首版 macOS 试用正在准备中，发布日期尚未公布。',
      available: false,
    })
    expect(navigationItems.map(({ label }) => label)).toEqual([
      '产品能力',
      '工作流',
      '为 Mac 而生',
      '发布计划',
    ])
    expect(capabilityChapters.map(({ id }) => id)).toEqual([
      'languages',
      'formatters',
      'markdown',
      'json',
    ])
    expect(workflowItems).toHaveLength(3)
  })
})
```

Update the existing release-button test to query `首版试用即将发布` and the new notice. Update the navigation test to select the `产品能力` link after opening the mobile menu. Extend the FAQ test to open `代码会上传到云端吗？` and assert `核心编辑和格式化无需云端；可选智能功能仅在启用时参与工作流。` is visible.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- --run src/content/site.test.ts src/components/ReleaseButton.test.tsx src/components/Navigation.test.tsx src/components/Faq.test.tsx`

Expected: FAIL because the new exports and labels do not exist.

- [ ] **Step 3: Implement the typed content contract**

Use these exact verified arrays in `src/content/site.ts`:

```ts
export interface CapabilityChapter {
  id: 'languages' | 'formatters' | 'markdown' | 'json'
  index: string
  eyebrow: string
  title: string
  description: string
  metric: string
}

export interface WorkflowItem {
  id: 'search' | 'tabs' | 'session'
  index: string
  title: string
  description: string
}

export const releaseStatus = {
  label: '首版试用即将发布',
  notice: 'BinBotEditor 首版 macOS 试用正在准备中，发布日期尚未公布。',
  available: false,
} as const

export const navigationItems = [
  { label: '产品能力', href: '#capabilities' },
  { label: '工作流', href: '#workflow' },
  { label: '为 Mac 而生', href: '#mac' },
  { label: '发布计划', href: '#release' },
] as const

export const supportedLanguages = [
  'JavaScript', 'TypeScript', 'JSON', 'Python', 'Java', 'Markdown', 'HTML',
  'CSS', 'SCSS', 'Less', 'C', 'C++', 'Rust', 'PHP', 'SQL', 'XML', 'YAML',
  'Shell', 'Zsh', 'Fish', 'Makefile', 'Go', 'Ruby', 'Swift', 'Kotlin', 'TOML',
  'Properties', 'Nginx', 'Dockerfile', 'Diff', 'Plain Text',
] as const

export const offlineFormatters = [
  'JavaScript', 'TypeScript', 'JSON', 'CSS', 'SCSS', 'HTML', 'Markdown',
  'YAML', 'Shell', 'Dockerfile', 'Java', 'PHP', 'Python', 'Kotlin',
] as const

export const capabilityChapters: readonly CapabilityChapter[] = [
  {
    id: 'languages', index: '01', eyebrow: '打开即懂',
    title: '30+ 种语言，打开即懂。',
    description: '从 TypeScript、Python 到 Kotlin、Dockerfile 与 Markdown，文件打开时即可获得准确的语法识别与高亮。',
    metric: '30+',
  },
  {
    id: 'formatters', index: '02', eyebrow: '格式化不出本机',
    title: '14 种格式化，全部离线。',
    description: 'Prettier、Ruff 与 ktfmt 等格式化引擎随应用提供，常用语言无需安装外部命令，也不依赖网络。',
    metric: '14',
  },
  {
    id: 'markdown', index: '03', eyebrow: 'Markdown 工作流',
    title: '写作与预览，不必来回切换。',
    description: '实时预览、文档大纲、GFM 和代码块高亮，让技术文档与代码处于同一工作区。',
    metric: 'MD',
  },
  {
    id: 'json', index: '04', eyebrow: 'JSON 工具箱',
    title: 'JSON 不只是纯文本。',
    description: '格式化、深度解析、折叠与展开、转义与反转义、压缩复制集中完成。',
    metric: '{}',
  },
]

export const workflowItems: readonly WorkflowItem[] = [
  { id: 'search', index: '01', title: '跨项目搜索', description: '按文件分组结果，并可区分大小写，快速回到需要修改的位置。' },
  { id: 'tabs', index: '02', title: '文件树与多标签', description: '路径、打开状态与编辑上下文始终保持清楚。' },
  { id: 'session', index: '03', title: '自动保存与会话恢复', description: '离开后再次打开，优先恢复当前文件，其余标签按需加载。' },
]
```

Keep the existing FAQ questions, change the local-files answer to “核心编辑和格式化无需云端；可选智能功能仅在启用时参与工作流。”, and keep the release-date answer explicit that no date is announced.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- --run src/content/site.test.ts src/components/ReleaseButton.test.tsx src/components/Navigation.test.tsx src/components/Faq.test.tsx`

Expected: 4 test files pass.

- [ ] **Step 5: Commit the content contract**

```bash
git add src/content/site.ts src/content/site.test.ts src/components/ReleaseButton.test.tsx src/components/Navigation.test.tsx src/components/Faq.test.tsx
git commit -m "feat: define truthful product story"
```

### Task 2: Build the New Hero and Truthful Product Demo

**Files:**
- Modify: `src/components/Hero.tsx:1-24`
- Create: `src/components/ProductDemo.tsx`
- Delete: `src/components/EditorPreview.tsx`
- Modify: `src/App.tsx:1-22`
- Modify: `src/App.test.tsx:5-18`

**Interfaces:**
- Consumes: `releaseStatus` through `ReleaseButton`
- Produces: `Hero(): JSX.Element` with `id="top"` and a `#capabilities` discovery link
- Produces: `ProductDemo({ step?: number }: { step?: number }): JSX.Element`
- Product demo step meanings: `0 = open`, `1 = edit`, `2 = format`, `3 = preview`

- [ ] **Step 1: Rewrite the application-story test to fail on the old page**

```tsx
it('presents the complete local-first macOS story', () => {
  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: '一台 Mac，就是完整工作台。' })).toBeVisible()
  expect(screen.getByText('30+ 语言支持')).toBeVisible()
  expect(screen.getByText('14 种离线格式化')).toBeVisible()
  expect(screen.getByText('核心编辑无需云端')).toBeVisible()
  expect(screen.getByRole('link', { name: '探索产品能力' })).toHaveAttribute('href', '#capabilities')
  expect(screen.getByRole('region', { name: 'BinBotEditor 编辑工作流演示' })).toBeVisible()
  expect(screen.getAllByRole('button', { name: '首版试用即将发布' })).toHaveLength(3)
})
```

- [ ] **Step 2: Run the page test and verify RED**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the old headline, labels, and editor-preview region are still rendered.

- [ ] **Step 3: Implement the light hero content and semantic controls**

Use this structure in `Hero.tsx`:

```tsx
import { ReleaseButton } from './ReleaseButton'

const heroMetrics = ['30+ 语言支持', '14 种离线格式化', '核心编辑无需云端'] as const

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-paper-grid" aria-hidden="true" />
      <div className="hero-light-field" aria-hidden="true" />
      <p className="eyebrow hero-eyebrow">BinBotEditor for macOS · 首版试用即将发布</p>
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
      <div className="hero-metrics" aria-label="产品能力摘要">
        {heroMetrics.map((metric) => <span key={metric}>{metric}</span>)}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Replace the static preview with a four-step product demo**

`ProductDemo` must render one semantic region, a decorative file tree, the tabs `workspace.ts`, `README.md`, and `settings.json`, a code area, a format command, a Markdown-preview panel, and these visible step labels:

```tsx
const demoSteps = [
  { id: 'open', label: '打开文件' },
  { id: 'edit', label: '专注编辑' },
  { id: 'format', label: '离线格式化' },
  { id: 'preview', label: '实时预览' },
] as const

export interface ProductDemoProps { step?: number }

export function ProductDemo({ step = 0 }: ProductDemoProps) {
  const activeStep = Math.max(0, Math.min(step, demoSteps.length - 1))
  return (
    <section className="product-stage" aria-label="BinBotEditor 编辑工作流演示" data-demo-step={demoSteps[activeStep].id}>
      <div className="product-stage-caption">
        <span>LOCAL WORKFLOW</span>
        <strong>{demoSteps[activeStep].label}</strong>
      </div>
      <div className="editor-window">
        <div className="window-bar"><span aria-hidden="true">● ● ●</span><strong>BinBotEditor — workspace</strong><span>本地</span></div>
        <div className="editor-workspace">
          <aside aria-label="文件列表"><b>BINBOT</b><span>workspace.ts</span><span>README.md</span><span>settings.json</span></aside>
          <div className="editor-main"><div className="tab-row"><span>workspace.ts</span><span>README.md</span></div><pre aria-label="代码示例"><code>{`const workspace = createEditor({\n  local: true,\n  formatter: 'offline',\n  restoreSession: true,\n})`}</code></pre><div className="format-command-demo">⇧ ⌥ F <strong>格式化文档</strong></div></div>
          <aside className="preview-pane" aria-label="Markdown 实时预览"><b>实时预览</b><h3>Local-first workflow</h3><p>Write, format, and preview without leaving the workspace.</p></aside>
        </div>
        <div className="status-bar"><span>main*</span><span>TypeScript · UTF-8 · 本地</span></div>
      </div>
      <ol className="demo-step-list">
        {demoSteps.map((item, index) => <li key={item.id} data-active={index === activeStep}>{item.label}</li>)}
      </ol>
    </section>
  )
}
```

Replace `EditorPreview` with `<ProductDemo />` in `App.tsx` and remove the old file.

- [ ] **Step 5: Run the focused and existing component tests**

Run: `npm test -- --run src/App.test.tsx src/components/Navigation.test.tsx src/components/ReleaseButton.test.tsx`

Expected: 3 test files pass.

- [ ] **Step 6: Commit the hero and demo**

```bash
git add src/App.tsx src/App.test.tsx src/components/Hero.tsx src/components/ProductDemo.tsx src/components/EditorPreview.tsx
git commit -m "feat: rebuild hero and product demo"
```

### Task 3: Split and Build the Capability Narrative

**Files:**
- Create: `src/components/CapabilitySections.tsx`
- Create: `src/components/CapabilitySections.test.tsx`
- Create: `src/components/WorkflowStrip.tsx`
- Create: `src/components/MacSection.tsx`
- Delete: `src/components/FeatureSections.tsx`
- Modify: `src/App.tsx:1-22`
- Modify: `src/App.test.tsx:5-18`
- Modify: `src/components/Footer.tsx:1-21`
- Modify: `README.md:1-35`

**Interfaces:**
- Consumes: `capabilityChapters`, `supportedLanguages`, `offlineFormatters`, and `workflowItems` from `src/content/site.ts`
- Produces: `CapabilitySections(): JSX.Element` with `id="capabilities"`
- Produces: `WorkflowStrip(): JSX.Element` with `id="workflow"`
- Produces: `MacSection(): JSX.Element` with `id="mac"`
- Produces: closing footer section with `id="release"`

- [ ] **Step 1: Write the failing capability narrative test**

```tsx
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CapabilitySections } from './CapabilitySections'
import { MacSection } from './MacSection'
import { WorkflowStrip } from './WorkflowStrip'

describe('product narrative sections', () => {
  it('describes verified editor capabilities without unsupported claims', () => {
    render(<><CapabilitySections /><WorkflowStrip /><MacSection /></>)

    const capabilities = screen.getByRole('region', { name: '产品能力' })
    expect(within(capabilities).getByText('30+ 种语言，打开即懂。')).toBeVisible()
    expect(within(capabilities).getByText('14 种格式化，全部离线。')).toBeVisible()
    expect(within(capabilities).getByText('JSON 不只是纯文本。')).toBeVisible()
    expect(screen.getByText('跨项目搜索')).toBeVisible()
    expect(screen.getByText('自动保存与会话恢复')).toBeVisible()
    expect(screen.getByText('智能功能适时出现，但不会接管你的工作流。')).toBeVisible()
  })
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- --run src/components/CapabilitySections.test.tsx`

Expected: FAIL because the split narrative components do not exist.

- [ ] **Step 3: Implement the four capability chapters**

`CapabilitySections` maps `capabilityChapters` into four `<article>` elements. The language chapter renders all `supportedLanguages`; the formatter chapter renders all `offlineFormatters`; Markdown renders a document-outline visual with `实时预览`, `文档大纲`, `GFM`, and `代码块高亮`; JSON renders tool chips `格式化`, `深度解析`, `全部折叠`, `转义`, and `压缩复制`.

Use this outer contract:

```tsx
export function CapabilitySections() {
  return (
    <section className="capabilities section" id="capabilities" aria-label="产品能力">
      <header className="section-heading"><p className="section-kicker">产品能力 / 01—04</p><h2 id="capabilities-title">从第一行，<br />到最后一次保存。</h2></header>
      <div className="capability-list">
        {capabilityChapters.map((chapter) => <article className={`capability capability--${chapter.id}`} key={chapter.id}><div className="capability-copy"><span>{chapter.index}</span><p>{chapter.eyebrow}</p><h3>{chapter.title}</h3><p>{chapter.description}</p></div><div className="capability-visual" aria-label={`${chapter.eyebrow}功能示意`}><b>{chapter.metric}</b>{renderCapabilityVisual(chapter.id)}</div></article>)}
      </div>
    </section>
  )
}
```

Implement `renderCapabilityVisual(id)` as a local exhaustive switch returning the exact label collections described above; the default branch assigns `id` to `never` so TypeScript catches missing variants.

- [ ] **Step 4: Implement workflow, Mac, and release chapters**

`WorkflowStrip` maps the three `workflowItems` into an ordered list and includes a decorative result panel labeled `全局搜索结果`, file-tree panel, and restored-tab row. `MacSection` contains these exact claims:

```tsx
<h2>为你的 Mac，<br />也为你的习惯。</h2>
<p>本地文件直接读写，熟悉的桌面快捷键、主题、字号与换行方式都由你决定。</p>
<blockquote>智能功能适时出现，但不会接管你的工作流。</blockquote>
<ul>
  <li>本地文件工作流</li>
  <li>快捷键与主题可配置</li>
  <li>AI 自动命名可选启用</li>
</ul>
```

Update the footer headline to “把复杂留在编辑器里，把专注留给你。”, state “首版仅支持 macOS，试用版本即将发布。”, and keep one release button. Add `expect(screen.getByRole('heading', { name: '把复杂留在编辑器里，把专注留给你。' })).toBeVisible()` to `App.test.tsx`. Compose `CapabilitySections`, `WorkflowStrip`, and `MacSection` in `App.tsx`, then remove `FeatureSections.tsx`. Update README’s current scope to list “31 种语法语言”“14 种离线格式化”“Markdown 实时预览”“JSON 工具”“全局搜索与会话恢复”, and change the release phrase to “首版试用即将发布”.

- [ ] **Step 5: Run narrative and full DOM tests**

Run: `npm test -- --run src/components/CapabilitySections.test.tsx src/App.test.tsx src/components/Faq.test.tsx`

Expected: 3 test files pass.

- [ ] **Step 6: Commit the product narrative**

```bash
git add src/App.tsx src/App.test.tsx src/components/CapabilitySections.tsx src/components/CapabilitySections.test.tsx src/components/WorkflowStrip.tsx src/components/MacSection.tsx src/components/Footer.tsx src/components/FeatureSections.tsx README.md
git commit -m "feat: add complete capability narrative"
```

### Task 4: Add Motion Primitives and Demo Lifecycle

**Files:**
- Create: `src/hooks/useMotionPreferences.ts`
- Create: `src/hooks/useMotionPreferences.test.tsx`
- Create: `src/hooks/useInView.ts`
- Create: `src/hooks/useInView.test.tsx`
- Create: `src/hooks/useDemoSequence.ts`
- Create: `src/hooks/useDemoSequence.test.tsx`
- Create: `src/components/PointerMotion.tsx`
- Create: `src/components/Reveal.tsx`
- Create: `src/components/MagneticButton.tsx`
- Modify: `src/components/ProductDemo.tsx`
- Modify: `src/components/ReleaseButton.tsx:1-27`
- Modify: `src/App.tsx:1-25`

**Interfaces:**
- Produces: `useMotionPreferences(): { reducedMotion: boolean; finePointer: boolean }`
- Produces: `useInView<T extends Element>(options?: IntersectionObserverInit): { ref: RefObject<T | null>; inView: boolean }`
- Produces: `useDemoSequence({ active, reducedMotion, stepCount, intervalMs? }): number`
- Produces: `PointerMotion(): null`
- Produces: `Reveal({ children, className? }): JSX.Element`
- Produces: `MagneticButton(props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element`

- [ ] **Step 1: Write failing motion hook tests**

```tsx
import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDemoSequence } from './useDemoSequence'

describe('useDemoSequence', () => {
  afterEach(() => vi.useRealTimers())

  it('advances only while active and motion is allowed', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ active, reducedMotion }) => useDemoSequence({ active, reducedMotion, stepCount: 4, intervalMs: 1000 }),
      { initialProps: { active: true, reducedMotion: false } },
    )
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current).toBe(1)
    rerender({ active: false, reducedMotion: false })
    act(() => vi.advanceTimersByTime(2000))
    expect(result.current).toBe(1)
    rerender({ active: true, reducedMotion: true })
    act(() => vi.advanceTimersByTime(2000))
    expect(result.current).toBe(0)
  })
})
```

In `useMotionPreferences.test.tsx`, mock `window.matchMedia` so `(prefers-reduced-motion: reduce)` returns `true` and `(hover: hover) and (pointer: fine)` returns `false`; assert `{ reducedMotion: true, finePointer: false }`. In `useInView.test.tsx`, temporarily set `window.IntersectionObserver` to `undefined` and assert the hook returns `inView: true` so content is visible by default.

- [ ] **Step 2: Run hook tests and verify RED**

Run: `npm test -- --run src/hooks/useMotionPreferences.test.tsx src/hooks/useInView.test.tsx src/hooks/useDemoSequence.test.tsx`

Expected: FAIL because the three hooks do not exist.

- [ ] **Step 3: Implement the motion hooks**

`useDemoSequence` uses this complete lifecycle:

```ts
import { useEffect, useState } from 'react'

export interface DemoSequenceOptions {
  active: boolean
  reducedMotion: boolean
  stepCount: number
  intervalMs?: number
}

export function useDemoSequence({ active, reducedMotion, stepCount, intervalMs = 1800 }: DemoSequenceOptions) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      setStep(0)
      return
    }
    if (!active || stepCount < 2) return
    const timer = window.setInterval(() => setStep((current) => (current + 1) % stepCount), intervalMs)
    return () => window.clearInterval(timer)
  }, [active, intervalMs, reducedMotion, stepCount])

  return step
}
```

`useMotionPreferences` subscribes to both media-query `change` events and removes both listeners during cleanup. `useInView` initializes to `true` when `IntersectionObserver` is absent, otherwise observes its ref target once mounted and disconnects during cleanup.

- [ ] **Step 4: Implement pointer, reveal, and magnetic components**

`PointerMotion` mounts once in `App`. When motion is allowed, listen to `window.pointermove` with `{ passive: true }`, store the newest coordinates, and schedule at most one animation frame. Inside that frame set these root properties:

```ts
root.style.setProperty('--pointer-x', `${x}px`)
root.style.setProperty('--pointer-y', `${y}px`)
root.style.setProperty('--tilt-x', `${((y / window.innerHeight) - 0.5) * -3}deg`)
root.style.setProperty('--tilt-y', `${((x / window.innerWidth) - 0.5) * 3}deg`)
```

Cleanup removes the listener, cancels a pending frame, and removes all four properties. `Reveal` starts with `ready = false`, sets it to `true` in a mount effect, and renders both `data-ready={ready}` and `data-visible={inView}` so static content is visible before JavaScript initializes. `MagneticButton` renders a real `<button>`, applies at most 4px translation based on pointer position when fine-pointer motion is enabled, resets on pointer leave, and forwards all standard button props and the ref.

- [ ] **Step 5: Connect motion to the demo and release controls**

In `ProductDemo`, use `useInView<HTMLElement>()`, `useMotionPreferences()`, and `useDemoSequence({ active: inView, reducedMotion, stepCount: 4 })`; remove the public `step` prop and pass the hook result to the existing markup. In `ReleaseButton`, replace the inner native button with `MagneticButton` without changing the notice state or accessible label. Mount `<PointerMotion />` once before `<Navigation />` in `App` and wrap narrative chapter contents with `Reveal` rather than placing observers on every decorative element.

- [ ] **Step 6: Run motion and interaction tests**

Run: `npm test -- --run src/hooks src/components/ReleaseButton.test.tsx src/App.test.tsx`

Expected: all motion-hook, release-control, and application tests pass with no unhandled timer warnings.

- [ ] **Step 7: Commit the motion system**

```bash
git add src/hooks src/components/PointerMotion.tsx src/components/Reveal.tsx src/components/MagneticButton.tsx src/components/ProductDemo.tsx src/components/ReleaseButton.tsx src/App.tsx
git commit -m "feat: add accessible motion system"
```

### Task 5: Rebuild the Visual System as Luminous Paper

**Files:**
- Create: `src/styles.test.ts`
- Replace: `src/styles.css:1-28`

**Interfaces:**
- Consumes: all semantic class names from Tasks 2–4 and root CSS variables from `PointerMotion`
- Produces: desktop, tablet, phone, coarse-pointer, and reduced-motion presentations without horizontal overflow

- [ ] **Step 1: Write the failing style-contract test**

```ts
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
```

- [ ] **Step 2: Run the style test and verify RED**

Run: `npm test -- --run src/styles.test.ts`

Expected: FAIL because the existing CSS still defines the dark night-workbench tokens.

- [ ] **Step 3: Replace the root, navigation, and hero visual system**

Define the exact compact tokens required by the test plus `--paper-raised:#fffdf9`, `--muted:#756e80`, `--line:rgba(40,28,60,.12)`, `--editor:#15131a`, and `--serif:"Songti SC","STSong",serif`. Use warm paper on `body`, a low-opacity fixed noise overlay, a pale translucent navigation bar, a purple primary button, an oversized near-black hero title, and a dark product editor that overlaps the lower hero boundary. The hero light field uses `--pointer-x` and `--pointer-y`; the editor transform uses `rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`.

- [ ] **Step 4: Style capabilities and product micro-demos**

Use alternating two-column capability chapters, 1px paper-grid rules, oversized metrics, dark code/JSON visuals, and a light Markdown document visual. Give each workflow item a clear ordinal and connect them with one continuous rule. Keep primary paragraph line length at or below 36 Chinese characters on desktop and maintain visible focus outlines using the violet token.

- [ ] **Step 5: Add responsive and motion states**

At `max-width: 980px`, remove overlapping capability geometry and use a single-column sequence. At `max-width: 760px`, switch hero actions and workflow cards to one column, constrain the editor to the viewport, hide the least important editor side panel, reduce headline size with `clamp(54px, 16vw, 78px)`, and keep touch targets at least 44px.

Add these behavior contracts exactly:

```css
.reveal{opacity:1;transform:none}
.reveal[data-ready="true"]{opacity:0;transform:translateY(28px)}
.reveal[data-ready="true"][data-visible="true"]{opacity:1;transform:none;transition:opacity .7s ease,transform .7s cubic-bezier(.2,.8,.2,1)}
@media (hover:none),(pointer:coarse){.hero-light-field{display:none}.editor-window{transform:none!important}.magnetic-button{transform:none!important}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}.hero-light-field{display:none}.editor-window,.magnetic-button,.reveal{transform:none!important;opacity:1!important}}
```

The `Reveal` component must set `data-ready="true"` only after mounting so server/static content is never initially hidden.

- [ ] **Step 6: Run style, DOM, and production-build checks**

Run: `npm test -- --run src/styles.test.ts src/App.test.tsx src/components/CapabilitySections.test.tsx`

Expected: 3 test files pass.

Run: `npm run build`

Expected: TypeScript and Vite exit 0 and generate `dist/` under `/BinBotEditorOfficialPage/` asset paths.

- [ ] **Step 7: Commit the light visual system**

```bash
git add src/styles.css src/styles.test.ts src/components/Reveal.tsx
git commit -m "feat: apply luminous paper visual system"
```

### Task 6: Browser QA, Online Deployment, and Evidence

**Files:**
- Modify implementation or test files only when browser QA exposes a reproducible defect; write the failing regression test before each fix.
- No deployment-workflow modification is expected.

**Interfaces:**
- Consumes: verified local Vite production build and existing `.github/workflows/deploy-pages.yml`
- Produces: verified GitHub Pages site at `https://miyakowork.github.io/BinBotEditorOfficialPage/`

- [ ] **Step 1: Start a local preview without taking over an existing service**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a local URL. Record whether this task started the process; stop only that process after browser verification.

- [ ] **Step 2: Inspect desktop, tablet, phone, and reduced-motion states**

At 1440×1000 verify the full light field, title reveal, editor tilt, four-step demo, alternating chapters, hover states, and no console errors. At 768×1024 verify single-column chapters and readable product panels. At 390×844 verify no horizontal overflow, at least 44px controls, visible copy, simplified editor, and a closed-by-default mobile menu. Emulate `prefers-reduced-motion: reduce` and confirm the demo remains on a stable step with no parallax, magnetic movement, looping, or reveal translation.

- [ ] **Step 3: Run the final local verification gate**

Run: `npm test -- --run`

Expected: every test file passes.

Run: `npm run build`

Expected: exit 0 and a complete `dist/` directory.

Run: `git diff --check`

Expected: no output.

Run: `git status --short --branch`

Expected: `main` contains only the intentional commits from this plan and no temporary browser artifacts.

- [ ] **Step 4: Push the verified main branch**

Run: `git push origin main`

Expected: the remote `main` advances through the plan’s final commit and triggers the existing Pages workflow.

- [ ] **Step 5: Verify GitHub Actions and the live site**

Run: `gh run list --workflow "Deploy website to GitHub Pages" --limit 1`

Expected: the newest run targets the pushed commit and completes successfully.

Open `https://miyakowork.github.io/BinBotEditorOfficialPage/` and confirm the live heading “一台 Mac，就是完整工作台。”, loaded stylesheet and SVG, three release controls, no horizontal overflow at desktop and phone widths, and no console errors.

- [ ] **Step 6: Record final evidence**

Report the final commit, automated test count, production-build result, GitHub Actions run URL, and live Pages URL. Do not claim deployment success until both the workflow and live page have been checked.
