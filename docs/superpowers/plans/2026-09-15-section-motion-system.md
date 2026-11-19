# Ckash Section Motion System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Replace every non-hero Ckash page reveal with one direction-aware reveal, settle, read, and release system.

**Architecture:** Keep Framer Motion and introduce a pure policy module plus reusable MotionSection and MotionElement components. The section boundary observes entry and scroll direction; nested wrappers separate triggered entrance transforms from scroll-linked release transforms so interaction motion can remain on inner components without property conflicts.

**Tech Stack:** React 18, TypeScript, Framer Motion 12, Tailwind CSS, Vitest, Testing Library, Vite

**Spec:** docs/superpowers/specs/2026-09-15-section-motion-system-design.md

## Global Constraints

- Do not edit src/components/sections/Hero.tsx.
- At execution start, record git hash-object src/components/sections/Hero.tsx; verify the same checksum after every task and at final handoff.
- Preserve all user-owned uncommitted changes; stage and commit only files named by the current task.
- Do not add GSAP or another animation dependency.
- Animate only transform and opacity for the global lifecycle.
- Do not change copy, layout spacing, section order, enabled/disabled sections, or visual assets.
- Preserve hover, tap, focus, accordion, walkthrough, progress, dropdown, and other functional interaction motion on inner elements.
- Mobile travel is 35% shorter than desktop and item stagger is shorter.
- Reduced-motion content is immediately accessible and does not use travel, scale, parallax, or scroll-linked release.
- The footer enters and settles but never releases.
- Generic src/components/ui primitives are outside scope.

## File Structure

- Create src/lib/section-motion.ts for pure role policy, constants, and direction/reduced-motion calculations.
- Create src/lib/section-motion.test.ts for unit coverage.
- Create src/components/motion/MotionSection.tsx for the shared viewport/direction controller and role wrappers.
- Create src/components/motion/MotionSection.test.tsx for its DOM contract.
- Modify src/lib/motion.ts only after consumers migrate, retaining shared interaction helpers.
- Modify src/index.css only for motion masks, compositor hints, and reduced-motion safeguards.
- Migrate the Ckash section and page files listed below without touching the hero.

---

### Task 1: Pure motion policy

**Files:**
- Create: src/lib/section-motion.ts
- Create: src/lib/section-motion.test.ts

**Interfaces:**
- Consumes: Framer Motion Transition type.
- Produces: MotionRole, ScrollDirection, MOTION_ROLE_ORDER, getEntranceState(), getActiveState(), getReleaseTarget(), and getEntranceTransition().

- [ ] **Step 1: Record the protected hero checksum**

Run:

    git hash-object src/components/sections/Hero.tsx

Expected: one 40-character checksum. Keep it in execution notes and compare it after every task.

- [ ] **Step 2: Write the failing policy test**

Create src/lib/section-motion.test.ts:

    import { describe, expect, it } from "vitest";
    import {
      MOTION_ROLE_ORDER,
      getActiveState,
      getEntranceState,
      getEntranceTransition,
      getReleaseTarget,
    } from "./section-motion";

    describe("section motion policy", () => {
      it("keeps the editorial role order", () => {
        expect(MOTION_ROLE_ORDER).toEqual([
          "eyebrow", "heading", "copy", "content", "item", "visual", "cta",
        ]);
      });

      it("enters from the scroll direction with compact mobile travel", () => {
        expect(getEntranceState("heading", "down", false, false)).toEqual({ opacity: 0, y: 28, scale: 1 });
        expect(getEntranceState("heading", "up", false, false)).toEqual({ opacity: 0, y: -28, scale: 1 });
        expect(getEntranceState("visual", "down", true, false)).toEqual({ opacity: 0, y: 20, scale: 0.985 });
      });

      it("settles and releases quietly", () => {
        expect(getActiveState()).toEqual({ opacity: 1, y: 0, scale: 1 });
        expect(getReleaseTarget("item", "down", false, false)).toEqual({ opacity: 0.08, y: -22, scale: 0.99 });
        expect(getReleaseTarget("item", "up", false, false)).toEqual({ opacity: 0.08, y: 22, scale: 0.99 });
      });

      it("disables movement under reduced motion", () => {
        expect(getEntranceState("visual", "down", false, true)).toEqual({ opacity: 1, y: 0, scale: 1 });
        expect(getReleaseTarget("visual", "down", false, true)).toEqual({ opacity: 1, y: 0, scale: 1 });
        expect(getEntranceTransition("cta", 0, false, true).duration).toBe(0);
      });

      it("uses restrained delays and shorter mobile stagger", () => {
        expect(getEntranceTransition("eyebrow", 0, false, false).delay).toBe(0);
        expect(getEntranceTransition("heading", 0, false, false).delay).toBe(0.07);
        expect(getEntranceTransition("item", 2, false, false).delay).toBeCloseTo(0.3);
        expect(getEntranceTransition("item", 2, true, false).delay).toBeLessThan(0.3);
      });
    });

