# Requirements.md — Law Firm Platform

**Companion document:** `design.md` (visual system — must be followed exactly)

**Build agent:** Deepseek V4 Pro via CLI (e.g. Claude Code–style agentic CLI)
**Human operator:** provides this file + `design.md` + a step-by-step manual
guide; reviews and approves each phase before the agent proceeds to the next.

---

## 1. Project Overview

A web platform for a law firm (or multi-firm SaaS product) based in **France
/ EU**. It is not just a marketing website — it is meant to be a genuine
piece of software the firm uses to run and grow its practice: public-facing
site for client acquisition, plus an internal **dashboard** for case,
client, document, billing, and team management.

Phase 1 (this build) is **fully front-end**, backed by **Mock Service
Worker (MSW)** simulating a real REST API and database, so every feature is
interactive and demonstrable without a real backend. Architecture must be
clean enough that MSW handlers can later be swapped for real API routes
without touching UI code.

## 2. Goals

- Give a French/European law firm a credibly better tool than a static
  website — one that shows how they'd actually manage cases, clients, and
  growth day to day.
- Every feature must be **interactive and working** (not placeholder
  screenshots) — forms submit, tables filter/sort/paginate, data persists
  for the session via MSW, charts render real (mock) data.
- Fully responsive: mobile, tablet, laptop, desktop.
- Bilingual: **French (default) and English**.
- Production-deployable to Vercel at the end of the build.

## 3. Target Users

| Role | Access | Description |
|---|---|---|
| Prospective client / visitor | Public site | Browses practice areas, attorneys, books a consultation |
| Client (optional, phase 2) | Client portal (stub only in phase 1) | Views their own case status/documents |
| Staff / Paralegal | Dashboard (limited) | Manages assigned tasks, documents, calendar |
| Lawyer / Associate | Dashboard | Manages own cases, clients, billing, calendar |
| Firm Admin / Partner | Dashboard (full) | Manages team, all cases, firm settings, analytics |

Role-based access must be simulated via MSW (mock auth + role claims), not a
real auth provider, in Phase 1.

---

## 4. Tech Stack (Locked)

| Layer | Choice |
|---|---|
| Framework | **Next.js 14+ (App Router)**, TypeScript strict mode |
| Styling | **Tailwind CSS** |
| Components | **shadcn/ui** (Radix primitives underneath) |
| Mock backend | **Mock Service Worker (MSW)** — `msw` npm package, browser + node modes |
| Animation | **Framer Motion** |
| Forms & validation | **react-hook-form** + **zod** |
| Charts (dashboard) | **Recharts** |
| Icons | **lucide-react** |
| State (client) | **Zustand** (dashboard UI state only — filters, sidebar, etc.) |
| i18n | **next-intl** (FR default, EN secondary) |
| Theming | **next-themes** (light/dark) |
| Dates | **date-fns** |
| Deployment | **Vercel** |

No other frameworks, CSS libraries, state managers, or component kits are
permitted without explicit human approval (see §12 Guardrails).

---

## 5. Package Shortlist (Strict Allow-List)

The coding agent **must not** `npm install` anything outside this list
without stopping and asking the human operator first.

```
next
react
react-dom
typescript
tailwindcss
postcss
autoprefixer
class-variance-authority
clsx
tailwind-merge
tailwindcss-animate
lucide-react
framer-motion
react-hook-form
@hookform/resolvers
zod
zustand
next-intl
next-themes
recharts
date-fns
msw
@faker-js/faker        (for generating realistic mock data)
eslint
eslint-config-next
prettier
prettier-plugin-tailwindcss
@types/node
@types/react
@types/react-dom
```

shadcn/ui components are **generated via CLI into the repo** (not a runtime
dependency) — this is expected and does not count as a new package, but the
underlying Radix packages it pulls in (`@radix-ui/react-*`) are implicitly
allowed since they are shadcn's own dependencies.

---

## 6. Folder Structure

