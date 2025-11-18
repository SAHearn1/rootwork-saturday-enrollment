# Database Setup Guide

## Overview

The application is configured to store enrollment data in the Vercel Postgres database named **EnrollmentData** using Prisma ORM.

## Environment Configuration

The database connection strings must be configured in a `.env` file (which is gitignored for security). A template is provided in `.env.example`. When deploying to Vercel, you'll need to set these environment variables in your Vercel project settings.

### Required Environment Variables

**Important:** The database should be named **EnrollmentData** in your Vercel Postgres configuration.

```
POSTGRES_URL="postgres://[username]:[password]@[host]:5432/EnrollmentData?sslmode=require"
POSTGRES_URL_NON_POOLING="postgres://[username]:[password]@[host]:5432/EnrollmentData?sslmode=require"
POSTGRES_PRISMA_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=[your-api-key]"
```

To get started locally:
1. Copy `.env.example` to `.env`
2. Fill in your actual database credentials
3. Ensure the database name is `EnrollmentData` in the connection URLs

## Database Schema

The application uses the following main models to store enrollment data:

### Session Model
- Stores available time slots with grade levels
- Capacity: 25 students per session
- Includes date, time, grade level, and location

### Student Model
- Stores student information (name, DOB, grade, etc.)
- Includes parent/guardian contact information
- Emergency contact details
- Medical information (allergies, medications, special needs)

### Enrollment Model
- Links students to sessions
- Tracks enrollment status (PENDING, CONFIRMED, WAITLISTED, CANCELLED)
- Tracks payment status (PENDING, DEPOSIT_PAID, PAID_IN_FULL, REFUNDED)
- Stripe payment integration

## Session Configuration

### Schedule (Starting Monday, January 6, 2026)

**Weekdays (Monday - Friday)**
- One session per grade band: 4:00 PM - 5:30 PM
- 25 spots per grade band

**Saturdays**
- Five sessions per grade band:
  - 8:00 AM - 9:30 AM
  - 10:00 AM - 11:30 AM
  - 12:00 PM - 1:30 PM
  - 2:00 PM - 3:30 PM
  - 4:00 PM - 5:30 PM
- 30-minute breaks between sessions
- 25 spots per session per grade band

### Grade Bands
- **G35**: Grades 3-5
- **G68**: Grades 6-8
- **G912**: Grades 9-12

## Database Migration

To initialize or update the database schema:

```bash
# Push schema to database
npm run db:push

# Open Prisma Studio to view data
npm run db:studio

# Seed database (if needed)
npm run db:seed
```

## Data Flow

1. **Session Selection**: User selects a date and session from the calendar
2. **Student Information**: User enters student details (stored in `Student` table)
3. **Payment**: User processes payment via Stripe
4. **Enrollment Creation**: An `Enrollment` record is created linking the student to the session
5. **Confirmation**: User receives confirmation and enrollment status is updated

## Security Notes

- The `.env` file containing database credentials is **NOT** committed to the repository
- Database credentials should be set as environment variables in Vercel project settings
- Prisma Accelerate is used for connection pooling and caching
- All database connections use SSL (`sslmode=require`)

## Vercel Deployment

When deploying to Vercel, follow these steps to ensure the database variables are properly configured:

1. **Create the Postgres Database in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to the "Storage" tab
   - Create a new Postgres database
   - Name it **EnrollmentData** for consistency with the schema

2. **Configure Environment Variables:**
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables" section
   - Add the three required database connection strings:
     - `POSTGRES_URL`
     - `POSTGRES_URL_NON_POOLING`
     - `POSTGRES_PRISMA_URL`
   - Vercel will auto-populate these when you connect the Postgres database to your project

3. **Deploy the Application:**
   - Push your code to GitHub
   - Vercel will automatically build and deploy
   - The database schema will be applied during the build process via `prisma generate`

4. **Initialize the Database:**
   - After deployment, run `npm run db:push` locally (with production credentials) or use Vercel CLI
   - Optionally seed the database with `npm run db:seed`

The application will now safely store all enrollment data in the Vercel Postgres database named **EnrollmentData**.
