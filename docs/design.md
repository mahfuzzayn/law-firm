# Design.md — Visual & UX System
## Law Firm Platform (France / EU) — "Legal-Tech SaaS" Design Direction

This document is the single source of truth for visual design. The AI coding
agent must not invent colors, fonts, spacing, or component styles outside of
what is defined here. If a new pattern is needed, it must follow these tokens.

---

## 1. Design Philosophy

This is **not** a traditional "brochure" law firm website (dark wood, gavel
clipart, Times New Roman). The product is a **modern legal-tech SaaS
platform** that happens to also serve as the firm's public site. The visual
language should communicate:

- **Trust & authority** — clean structure, generous whitespace, confident typography
- **Modern competence** — feels like Linear / Stripe / Notion, not a 2012 law directory site
- **Calm, not corporate-cold** — warm neutrals, human photography (optional), soft motion
- **French/European sensibility** — refined, understated, no loud gradients or neon

Avoid clichés: no gavels, scales-of-justice icons as decoration, stock photos
of handshakes, or marble textures.

---

## 2. Color System

Use CSS variables (HSL) so shadcn/Tailwind theming and dark mode work natively.

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--background` | `#FAF9F6` (warm off-white) | `#0B0F1A` | Page background |
| `--foreground` | `#12151C` | `#EDEFF3` | Body text |
| `--primary` | `#0B1F3A` (deep ink navy) | `#3B5A8A` | Primary buttons, nav, headings accents |
| `--primary-foreground` | `#FFFFFF` | `#FFFFFF` | Text on primary |
| `--secondary` | `#F1EFE9` | `#161B26` | Cards, subtle panels |
| `--accent` | `#B08D57` (muted bronze/gold) | `#C9A466` | CTAs highlight, active states, dividers |
| `--muted` | `#6B7280` | `#9AA3B2` | Secondary text |
| `--border` | `#E4E1D9` | `#232837` | Borders, dividers |
| `--destructive` | `#B3261E` | `#E5484D` | Errors, delete actions |
| `--success` | `#2E7D32` | `#4ADE80` | Success states, "case won" badges |
| `--warning` | `#B7791F` | `#F5A524` | Deadlines, pending states |

Accent gold is used **sparingly** — underlines, active tab indicator, icon on
hover, small badges. Never large blocks of gold.

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display / Headings | **Fraunces** (serif, variable) | Editorial, confident, used for H1/H2 only |
| Body / UI | **Inter** or **Geist Sans** | Everything else: nav, buttons, dashboard UI |
| Monospace (dashboard data, IDs, timestamps) | **Geist Mono** | Case numbers, invoice IDs |

Type scale (Tailwind-compatible, rem):

```
text-xs   0.75rem   dashboard meta
text-sm   0.875rem  body small / table cells
text-base 1rem      body
text-lg   1.125rem  lead paragraphs
text-2xl  1.5rem    section headers
text-4xl  2.25rem   page headers (public site)
text-6xl  3.75rem   hero headline
```

Headings use `font-serif` (Fraunces) with `tracking-tight`. Everything else
uses `font-sans` (Inter/Geist).

---

## 4. Layout & Spacing

- 8px base grid (Tailwind default spacing scale, no arbitrary values unless necessary)
- Max content width: `max-w-7xl` for public pages, full-width fluid for dashboard
- Section vertical rhythm: `py-24` desktop / `py-12` mobile
- Card radius: `rounded-xl` (12px) — consistent everywhere, no mixing radii
- Shadows: soft, low-opacity only — `shadow-sm` / `shadow-md`, never harsh drop shadows

### Breakpoints (Tailwind defaults — do not customize)
```
sm  640px   mobile landscape
md  768px   tablet
lg  1024px  small laptop
xl  1280px  desktop
2xl 1536px  large desktop
```

Design mobile-first. Dashboard collapses to a bottom nav / drawer sidebar below `lg`.

---

## 5. Components (shadcn/ui baseline)

Use shadcn/ui as the component foundation, themed with the tokens above.
Do not introduce a second UI kit.

- Buttons: solid primary (navy), outline (border), ghost (nav links), and a
  single **accent** variant (gold) reserved for primary conversion CTAs
  ("Book a Consultation", "Request Access") — max one per view
