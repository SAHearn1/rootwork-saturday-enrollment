# AGENTS.md — rootwork-saturday-enrollment
**Registration portal for RootWork Framework Saturday Enrichment Program**
**Governance Hub:** [SAHearn1/rwfw-agent-governance](https://github.com/SAHearn1/rwfw-agent-governance)

## Stack
Next.js 14 + TypeScript + Prisma + PostgreSQL + Stripe + NextAuth + Resend

## Rules
1. Read before acting. 2. First failing boundary. 3. Smallest viable fix.
4. Run `npm run lint`, typecheck, tests before marking done.
5. Prisma safety: never modify schema without running `npm run db:migrate` in a safe environment.
6. Governance-only scope: `/docs/`, `/.github/`, `/AGENTS.md`, `/repo.intelligence.yml`, root markdown.

## Commands
```bash
npm run dev
npm run build
npm run lint
npm run db:push
npm run db:studio
npm run db:seed
```

*Governed by: [SAHearn1/rwfw-agent-governance](https://github.com/SAHearn1/rwfw-agent-governance)*
