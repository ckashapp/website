# Ckash Section Motion System Design

Date: 2026-09-15
Status: Approved for implementation

## Objective

Replace Ckash's scattered section reveal effects with one reusable motion system that gives every public content section a consistent lifecycle:

1. reveal;
2. settle;
3. remain stable while being read;
4. release toward the next section.

The result should feel restrained, editorial, financial, and continuous in both scroll directions. Motion should connect sections rather than decorate unrelated elements.

## Non-negotiable hero protection

`src/components/sections/Hero.tsx` is excluded from this implementation.

- Do not edit the file.
- Do not replace, rename, retime, or supplement its animation timeline.
- Do not apply the global motion controller to the hero or its descendants.
- Do not change hero classes, wrappers, transforms, opacity, parallax, or scroll progress.
- The transition from the hero will be created solely by allowing the first post-hero section to enter before it reaches the viewport center.

This stricter rule supersedes the earlier option to add complementary hero exit motion.

## Scope

The system covers all Ckash-authored public sections outside the hero:

- active landing-page sections and footer;
- currently dormant landing-page section components, so re-enabling them does not restore the old reveal language;
- Blog listing and article-detail sections;
- FAQ page sections;
- Terms and Conditions page sections;
- shared Ckash cards, phone mockups, buttons, and section wrappers when they participate in section choreography.

Generic Radix/shadcn interaction primitives are outside the cleanup scope. Their dialog, menu, accordion, toast, and similar state animations are functional UI transitions rather than page-section reveals.

Hover, tap, focus, carousel, accordion, screen crossfade, and walkthrough state changes remain available. They must not own the same transform wrapper as the global section lifecycle.

## Selected technology

Retain Framer Motion, which is already a production dependency. Do not add GSAP.

Framer Motion will provide:

- triggered entrance sequences;
- scroll-progress-driven release motion;
- direction-aware re-entry;
- reduced-motion detection;
- React lifecycle cleanup;
- composition with existing interaction motion.

This avoids running multiple page-animation frameworks and avoids an unnecessary dependency migration.

## Architecture

### MotionSection

Create one reusable section boundary component. It owns:

- a section ref;
- viewport and scroll progress observation;
- scroll-direction tracking;
- entrance-state controls;
- release progress;
- mobile and reduced-motion policy;
- semantic section attributes and class forwarding.

The component exposes predictable role wrappers rather than embedding bespoke timelines in each page section.

Conceptual API:

```tsx
<MotionSection id="wallet" className="...">
  <MotionEyebrow>...</MotionEyebrow>
  <MotionHeading lines={[...]}>...</MotionHeading>
  <MotionCopy>...</MotionCopy>
  <MotionItems>
    <MotionItem>...</MotionItem>
  </MotionItems>
  <MotionVisual>...</MotionVisual>
  <MotionCta>...</MotionCta>
</MotionSection>
```

The exact exports may be compound components or small role components, but consumers must not define their own entrance or exit variants.

### Ownership boundaries

Global lifecycle transforms live on dedicated wrappers. Interactive children keep their existing hover/tap/state animation on an inner element. This prevents two animation sources from writing to the same `transform` or `opacity` value.

Special sections such as the onboarding walkthrough retain their internal active-step behavior. Their outer header, content column, phone wrapper, and CTA participate in the global lifecycle; screen crossfades remain internal.

### Shared motion policy

Centralize timing, easing, distances, opacity targets, stagger limits, breakpoint adjustments, and reduced-motion values in the motion library. Section files select semantic roles but do not invent new reveal variants.

### Background handoff

Where adjacent chapters use different dark tones, `MotionSection` may render an optional absolute backdrop layer. Its opacity resolves from transparent to opaque as the incoming section moves from the bottom edge toward its active range. This creates a restrained background handoff without animating layout properties or changing the selected colors. Existing texture and mist treatments remain section-specific.

## Lifecycle behavior

### Before entry

When below the viewport, content begins with low opacity and a small positive Y offset. When returning from above during upward scrolling, it begins with a small negative Y offset.

Desktop defaults:

- eyebrow: 14px;
- heading: 28px;
- subtitle/copy: 20px;
- content and cards: 26px;
- large visual: 30px with scale 0.985;
- CTA: 14px.

Mobile travel is approximately 35% shorter and stagger timing is reduced.

### Entrance

Entrance is a triggered timeline, not a fully scrubbed animation. On downward scroll it begins exactly when the section top reaches 50% of the viewport. On upward scroll, the mirror entrance begins when the section bottom reaches 50% of the viewport. These section-local thresholds work consistently for both short and tall sections.

Default order:

1. eyebrow at 0ms;
2. heading at approximately 70ms;
3. subtitle at approximately 120ms;
4. primary content at approximately 160ms;
5. items at 60-80ms stagger;
6. CTA with the final content group.

The section then reaches a completely stable state through its reading range. Text roles enter horizontally from the left with a small direction-aware vertical offset, large visuals enter from the right, and repeated items alternate their horizontal origin. Re-entry from above mirrors the vertical direction while keeping the content hierarchy readable.

