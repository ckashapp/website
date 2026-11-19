# Ckash Responsive Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every Ckash route intentionally usable from 320px through 2560px while preserving the existing visual identity, content, hero animation, and section-motion system.

**Architecture:** Keep the existing Tailwind breakpoint system and repair responsive behavior at the shared primitive and component boundaries where it originates. Full-bleed backgrounds remain full width, while content uses controlled max-widths, fluid grid tracks, natural heights, contained imagery, and mobile flow. Browser QA supplies the visual/layout evidence that component tests cannot provide.

**Tech Stack:** React 18, TypeScript/JSX, Vite, Tailwind CSS 3, Framer Motion, Vitest, Testing Library, Playwright/browser QA.

**Spec:** `docs/superpowers/specs/2026-09-15-responsive-polish-design.md`

## Global Constraints

- This task is ONLY about responsive behavior across screen sizes.
- DO NOT redesign the website.
- DO NOT change the visual identity.
- DO NOT change the established typography system unnecessarily.
- DO NOT replace existing content or introduce new sections.
- DO NOT change the existing hero animation.
- Preserve the current uncommitted section-motion work as the baseline.
- Do not use device-specific hacks or add a parallel breakpoint system.
- Do not use `overflow-x: hidden` as a universal substitute for fixing the underlying layout.
- The footer wordmark uses 70% opacity and masks its bottom 20%.

---

### Task 1: Establish audit baselines and responsive contracts

**Files:**
- Modify: `src/components/sections/Footer.test.tsx`
- Modify: `src/components/sections/Navbar.test.tsx`
- Modify: `src/components/sections/HowItWorks.test.tsx`
- Create: `src/pages/ResponsiveLayout.test.tsx`

**Interfaces:**
- Consumes: Existing component DOM contracts and `data-motion-*` attributes.
- Produces: Focused assertions for footer treatment, mobile navigation controls, mobile natural-flow behavior, and route-level overflow-prone structure.

- [ ] **Step 1: Run the current focused tests**

```powershell
npm.cmd test -- --run src/components/sections/Footer.test.tsx src/components/sections/Navbar.test.tsx src/components/sections/HowItWorks.test.tsx
```

Expected: the focused suite completes; record pre-existing failures without changing unrelated files.

- [ ] **Step 2: Update the footer contract**

In `Footer.test.tsx`, change the current wordmark expectations to:

```tsx
expect(wordmark).toHaveClass("w-screen", "opacity-70");
expect(wordmark).not.toHaveClass("w-[160%]", "opacity-[0.15]");
expect(wordmarkFade).toHaveClass("bottom-0", "h-[20%]");
```

- [ ] **Step 3: Add route structure coverage**

Create `src/pages/ResponsiveLayout.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "./Index";
import BlogPage from "./BlogPage";
import FAQ from "./FAQ";
import NotFound from "./NotFound";

describe("responsive route structure", () => {
  it.each([
    ["landing page", () => <Index />],
    ["blog page", () => <BlogPage />],
    ["faq page", () => <FAQ />],
    ["not found page", () => <NotFound />],
  ])("keeps %s free of viewport-wide unbounded content", (_name, createPage) => {
    const { container } = render(createPage());
    expect(container.firstElementChild).toBeTruthy();
    expect(container.querySelector(".w-screen.max-w-none")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run the new focused checks**

```powershell
npx.cmd vitest run src/components/sections/Footer.test.tsx src/pages/ResponsiveLayout.test.tsx
```

Expected: the footer test fails on the old `opacity-100`/`h-[22%]` implementation until Task 8; route checks pass or expose a real existing issue.

---

### Task 2: Normalize shared page-grid and section spacing primitives

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.ts`
- Modify: `src/components/ck/SectionWrapper.tsx`
- Modify: `src/components/sections/BlogSection.tsx`
- Modify: `src/components/sections/WhyCkashSection.tsx`
- Modify: `src/components/sections/SwapSection.tsx`
- Modify: `src/components/sections/SecurityControlSection.tsx`

