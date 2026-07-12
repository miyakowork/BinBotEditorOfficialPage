# BinBotEditor Official Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished Chinese single-page macOS product website for BinBotEditor with a consistent “coming soon” download state.

**Architecture:** A static React + TypeScript + Vite application composed from focused page sections and local content data. Interactive behavior is limited to accessible navigation, FAQ disclosure, reveal animations, and a shared release-status notice; there is no backend or persistent browser state.

**Tech Stack:** React 18, TypeScript 5, Vite 5, Vitest, Testing Library, CSS, local SVG assets

## Global Constraints

- The public website is Chinese-only and macOS-only for the first release.
- Every download entry must display “macOS 版即将发布” and must not navigate to an empty or fabricated download URL.
- The site must not collect email, analytics, or other user data.
- Production content and visual assets must not depend on remote images or backend services.
- Non-essential motion must be disabled under `prefers-reduced-motion: reduce`.
- The GitHub repository name is `BinBotEditorOfficialPage`, private, with default branch `main`.

---

### Task 1: Application Shell and Release-State Contract

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/content/site.ts`
- Create: `src/components/ReleaseButton.tsx`
- Test: `src/components/ReleaseButton.test.tsx`
- Test: `src/setupTests.ts`

**Interfaces:**
- Produces: `releaseStatus: { label: string; notice: string; available: false }`
- Produces: `ReleaseButton({ className?, compact? }: ReleaseButtonProps): JSX.Element`

- [ ] **Step 1: Scaffold test tooling and write the failing release-state test**

```tsx
render(<ReleaseButton />)
expect(screen.getByRole('button', { name: 'macOS 版即将发布' })).toBeEnabled()
await userEvent.click(screen.getByRole('button', { name: 'macOS 版即将发布' }))
expect(screen.getByRole('status')).toHaveTextContent('BinBotEditor 正在为首次发布做准备')
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- --run src/components/ReleaseButton.test.tsx`
Expected: FAIL because `ReleaseButton` does not exist.

- [ ] **Step 3: Implement the shared content contract and minimal button**

```tsx
export function ReleaseButton() {
  const [open, setOpen] = useState(false)
  return <><button type="button" onClick={() => setOpen(true)}>{releaseStatus.label}</button>{open ? <p role="status">{releaseStatus.notice}</p> : null}</>
}
```

- [ ] **Step 4: Run the focused test and verify GREEN, then build the empty shell**

Run: `npm test -- --run src/components/ReleaseButton.test.tsx`
Expected: 1 test file passes.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig*.json vite.config.ts index.html src
git commit -m "feat: scaffold homepage release state"
```

### Task 2: Accessible Navigation and FAQ

**Files:**
- Create: `src/components/Navigation.tsx`
- Create: `src/components/Faq.tsx`
- Test: `src/components/Navigation.test.tsx`
- Test: `src/components/Faq.test.tsx`

**Interfaces:**
- Consumes: navigation and FAQ copy from `src/content/site.ts`
- Produces: `Navigation(): JSX.Element`
- Produces: `Faq(): JSX.Element`

- [ ] **Step 1: Write failing interaction tests**

```tsx
render(<Navigation />)
await userEvent.click(screen.getByRole('button', { name: '打开导航菜单' }))
expect(screen.getByRole('button', { name: '关闭导航菜单' })).toHaveAttribute('aria-expanded', 'true')

render(<Faq />)
await userEvent.click(screen.getByRole('button', { name: 'BinBotEditor 支持哪些平台？' }))
expect(screen.getByText('首版专注于 macOS。')).toBeVisible()
```

- [ ] **Step 2: Run both test files and verify RED**

Run: `npm test -- --run src/components/Navigation.test.tsx src/components/Faq.test.tsx`
Expected: FAIL because both components are missing.

- [ ] **Step 3: Implement semantic disclosure state**

```tsx
const [menuOpen, setMenuOpen] = useState(false)
const [openId, setOpenId] = useState<string | null>(null)
```