- Cards: `rounded-xl border bg-secondary/40 backdrop-blur-sm` for public site;
  flat `bg-card border` for dashboard tables/panels
- Forms: shadcn `Form` + `react-hook-form` + `zod`, floating/inline labels,
  clear inline validation states
- Tables (dashboard): shadcn `DataTable` pattern — sortable headers, sticky
  header on scroll, row hover, pagination footer
- Navigation: sticky translucent header on public site (`backdrop-blur`,
  border-bottom on scroll); dashboard uses fixed left sidebar (collapsible) + topbar

---

## 6. Motion & Animation (Framer Motion)

Motion should feel **precise and understated** — never bouncy or cartoonish.

| Interaction | Animation | Duration / Easing |
|---|---|---|
| Page/section enter | Fade + 12px slide-up | 400ms `ease-out` |
| Hero headline | Staggered word/line reveal | 500ms, 60ms stagger |
| Nav dropdown / mobile menu | Fade + scale 0.98→1 | 200ms |
| Dashboard route change | Cross-fade only (no slide) | 150ms |
| Cards on hover | `translateY(-2px)` + shadow increase | 200ms |
| Button press | `scale(0.98)` | 100ms |
| Toast / notification | Slide-in from top-right + fade | 300ms |
| Modal / Dialog | Scale 0.96→1 + fade, backdrop fade | 250ms |
| Skeleton loaders (MSW latency) | Shimmer pulse | 1.5s loop |
| Chart data (dashboard) | Animated draw-in on mount | 600ms |

Respect `prefers-reduced-motion`: disable transforms, keep opacity fades only.

---

## 7. Imagery & Iconography

- Icons: `lucide-react` exclusively, `stroke-[1.5]`, sized `h-5 w-5` default
- Photography (optional, if used): natural light, muted tone-mapped to match
  navy/bronze palette; avoid generic corporate stock. Prefer abstract
  geometric SVG patterns (subtle line-grids, arcs) as section backgrounds
  instead of photos where possible — cheaper to build, on-brand, no licensing risk
- Avoid literal icons: gavel, scales of justice as decoration, handshake clipart

---

## 8. Dark Mode

Full dark mode required, driven by `next-themes` + Tailwind `class` strategy.
Dashboard defaults to system preference; public site defaults to light.

---

## 9. Accessibility

- WCAG 2.1 AA minimum contrast on all text/background pairs above
- All interactive elements keyboard-navigable, visible focus ring (`ring-2 ring-accent`)
- Form errors announced via `aria-live`
- All icons decorative unless paired with `aria-label`

---

## 10. Page-Level Layout Patterns (Public Site)

1. **Home** — Hero (headline + accent CTA + trust badges: bar association,
   years active, languages spoken) → Practice Areas grid (icon cards) →
   Why Us / Stats strip → Attorney highlight carousel → Testimonials →
   Insights/Blog preview → Contact/CTA band
2. **Practice Areas (listing + detail)** — filterable grid → detail page with
   sticky "Request Consultation" side panel
3. **Attorneys** — grid of profile cards → individual profile page (bio,
   credentials, languages, practice areas, contact form)
4. **Insights/Blog** — list with category filter, reading time, search
5. **Contact** — form (zod-validated) + office map placeholder + booking widget
6. **Legal (Mentions légales, CGU, Politique de confidentialité)** — required
   for France; plain typographic layout

## 11. Dashboard Layout Pattern

Fixed left sidebar (collapsible to icons) + topbar (search, notifications,
profile) + main content area with breadcrumbs. Data-dense screens use
tables; overview screens use card grids + charts (Recharts). See
`requirements.md §8` for full feature list per module.

---

## 12. Design Deliverable Checklist for the Coding Agent

- [ ] Tailwind `theme.extend` config matching tokens in §2–§4 exactly
- [ ] `globals.css` CSS variables for light + dark
- [ ] shadcn components installed and re-themed (not restyled ad hoc per page)
- [ ] Typography scale implemented as Tailwind utility classes, not inline styles
- [ ] One shared `<Container>` layout primitive for consistent max-width/padding
- [ ] Motion variants centralized in `lib/motion.ts` and reused, not redefined per component