**Interfaces:**
- Consumes: Existing Tailwind utilities and section components.
- Produces: Shared container/gutter behavior that aligns navigation, hero, sections, cards, and footer without changing backgrounds.

- [ ] **Step 1: Add shared fluid container primitives**

Inside `@layer components` in `src/index.css`, add:

```css
  .page-container {
    width: 100%;
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: clamp(1rem, 3vw, 2.5rem);
  }

  .section-gutter {
    padding-block: clamp(3.5rem, 8vw, 7rem);
  }
```

Do not alter existing typography tokens or motion selectors.

- [ ] **Step 2: Apply the shared container to full-bleed section interiors**

Use `page-container` on inner content wrappers in `SectionWrapper.tsx`, `BlogSection.tsx`, `WhyCkashSection.tsx`, and `SwapSection.tsx`. Retain each section's existing background, snap, and alignment classes; remove only duplicate horizontal padding after the shared rule is applied.

- [ ] **Step 3: Make grid/flex content shrinkable**

Add `min-w-0` to direct grid/flex children containing text or controls and use `minmax(0, 1fr)` for shrinkable two-column tracks:

```tsx
className="grid min-w-0 gap-8 md:grid-cols-2"
```

Retain intentional table minimum widths and product-art dimensions for the later component-specific tasks.

- [ ] **Step 4: Run shared primitive verification**

```powershell
npm.cmd test -- --run src/components/ck/SectionWrapper.test.tsx src/components/sections/FeatureGrid.test.tsx src/components/sections/HowItWorks.test.tsx
npm.cmd run build
```

Expected: both commands exit 0.

---

### Task 3: Repair responsive navigation and menu containment

**Files:**
- Modify: `src/components/sections/Navbar.tsx`
- Modify: `src/components/sections/Navbar.test.tsx`

**Interfaces:**
- Consumes: Existing `mobileOpen`, `resourcesOpen`, Escape handling, and body scroll lock.
- Produces: Navigation that fits at laptop/tablet widths and a bounded, scrollable mobile menu with complete touch/focus behavior.

- [ ] **Step 1: Add failing mobile-menu assertions**

After opening the mobile menu in `Navbar.test.tsx`, assert:

```tsx
expect(screen.getByRole("button", { name: /close menu/i })).toHaveClass("min-h-11", "min-w-11");
expect(screen.getByRole("dialog", { name: /mobile navigation/i })).toHaveClass("overflow-y-auto");
```

If the panel is not a dialog, add `role="dialog"` and `aria-label="Mobile navigation"` to that existing panel.

- [ ] **Step 2: Verify the desktop threshold at 1024–1366px before changing it**

Use browser evidence. If desktop links collide, change both visibility pairs consistently from `md:flex`/`md:hidden` to `lg:flex`/`lg:hidden`; otherwise preserve `md` and repair only spacing with `min-w-0` and `gap-2`.

- [ ] **Step 3: Bound the mobile panel by the dynamic viewport**

Apply the existing panel structure with:

```tsx
className="fixed inset-x-0 top-20 z-40 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain ..."
```

Retain body scroll lock, Escape handling, links, social icons, and current animation. Keep the close trigger at least 44px square.

- [ ] **Step 4: Make resource dropdown width viewport-safe**

Replace any fixed dropdown width with `w-[min(18rem,calc(100vw-2rem))]`, preserving keyboard access and desktop placement.

- [ ] **Step 5: Run navigation tests**

```powershell
npx.cmd vitest run src/components/sections/Navbar.test.tsx
```

Expected: all navigation assertions pass.

---

