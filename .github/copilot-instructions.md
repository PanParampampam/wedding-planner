# Project Context

- This is a wedding planner app with a React frontend and a Vercel serverless backend.
- Backend API routes live in `api/` and run as isolated Vercel Functions.
- Database access uses Prisma with PostgreSQL.
- Frontend stack: React, React Router, Material UI, Vite, and TypeScript.
- Tests use Vitest, jsdom, and React Testing Library.

# Architecture and Boundaries

- Keep API controllers thin in `api/`: parse request, call service, return response.
- Put business logic in feature services under `src/features/**` or `src/backend/features/**`.
- Reuse shared auth and utilities from `src/shared/**`, `src/backend/shared/**`, and `api/_lib/**`.
- Do not move business logic into UI components.
- Preserve the existing feature-based structure.

# API and Auth Rules

- For protected routes, resolve the authenticated user before any data operation.
- Always set CORS headers before early returns (for example `401`) and before handling `OPTIONS`.
- Return JSON responses with a consistent error shape and correct status codes.
- Keep cookie-based auth behavior consistent with login and protected endpoints.
- When adding routes, ensure frontend paths match Vercel function mapping (for example `/api/guests` -> `api/guests/index.ts`).

# Frontend Rules

- Use Material UI components and existing theme tokens from `src/shared/theme/**`.
- Keep route guards and auth flow consistent with `src/routes/**` and `src/features/authProvider/**`.
- Use the shared API client from `src/shared/lib/apiClient.ts` for requests.
- Prefer feature-local hooks and types in each feature folder.
- Maintain responsive behavior for mobile and desktop.

# Testing and Validation

- After edits, run targeted checks first, then broader validation as needed.
- Preferred validation commands: `npm run build`, `npm run test`, and `npm run lint`.
- Add or update tests when behavior changes in features or API handlers.
- Avoid unrelated refactors in the same change.

# Environment and Runtime Expectations

- Use `vercel dev` for full-stack route testing when API endpoints are involved.
- Do not assume Vite dev alone serves serverless API functions.
- Treat Prisma schema and generated client as the source of truth for the data model.

# Editing Behavior for the Agent

- Make minimal, focused changes and keep current naming and structure.
- Do not introduce new libraries unless required.
- Keep imports and path aliases consistent with current project style.
- If a change affects auth, API routing, or CORS, explicitly verify those paths.
