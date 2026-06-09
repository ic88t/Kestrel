# Kestrel Shopify Theme — Agent Handoff Document

> Last updated: 2026-06-09
> Live URL: https://kestrel-6933.myshopify.com
> Store: kestrel-6933.myshopify.com
> Theme ID (live): #191837110598

---

## Project Overview

A **men's hair growth / grooming Shopify theme** inspired by Scandinavian Biolabs homepage structure, styled with a clean **white editorial aesthetic** (think Mr Porter meets Aesop).

The project started as a Next.js app in `/src/` but was pivoted to a Shopify 2.0 theme in `/theme/`.

---

## How to Build & Push

```bash
cd theme
npm run build                           # builds CSS/JS via Vite
shopify theme push --store=kestrel-6933.myshopify.com --live --allow-live
```

- **vite-plugin-shopify** auto-generates `snippets/vite-tag.liquid` — do NOT edit manually
- **No subfolders in `assets/`** — Shopify requires flat asset structure
- The `gift_card.liquid` deletion error on every push is harmless — Shopify blocks deletion of this template

---

## Color Palette (White Theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-elevated` | `#F7F7F7` | Cards, alternate sections |
| `--color-bg-card` | `#F2F2F2` | Inner card surfaces |
| `--color-ink` | `#0F0F0F` | Headlines, logo |
| `--color-text` | `#3D3D3D` | Body text |
| `--color-text-secondary` | `#6B6B6B` | Captions, subtitles |
| `--color-text-muted` | `#A3A3A3` | Meta text |
| `--color-border` | `#E8E8E8` | Dividers, card borders |
| `--color-accent` | `#1C1C1E` | Primary CTAs (black) |
| `--color-star` | `#B8925F` | Rating stars, timeline accent |
| `--color-success` | `#4A7C59` | Checkmarks, green accents |

**Exceptions to white theme:**
- Top trust bar: **black background** (`#0C0C0E`) with bronze icons
- Review marquee: **black background** (`#0C0C0E`) with white text
- Hero CTA button: **green** (`#6B8E5E`) with white text

---

## Typography

| Role | Font | Weights |
|------|------|---------|
| Display / Headlines | **Cormorant Garamond** (serif) | 400, 500, 600 |
| Body / UI | **DM Sans** (sans-serif) | 300, 400, 500, 600, 700 |

---

## Homepage Section Order

| # | Section File | Description |
|---|-------------|-------------|
| 1 | `hero.liquid` | Split layout: text left (headline + 4 checkmarks + green CTA + stars), product image right with floating card |
| 2 | `review-marquee.liquid` | Black bar, scrolling Trustpilot quotes |
| 3 | `results-ba.liquid` | "Clever science. Visible results." — before/after images + customer quote |
| 4 | `system-cards.liquid` | "Discover your system" — 3 product cards (Serum, Booster, Routine) |
| 5 | `clinical-stats.liquid` | "Results demonstrated after 150 days" — 97% / 73% stat cards |
| 6 | `media-strip.liquid` | Media logos: GQ, The Sun, Telegraph, Yahoo!, Men's Health, etc. |
| 7 | `doctor-quote.liquid` | Dr. Sarah Chen testimonial with photo |
| 8 | `science-section.liquid` | "Most products target one cause..." — 3 science points + product image |
| 9 | `timeline.liquid` | Day 30/45/90/150 vertical timeline |
| 10 | `articles.liquid` | 4 article preview cards |

**Removed sections:**
- `story-section.liquid` — Marcus before/after narrative (removed from homepage, file still exists)

---

## Key Files

| File | Purpose |
|------|---------|
| `theme/frontend/entrypoints/theme.css` | **All CSS** — ~2,000 lines, single file, no component splitting |
| `theme/frontend/entrypoints/theme.js` | Accordion toggle + mobile menu + scroll animations (Intersection Observer) |
| `theme/layout/theme.liquid` | Master layout — includes vite-tag, header/footer groups, animation script |
| `theme/templates/index.json` | Homepage section ordering |
| `theme/sections/header.liquid` | Trust bar + sticky header + mobile menu |
| `theme/sections/main-product.liquid` | Full product page (sticky gallery, options, accordion, reviews, related) |
| `theme/sections/main-collection.liquid` | 4-column collection grid |
| `theme/sections/footer.liquid` | Footer with newsletter + links |

---

## Animation System

Scroll-triggered animations via **Intersection Observer** (inline script in `theme.liquid`):

| Class | Effect |
|-------|--------|
| `animate animate--fade-up` | Fade in + translateY(50px→0) |
| `animate animate--fade` | Simple opacity fade |
| `animate animate--slide-left` | Slide in from left |
| `animate animate--slide-right` | Slide in from right |
| `animate animate--scale` | Scale from 0.92→1 |
| `animate-delay-1` … `animate-delay-6` | Stagger delays (0.12s increments) |

Also: hero product has a **floating animation** (6s ease-in-out infinite).

---

## Known Issues

1. **`gift_card.liquid` deletion error** — harmless, Shopify blocks this on every push
2. **Placeholder images** — using scraped Patrick's Products images + Unsplash placeholders. Need real Kestrel product photography
3. **Product images in `assets/`** are flat (no subfolders) per Shopify rules

---

## Git

- Repo: `https://github.com/ic88t/Kestrel.git`
- Branch: `main`
- Theme code lives in `/theme/` subdirectory

---

## Assets in `theme/assets/`

Key images used across sections:
- `sh1.png`, `sh-plus.png` — shampoo bottles
- `serum-1.jpg`, `serum-2.jpg` — serum bottles
- `bottle-1.jpg`, `bottle-2.jpg`, `bottle-3.jpg` — various product shots
- `oil-1.jpg` — oil product
- `nd1.png` — small product thumbnail (hero floating card)
- `hero-product.jpg`, `hero-lifestyle.jpg`, `hero-dark.jpg` — lifestyle photos

---

## What to Do Next (Open Ideas)

- [ ] Add real product photography
- [ ] Build additional pages (About, Science, Ritual, Contact)
- [ ] Add a quiz/flow section
- [ ] Build out blog/article templates
- [ ] Add subscription logic to product page
- [ ] Mobile optimization pass
- [ ] SEO meta tags, structured data
- [ ] Performance audit (image sizes, lazy loading)
