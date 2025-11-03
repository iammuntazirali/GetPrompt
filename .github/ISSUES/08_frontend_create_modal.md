#: Frontend — Create prompt modal with form validation

Description
-----------
Add an accessible modal with a `CreatePromptForm` allowing users to submit new prompts. The form should validate input and POST to `/api/prompts`, showing success/error toasts and optimistically updating the list.

Acceptance criteria
-------------------
- Modal component is accessible (aria attributes, focus trap).
- Form validates inputs before submit and displays helpful messages.
- On success, modal closes, toast appears, and the new prompt is visible in the list (optimistic update).

Labels: `frontend`, `medium`