- [ ] **Step 3: Run it and verify failure**

Run:

    npx.cmd vitest run src/lib/section-motion.test.ts

Expected: FAIL because ./section-motion does not exist.

- [ ] **Step 4: Implement the policy**

Create src/lib/section-motion.ts with this public shape and values:

    import type { Transition } from "framer-motion";

    export type MotionRole = "eyebrow" | "heading" | "copy" | "content" | "item" | "visual" | "cta";
    export type ScrollDirection = "down" | "up";
    export type MotionState = { opacity: number; y: number; scale: number };

    export const MOTION_ROLE_ORDER: MotionRole[] = ["eyebrow", "heading", "copy", "content", "item", "visual", "cta"];
    export const sectionEase = [0.16, 1, 0.3, 1] as const;

    const entranceY: Record<MotionRole, number> = {
      eyebrow: 14, heading: 28, copy: 20, content: 26, item: 26, visual: 30, cta: 14,
    };
    const release: Record<MotionRole, MotionState> = {
      eyebrow: { opacity: 0.15, y: -10, scale: 1 },
      heading: { opacity: 0.15, y: -22, scale: 1 },
      copy: { opacity: 0, y: -16, scale: 1 },
      content: { opacity: 0.08, y: -22, scale: 0.99 },
      item: { opacity: 0.08, y: -22, scale: 0.99 },
      visual: { opacity: 0.12, y: -20, scale: 0.99 },
      cta: { opacity: 0, y: -12, scale: 1 },
    };
    const delay: Record<MotionRole, number> = {
      eyebrow: 0, heading: 0.07, copy: 0.12, content: 0.16, item: 0.16, visual: 0.16, cta: 0.22,
    };

    export function getActiveState(): MotionState {
      return { opacity: 1, y: 0, scale: 1 };
    }

    export function getEntranceState(role: MotionRole, direction: ScrollDirection, compact: boolean, reduced: boolean): MotionState {
      if (reduced) return getActiveState();
      const sign = direction === "down" ? 1 : -1;
      const factor = compact ? 0.65 : 1;
      return { opacity: 0, y: Math.round(entranceY[role] * factor) * sign, scale: role === "visual" ? 0.985 : 1 };
    }

    export function getReleaseTarget(role: MotionRole, direction: ScrollDirection, compact: boolean, reduced: boolean): MotionState {
      if (reduced) return getActiveState();
      const state = release[role];
      const sign = direction === "down" ? 1 : -1;
      const factor = compact ? 0.65 : 1;
      return { ...state, y: Math.round(state.y * factor) * sign };
    }

    export function getEntranceTransition(role: MotionRole, index: number, compact: boolean, reduced: boolean): Transition {
      const stagger = compact ? 0.045 : 0.07;
      return {
        duration: reduced ? 0 : compact ? 0.5 : 0.65,
        ease: sectionEase,
        delay: reduced ? 0 : delay[role] + (role === "item" ? index * stagger : 0),
      };
    }

- [ ] **Step 5: Run the test and commit**

Run:

    npx.cmd vitest run src/lib/section-motion.test.ts
    git hash-object src/components/sections/Hero.tsx
    git add src/lib/section-motion.ts src/lib/section-motion.test.ts
    git commit -m "feat: define section motion policy"