Use real buttons, `aria-expanded`, `aria-controls`, and section IDs; close the mobile navigation after a link is selected.

- [ ] **Step 4: Run both tests and verify GREEN**

Run: `npm test -- --run src/components/Navigation.test.tsx src/components/Faq.test.tsx`
Expected: both test files pass.

- [ ] **Step 5: Commit**

```bash
git add src/components src/content/site.ts
git commit -m "feat: add accessible homepage navigation"
```

### Task 3: Night Workbench Page and Responsive Styling

**Files:**
- Create: `public/binbot-editor.svg`
- Create: `src/components/EditorPreview.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/FeatureSections.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/hooks/useReveal.ts`
- Create: `src/styles.css`
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `ReleaseButton`, navigation/content data, local logo
- Produces: complete semantic page with section IDs `top`, `features`, `formatting`, `privacy`, `faq`, `release`

- [ ] **Step 1: Write a failing page-content test**

```tsx
render(<App />)
expect(screen.getByRole('heading', { level: 1, name: '思考，在代码之前。' })).toBeVisible()
expect(screen.getByRole('region', { name: '内置格式化' })).toBeVisible()
expect(screen.getByText('你的代码，留在你的 Mac。')).toBeVisible()
expect(screen.getAllByRole('button', { name: 'macOS 版即将发布' })).toHaveLength(2)
```

- [ ] **Step 2: Run the page test and verify RED**

Run: `npm test -- --run src/App.test.tsx`
Expected: FAIL because the page sections are not implemented.

- [ ] **Step 3: Build the semantic section components and compose App**

```tsx
export default function App() {
  return <><Navigation /><main><Hero /><EditorPreview /><FeatureSections /><Faq /></main><Footer /></>
}
```

Use a restrained near-black/deep-violet palette, oversized editorial headings, a layered product window, asymmetric feature layout, local decorative SVG, and visible focus states.

- [ ] **Step 4: Add responsive and reduced-motion CSS**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

At `max-width: 760px`, switch feature grids to one column, enable the mobile menu, reduce display type, and remove preview perspective.

- [ ] **Step 5: Run page and full tests, verify GREEN, and build**

Run: `npm test -- --run`
Expected: all tests pass.

Run: `npm run build`
Expected: TypeScript and Vite exit 0 and create `dist/`.

- [ ] **Step 6: Commit**

```bash
git add public src
git commit -m "feat: build night workbench homepage"
```

### Task 4: Browser QA, Documentation, and Private GitHub Publication

**Files:**
- Create: `README.md`
- Modify: `.gitignore`
- Modify: implementation files only when QA exposes a reproducible issue; add a failing regression test before each fix.

**Interfaces:**
- Consumes: complete Vite application and GitHub CLI authentication
- Produces: verified private repository `BinBotEditorOfficialPage` on GitHub

- [ ] **Step 1: Run the production preview and inspect desktop/tablet/mobile**

Run: `npm run dev -- --host 127.0.0.1`
Expected: Vite prints a local URL.

Inspect 1440x1000, 768x1024, and 390x844. Confirm no horizontal overflow, all navigation targets work, FAQ is keyboard-operable, and the notice appears from both release buttons.

- [ ] **Step 2: Add project documentation**

Document `npm install`, `npm run dev`, `npm test`, and `npm run build`, plus the current macOS “coming soon” status.

- [ ] **Step 3: Run final verification**

Run: `npm test -- --run && npm run build && git diff --check && git status -sb`
Expected: all tests pass, build exits 0, no whitespace errors, and only intended files are present.

- [ ] **Step 4: Commit verified documentation and QA fixes**

```bash
git add README.md .gitignore src public
git commit -m "docs: document official homepage"
```

- [ ] **Step 5: Create and push the private repository**

Run: `gh auth status`
Expected: authenticated GitHub account.

Run: `gh repo create BinBotEditorOfficialPage --private --source=. --remote=origin --push`
Expected: private repository is created and `main` is pushed to `origin`.