### Active/read state

All lifecycle transforms resolve to zero, visual scales resolve to one, and opacity resolves to one. No continuous drift or scrub is applied while the section is in its main reading range.

### Release/exit

Release begins when section-local progress reaches 90% while scrolling down and completes at 100%. On upward scroll, the lifecycle mirrors this from 10% to 0%. This phase is gently scroll-linked and reverses cleanly if the user changes direction.

Desktop targets:

- eyebrow: Y -10px, opacity 0.15;
- heading: Y -22px, opacity 0.15;
- subtitle: Y -16px, opacity 0;
- items: Y -22px, opacity 0.08, scale 0.99;
- visual: Y -20px, opacity 0.12, scale 0.99;
- CTA: Y -12px, opacity 0.

Release is quicker and quieter than entrance. Adjacent triggers intentionally overlap so the incoming section starts revealing during the outgoing section's final viewport range.

When scrolling upward, the lower section releases downward subtly while the returning upper section enters from a negative Y offset.

### Footer

The footer uses the hierarchy:

1. label;
2. large wordmark/title;
3. columns/cards;
4. secondary information.

It enters and settles, but does not release because it is the final chapter.

## Heading treatment

Major H2 statements use an overflow-hidden mask and vertical child reveal. Where editorial line breaks are intentional, explicit line wrappers receive a 70-90ms stagger. Do not attempt runtime visual-line measurement, split individual words, or animate letters.

Small headings and ordinary body text use opacity plus a small Y offset without masking.

## Accessibility and reduced motion

Use Framer Motion's reduced-motion preference and complementary CSS safeguards.

With `prefers-reduced-motion: reduce`:

- content is immediately accessible;
- masked travel, parallax, scale, and scrubbed release transforms are disabled;
- section content uses either no transition or a brief opacity-only transition;
- sticky behavior is not added to mobile;
- internal functional state remains understandable without motion.

Motion wrappers must preserve semantic HTML, heading hierarchy, focus order, pointer behavior, and screen-reader visibility.

## Cleanup strategy

Audit all Ckash-authored source files for:

- `whileInView` section reveals;
- reveal variants and stagger helpers;
- ad hoc entrance `initial`/`animate` pairs;
- section-level `useScroll` effects;
- IntersectionObserver reveal logic;
- reveal keyframes and animation classes.

For every non-hero section, remove or replace conflicting reveal code. Preserve functional interaction motion and special internal state transitions. Delete shared reveal exports only after all consumers have migrated.

`Hero.tsx` is excluded from both edits and cleanup even if the audit finds code that resembles legacy patterns.

## Route and component migration

Migrate the reusable `SectionWrapper` first so compatible dormant sections inherit the new contract. Migrate bespoke sections individually where their markup or internal behavior requires role placement.

Landing-page ordering remains unchanged. The motion rebuild must not enable or disable sections, alter copy, change layout spacing, remove product functionality, or introduce new visual assets.

Audit horizontal rules and section-boundary borders during migration. Remove only separators whose sole purpose is to announce a new section and whose function is replaced by whitespace and motion. Keep borders that structure cards, tables, forms, navigation, or legal content.

Page-level routes use the same role and lifecycle primitives, with article content grouped into readable blocks rather than animating every paragraph independently.

## Performance

- Animate only `transform` and `opacity` for the lifecycle.
- Avoid layout measurement on every scroll frame.
- Use motion values rather than React state for continuous release progress.
- Keep one observer/controller boundary per section.
- Ensure listeners and subscriptions clean up on unmount and route changes.
- Prevent duplicate controls during development hot reload.
- Avoid scroll scrubbing on mobile except where an existing special interaction genuinely needs it.

## Verification

### Automated

- Add tests for role ordering and lifecycle configuration.
- Test that reduced-motion mode exposes settled content.
- Test footer entrance-only behavior.
- Test direction-aware entry configuration.
- Test that active page sections adopt the shared boundary.
- Keep existing component tests passing.
- Run lint, unit tests, and production build.

### Source audit

- Confirm no non-hero section retains a conflicting page-reveal implementation.
- Confirm no GSAP dependency or second global animation controller was introduced.
- Record the working-copy checksum of `Hero.tsx` before implementation and confirm the checksum is unchanged afterward; the file already contains user-owned uncommitted changes that must be preserved.

### Browser review

Review the landing page and each public route at desktop and mobile widths:

- slow downward scroll;
- slow upward scroll;
- fast scroll and interrupted entrances;
- route navigation and remounting;
- reduced-motion preference;
- card hover/tap during and after section settlement;
- onboarding screen transitions;
- footer settlement.

Success means headings, copy, items, visuals, and CTAs share a recognizable rhythm; adjacent sections overlap without a blank beat; content remains stable while readable; reverse scrolling feels intentional; and the hero behaves exactly as it did before this work.

## Out of scope

- Any hero code or hero motion change.
- Layout redesign, copy changes, or new artwork.
- Reworking functional UI primitive animations.
- Adding GSAP.
- Enabling currently commented landing-page sections.