Expected: tests PASS and the hero checksum matches Step 1.

---

### Task 2: Runtime controller and role wrappers

**Files:**
- Create: src/components/motion/MotionSection.tsx
- Create: src/components/motion/MotionSection.test.tsx
- Modify: src/index.css

**Interfaces:**
- Consumes: Task 1 policy exports.
- Produces: MotionSection, MotionElement, MotionHeading, and MotionRootTag.

- [ ] **Step 1: Write the failing component tests**

Create src/components/motion/MotionSection.test.tsx:

    import { render, screen } from "@testing-library/react";
    import { describe, expect, it } from "vitest";
    import { MotionElement, MotionHeading, MotionSection } from "./MotionSection";

    describe("MotionSection", () => {
      it("renders a semantic boundary and labeled roles", () => {
        render(
          <MotionSection aria-label="Demo chapter">
            <MotionElement role="eyebrow">Label</MotionElement>
            <MotionHeading><h2>Heading</h2></MotionHeading>
            <MotionElement role="item" index={1}>Card</MotionElement>
          </MotionSection>,
        );
        expect(screen.getByRole("region", { name: "Demo chapter" })).toHaveAttribute("data-motion-section");
        expect(screen.getByText("Label").closest("[data-motion-role]")).toHaveAttribute("data-motion-role", "eyebrow");
        expect(screen.getByRole("heading").closest("[data-motion-role]")).toHaveAttribute("data-motion-role", "heading");
        expect(screen.getByText("Card").closest("[data-motion-index]")).toHaveAttribute("data-motion-index", "1");
      });

      it("supports article and footer semantics", () => {
        const view = render(<MotionSection as="article" aria-label="Article"><span>Body</span></MotionSection>);
        expect(screen.getByRole("article", { name: "Article" })).toBeInTheDocument();
        view.rerender(<MotionSection as="footer" aria-label="Footer" exit={false}><span>Footer body</span></MotionSection>);
        expect(screen.getByRole("contentinfo", { name: "Footer" })).toHaveAttribute("data-motion-exit", "false");
      });

      it("masks major headings", () => {
        render(<MotionSection><MotionHeading><h2>Masked heading</h2></MotionHeading></MotionSection>);
        expect(screen.getByRole("heading").parentElement).toHaveClass("motion-heading-mask");
      });
    });

- [ ] **Step 2: Run and verify failure**

Run:

    npx.cmd vitest run src/components/motion/MotionSection.test.tsx

Expected: FAIL because MotionSection.tsx does not exist.

- [ ] **Step 3: Implement the runtime boundary**

Implement these exports in MotionSection.tsx:

    export type MotionRootTag = "section" | "article" | "footer" | "div";

type MotionSectionProps = React.HTMLAttributes<HTMLElement> & {
      as?: MotionRootTag;
      exit?: boolean;
      backgroundClassName?: string;
    };

    type MotionElementProps = React.HTMLAttributes<HTMLDivElement> & {
      role: MotionRole;
      index?: number;
    };

    export function MotionSection(props: MotionSectionProps): JSX.Element;
    export function MotionElement(props: MotionElementProps): JSX.Element;
    export function MotionHeading(props: Omit<MotionElementProps, "role">): JSX.Element;

Use a context containing entryId, direction, compact, reduced, releaseProgress, and exit. Use one module-scope semantic root map:

    const roots = {
      section: motion.section,
      article: motion.article,
      footer: motion.footer,
      div: motion.div,
    };

In MotionSection, use:

    const rootRef = useRef<HTMLElement>(null);
    const reduced = useReducedMotion() ?? false;
    const compact = useMediaQuery("(max-width: 767px)");
    const { scrollY } = useScroll();
    const directionRef = useRef<ScrollDirection>("down");
    const directionValue = useMotionValue(1);
    const releaseProgress = useMotionValue(0);
    const [entry, setEntry] = useState({ id: 0, direction: "down" as ScrollDirection });
    const inView = useInView(rootRef, { amount: 0.18, margin: "0px 0px -18% 0px" });

