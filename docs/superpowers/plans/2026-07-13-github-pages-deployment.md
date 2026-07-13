# GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically test, build, and publish BinBotEditorOfficialPage to its GitHub Pages project URL from `main`.

**Architecture:** Vite emits project-relative asset URLs under `/BinBotEditorOfficialPage/`. A two-job GitHub Actions workflow builds a Pages artifact only after tests pass, then deploys it through the official `github-pages` environment.

**Tech Stack:** Vite 5, React 18, Vitest, GitHub Actions, GitHub Pages

## Global Constraints

- Public URL: `https://miyakowork.github.io/BinBotEditorOfficialPage/`.
- Deployment triggers on pushes to `main` and manual dispatch.
- Failed tests or builds must prevent deployment.
- No compiled `dist/` files or `gh-pages` branch are committed.
- Workflow permissions are limited to `contents: read`, `pages: write`, and `id-token: write`.

---

### Task 1: Pages-Aware Asset and Build Paths

**Files:**
- Create: `src/config/assets.ts`
- Test: `src/config/assets.test.ts`
- Modify: `src/components/FeatureSections.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `vite.config.ts`

**Interfaces:**
- Produces: `assetUrl(path: string, base?: string): string`
- Consumes: `import.meta.env.BASE_URL`

- [ ] **Step 1: Write the failing asset path test**

```ts
expect(assetUrl('binbot-editor.svg', '/BinBotEditorOfficialPage/'))
  .toBe('/BinBotEditorOfficialPage/binbot-editor.svg')
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- --run src/config/assets.test.ts`
Expected: FAIL because `assets.ts` does not exist.

- [ ] **Step 3: Implement the minimal asset helper and use it for both logo images**

```ts
export function assetUrl(path: string, base = import.meta.env.BASE_URL) {
  return `${base}${path.replace(/^\/+/, '')}`
}
```

Set `base: '/BinBotEditorOfficialPage/'` in Vite config.

- [ ] **Step 4: Verify the focused test and production paths**

Run: `npm test -- --run src/config/assets.test.ts && npm run build`
Expected: test passes and `dist/index.html` references `/BinBotEditorOfficialPage/assets/`.

- [ ] **Step 5: Commit**

```bash
git add src vite.config.ts
git commit -m "feat: configure GitHub Pages paths"
```

### Task 2: GitHub Pages Workflow and Live Verification

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Modify: `README.md`

**Interfaces:**
- Consumes: `npm test -- --run`, `npm run build`, `dist/`
- Produces: GitHub Pages deployment from `main`

- [ ] **Step 1: Add the official two-job Pages workflow**

The build job checks out the repository, installs Node 20 with npm caching, runs `npm ci`, runs tests, builds, configures Pages, and uploads `dist/`. The deploy job needs build, targets `github-pages`, and publishes with `actions/deploy-pages`.

- [ ] **Step 2: Document the public URL and deployment behavior**

Add the Pages URL and explain that pushes to `main` deploy automatically after tests and builds pass.

- [ ] **Step 3: Run final local verification**

Run: `npm test -- --run && npm run build && git diff --check`
Expected: all tests pass, build exits 0, and no whitespace errors exist.

- [ ] **Step 4: Commit and push**

```bash
git add .github/workflows/deploy-pages.yml README.md
git commit -m "ci: deploy website to GitHub Pages"
git push origin main
```

- [ ] **Step 5: Monitor and verify the live site**

Run: `gh run watch --exit-status`
Expected: build and deploy jobs succeed.

Verify the repository Pages API reports the expected URL, then open the public URL and confirm the page title, stylesheet, logo, and release buttons load without console errors.
