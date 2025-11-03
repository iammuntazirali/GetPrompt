#: CI — Add seed step for integration tests

Description
-----------
Ensure CI seeds the database before running integration tests so tests run consistently.

Acceptance criteria
-------------------
- CI workflow (integration job) runs `npm run seed` or equivalent before tests.
- Seed script uses environment variables for DB connection and exits non-zero on failure.

Labels: `ci`, `backend`
