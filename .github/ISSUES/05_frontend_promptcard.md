#: Frontend — Implement PromptCard component

Description
-----------
Create a reusable `PromptCard` component showing: title, short description, tags (as chips), votes, and upvote/downvote buttons. Export it from `apps/web/components/PromptCard.jsx` and add simple styling with Tailwind.

Acceptance criteria
-------------------
- Component accepts props: `prompt` (object), `onUpvote`, `onDownvote`.
- Renders tags as chips and shows vote count.
- Includes minimal unit tests (Vitest + React Testing Library) asserting rendering and click handlers.

Labels: `frontend`, `help wanted`
