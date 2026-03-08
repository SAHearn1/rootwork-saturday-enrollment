# Integration Points — rootwork-saturday-enrollment

| Service | Purpose | Failure Impact |
|---------|---------|----------------|
| PostgreSQL | Primary data store | Full failure |
| NextAuth | Authentication | Auth failure |
| Stripe | Payments | Enrollment payments fail |
| Resend | Transactional email | Confirmation emails not sent |

*Part of: SAHearn1/rwfw-agent-governance ecosystem*
