# KESTREL

Headless ecommerce template for a high-end men's haircare brand (35+).
Built with Next.js 15 (App Router), TypeScript, Tailwind, Framer Motion, GSAP, Lenis,
wired to **Shopify Storefront API** for products, cart, and Shop Pay checkout.

## Modes

The site auto-detects which mode to run based on env vars:

| Mode | When | Behaviour |
| --- | --- | --- |
| **Mock** | `.env.local` missing Shopify keys | Uses 8 hardcoded products, cookie-backed cart, checkout disabled with explanatory page |
| **Live** | `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_STOREFRONT_TOKEN` set | Real products, real cart, redirects to Shop Pay for checkout |

## Getting started (Mock mode — no setup)

```bash
npm install
npm run dev
```

Open http://localhost:3000. Cart works end-to-end on mock products.

## Switching to live Shopify

```bash
# 1. In Shopify Partners, create a dev store, then install the "Headless" sales channel.
# 2. Generate Storefront API + Admin API tokens.
# 3. Copy template:
cp .env.local.example .env.local
# 4. Fill SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_TOKEN, SHOPIFY_ADMIN_TOKEN.
# 5. Seed 8 placeholder products via Admin API:
npm run seed
# 6. (Optional) Add photos to each product in Shopify Admin, publish to Headless channel.
# 7. Restart dev server:
npm run dev
```

That's it. The site now reads from Shopify, the cart hits Shopify's Cart API, and
"Checkout" lands on Shop Pay.

## Architecture

```
src/
  app/
    page.tsx                       # Home
    shop/page.tsx                  # /shop?ritual=cleanse|treat|style|scalp
    product/[handle]/page.tsx      # PDP
    ritual/page.tsx                # 4-step finder
    journal/page.tsx               # Journal index
    about/page.tsx                 # Manifesto
    checkout-disabled/page.tsx     # Stub when Shopify env missing
    api/revalidate/route.ts        # POST webhook from Shopify
    actions/cart.ts                # 'use server' cart mutations
  components/
    layout/                        # Header, Footer, SmoothScroll
    home/                          # Hero, Rituals, Featured, Manifesto, Journal teasers
    shop/                          # ShopGrid, ProductCard
    product/                       # ProductHero, IngredientDrawer, HowToUse, Related
    ritual/                        # RitualQuiz
    ui/                            # AddToCartButton, CartDrawer, CursorFollower,
                                   # MagneticButton, Marquee, SplitText
  context/
    CartContext.tsx                # React context + optimistic updates
  lib/
    data.ts                        # Unified data layer (mock <-> Shopify)
    products.ts                    # Mock catalog (kept for fallback + types)
    journal.ts                     # Journal mock data
    cart-mock.ts                   # Cookie-backed mock cart logic
    shopify/
      client.ts                    # GraphQL fetcher
      queries.ts                   # Product + cart fragments
      index.ts                     # getProducts, addToCart, ...
      types.ts                     # ShopifyProduct, ShopifyCart, ...
scripts/
  seed-products.mjs                # One-shot Admin-API seeder
  seed-data.json                   # The 8 KESTREL formulas
```

## Design system

| Token | Value |
| --- | --- |
| `ink` | `#0A0A0A` background |
| `paper` | `#F4F1EC` primary text |
| `brass` | `#9A8868` accent |
| `smoke` | `#1A1A1A` surface |
| `stone` | `#8A857C` muted |
| Display | Fraunces variable |
| Sans | Inter variable |

## Animation primitives

- `SmoothScroll` — Lenis-driven smooth scroll
- `CursorFollower` — blend-mode ring + dot, fine-pointer only
- `MagneticButton` / `AddToCartButton` — magnetic CTA with spring
- `SplitText` — word-stagger reveal
- Per-section: parallax (`useScroll`/`useTransform`), mask reveals, hover lifts

## Shopify webhook revalidation

Point Shopify webhooks at `https://<host>/api/revalidate` with header
`x-revalidate-secret: <your SHOPIFY_REVALIDATION_SECRET>`.

Topics to subscribe:
- `products/create`, `products/update`, `products/delete`
- `collections/create`, `collections/update`, `collections/delete`

The route invalidates `shopify:products`, `shopify:product:<handle>`, and
`shopify:collection:<handle>` cache tags as appropriate.

## Where mock and live diverge

Most data flows are identical between modes — they both return a `ViewProduct`
from `src/lib/data.ts`. The only divergence is the cart:

| Concern | Mock | Live |
| --- | --- | --- |
| Cart ID | localStorage cookie | Shopify cart ID (httpOnly cookie) |
| Add / update / remove | In-memory + cookie | Shopify Cart API |
| Checkout URL | `/checkout-disabled` | Shop Pay |
| Inventory | Always available | Live `availableForSale` per variant |
| Price / currency | Hardcoded USD | Shopify-managed (multi-currency capable) |
