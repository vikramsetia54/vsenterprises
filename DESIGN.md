# Design

Visual system for VS Enterprises — an industrial/technical storefront for a hybrid B2B + retail components supplier. See [PRODUCT.md](PRODUCT.md) for strategy. Tokens live in [app/globals.css](app/globals.css).

## Theme

Light, engineered, "machined-steel" canvas. Committed palette: a deep **oxblood** brand color (harmonizes with the maroon logo, reads B2B-credible) + a molten **signal amber** accent (retail energy, highlights) on cool near-neutral steel grounds. Deliberately **not** SaaS blue, warm cream, or cluttered-marketplace red. Dark-mode tokens are defined but the app currently ships light only.

## Color (OKLCH)

| Role | Light | Use |
|---|---|---|
| `--background` | `0.976 0.003 250` | Page canvas — cool steel-white |
| `--foreground` | `0.205 0.012 262` | Graphite near-black text; also the promo ticker bar |
| `--card` | `1 0 0` | Crisp white surfaces / product cards |
| `--primary` | `0.475 0.163 27` | **Oxblood** — CTAs, brand accents, links-on-hover |
| `--signal` | `0.705 0.165 58` | **Amber** — ratings, highlights, energy accents (sparing) |
| `--success` | `0.56 0.12 152` | In-stock, free-shipping |
| `--destructive` | `0.555 0.205 25` | Sale badges, delete, errors (brighter than brand oxblood) |
| `--muted` / `--muted-foreground` | `0.955 0.004 250` / `0.44 0.012 258` | Secondary surfaces / AA-passing muted text |
| `--border` | `0.905 0.005 250` | Hairlines, dividers, card edges |

Rule: don't use raw Tailwind `blue-*`/`amber-*`/`green-*` for brand or state — use tokens. The only sanctioned raw color is `blue-*` for the order-status "processing" badge (a status convention, not brand).

## Typography

Single-family system with weight-driven hierarchy + a mono for data:

- **Sans / display**: `Google Sans Flex` (variable, opsz 6–144, wght 1–1000; both `--font-sans` and `--font-display`). Used for all body copy and headings. Hierarchy comes from weight — headings render `font-medium`/`font-extrabold` with `-0.015em` tracking and `text-wrap: balance`; body stays regular. Applied to all `h1–h6` by default.
- **Mono**: `JetBrains Mono` (400–600, `--font-mono`). Used deliberately for **technical data** — prices (tabular-nums), specs, part/category labels, section markers, stat rails. Functional (real AISI grades, dimensions, part numbers), not decorative.
- Helper class `.tech-label`: mono, uppercase, `0.12em` tracking, 11px — the standard spec/section label.

## Radius

`--radius: 0.5rem` (engineered/tight). Cards use `rounded-xl`; controls `rounded-lg`. Avoid pill-soft `rounded-2xl/3xl` except where an affordance truly calls for it.

## Motion

- Entrances via `motion/react`, eased `cubic-bezier(0.16,1,0.3,1)` (ease-out-expo), small y/opacity, staggered per list.
- Every animated component branches on `useReducedMotion()`; the Hero carousel disables autoplay under reduced motion. Global `@media (prefers-reduced-motion: reduce)` kill-switch in globals.css.

## Signature elements

- **Blueprint grid** (`.blueprint-grid`) and **dot field** (`.dot-field`) utilities for engineered section grounds (radial-masked in the Hero).
- **Ink promo ticker**: graphite (`bg-foreground`) marquee with mono uppercase labels + amber signal dots, above the white header.
- **Spec-forward product cards**: mono category label, amber rating, mono tabular price, `New` badge in ink, `Sale` in destructive, full borders (no side-stripes).
- **Technical stat rails**: bordered grids with `bg-border` gaps (hairline-separated cells) instead of floating cards.

## Bans honored

No gradient text, no side-stripe borders, no glassmorphism-by-default, no repeated tiny-uppercase eyebrow over every section, no hero-metric template. Contrast: body ≥ 4.5:1 (muted-foreground darkened to pass on the tinted canvas).
