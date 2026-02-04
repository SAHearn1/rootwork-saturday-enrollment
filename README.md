This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## RootWork Framework Saturday Enrollment

Registration portal for the RootWork Framework Saturday Enrichment Program.

## Logo Configuration

The application logo needs to be embedded as base64 to ensure it persists across deployments. See [LOGO_SETUP.md](./LOGO_SETUP.md) for detailed instructions on how to add your logo.

**Quick summary:**
1. Convert your logo to base64: `base64 -w 0 your-logo.png > logo_base64.txt`
2. Update `/src/config/logo.ts` with the base64 string
3. The logo will automatically display in the registration header

## Getting Started

### Prerequisites

1. **Node.js** 18.x or higher
2. **PostgreSQL** database (Vercel Postgres recommended)
3. **Stripe account** for payment processing (https://stripe.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rootwork-saturday-enrollment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

   Required variables:
   ```bash
   # Database (Vercel Postgres)
   POSTGRES_URL="postgres://..."
   POSTGRES_URL_NON_POOLING="postgres://..."
   POSTGRES_PRISMA_URL="prisma+postgres://..."

   # Stripe (get from https://dashboard.stripe.com/test/apikeys)
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   
   # Optional: For webhook handling in production
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

4. **Set up the database**
   ```bash
   # Push schema to database
   npm run db:push
   
   # Seed with sample sessions (optional)
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

### Stripe Setup

1. **Sign up for Stripe** at https://stripe.com
2. **Get your API keys**:
   - Go to Developers > API keys in Stripe Dashboard
   - Copy your Publishable key (pk_test_...) and Secret key (sk_test_...)
   - Add them to your `.env.local` file
3. **Test payments** using Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

See [STRIPE_INTEGRATION.md](./STRIPE_INTEGRATION.md) for detailed payment integration documentation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