Track scroll direction with useMotionValueEvent. Use two section-relative useScroll ranges: down release from end 40% to end 10%, and upward release from start 60% to start 90%. Copy the applicable range into releaseProgress; set it to zero when exit is false or reduced motion is active. Increment entry.id only on a false-to-true inView transition.

When backgroundClassName is supplied, render an aria-hidden absolute inset backdrop with data-motion-background. Drive only its opacity from a third section-relative range, start 100% to start 55%, so the incoming tone quietly resolves before content settles. Reduced motion sets backdrop opacity to one immediately. Keep root content in an isolated stacking context above the backdrop.

Implement a private useCompactMotion hook in this file with window.matchMedia("(max-width: 767px)"), an initial synchronous match, a change listener, and listener cleanup. Do not add a second public responsive-motion utility.

MotionElement must render nested wrappers. The outer motion.div derives release opacity/Y/scale from releaseProgress and getReleaseTarget(). The inner motion.div uses animation controls; on a new entryId, set getEntranceState(), then start getActiveState() with getEntranceTransition(). This separation prevents an interactive child and the lifecycle from writing to the same transform.

Add data-motion-section, data-motion-exit, data-motion-role, and data-motion-index attributes.

Extend the semantic test with backgroundClassName="bg-[#111]" and assert that querySelector('[data-motion-background]') has that class.

- [ ] **Step 4: Add CSS safeguards**

Append to src/index.css without touching hero selectors or marquee keyframes:

    .motion-heading-mask { overflow: hidden; }
    [data-motion-role] { will-change: transform, opacity; }

    @media (prefers-reduced-motion: reduce) {
      [data-motion-role],
      [data-motion-role] > * {
        transform: none !important;
        opacity: 1 !important;
        will-change: auto;
      }
    }

- [ ] **Step 5: Run focused tests and commit**

Run:

    npx.cmd vitest run src/lib/section-motion.test.ts src/components/motion/MotionSection.test.tsx
    npm.cmd run build
    git hash-object src/components/sections/Hero.tsx
    git add src/components/motion/MotionSection.tsx src/components/motion/MotionSection.test.tsx src/index.css
    git commit -m "feat: add reusable section motion controller"

Expected: tests and build PASS; hero checksum is unchanged.

---

### Task 3: Shared wrapper and dormant landing sections

**Files:**
- Modify: src/components/ck/SectionWrapper.tsx
- Create: src/components/ck/SectionWrapper.test.tsx
- Modify: src/components/ck/PhoneMockup.tsx
- Modify: src/components/sections/AuthSection.tsx
- Modify: src/components/sections/DappSection.tsx
- Modify: src/components/sections/DeveloperSection.tsx
- Modify: src/components/sections/PaymentsSection.tsx
- Modify: src/components/sections/SecurityControlSection.tsx
- Modify: src/components/sections/FinalCTA.tsx

**Interfaces:**
- Consumes: Task 2 primitives.
- Produces: the existing SectionWrapper API backed by global motion roles.

- [ ] **Step 1: Write the failing wrapper test**

    import { render, screen } from "@testing-library/react";
    import { describe, expect, it } from "vitest";
    import SectionWrapper from "./SectionWrapper";

    describe("SectionWrapper", () => {
      it("maps header and content to the shared lifecycle", () => {
        render(<SectionWrapper id="demo" eyebrow="Label" title="Title" subtitle="Copy"><div>Body</div></SectionWrapper>);
        const section = screen.getByRole("region", { name: "Title" });
        expect(section).toHaveAttribute("data-motion-section");
        expect(screen.getByText("[ Label ]").closest("[data-motion-role]")).toHaveAttribute("data-motion-role", "eyebrow");
        expect(screen.getByRole("heading", { name: "Title" }).closest("[data-motion-role]")).toHaveAttribute("data-motion-role", "heading");
        expect(screen.getByText("Copy").closest("[data-motion-role]")).toHaveAttribute("data-motion-role", "copy");
        expect(screen.getByText("Body").closest("[data-motion-role]")).toHaveAttribute("data-motion-role", "content");
      });
    });

