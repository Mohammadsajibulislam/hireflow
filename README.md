# HireFlow

HireFlow is a modern job platform built with Next.js (App Router), React, Tailwind CSS, and MongoDB. It includes candidate and recruiter authentication, job browsing, saved jobs, and job applications.

## Live Site

**Live demo: [https://hireflow-two-omega.vercel.app](https://hireflow-two-omega.vercel.app)**

## Key Features

- Responsive landing page with hero, job categories, company showcase, testimonials, and newsletter sections.
- User authentication with `better-auth` using email/password and JWT session caching.
- MongoDB-backed API routes for jobs, applications, and saved jobs.
- Job search, filtering, sorting, and pagination.
- Demo login support for candidate, recruiter, and admin roles.
- Seed scripts for admin, recruiter, and sample job data.

## Technologies

- Next.js 16
- React 19
- Tailwind CSS 4
- MongoDB
- better-auth
- lucide-react
- react-icons
- recharts
- TypeScript
- ESLint
- Vercel

## Getting Started

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the project root and add:

```env
MONGODB_URI=your-mongodb-connection-string
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

- `MONGODB_URI` is required for MongoDB access.
- `BETTER_AUTH_SECRET` is required for better-auth JWT session signing.
- `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` should match your app URL.

### Run the app

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for production

```bash
npm run build
npm start
```

## Seed Data

The project includes seed scripts in the `scripts/` folder.

- `scripts/seedAdmin.ts` — creates an admin user
- `scripts/seedRecruiter.ts` — creates a demo recruiter
- `scripts/seedJobs.ts` — adds sample job listings

Run these scripts with your preferred TypeScript runner, for example:

```bash
npx tsx scripts/seedAdmin.ts
npx tsx scripts/seedRecruiter.ts
npx tsx scripts/seedJobs.ts
```

If you don't have `tsx`, install it first:

```bash
npm install -D tsx
```

## Demo Accounts

The login page includes demo credentials for quick testing:

- Candidate: `candidate@hireflow.demo` / `demo1234`
- Recruiter: `recruiter@hireflow.demo` / `demo1234`
- Admin: `admin@hireflow.demo` / `demo1234`

## App Pages

- `/` — Landing page with product sections
- `/login` — Login page
- `/register` — Registration page
- `/jobs` — Job listing page
- `/jobs/[id]` — Job details page
- `/companies` — Company listing page
- `/contact`, `/about`, `/pricing`, `/privacy` — informational pages
- `/dashboard` and `/admin` — role-specific pages

## API Routes

- `GET /api/jobs` — fetch jobs with search, category, job type, sort, and pagination
- `POST /api/jobs` — add a new job
- `GET /api/applications` — fetch applications for a user
- `POST /api/applications` — submit a job application
- `GET /api/saved-jobs` — fetch saved jobs for a user
- `POST /api/saved-jobs` — save or unsave a job

## Project Structure

- `src/app/` — Next.js pages and API routes
- `src/components/` — UI components
- `src/hooks/` — custom hooks
- `src/lib/` — MongoDB and auth helpers
- `src/types/` — TypeScript types
- `scripts/` — data seeding scripts

## Notes

- Authentication is handled by `better-auth` with a MongoDB adapter.
- Jobs are stored in the `jobs` collection, applications in `applications`, and saved jobs in `savedJobs`.
- Use the seed scripts first to populate demo users and jobs.
