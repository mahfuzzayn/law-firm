# Cabinet Juridique — Law Firm Platform

**Live demo:** _[coming soon]_

A modern, bilingual (FR/EN) law firm practice management platform built with **Next.js 16**, **Tailwind CSS v4**, and **shadcn/ui**. Features a public-facing marketing site and a full interactive dashboard for case, client, document, billing, and team management — all backed by **Mock Service Worker (MSW)** simulating a real REST API.

Built as a Phase 1 front-end prototype. No real backend, database, or third-party services are wired in.

---

<p align="center">
  Built by <a href="https://morlabs.fr"><strong>Morlabs</strong></a>
  <br>
  <sub>Product engineering &amp; digital strategy</sub>
</p>

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 16** (App Router), TypeScript strict mode |
| Styling | **Tailwind CSS v4**, shadcn/ui (Radix primitives) |
| i18n | **next-intl v4** — FR (default), EN |
| State | **Zustand** (persisted with `zustand/middleware`) |
| Forms & validation | **react-hook-form** + **zod** |
| Charts | **Recharts** |
| Mock backend | **MSW** (Mock Service Worker) in the browser |
| Animation | **Framer Motion** |
| Icons | **lucide-react** |
| Toasts | **sonner** |
| Theming | **next-themes** (light/dark/system) |
| Dates | **date-fns** |

### Allowed packages (strict allow-list per requirements)

`next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`, `lucide-react`, `framer-motion`, `react-hook-form`, `@hookform/resolvers`, `zod`, `zustand`, `next-intl`, `next-themes`, `recharts`, `date-fns`, `msw`, `@faker-js/faker`, `eslint`, `eslint-config-next`, `prettier`, `prettier-plugin-tailwindcss`, `@types/node`, `@types/react`, `@types/react-dom`.

---

## Prerequisites

- **Node.js** ≥ 18 (v20.18.3 recommended)
- **npm** ≥ 10

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000`. You'll be redirected to `http://localhost:3000/fr` (default locale) or `http://localhost:3000/en` for English.

### Environment Variables

Create a `.env.local` file at the project root:

```env
# Phase 1: enables MSW mocking in the browser
NEXT_PUBLIC_API_MOCKING=enabled
```

No other environment variables are required for Phase 1.

### Demo Login

Navigate to `/login` and use one of these credentials (password is ignored):

| Role | Email |
|---|---|
| Admin | `admin@cabinet.fr` |
| Lawyer | `lawyer@cabinet.fr` |
| Staff | `staff@cabinet.fr` |

Click an email on the login page to auto-fill, or type any email and any password.

---

## How MSW Mocking Works

All API calls are intercepted by **Mock Service Worker** running in the browser.

1. The MSW service worker script is in `public/mockServiceWorker.js`
2. It intercepts all `fetch()` calls to `/api/mock/*`
3. Each request is handled by a domain-specific handler in `src/mocks/handlers/`
4. Data is generated with `@faker-js/faker` (French locale) and seeded for reproducibility
5. All mutations (create/update/delete) modify in-memory data stores — changes persist for the session

### Resetting Mock Data

