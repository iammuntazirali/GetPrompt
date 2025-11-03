# Contributing to GetPrompt# Contributing to GetPrompt# Contributing to Prompt Hub



Thank you for your interest in contributing to GetPrompt! We welcome contributions from the community.



## 🚀 Getting StartedThank you for your interest in contributing to GetPrompt! We welcome contributions from the community.Thanks for your interest in contributing to  GetPrompt! We welcome contributions of all sizes — from fixing a typo to implementing new features.



### Prerequisites



- Node.js 18 or higher## 🚀 Getting StartedGetting started

- npm or yarn

- Git---------------



### Setup Development Environment### Prerequisites



1. **Fork the repository**1. Fork the repository and create a branch for your change.



   Click the 'Fork' button on GitHub- Node.js 18 or higher2. Install dependencies and start services (see below).



2. **Clone your fork**- npm or yarn



   ```bash- GitLocal setup

   git clone https://github.com/YOUR_USERNAME/prompt-hub.git

   cd prompt-hub-----------

   ```

### Setup Development Environment

3. **Create a new branch**

Start Postgres and Redis with Docker Compose:

   ```bash

   # Create a branch for your changes (do this before making any changes)1. **Fork the repository**

   git checkout -b feature/your-feature-name

   # or for bug fixes: git checkout -b fix/your-bug-fix   ```bash```bash

   ```

   # Click the 'Fork' button on GitHubdocker-compose up -d

4. **Install dependencies**

   ``````

   ```bash

   chmod +x setup.sh

   ./setup.sh

   ```2. **Clone your fork**Backend:



5. **Start development servers**   ```bash



   ```bash   git clone https://github.com/YOUR_USERNAME/prompt-hub.git```bash

   ./start.sh

   ```   cd prompt-hubcd apps/server



6. **Access the application**   ```npm install



   - Frontend: http://localhost:8080npx prisma generate

   - Backend: http://localhost:4000

3. **Install dependencies**npx prisma migrate dev --name init

## 📝 Development Workflow

   ```bashnpm run seed    # optional: populate sample prompts

### Branch Naming Convention

   chmod +x setup.shnpm run dev

- `feature/` - New features (e.g., `feature/add-user-authentication`)

- `fix/` - Bug fixes (e.g., `fix/voting-not-working`)   ./setup.sh```

- `docs/` - Documentation updates (e.g., `docs/update-readme`)

- `refactor/` - Code refactoring (e.g., `refactor/optimize-search`)   ```



### Commit ConventionFrontend:



Follow [Conventional Commits](https://www.conventionalcommits.org/):4. **Start development servers**



- `feat:` - New feature   ```bash```bash

- `fix:` - Bug fix

- `docs:` - Documentation changes   ./start.shcd apps/web

- `style:` - Code style changes

- `refactor:` - Code refactoring   ```npm install

- `test:` - Adding tests

- `chore:` - Maintenance tasksnpm run dev



**Examples:**5. **Access the application**```

```bash

git commit -m "feat: add dark mode toggle"   - Frontend: http://localhost:8080

git commit -m "fix: resolve voting state update issue"

git commit -m "docs: update README setup instructions"   - Backend: http://localhost:4000Running tests

```

-------------

## 🏗️ Project Structure

## 📝 Development Workflow

```

prompt-hub/Backend unit tests (vitest + supertest):

├── apps/

│   ├── server/          # Backend (Express + Prisma)### Branch Naming Convention

│   │   ├── prisma/      # Database schema & migrations

│   │   └── server.js    # Main server file```bash

│   └── web/             # Frontend (React + TypeScript)

│       └── src/- `feature/` - New features (e.g., `feature/add-user-authentication`)cd apps/server

│           ├── components/  # Reusable components

│           ├── hooks/       # Custom React hooks- `fix/` - Bug fixes (e.g., `fix/voting-not-working`)npm run test:unit

│           ├── lib/         # Utilities & helpers

│           ├── pages/       # Page components- `docs/` - Documentation updates (e.g., `docs/update-readme`)```

│           └── types/       # TypeScript types

```- `refactor/` - Code refactoring (e.g., `refactor/optimize-search`)



## 🎨 Code Style GuidelinesCode style



- Use TypeScript for new files### Commit Convention----------

- Use functional components with hooks

- Follow existing code patternsWe use ESLint and Prettier. Run them locally and ensure your code passes before opening a PR.

- Use meaningful variable names

- Extract reusable logic into custom hooksFollow [Conventional Commits](https://www.conventionalcommits.org/):

- Run ESLint and Prettier before committing

- `feat:` - New featurePull requests

## 🐛 Bug Reports

- `fix:` - Bug fix-------------

When reporting bugs, please include:

- `docs:` - Documentation changes

1. **Description** - Clear description of the bug

2. **Steps to reproduce** - Detailed steps to reproduce the issue- `style:` - Code style changes- Keep PRs small and focused.

3. **Expected behavior** - What should happen

4. **Actual behavior** - What actually happens- `refactor:` - Code refactoring- Include tests for new features where possible.

5. **Screenshots** - If applicable

6. **Environment** - Browser, OS, Node version- `test:` - Adding tests- Describe the change and how to test it in the PR description.



## 💡 Feature Requests- `chore:` - Maintenance tasks- Add a changelog entry if appropriate.



When requesting features, please include:



1. **Use case** - Why is this feature needed?## 🏗️ Project StructureCode of Conduct

2. **Description** - Detailed description of the feature

3. **Mockups** - Visual mockups if applicable---------------

4. **Implementation ideas** - Any thoughts on implementation

```By participating in this project you agree to abide by the project's Code of Conduct.

## ✅ Pull Request Checklist

prompt-hub/

Before submitting a PR, ensure:├── apps/

│   ├── server/          # Backend (Express + Prisma)

- [ ] Code follows style guidelines│   │   ├── prisma/      # Database schema & migrations

- [ ] Self-reviewed code│   │   └── server.js    # Main server file

- [ ] Tested changes locally│   └── web/             # Frontend (React + TypeScript)

- [ ] Documentation updated (if needed)│       └── src/

- [ ] No console errors or warnings│           ├── components/  # Reusable components

- [ ] Committed from a feature/fix branch (not main)│           ├── hooks/       # Custom React hooks

- [ ] PR description clearly describes changes│           ├── lib/         # Utilities & helpers

│           ├── pages/       # Page components

## 🧪 Testing│           └── types/       # TypeScript types

```

Run tests before submitting:

## 🎨 Code Style Guidelines

```bash

cd apps/server- Use TypeScript for new files

npm run test- Use functional components with hooks

```- Follow existing code patterns

- Use meaningful variable names

## 📄 License- Extract reusable logic into custom hooks



By contributing, you agree that your contributions will be licensed under the project's MIT License.## 🐛 Bug Reports



---Include:

1. Description of the bug

Thank you for contributing to GetPrompt! 🎉2. Steps to reproduce

3. Expected vs actual behavior
4. Screenshots (if applicable)
5. Environment details

## 💡 Feature Requests

Include:
1. Use case
2. Detailed description
3. Mockups (if applicable)

## ✅ Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Documentation updated
- [ ] No console errors

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to GetPrompt! 🎉