- [ ] **Step 2: Run and verify failure**

Run:

    npx.cmd vitest run src/components/ck/SectionWrapper.test.tsx

Expected: FAIL on missing data-motion attributes.

- [ ] **Step 3: Migrate SectionWrapper**

Replace its motion.section and reveal variants with MotionSection. Map eyebrow, title, subtitle, and children to eyebrow, heading, copy, and content roles. Preserve the current props and layout classes. Give the title an ID based on the section ID and wire aria-labelledby.

- [ ] **Step 4: Remove nested legacy reveals from dormant sections**

Use these role mappings while leaving interactions on inner elements:

| File | Role mapping | Preserved inner behavior |
|---|---|---|
| AuthSection.tsx | login panel=visual; feature list=content | panel hover and button taps |
| DappSection.tsx | filters=content; apps=item; submit=cta | card hover/tap |
| DeveloperSection.tsx | dashboard=visual; rows=item | row hover |
| PaymentsSection.tsx | explanation=content; payment panel=visual | panel/button hover/tap |
| SecurityControlSection.tsx | label=eyebrow; H2=heading; paragraph=copy; image shell=visual | no infinite product float |
| FinalCTA.tsx | label=eyebrow; H2=heading; paragraph=copy; buttons=cta | button hover/tap |

Remove sectionReveal, childReveal, cardReveal, revealViewport, and staggeredCardTransition imports/usages. In PhoneMockup.tsx, remove the outer childReveal and whileInView owner; return a plain outer div and retain only its optional internal float and hover behavior.

- [ ] **Step 5: Run tests, build, and commit**

Run:

    npx.cmd vitest run src/components/ck/SectionWrapper.test.tsx src/components/motion/MotionSection.test.tsx
    npm.cmd run build
    git hash-object src/components/sections/Hero.tsx
    git add src/components/ck/SectionWrapper.tsx src/components/ck/SectionWrapper.test.tsx src/components/ck/PhoneMockup.tsx src/components/sections/AuthSection.tsx src/components/sections/DappSection.tsx src/components/sections/DeveloperSection.tsx src/components/sections/PaymentsSection.tsx src/components/sections/SecurityControlSection.tsx src/components/sections/FinalCTA.tsx
    git commit -m "refactor: migrate shared Ckash sections to motion lifecycle"

Expected: tests and build PASS; hero checksum is unchanged.

---

### Task 4: Active landing-page chapters and footer

**Files:**
- Modify: src/components/sections/FeatureGrid.tsx
- Modify: src/components/sections/FeatureGrid.test.tsx
- Modify: src/components/sections/HowItWorks.tsx
- Modify: src/components/sections/HowItWorks.test.tsx
- Modify: src/components/sections/SwapSection.tsx
- Modify: src/components/sections/WhyCkashSection.tsx
- Modify: src/components/sections/BlogSection.tsx
- Modify: src/components/sections/Footer.tsx
- Create: src/components/sections/LandingMotion.test.tsx
- Create: src/components/sections/Footer.test.tsx

**Interfaces:**
- Consumes: Task 2 primitives.
- Produces: every active post-hero landing section using the shared lifecycle and an entrance-only footer.

- [ ] **Step 1: Write failing lifecycle tests**

Add to FeatureGrid and HowItWorks tests:

    expect(section).toHaveAttribute("data-motion-section");
    expect(section.querySelector('[data-motion-role="heading"]')).toBeInTheDocument();

FeatureGrid must have six item roles. HowItWorks must have a visual role around the desktop phone. Create LandingMotion.test.tsx to render SwapSection, WhyCkashSection, and BlogSection separately and assert each labeled region has data-motion-section, a heading role, a copy role, and content or visual roles.