```
lawfirm-platform/
├── design.md
├── requirements.md
├── README.md
├── public/
│   ├── mockServiceWorker.js
│   └── images/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (public)/
│   │   │   │   ├── page.tsx                # Home
│   │   │   │   ├── practice-areas/
│   │   │   │   ├── attorneys/
│   │   │   │   ├── insights/                # Blog
│   │   │   │   ├── contact/
│   │   │   │   └── legal/                   # Mentions légales, CGU, RGPD
│   │   │   ├── (dashboard)/
│   │   │   │   ├── layout.tsx               # Sidebar + topbar shell
│   │   │   │   ├── dashboard/
│   │   │   │   ├── cases/
│   │   │   │   ├── clients/
│   │   │   │   ├── documents/
│   │   │   │   ├── calendar/
│   │   │   │   ├── billing/
│   │   │   │   ├── tasks/
│   │   │   │   ├── team/
│   │   │   │   ├── analytics/
│   │   │   │   └── settings/
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                # shadcn generated components
│   │   ├── public/             # marketing site components
│   │   ├── dashboard/          # dashboard-specific components
│   │   └── shared/             # Container, Logo, ThemeToggle, etc.
│   ├── lib/
│   │   ├── motion.ts           # centralized Framer Motion variants
│   │   ├── utils.ts            # cn() helper etc.
│   │   ├── validators/         # zod schemas
│   │   └── constants.ts
│   ├── mocks/
│   │   ├── browser.ts          # MSW browser setup
│   │   ├── server.ts           # MSW node setup (for tests/SSR)
│   │   ├── handlers/
│   │   │   ├── cases.ts
│   │   │   ├── clients.ts
│   │   │   ├── documents.ts
│   │   │   ├── billing.ts
│   │   │   ├── team.ts
│   │   │   ├── auth.ts
│   │   │   └── index.ts
│   │   └── data/               # faker-generated seed datasets
│   ├── hooks/
│   ├── stores/                 # zustand stores
│   ├── types/
│   ├── i18n/
│   │   ├── messages/
│   │   │   ├── fr.json
│   │   │   └── en.json
│   │   └── config.ts
│   └── styles/
│       └── globals.css
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 7. Public Website — Feature Requirements

- **Home**: animated hero, practice area cards, firm stats, attorney
  highlights, testimonials carousel, insights preview, contact CTA
- **Practice Areas**: listing + individual detail pages, filterable
- **Attorneys**: team grid + individual profile pages (bio, credentials,
  bar number format, languages spoken, contact form)
- **Insights (Blog)**: list with category/tag filter, search, detail page
- **Contact**: validated form (name, email, phone, message, practice area
  dropdown) submitting to an MSW endpoint with simulated latency + success/error states; booking widget (date/time picker, mock availability from MSW)
- **Legal pages**: Mentions légales, CGU, Politique de confidentialité,
  Cookie policy — required for a French-facing site; cookie consent banner
  (functional, stores preference in local state)
- **Language switcher**: FR default, EN toggle, persisted preference
- **Theme switcher**: light/dark

---

## 8. Dashboard — Feature Requirements

This is the core differentiator: a working practice-management dashboard.

### 8.1 Overview (`/dashboard`)
- KPI cards: active cases, open tasks, upcoming deadlines, monthly revenue (mock)
- Charts: caseload by practice area, revenue trend, client acquisition trend (Recharts, animated draw-in)
- Upcoming deadlines/calendar widget
- Recent activity feed

### 8.2 Case / Matter Management (`/cases`)
- Data table: case number, client, practice area, status, assigned lawyer, next deadline
- Filter/sort/search/pagination (all functional against MSW data)
- Case detail page: timeline of events, linked documents, linked client,
  billing summary, status update, notes/comments thread
- Create/edit case modal (react-hook-form + zod)
- Status workflow (e.g. Open → In Progress → Pending Court → Closed) with guardable transitions

### 8.3 Client Management / CRM (`/clients`)
- Client list (individual + company), contact info, linked cases
- Client detail page: case history, documents, communication log (mock), billing history
- Add/edit client form

### 8.4 Document Management (`/documents`)
- Mock file upload (drag-and-drop UI, progress animation, stored as metadata via MSW — no real file storage needed)
- Folder/category structure per case/client
- Preview modal (name, type, size, uploaded by, date)
- Search + filter by case/client/type

### 8.5 Calendar & Scheduling (`/calendar`)
- Month/week/day views
- Court dates, client meetings, internal deadlines color-coded by type
- Create/edit event modal, conflict indication (mock logic)

### 8.6 Billing & Invoicing (`/billing`)
- Mock invoice list: client, case, amount, status (draft/sent/paid/overdue)
- Time-tracking entries linked to cases (mock timer + manual entry)
- Generate invoice from tracked time (client-side calculation, MSW-persisted)
- Simple revenue reporting view

### 8.7 Task Management (`/tasks`)
- Kanban board (To Do / In Progress / Review / Done), drag-and-drop
- Tasks linked to cases and assignees, due dates, priority tags

### 8.8 Team Management (`/team`)
- Staff list, roles/permissions (mock RBAC), workload indicator (open cases/tasks per person)
- Invite member (mock email flow)

### 8.9 Analytics (`/analytics`)
- Deeper reporting: case outcomes, practice-area profitability (mock),
  client acquisition channels, average case duration
- Exportable (mock CSV export trigger)

### 8.10 Settings (`/settings`)
- Firm profile (name, logo upload mock, address, bar registration info)
- Branding controls limited to the design tokens defined in `design.md`
  (do not expose a full theme builder — this is a guardrail, see §12)
- Notification preferences
- Team roles/permissions management
- Language/locale default for the firm

### 8.11 Auth (mocked)
- Login screen (mock credentials, MSW-issued mock session/token)
- Role-based route protection (Admin/Lawyer/Staff) via middleware reading mock session
- No real password storage or real security — clearly a Phase 1 mock, flagged as such in code comments

---

## 9. Mock Service Worker Requirements

- MSW must run in **both** the browser (for client interactions) and be
  wired for local dev realism — simulate network latency (300–800ms
  randomized) and occasional simulated error responses (for testing error
  states/toasts)
- Seed data generated with `@faker-js/faker`, but **localized to French
  names/addresses/phone formats** where relevant, to keep the demo credible
  for a French audience
- REST-style endpoints under `/api/mock/*`, one handler file per domain
  (cases, clients, documents, billing, team, auth, calendar, tasks)
- All dashboard writes (create/update/delete) must actually mutate the MSW
  in-memory dataset for the session, so the UI feels like a real working app
- Document handlers structured so that swapping to a real backend later
  only requires replacing the fetch layer (`lib/api/*.ts`), not the UI

---

## 10. Non-Functional Requirements

- **Responsive**: mobile-first, verified at 375px, 768px, 1024px, 1440px
- **Animated & interactive**: per `design.md` §6 motion spec — no static, dead pages
- **Performance**: Lighthouse ≥ 90 on Performance/Best Practices/SEO for public pages
- **Accessibility**: WCAG AA (see `design.md` §9)
- **SEO**: proper metadata, OpenGraph tags, sitemap.xml, robots.txt on public routes
- **i18n**: FR default, all UI strings externalized to `i18n/messages/*.json` — no hardcoded copy
- **GDPR-appropriate copy**: cookie banner, legal pages present (content can be placeholder Lorem-in-French but structurally complete)
- **Type safety**: TypeScript strict, no `any` without justification comment
- **Code quality**: ESLint + Prettier clean on every commit

---

## 11. Design Roadmap (Build Phases)

The agent must build and get sign-off in this order — do not skip ahead:

1. **Foundation** — Next.js + Tailwind + shadcn init, design tokens from `design.md`, folder structure, i18n scaffold, theme toggle
2. **MSW setup** — handlers + seed data for all domains, verify mock API works standalone (e.g. via a test page or Postman-style fetch)
3. **Public site** — Home → Practice Areas → Attorneys → Insights → Contact → Legal pages, fully responsive + animated
4. **Dashboard shell** — sidebar/topbar layout, mock auth/login, route protection
5. **Dashboard modules** — Overview → Cases → Clients → Documents → Calendar → Billing → Tasks → Team → Analytics → Settings (one module fully working end-to-end before moving to next)
6. **Polish pass** — animation consistency, empty states, loading skeletons, error states, responsive QA across breakpoints
7. **README.md** — full setup/run/build instructions (see §14)
8. **Deployment** — Vercel (see §15)

Each phase should end with the agent summarizing what was built and waiting
for human review before continuing, unless explicitly told to proceed
autonomously through all phases.

---

## 12. AI Guardrails — What the Agent Must NOT Do

These are hard constraints for the coding agent (Deepseek V4 Pro / CLI). If
a task seems to require violating one of these, the agent must stop and ask
the human operator instead of proceeding.

1. **No new packages** beyond §5's allow-list without explicit human approval — do not silently `npm install` anything else, including "small utility" packages.
2. **No real backend, real database, or real third-party API calls.** Everything is MSW-mocked in Phase 1. Do not wire up Supabase/Firebase/Postgres/Stripe/Auth0/etc. even if it seems "easy."
3. **No real secrets or API keys.** No `.env` values beyond placeholders; never commit real credentials.
4. **No fabricated real-world claims.** Do not invent or imply a real bar association number, real court affiliations, real named law firms/attorneys, or real legal credentials — all sample content must be clearly fictional/placeholder.
5. **No unauthored legal advice.** Placeholder legal-page copy must be generic/structural, not actual legal counsel content, and must not be presented as reviewed by a real lawyer.
6. **No design deviation.** Colors, fonts, spacing, and component styles must come from `design.md`. Do not introduce ad hoc styles, gradients, or a second design language.
7. **No architecture deviation.** Follow the folder structure in §6. If a new top-level folder or pattern is genuinely needed, ask first.
8. **No skipping responsiveness or accessibility** to save time — these are required, not optional polish.
9. **No autonomous deployment.** Do not run `vercel --prod` or push to a production deployment without explicit human go-ahead for that phase.
10. **No destructive git/file operations** (force-push, deleting unrelated files, rewriting history) without explicit instruction.
11. **No silent scope expansion.** Do not add a client-facing portal, real payments, real e-signature, or other Phase 2+ features unless asked — flag them as future scope instead.
12. **No mock data that looks like real people/firms.** Faker-generated data only; do not use real names of real practicing French lawyers or real firm names.
13. **Stay incremental.** Build and report phase-by-phase per §11; don't generate the entire codebase in one uncontrolled pass without checkpoints.
14. **Ask when ambiguous.** If `requirements.md` or `design.md` doesn't specify something needed to proceed, the agent should make the smallest reasonable assumption, state it explicitly, and continue — not block indefinitely, and not invent large unrequested features.

---

## 13. Manual / Operator Guide

The human operator will supply a separate step-by-step manual guide
alongside this file (workflow for prompting the CLI agent phase-by-phase,
review checkpoints, and how to run/test locally). This requirements file
should be treated as the fixed specification; the manual guide governs the
*process* of working with the agent session by session.

---

## 14. README.md Requirements (to be generated at end of build)

The agent must produce a `README.md` containing:
- Project description and tech stack summary
- Prerequisites (Node version, package manager)
- Install & run instructions (`npm install`, `npm run dev`)
- How MSW mocking works and how to reset mock data
- Folder structure overview (link to this file for full detail)
- Environment variables (placeholders only)
- Build & deploy instructions
- Known limitations (Phase 1 mock-only scope, per §12)
- License/ownership note

---

## 15. Deployment (Vercel)

- Connect repository to Vercel (GitHub integration)
- Framework preset: Next.js (auto-detected)
- Build command: `next build`; Output: default `.next`
- Environment variables: none required for Phase 1 (all mocked) — document this explicitly in README
- Verify MSW does not run in production build in a way that breaks SSR (MSW should only intercept client-side fetches in the browser; confirm no mock worker registration attempts on the server bundle)
- Set up preview deployments per branch/PR; production deploy only on explicit human approval (per Guardrail §12.9)
- Post-deploy checklist: verify responsive layout, verify FR/EN switch, verify dashboard mock login flow, run Lighthouse audit

---

## 16. Deliverables Checklist

- [ ] `design.md` (provided)
- [ ] `requirements.md` (this file)
- [ ] Working Next.js codebase per folder structure in §6
- [ ] Fully interactive public site (§7)
- [ ] Fully interactive dashboard (§8)
- [ ] MSW mock backend covering all modules (§9)
- [ ] `README.md` (§14)
- [ ] Deployed Vercel URL (§15)
- [ ] Operator's manual guide (supplied separately by human operator)