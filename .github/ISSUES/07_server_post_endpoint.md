#: Server — Add POST /api/prompts endpoint and validation

Description
-----------
Add a `POST /api/prompts` endpoint to `apps/server/server.js` or a dedicated router. Validate incoming payloads and insert into the database using Prisma.

Acceptance criteria
-------------------
- Endpoint accepts `{ title, description, tags }`.
- Validation: title length between 3 and 120, description max 2000, tags optional array of strings.
- Returns `201` with created prompt body.
- Unit tests for success and validation failures.

Labels: `backend`, `help wanted`