Create Footer.test.tsx:

    import { render, screen } from "@testing-library/react";
    import { describe, expect, it } from "vitest";
    import Footer from "./Footer";

    describe("Footer", () => {
      it("is the final entrance-only chapter", () => {
        render(<Footer />);
        const footer = screen.getByRole("contentinfo");
        expect(footer).toHaveAttribute("data-motion-section");
        expect(footer).toHaveAttribute("data-motion-exit", "false");
        expect(footer.querySelector('[data-motion-role="heading"]')).toBeInTheDocument();
        expect(footer.querySelectorAll('[data-motion-role="item"]').length).toBeGreaterThan(1);
      });
    });

- [ ] **Step 2: Run and verify failure**

Run:

    npx.cmd vitest run src/components/sections/FeatureGrid.test.tsx src/components/sections/HowItWorks.test.tsx src/components/sections/LandingMotion.test.tsx src/components/sections/Footer.test.tsx

Expected: FAIL on missing shared lifecycle attributes.

- [ ] **Step 3: Migrate FeatureGrid and HowItWorks**

FeatureGrid mapping: root=MotionSection; tag=eyebrow; H2=heading; subtitle=copy; each card wrapper=item with its index. Keep article markup, images, and hover CSS unchanged.

HowItWorks mapping: root=MotionSection; tag=eyebrow; H2=heading; subtitle=copy; mobile step blocks=item; desktop copy rail=content; sticky phone shell=visual. Preserve updateActiveStep, activeIndex, native scrolling, stationary handset, and internal screen crossfades. Replace the old test assertion about no snap-section with a data-motion-section assertion; do not introduce snapping.

- [ ] **Step 4: Migrate Swap, Why Ckash, and BlogSection**

Swap mapping: center label/heading/copy/CTA use named roles; both side images sit inside visual wrappers. Remove the old section/content whileInView variants. Keep the special horizontal product choreography inside the visual wrappers.

Why Ckash mapping: header=eyebrow/heading/copy; comparison shell=visual. Remove container, rowVariant, childReveal, cardReveal, and section whileInView variants. Preserve state-driven mark animation and horizontal overflow. Do not insert div wrappers directly under table, tbody, or tr; let the visual shell own lifecycle where a wrapper would invalidate table semantics.

BlogSection mapping: header roles, primary CTA=cta, and article wrappers=item with indices. Preserve card hover/tap and image hover effects on inner elements.

For active sections with explicit solid background classes, move that background class from the semantic root to MotionSection's backgroundClassName. Preserve mist and grain classes on the semantic root. This makes adjacent dark tones crossfade through the shared backdrop without changing their final colors.

- [ ] **Step 5: Migrate Footer**

Use MotionSection as="footer" exit={false} id="footer". Map promotional cards=item; community label/heading/copy/social links to their named roles; main footer panel=content with its columns=item; legal bar=content; large logo=visual. Keep IDs, links, form, backgrounds, and hover states unchanged.

- [ ] **Step 6: Run tests, build, and commit**

Run:

    npx.cmd vitest run src/components/sections/FeatureGrid.test.tsx src/components/sections/HowItWorks.test.tsx src/components/sections/LandingMotion.test.tsx src/components/sections/Footer.test.tsx src/App.test.tsx
    npm.cmd run build
    git hash-object src/components/sections/Hero.tsx
    git add src/components/sections/FeatureGrid.tsx src/components/sections/FeatureGrid.test.tsx src/components/sections/HowItWorks.tsx src/components/sections/HowItWorks.test.tsx src/components/sections/SwapSection.tsx src/components/sections/WhyCkashSection.tsx src/components/sections/BlogSection.tsx src/components/sections/Footer.tsx src/components/sections/LandingMotion.test.tsx src/components/sections/Footer.test.tsx
    git commit -m "refactor: unify landing section transitions"

Expected: tests and build PASS; hero checksum is unchanged.

---

### Task 5: Blog routes and reusable blog cards

**Files:**
- Modify: src/pages/BlogPage.tsx
- Modify: src/pages/BlogDetailPage.tsx
- Modify: src/components/blog/FeaturedBlog.tsx
- Modify: src/components/blog/BlogCard.tsx
- Create: src/pages/BlogMotion.test.tsx

**Interfaces:**
- Consumes: Task 2 primitives and Task 4 footer.
- Produces: Blog routes whose chapters and cards use global lifecycle wrappers.

