#: Server — Add vote endpoint (PATCH /api/prompts/:id/vote)

Description
-----------
Implement an endpoint to update prompt votes atomically. Consider rate-limiting or idempotency per IP/session as an advanced improvement.

Acceptance criteria
-------------------
- Endpoint accepts `{ delta: 1 | -1 }` and updates `votes` atomically.
- Returns updated prompt object.
- Unit tests verify vote increments and decrements, and handle non-existent IDs.

Labels: `backend`, `medium`
