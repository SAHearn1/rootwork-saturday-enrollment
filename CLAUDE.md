# CLAUDE.md — rootwork-saturday-enrollment

> Agent briefing. Read before touching code.
> Governance hub: `SAHearn1/rwfw-agent-governance`

## Repo Identity
- **Purpose:** Saturday program enrollment platform with payments
- **Tier:** 2 (active support)
- **Stack:** Next.js 14 + Stripe + NextAuth + Resend + Prisma

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Auth | NextAuth.js |
| Payments | Stripe (checkout + webhooks) |
| Email | Resend |
| Database | PostgreSQL + Prisma ORM |

## Critical Rules

- **Stripe webhooks must be signature-verified.** Always use `stripe.webhooks.constructEvent()`. A failed verification must return 400, not process the event.
- **Enrollment data is PII.** Parent/student names, emails, and payment info must not appear in logs.
- **Resend emails are transactional.** Test in dev with a sandbox domain. Never send test emails to real addresses.
- **Prisma migrations affect enrollment records.** Always review migration SQL before running in production.
- **NextAuth session required** before any enrollment read/write.
- **No `git add .`**

## Dev Workflow
```bash
npm install
npx prisma generate && npx prisma migrate dev
npm run dev
# Stripe: stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Env Vars
```
NEXTAUTH_URL
NEXTAUTH_SECRET
DATABASE_URL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
RESEND_API_KEY
```

## Governance
Follow `AGENTS.md`. Debug via `docs/AGENT_DEBUG_RUNBOOK.md`.

## Operating Rules

**If you resolve a bug during this session, you MUST append an entry to `docs/INCIDENTS.md` before the session ends. This is non-negotiable. Session is not complete until the entry is committed.**

See Rule 7 in `AGENTS.md` (governance hub: `SAHearn1/rwfw-agent-governance`) for the full incident logging protocol.