- [ ] **Step 1: Write failing route tests**

Create BlogMotion.test.tsx. Render BlogPage and a valid BlogDetailPage route in MemoryRouter. For each, assert:

    expect(container.querySelectorAll("[data-motion-section]").length).toBeGreaterThanOrEqual(3);
    expect(container.querySelector('[data-motion-role="eyebrow"]')).toBeInTheDocument();
    expect(container.querySelector('[data-motion-role="heading"]')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-motion-role="item"]').length).toBeGreaterThan(0);

Use the first slug exported by blogs for the detail route.

- [ ] **Step 2: Run and verify failure**

Run:

    npx.cmd vitest run src/pages/BlogMotion.test.tsx

Expected: FAIL because route chapters lack the shared boundary.

- [ ] **Step 3: Migrate BlogPage**

Create separate MotionSection boundaries for introduction, featured story, and archive. Map the intro label/H1; featured label/heading/visual; and archive label/H2/filter content/indexed cards. The archive remains settled when filters change; filtering must not replay the section entrance.

- [ ] **Step 4: Migrate BlogDetailPage and blog components**

Use MotionSection as="article" for the article and another MotionSection for related posts. Map back link=cta, metadata=eyebrow, H1=heading, excerpt/body=copy or content, hero image=visual, and related cards=item.

Remove the legacy childReveal wrapper from FeaturedBlog. Keep BlogCard as an interactive motion.article with hover/tap only; its parent MotionElement item wrapper owns entry/release. Preserve links and image hover effects.

- [ ] **Step 5: Run tests, build, and commit**

Run:

    npx.cmd vitest run src/pages/BlogMotion.test.tsx
    npm.cmd run build
    git hash-object src/components/sections/Hero.tsx
    git add src/pages/BlogPage.tsx src/pages/BlogDetailPage.tsx src/components/blog/FeaturedBlog.tsx src/components/blog/BlogCard.tsx src/pages/BlogMotion.test.tsx
    git commit -m "refactor: apply section lifecycle to blog routes"

Expected: route tests and build PASS; hero checksum is unchanged.

---

### Task 6: FAQ and legal routes

**Files:**
- Modify: src/pages/FAQ.tsx
- Modify: src/pages/TermsAndConditions.jsx
- Modify: src/pages/NotFound.tsx
- Create: src/pages/SecondaryRoutesMotion.test.tsx

**Interfaces:**
- Consumes: Task 2 primitives and Task 4 footer.
- Produces: FAQ and Terms routes with global section lifecycle and preserved functional state motion.

- [ ] **Step 1: Write failing secondary-route tests**

Render FAQ, Terms, and NotFound in MemoryRouter. Assert each page has a data-motion-section and heading role; FAQ and Terms also have a content role and entrance-only footer. In the FAQ case, click one question and assert its answer becomes visible. In the Terms case, assert the progress bar and table-of-contents navigation remain present. In the NotFound case, assert the 404 heading and home link remain accessible.

- [ ] **Step 2: Run and verify failure**

Run:

    npx.cmd vitest run src/pages/SecondaryRoutesMotion.test.tsx

Expected: FAIL on missing lifecycle attributes.

- [ ] **Step 3: Migrate FAQ**

Use one MotionSection for the FAQ body. Map label/H1 to eyebrow/heading, category selector to content, and each FAQItem shell to an indexed item wrapper. Remove cardReveal, staggeredCardTransition, and page-load childReveal ownership. Preserve answer AnimatePresence height/opacity, plus rotation, category layout animation, dropdown animation, button tap, and card hover inside the role wrapper.

- [ ] **Step 4: Migrate Terms and Conditions**

Keep progress useScroll/useSpring because it is a functional progress indicator. Use a MotionSection for the legal header and another for the legal content chapter. Map pill/heading/copy/updated text, TOC=content, and each legal article=item with its current ID. Retain card hover/tap only on an inner motion.article. Remove pageVariants and cardVariants. Preserve sticky TOC calculations, mobile disclosure, progress bar, back-to-top behavior, inline styles, and footer.

