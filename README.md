# STONE TECH SOLUTIONS

A production-ready full-stack technology company platform with a premium React frontend, Express API, Supabase PostgreSQL persistence, JWT authentication, polished lead capture, admin dashboard, and AI assistant.

## Tech Stack
Frontend: React 18, Vite, Tailwind CSS, Framer Motion, React Router, Axios, React Hook Form, React Hot Toast, React Icons, React CountUp, React Helmet Async.
Backend: Node.js, Express, Supabase PostgreSQL, JWT, bcrypt, OpenAI-compatible chat completions, Helmet, rate limiting, validation middleware.

## Frontend Structure
```text
frontend/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── og-image.png
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/ui
│   ├── components/layout
│   ├── components/sections
│   ├── components/forms
│   ├── components/features
│   ├── pages
│   ├── layouts
│   ├── hooks
│   ├── services
│   ├── context
│   ├── assets
│   ├── styles
│   ├── utils
│   ├── routes
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
├── .env.example
└── README.md
```

## Local Setup
1. Backend: `cd stone-tech-backend && cp .env.example .env`.
2. Add Supabase service role key, anon key, JWT secret, and AI API key to `stone-tech-backend/.env`.
3. Run the SQL in `stone-tech-backend/database/001_supabase_schema.sql` inside the Supabase SQL editor.
4. Backend install/start: `npm install && npm run dev`.
5. Frontend: `cd ../frontend && cp .env.example .env`.
6. Frontend install/start: `npm install && npm run dev`

## Supabase Setup
Use project URL `https://zkmqyiaxwsgvgjjjrtge.supabase.co`. In Supabase, open SQL Editor, paste `stone-tech-backend/database/001_supabase_schema.sql`, and run it. Keep `SUPABASE_SERVICE_ROLE_KEY` only on the backend.

## API Summary
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/contact`
- `GET /api/v1/contact` admin
- `PATCH /api/v1/contact/:id` admin
- `POST /api/v1/get-started`
- `GET /api/v1/get-started` admin
- `POST /api/v1/ai/chat`
- `GET /api/v1/admin/dashboard` admin

## Deployment
Frontend: deploy `frontend` to Vercel. Set `VITE_API_BASE_URL` to the deployed API URL.
Backend: deploy `stone-tech-backend` to Render or Railway. Set all backend environment variables and restrict CORS to the production frontend domain.
Supabase: rotate service keys for production, review RLS policies, and enable backups.

## Professional UI/UX Improvements
1. Intelligent conversion routing: personalize CTAs by service interest, traffic source, and scroll depth. This elevates the brand by making the site feel consultative, and improves conversion by reducing decision friction. Implement with event tracking, CTA variants, and persisted visitor intent.
2. Technical proof panels: show real architecture diagrams, uptime indicators, delivery milestones, and security practices. This builds credibility for serious buyers and helps users trust the team before a sales call. Implement as animated dashboard-style panels backed by CMS or static JSON.
3. Service-specific landing paths: create focused pages for web development, IT support, AI assistance, and consulting. This improves SEO and lets each audience see relevant proof, process, and pricing cues. Implement nested React routes and reusable service page templates.
4. Interactive project estimator: let visitors choose scope, timeline, integrations, and support level. This elevates the experience from brochure to advisory tool and pre-qualifies leads. Implement a multi-step form with conditional fields and scoring logic.
5. Trust-rich testimonial system: segment testimonials by industry, role, and service. This increases credibility by matching proof to visitor intent. Implement filterable testimonial cards and structured review data.
6. Premium motion language: use consistent reveal, hover, count-up, and panel transitions tied to hierarchy. This makes the product feel funded and intentional while improving perceived performance. Implement shared Framer Motion variants and reduced-motion fallbacks.
7. Accessibility-first polish: add skip links, robust focus states, semantic landmarks, and contrast-tested themes. This broadens audience access and signals enterprise maturity. Implement ARIA labels, keyboard testing, and automated a11y checks.
8. Performance perception layer: combine skeletons, optimistic states, lazy routes, image loading, and prefetching for likely navigation. This makes the app feel faster and lowers abandonment. Implement React.lazy, responsive images, and route-level Suspense.
9. AI-guided discovery: use the chatbot to collect project context, suggest services, and push qualified users into the get-started flow. This creates a premium concierge feel and increases form completion. Implement session history, suggested prompts, and lead handoff endpoints.
10. Executive-ready dashboard visuals: give clients a private dashboard with project status, messages, assets, invoices, and support tickets. This turns the website into a product experience and improves retention. Implement protected routes, role-based API access, and Supabase-backed activity streams.

## Contributing
Use feature branches, keep changes scoped, run builds before opening pull requests, and document environment changes.

## License
Proprietary. All rights reserved by STONE TECH SOLUTIONS.
