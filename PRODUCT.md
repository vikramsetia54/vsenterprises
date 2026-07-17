# Product

## Register

brand

_Primary surface is the marketing homepage (brand), but the site is a hybrid: it also carries a full commerce flow (product → cart → checkout → orders) that is `product` register. Treat marketing/long-form surfaces as brand; treat the transactional commerce flow as product._

## Users

Two audiences share one storefront:

- **B2B procurement / engineers** sourcing industrial and electrical components (cables, connectors, certified hardware, variant parts specified by diameter, length, AISI grade). Context: sourcing against a spec, comparing on certification, price-per-unit, and reliability. They need trust signals and precise technical data, not lifestyle fluff.
- **Retail / walk-in individuals** buying the same catalogue in small quantities. Context: casual browsing, needs approachability, clear pricing, easy checkout.

The design must feel credible to a procurement engineer while staying approachable to an individual buyer.

## Product Purpose

VS Enterprises is a Kanpur-based industrial supplier (founded as a local hardware distributor) selling certified components online. The site exists to let both businesses and individuals find, spec, and order parts with confidence. Success = a visitor trusts the supplier's competence within seconds and can get from catalogue to placed order without friction.

## Brand Personality

Engineered, dependable, straightforward. Three words: **precise, sturdy, proven.** The voice is that of a specialist who knows their materials — confident and specific, never salesy or gimmicky. Emotionally the interface should evoke *this is a serious, capable supplier I can rely on.*

## Anti-references

- **Generic SaaS blue** — the indigo-on-cool-gray template look the site currently ships. Explicitly abandon it.
- **Cheap/cluttered marketplace** — Amazon/AliExpress density, screaming red discount banners, cramped grids, stock-photo overload.
- **Overly minimal/sterile** — so stripped-back it reads as empty or lifeless. This brand has substance; the design should feel built, not bare.
- Cliché AI-landing scaffolding — tiny uppercase eyebrows over every section, gradient text, identical icon-card grids, hero-metric templates.

## Design Principles

1. **Show the spec.** Technical precision is the trust signal — surface real data (grades, dimensions, price-per-unit, certifications) as first-class design elements, not afterthoughts.
2. **Engineered, not decorated.** Structure, grid, and material honesty carry the look. Ornament earns its place or is cut.
3. **Credible to the engineer, easy for the individual.** Every surface serves both audiences; never sacrifice clarity for either.
4. **Built, not bare.** Confidence through substance and density-with-order, not empty whitespace or loud gimmicks.

## Accessibility & Inclusion

- Target WCAG 2.1 AA: body text ≥ 4.5:1, large/UI text ≥ 3:1. No washed-out muted text on tinted grounds.
- Full keyboard operability for the commerce flow (nav, product options, cart, checkout).
- Every animation has a `prefers-reduced-motion` alternative.
- Don't rely on color alone for state (stock, sale, error) — pair with text/icon.
