#: Frontend — Implement Prompts list page with API hook

Description
-----------
Create `/prompts` page in `apps/web/pages/prompts/index.js` that uses a `usePrompts` hook to fetch paginated prompts from `/api/prompts`. Show skeleton loaders while loading, and show an empty state when no prompts.

Acceptance criteria
-------------------
- `usePrompts` hook placed in `apps/web/hooks/usePrompts.js`.
- `/prompts` page renders `PromptCard` for each prompt and paginates or supports infinite scroll.
- Loading skeletons visible during fetch.

Labels: `frontend`, `help wanted`
