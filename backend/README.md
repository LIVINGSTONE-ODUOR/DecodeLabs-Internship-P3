# STONE TECH Backend

Express API for STONE TECH SOLUTIONS using Supabase Auth, Supabase Postgres, validated and sanitized lead capture, quote requests, support tickets, admin dashboard data, and an OpenAI-compatible AI assistant.

## Setup
1. Copy `.env.example` to `.env`.
2. Fill in `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `AI_API_KEY`.
3. Run `npm install`.
4. In the Supabase SQL Editor, run `database/001_supabase_schema.sql`.
5. Start locally with `npm run dev`.

## Required Environment Variables
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AI_API_KEY`
- `OPENAI_MODEL`
- `CORS_ORIGIN`

## API
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `POST /api/v1/contact`
- `GET /api/v1/contact` admin only
- `PATCH /api/v1/contact/:id` admin only
- `POST /api/v1/get-started`
- `GET /api/v1/get-started` admin only
- `POST /api/v1/quote`
- `GET /api/v1/quote` admin only
- `POST /api/v1/support`
- `GET /api/v1/support` admin only
- `POST /api/v1/ai/chat`
- `GET /api/v1/admin/dashboard` admin only

## Security Notes
- Supabase Auth owns sign-up, sign-in, session issuing, and token verification.
- `public.profiles` stores app metadata linked to `auth.users`.
- Backend middleware sanitizes request body, query, and params before validation.
- Row Level Security is enabled in the SQL schema for all public app tables.

## Deployment
Deploy to Render or Railway with Node 18+. Keep the Supabase service role key private on the backend only, and set `CORS_ORIGIN` to the production frontend domain.
