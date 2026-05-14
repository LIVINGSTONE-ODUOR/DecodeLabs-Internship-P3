# STONE TECH SOLUTIONS Frontend

Premium React/Vite frontend for STONE TECH SOLUTIONS.

## Stack
React 18, Vite, Tailwind CSS, Framer Motion, React Router, Axios, React Hook Form, React Hot Toast, React Icons, React Intersection Observer, React CountUp, React Loading Skeleton, React Helmet Async.

## Local setup
1. Copy `.env.example` to `.env`
2. Set `VITE_API_BASE_URL=http://localhost:4000/api/v1`.
3. Run `npm install`.
4. Run `npm run dev`.

## Architecture
```text
frontend/
  public/
  src/
    components/ui
    components/layout
    components/sections
    components/forms
    components/features
    pages
    layouts
    hooks
    services
    context
    styles
    utils
    routes
```

## Deployment
Deploy to Vercel with build command `npm run build`, output directory `dist`, and `VITE_API_BASE_URL` pointing to the production backend.
