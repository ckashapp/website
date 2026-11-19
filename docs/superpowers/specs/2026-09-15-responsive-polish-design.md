# Ckash Responsive Polish Design

## Goal

Make the existing Ckash experience intentionally responsive from 320px through 2560px across every route, without redesigning the visual identity, content, hero animation, or established motion language.

## Scope

The audit covers `/`, `/blog`, `/blog/:slug`, `/faq`, `/terms-and-conditions`, and the catch-all 404 route, including shared navigation, section primitives, product visuals, forms, sticky content, footer, and global CSS.

The current uncommitted section-motion work is the baseline. Responsive changes may adjust layout, spacing, sizing, overflow containment, sticky behavior, and small-screen motion distances, but must preserve the hero animation's sequence, timing character, and identity.

## Responsive strategy

- Use the existing Tailwind breakpoint system: base/mobile, `sm`, `md`, `lg`, `xl`, and `2xl` where appropriate.
- Normalize only the shared page-grid behavior that currently diverges between sections; retain full-bleed backgrounds while constraining text, cards, and product visuals with controlled max widths.
- Prefer fluid sizing (`clamp()`, `minmax()`, fractional grid tracks, natural height, `min-width: 0`) over device-specific breakpoints or fixed pixel compositions.
- Preserve the established typography tokens and only change responsive values where inspection shows wrapping, collision, or readability problems.
- Treat touch layouts as complete flows: no critical behavior may depend on hover, sticky content must not trap mobile users, and controls must retain usable touch targets.
- The footer wordmark will remain full-width, use 70% opacity, and mask the bottom 20% so approximately 80% of its rendered height remains visible.

## Route and component responsibilities

- `src/index.css` and `tailwind.config.ts`: shared container, spacing, typography, reduced-motion, and breakpoint primitives only when a component-level fix cannot express the rule cleanly.
- `src/components/sections/Navbar.tsx`: responsive header thresholds, mobile menu dimensions/scroll behavior, resource dropdown containment, and focus/touch behavior.
- `src/components/sections/Hero.tsx`: responsive balancing of copy, CTAs, and product art while preserving the current animation sequence.
- Landing sections under `src/components/sections/`: section padding, grid transitions, card sizing, image containment, and mobile motion adjustments.
- `src/components/sections/HowItWorks.tsx`: desktop sticky behavior versus tablet/mobile natural flow and product-phone containment.
- `src/components/sections/Footer.tsx`: responsive column stacking, legal/social/wordmark spacing, and the approved wordmark opacity/mask treatment.
- `src/pages/BlogPage.tsx`, `src/pages/BlogDetailPage.tsx`, `src/pages/FAQ.tsx`, `src/pages/TermsAndConditions.jsx`, and `src/pages/NotFound.tsx`: route-specific width, table, sticky, form, and long-content behavior.
- Tests: extend focused component tests for structural contracts that can be asserted in jsdom; use browser-based visual QA for dimensions, overflow, wrapping, and interaction at the target viewports.

## Validation

Inspect all routes at 320, 360, 375, 390, 414, 430, 768, 820, 834, 1024, 1280, 1366, 1440, 1536, 1728, 1920, and 2560px widths, plus mobile landscape and short laptop heights. Confirm zero accidental horizontal scrolling, readable wrapping, contained imagery, usable navigation, natural mobile flow, preserved animation behavior, reduced-motion support, and no regressions to existing interactions.

Run the focused tests, full test suite, lint, and production build after implementation.