### Task 4: Preserve hero composition while correcting small-screen sizing

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/LandingMotion.test.tsx`

**Interfaces:**
- Consumes: Existing hero `useScroll` transforms, entrance animation, CTA links, and product artwork.
- Produces: Hero text, buttons, and product visual that fit 320px–1024px without changing animation sequence or timing character.

- [ ] **Step 1: Protect the existing hero motion contract**

In `LandingMotion.test.tsx`, retain/assert current hero motion markers and CTA labels. The test must protect the existing sequence, not prescribe a replacement animation.

- [ ] **Step 2: Make hero columns and artwork shrinkable**

Add `min-w-0` to hero copy/visual columns and use this base wrapper while retaining current desktop classes:

```tsx
className="relative mx-auto flex min-h-[280px] w-full max-w-[26rem] min-w-0 items-center justify-center sm:min-h-[400px] md:min-h-[560px]"
```

Do not delete or rewrite the current `useTransform` calls.

- [ ] **Step 3: Prevent CTA overflow**

Keep the current full-width-on-mobile / auto-width-on-`sm` intent, add `min-w-0` to the CTA row, and use `flex-wrap` only where required at 320px.

- [ ] **Step 4: Reduce mobile transform distances only if QA proves collision**

Keep the desktop values and transform sequence. If mobile artwork covers copy, use mobile-safe values such as:

```tsx
const backX = useTransform(smooth, [0, 0.26, 0.7], [-90, -90, -220]);
const frontX = useTransform(smooth, [0, 0.26, 0.7], [90, 90, 240]);
```

- [ ] **Step 5: Run hero and motion tests**

```powershell
npx.cmd vitest run src/components/sections/LandingMotion.test.tsx src/components/sections/HowItWorks.test.tsx
```

Expected: existing motion contracts remain green.

---

### Task 5: Repair landing cards, product visuals, tables, and sticky flow

**Files:**
- Modify: `src/components/sections/FeatureGrid.tsx`
- Modify: `src/components/sections/HowItWorks.tsx`
- Modify: `src/components/sections/PaymentsSection.tsx`
- Modify: `src/components/sections/AuthSection.tsx`
- Modify: `src/components/sections/DappSection.tsx`
- Modify: `src/components/sections/DeveloperSection.tsx`
- Modify: `src/components/sections/SecurityControlSection.tsx`
- Modify: `src/components/sections/WhyCkashSection.tsx`
- Modify: `src/components/sections/SwapSection.tsx`

**Interfaces:**
- Consumes: Existing cards, phone mockups, comparison table, sticky desktop phone, and motion roles.
- Produces: Natural mobile/tablet stacking, contained artwork, readable cards, and preserved desktop interactions.

- [ ] **Step 1: Make card/grid children shrinkable**

Use `minmax(0, 1fr)` tracks and `min-w-0` on text-bearing children. Retain equal-height behavior only where the desktop composition needs it; reduce base/mobile `min-h` values that create empty cards.

- [ ] **Step 2: Contain product visuals at small sizes**

Keep each asset's existing role and object-fit semantics, but ensure the immediate wrapper has `min-w-0`, `max-w-full`, and natural height. Do not add global overflow suppression.

- [ ] **Step 3: Disable How It Works sticky phone below desktop**

Keep the sticky phone in the desktop two-column story. At tablet/mobile use natural flow:

```tsx
className="relative h-auto min-h-[18rem] w-full md:sticky md:top-[16vh] md:h-[72vh]"
```

Preserve existing mobile step order and motion roles.

- [ ] **Step 4: Keep the comparison table locally scrollable**

Retain the intentional `min-w-[720px]` table inside its existing overflow container. Add `min-w-0` to the outer card/grid and preserve sticky first-column semantics.

- [ ] **Step 5: Run focused landing tests**

```powershell
npx.cmd vitest run src/components/sections/FeatureGrid.test.tsx src/components/sections/HowItWorks.test.tsx src/components/sections/Footer.test.tsx
```

Expected: all focused landing tests pass.

---

### Task 6: Repair blog list/detail content and media

**Files:**
- Modify: `src/components/blog/FeaturedBlog.tsx`
- Modify: `src/components/blog/BlogCard.tsx`
- Modify: `src/components/blog/BlogSearchFilter.tsx`
- Modify: `src/pages/BlogPage.tsx`
- Modify: `src/pages/BlogDetailPage.tsx`
- Modify: `src/pages/BlogMotion.test.tsx`

**Interfaces:**
- Consumes: Existing blog data, links, filters, card motion, and article layout.
- Produces: Cards and article media that fit narrow viewports, wrap long titles, and preserve filter/link functionality.

- [ ] **Step 1: Remove rigid mobile title height**

Replace the base `min-h-[74px]` title constraint in `BlogCard.tsx` with a desktop-only alignment constraint:

```tsx
className="type-h4 mt-4 font-display text-white sm:min-h-[74px]"
```

- [ ] **Step 2: Make featured and article media fluid at base/mobile**

Keep desktop proportions but replace base fixed heights with an aspect-ratio wrapper or responsive minimum. Retain `w-full`, `max-w-full`, and the current `object-cover`; alter `object-position` only if browser inspection proves focal content is cropped.

- [ ] **Step 3: Make search/filter controls wrap**

Keep the existing three-control layout at `lg`; add `min-w-0` to the search field and make the selects full width below `lg`. Preserve 44px control height and all filter behavior.

- [ ] **Step 4: Add media/link assertions**

Extend `BlogMotion.test.tsx` to assert blog cards expose links and the article image has `w-full`. Do not assert pixel dimensions in jsdom.

- [ ] **Step 5: Run blog tests**

```powershell
npx.cmd vitest run src/pages/BlogMotion.test.tsx
```

Expected: all blog motion and responsive structure assertions pass.

---

### Task 7: Repair FAQ, terms, and 404 route behavior

**Files:**
- Modify: `src/pages/FAQ.tsx`
- Modify: `src/pages/TermsAndConditions.jsx`
- Modify: `src/pages/NotFound.tsx`
- Modify: `src/pages/SecondaryRoutesMotion.test.tsx`

**Interfaces:**
- Consumes: Existing FAQ accordion/filter controls, legal TOC/progress behavior, and 404 link.
- Produces: Mobile-safe controls, readable legal content, non-trapping sticky/TOC behavior, and dynamic viewport height handling.

- [ ] **Step 1: Keep FAQ controls within the viewport**

Add `min-w-0` to FAQ header/control containers. Retain desktop category grid, mobile disclosure, 44px controls, and natural answer height.

- [ ] **Step 2: Make legal viewport and TOC rules mobile-safe**

In `TermsAndConditions.jsx`, replace base rigid `100vh`/`calc(100vh - 140px)` content sizing with `min-height: 100svh` only where a viewport minimum is intended and `height: auto` for content containers. Scope fixed/sticky TOC behavior to the desktop breakpoint; preserve mobile natural flow.

Keep `useScroll`, `useSpring`, and the progress indicator.

- [ ] **Step 3: Keep dense legal content locally readable**

Retain local overflow containers for dense tables, add `min-width: 0` to the article column, and wrap long URLs/email strings without changing legal copy.

- [ ] **Step 4: Use non-rigid 404 height handling**

Retain the centered composition and home link, but use `min-h-[100svh]` instead of rigid `min-h-screen` if short/mobile viewports crop the content.

- [ ] **Step 5: Run secondary-route tests**

```powershell
npx.cmd vitest run src/pages/SecondaryRoutesMotion.test.tsx src/pages/BlogMotion.test.tsx
```

Expected: FAQ, terms, 404, and blog contracts remain green.

---

### Task 8: Finish footer responsive layout and wordmark treatment

**Files:**
- Modify: `src/components/sections/Footer.tsx`
- Modify: `src/components/sections/Footer.test.tsx`

**Interfaces:**
- Consumes: Existing footer CTA cards, social links, columns, newsletter form, legal bar, and logo asset.
- Produces: Logically stacked mobile footer and a wordmark shown at 70% opacity with the bottom 20% masked.

- [ ] **Step 1: Apply the approved wordmark treatment**

Change these existing classes in `Footer.tsx`:

```tsx
className="block h-auto w-screen max-w-none object-contain opacity-70"
```

```tsx
className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#151515] via-[#151515]/35 to-transparent"
```

- [ ] **Step 2: Prevent footer columns/legal items from forcing width**

Add `min-w-0` to main footer grid columns. Retain the current base two-column links / `sm:grid-cols-3` transition, social wrapping, and all link/form behavior. Add wrapping utilities to legal items only where needed.

- [ ] **Step 3: Reduce mobile-only footer density where QA proves it excessive**

Use existing base/`sm`/`md` classes to reduce base card padding/gaps without changing desktop spacing, copy, colors, or touch targets.

- [ ] **Step 4: Run the footer test**

```powershell
npx.cmd vitest run src/components/sections/Footer.test.tsx
```

Expected: the wordmark assertions pass with `opacity-70` and `h-[20%]`.

---

### Task 9: Browser-based responsive QA and targeted fixes

**Files:**
- Modify: only files identified by QA evidence from Tasks 2–8.
- Test: the focused test corresponding to each targeted fix.

**Interfaces:**
- Consumes: Completed responsive component changes and the five application routes.
- Produces: Evidence-backed fixes for overflow, wrapping, sticky behavior, and interaction regressions across all requested dimensions.

- [ ] **Step 1: Start Vite for browser inspection**

```powershell
npm.cmd run dev -- --host 127.0.0.1
```

Inspect `/`, `/blog`, `/blog/<first-post-slug>`, `/faq`, `/terms-and-conditions`, and a missing route.

- [ ] **Step 2: Inspect narrow phone widths**

At 320, 360, 375, 390, 414, and 430px, check:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Also check menu open/close, FAQ disclosure, blog filters, table scrolling, CTA targets, heading wrapping, footer legal items, and wordmark crop.

- [ ] **Step 3: Inspect tablet/laptop widths**

At 768, 820, 834, 1024, 1280, and 1366px, verify navigation threshold, two-column sections, How It Works sticky behavior, table containment, and card proportions.

- [ ] **Step 4: Inspect desktop/ultra-wide widths**

At 1440, 1536, 1728, 1920, and 2560px, verify max-width containment, paragraph line length, navigation balance, product-art scale, and full-bleed backgrounds.

- [ ] **Step 5: Inspect height variants**

Check 390×844, 430×932, 844×390 mobile landscape, 1366×768, and 1440×900. Confirm CTAs/content remain reachable and sticky panels do not trap users.

- [ ] **Step 6: Check reduced motion and touch behavior**

Enable `prefers-reduced-motion: reduce` and coarse-pointer/touch emulation. Confirm content stays visible and critical actions do not depend on hover.

- [ ] **Step 7: Apply only evidence-backed follow-up edits**

For each issue, record route, viewport, selector/component, symptom, and smallest fix. Run the focused test after each fix. Do not add generic body overflow suppression or device-specific media queries.

---

### Task 10: Full verification and handoff

**Files:**
- Modify: none unless verification exposes a responsive regression.

**Interfaces:**
- Consumes: All responsive changes and QA fixes.
- Produces: Verified test, lint, build, and diff evidence.

- [ ] **Step 1: Run the full test suite**

```powershell
npm.cmd test
```

Expected: exit code 0 with no failed tests.

- [ ] **Step 2: Run lint**

```powershell
npm.cmd run lint
```

Expected: exit code 0 with no new lint errors in responsive files.

- [ ] **Step 3: Run the production build**

```powershell
npm.cmd run build
```

Expected: exit code 0 and a generated production bundle.

- [ ] **Step 4: Check final scope and whitespace**

```powershell
git diff --check
git diff --stat
git status --short
```

Confirm only responsive files plus the approved responsive spec/plan are represented by this work; preserve unrelated pre-existing motion changes.

- [ ] **Step 5: Report exact verification evidence and remaining limitations**

Summarize changed files, viewport classes inspected, test/lint/build exit results, and any remaining browser-only limitations without claiming a fix that lacks fresh evidence.
