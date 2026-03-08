# Debug Playbook — rootwork-saturday-enrollment

| Symptom | Check First | Common Root Cause |
|---------|-------------|-------------------|
| NextAuth session null | NEXTAUTH_SECRET | Missing or mismatched secret |
| Prisma P1001 | DATABASE_URL | DB unreachable |
| Stripe payment fails | STRIPE_SECRET_KEY | Test vs live key mismatch |
| Resend email fails | RESEND_API_KEY | Missing or invalid key |
| Next.js build fails | TypeScript check | Type regression |

*See: [RWFW Debug Playbook](https://github.com/SAHearn1/rwfw-agent-governance/blob/main/docs/DEBUG_PLAYBOOK.md)*
