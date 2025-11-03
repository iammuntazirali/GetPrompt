#: Frontend — Implement search & tag filtering UI

Description
-----------
Add search box and tag filter chips to the prompts list page. Implement debounced search and multi-select tag filters that call `/api/prompts` with query params.

Acceptance criteria
-------------------
- Search input uses debounce (300ms) and updates results.
- Tag chips toggle and filter results accordingly.
- UI shows active filters and a clear-filters control.

Labels: `frontend`, `UX`