Data is reset automatically on page reload (it's re-seeded when the module loads). To force a fresh seed, simply refresh the browser.

### Mock Login

1. Navigate to `/login`
2. Use one of the demo accounts:
   - **Admin:** `admin@cabinet.fr`
   - **Lawyer:** `lawyer@cabinet.fr`
   - **Staff:** `staff@cabinet.fr`
3. Password is ignored in Phase 1 — any value works
4. The session is stored in `localStorage` and persists across page loads until cleared

---

## Folder Structure

```
lawfirm-platform/
├── docs/
│   ├── design.md               # Visual design system (source of truth)
│   └── requirements.md          # Full specification (source of truth)
├── public/
│   ├── mockServiceWorker.js     # MSW service worker
│   └── images/                  # Static images
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (public)/        # Public site pages
│   │   │   │   ├── page.tsx                    # Home
│   │   │   │   ├── practice-areas/             # Listing + detail
│   │   │   │   ├── attorneys/                  # Listing + detail
│   │   │   │   ├── insights/                   # Blog listing
│   │   │   │   ├── contact/                    # Contact form
│   │   │   │   ├── legal/                      # Legal pages
│   │   │   │   └── login/                      # Mock login
│   │   │   └── (dashboard)/    # Dashboard pages
│   │   │       ├── dashboard/
│   │   │       ├── cases/      # DataTable + CRUD
│   │   │       ├── clients/    # DataTable + CRUD
│   │   │       ├── documents/  # File list + upload
│   │   │       ├── calendar/   # Month grid + events
│   │   │       ├── billing/    # Invoices + time tracking
│   │   │       ├── tasks/      # Kanban board
│   │   │       ├── team/       # Team grid
│   │   │       ├── analytics/  # Recharts dashboards
│   │   │       └── settings/   # Firm config
│   │   ├── layout.tsx          # Root layout (fonts, theme, MSW)
│   │   └── globals.css         # Global styles & design tokens
│   ├── components/
│   │   ├── ui/                 # shadcn generated components
│   │   ├── public/             # Header, Footer, ContactForm
│   │   ├── dashboard/          # DashboardShell
│   │   └── shared/             # Container, Logo, ThemeToggle, etc.
│   ├── hooks/                  # Data fetching hooks per domain
│   ├── stores/                 # Zustand stores (auth, ui)
│   ├── lib/
│   │   ├── api/                # Typed fetch wrappers per domain
│   │   ├── motion.ts           # Centralized Framer Motion variants
│   │   └── utils.ts            # cn() helper
│   ├── mocks/
│   │   ├── browser.ts          # MSW browser setup
│   │   ├── handlers/           # 9 handler files (cases, auth, etc.)
│   │   └── data/               # Faker seed data
│   ├── types/                  # TypeScript interfaces
│   └── i18n/
│       ├── routing.ts          # Locale config (fr, en)
│       ├── navigation.ts       # Typed Link, redirect, etc.
│       ├── request.ts          # Request-scoped config
│       ├── messages/           # fr.json, en.json
│       └── proxy.ts            # next-intl middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build with TypeScript check |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Build & Deploy

```bash
# Production build
npm run build

# The output is in the .next/ directory
# Deploy the .next folder and public/ to your hosting provider
```

### Vercel Deployment

1. Push the repository to GitHub
2. Import the project in Vercel
3. Framework preset: Next.js (auto-detected)
4. Build command: `next build`
5. Environment variables: none required for Phase 1
6. Deploy

### Production Note

MSW is only active when `NEXT_PUBLIC_API_MOCKING=enabled` is set. In production, either:
- Remove this env var, or
- Set it to `disabled`

The middleware and service worker are only initialized client-side when the flag is enabled.

---

## Known Limitations (Phase 1)

- **No real backend**: All data is mock-only, generated by Faker, and persisted in-memory via MSW for the session
- **No real authentication**: Login accepts any password. Session is stored in `localStorage`
- **No real file storage**: Document uploads are stored as metadata only
- **No real email**: Team invitations, notifications, and contact form submissions are simulated via MSW
- **No analytics tracking**: No real analytics or cookie tracking beyond functional cookies
- **Blog details**: Insights list is static; no detail pages or full text
- **Client portal**: Client-facing portal is out of scope for Phase 1
- **Legal content**: Legal page copy is structural/placeholder — not reviewed by a real lawyer

---

## License

Phase 1 prototype. All rights reserved.

---

## Design System

See [`docs/design.md`](./docs/design.md) for the complete visual spec — colors, typography, spacing, motion, component patterns, and accessibility requirements.

See [`docs/requirements.md`](./docs/requirements.md) for the full functional specification and guardrails.