- [ ] **Step 5: Run tests, build, and commit**

Migrate NotFound's single content panel to MotionSection with heading, copy, and CTA roles. Preserve its current copy, link destination, and full-height layout.

Run:

    npx.cmd vitest run src/pages/SecondaryRoutesMotion.test.tsx
    npm.cmd run build
    git hash-object src/components/sections/Hero.tsx
    git add src/pages/FAQ.tsx src/pages/TermsAndConditions.jsx src/pages/NotFound.tsx src/pages/SecondaryRoutesMotion.test.tsx
    git commit -m "refactor: unify FAQ and legal page motion"

Expected: route tests and build PASS; hero checksum is unchanged.

---

### Task 7: Legacy cleanup and final verification

**Files:**
- Modify: src/lib/motion.ts
- Modify only any non-hero Ckash file still importing a removed reveal helper.
- Do not modify: src/components/sections/Hero.tsx

**Interfaces:**
- Consumes: all migrated consumers.
- Produces: one global page-section animation system with no obsolete reveal exports.

- [ ] **Step 1: Audit remaining reveal ownership**

Run:

    rg -n "sectionReveal|childReveal|cardReveal|revealViewport|staggeredCardTransition|whileInView|IntersectionObserver" src/components src/pages -g "!Hero.tsx" -g "!ui/**" -g "!*.test.*"

Expected allowed results: IntersectionObserver only for non-reveal functional state and whileInView only if inspection proves it is not a section reveal. Remove or migrate every other result.

- [ ] **Step 2: Remove obsolete shared reveal exports**

Delete sectionReveal, childReveal, cardReveal, revealViewport, and staggeredCardTransition from src/lib/motion.ts. Retain these values unchanged because the hero and interactive components import them:

    export const smoothEase = [0.16, 1, 0.3, 1] as const;
    export const subtleTap = { scale: 0.99 };
    export const liftHover = { y: -2 };
    export const microTransition = { duration: 0.22, ease: smoothEase } as const;

- [ ] **Step 3: Run complete automated verification**

Run:

    npm.cmd test
    npm.cmd run lint
    npm.cmd run build
    git diff --check
    git hash-object src/components/sections/Hero.tsx

Expected: tests, lint, build, and whitespace check PASS; hero checksum matches Task 1. If lint reports unrelated pre-existing failures, record those separately and prove no new failure points to a task file.

- [ ] **Step 4: Verify source invariants**

Run:

    rg -n "gsap|ScrollTrigger" package.json src
    rg -L "data-motion-section|MotionSection|SectionWrapper" src/components/sections/*.tsx
    git status --short

Expected: no GSAP result; each Ckash content section outside the protected hero directly uses MotionSection or uses SectionWrapper. Navbar and SectionNav are navigation UI, not content sections, and remain exempt. Preserve unrelated user changes in status.

Audit section-boundary borders and horizontal rules. Remove only a divider whose only job is separating two page chapters; retain every card, table, form, navigation, footer-column, and legal-content border.

- [ ] **Step 5: Perform browser review**

Start:

    npm.cmd run dev -- --host 127.0.0.1

Inspect /, /blog, one /blog/:slug, /faq, and /terms-and-conditions at about 1440px and 390px widths. Slowly scroll down and up, then fast-scroll. Confirm reveal → settle → read → release, direction-aware re-entry, adjacent overlap, no stuck opacity, functional hover/tap/FAQ/filter/onboarding/TOC/progress behavior, entrance-only footer, and immediately visible reduced-motion content.

Compare the hero before and after visually and confirm its source checksum remains unchanged.

- [ ] **Step 6: Commit cleanup**

Run:

    git add src/lib/motion.ts
    git commit -m "refactor: remove obsolete reveal helpers"

If the audit required other non-hero files, add only those exact files. Never stage Hero.tsx.

- [ ] **Step 7: Report evidence**

The handoff must include test/lint/build results, routes and viewports reviewed, reduced-motion result, any intentional animation exceptions, matching initial/final hero checksum, and confirmation that Hero.tsx was never staged or committed.
