## Push prisma database:

npx prisma db push

## Regenerate prisma data:

npx prisma generate

## Run project with backend server on localhost settings:

npm run dev:vercel

## Clean the Prisma database and generate it anew based on your schema:

npx prisma migrate reset

## Technology Stack

The backend is implemented as serverless functions deployed on Vercel, using a Node.js runtime. Each API route is an isolated function that interacts with a Postgres database via Prisma. The architecture follows a thin-controller pattern with business logic separated into feature-based services.

I chose a serverless architecture on Vercel because the application is primarily CRUD-based and doesn’t require persistent connections or complex background processing. This allows me to focus on frontend development while still having a scalable backend.

- **Frontend:** React, React Router, Material UI, Tailwind CSS, Vite, TypeScript
- **State:** Zustand
- **Backend:** Node.js
  Serverless backend using Vercel Functions (Node.js runtime) with Prisma as ORM (Object-relational mapping)
- **API:** REST (custom endpoints in `api/`)
- **Database:** PostgreSQL (via Prisma ORM)
- **Testing:** Vitest, jsdom, React Testing Library
- **AI:** VSC Coopilot connected to MUI documentation
