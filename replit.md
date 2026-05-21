# Botly — AI Customer Support SaaS

An AI-powered customer support chatbot platform for small businesses (beauty salons, lash techs, restaurants, coaches, ecommerce). Botly captures leads, answers customer questions 24/7, detects buying intent, and pushes visitors to a PayPal checkout.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/botly run dev` — run the frontend (port 22129)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `AI_INTEGRATIONS_OPENAI_BASE_URL`, `AI_INTEGRATIONS_OPENAI_API_KEY` — Replit OpenAI proxy (set automatically)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, shadcn/ui, TanStack Query, Wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- AI: OpenAI GPT via Replit AI proxy (`@workspace/integrations-openai-ai-server`)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/db/src/schema/` — DB schema (leads, chat messages, FAQ, settings)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)
- `lib/api-zod/` — Generated Zod schemas from OpenAPI
- `lib/api-client-react/` — Generated React Query hooks from OpenAPI
- `artifacts/api-server/src/routes/` — Express route handlers (leads, chat, faq, settings, stats)
- `artifacts/botly/src/pages/` — Frontend pages (index, pricing, demo, dashboard/*)
- `artifacts/botly/src/components/` — Shared UI components + layouts

## Architecture decisions

- Contract-first API: OpenAPI spec defines all endpoints; never hand-write API types in client code — use generated hooks and Zod schemas.
- Buying intent detection: keyword-based detection in chat route; triggers PayPal CTA when detected.
- AI chat uses conversation history (last 10 messages) + FAQ context for accurate, personalised replies.
- Settings table is a singleton (one row, auto-created on first GET).
- PayPal URL is hardcoded as the payment link: `https://www.paypal.com/qrcodes/managed/fe032ce3-cfc8-4142-957f-0fab542284c7`

## Product

- **Landing page** (`/`) — Hero, features, social proof, CTA to PayPal
- **Pricing page** (`/pricing`) — Starter £20/mo, Business £50/mo, Premium £99/mo with PayPal CTAs
- **Demo page** (`/demo`) — Live AI chat widget demo
- **Dashboard** (`/dashboard`) — Overview stats (leads, sessions, intent, conversion rate)
- **Leads** (`/dashboard/leads`) — Table of captured leads with search and delete
- **Chat Logs** (`/dashboard/chatlogs`) — Session list with transcript viewer
- **FAQ** (`/dashboard/faq`) — Knowledge base management (add/edit/delete)
- **Settings** (`/dashboard/settings`) — Business name, greeting, pricing labels

## User preferences

- Luxury black-and-white design with a single accent color (indigo/violet)
- No emojis anywhere in the UI
- Mobile-first, clean and professional SaaS aesthetic
- PayPal link must appear on all purchase CTAs

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after editing `openapi.yaml`
- Always run `pnpm --filter @workspace/db run push` after editing schema files
- Use `req.log` in route handlers, never `console.log`
- The API server must be running for the dashboard to show live data

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
