# Backend Setup Instructions

## Prerequisites
- Node.js 18+ installed
- PostgreSQL running (or use Docker)
- Redis running (optional - will use in-memory cache as fallback)

## Quick Start

### 1. Install dependencies
```bash
cd apps/server
npm install
```

### 2. Configure environment
Create or verify `.env` file with:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/getprompt"
REDIS_URL="redis://localhost:6379"
PORT=4000
```

### 3. Run database migrations
```bash
npx prisma migrate dev --name init
```

### 4. Seed the database (optional)
```bash
npm run seed
```

### 5. Start the development server
```bash
npm run dev
```

Server will run on http://localhost:4000

## API Endpoints

### GET /api/health
Health check endpoint
- Returns: `{ status: 'ok', redis: boolean }`

### GET /api/prompts
Get all prompts (cached for 60s)
- Returns: `Prompt[]`

### GET /api/prompts/:id
Get single prompt by ID
- Returns: `Prompt`

### POST /api/prompts
Create new prompt
- Body: `{ title, description, content, category, tags, author? }`
- Returns: `Prompt`

### PATCH /api/prompts/:id/vote
Vote on a prompt
- Body: `{ delta: 1 | -1 }`
- Returns: `Prompt`

## Database Schema

```prisma
model Prompt {
  id          String   @id @default(cuid())
  title       String
  description String
  content     String   @db.Text
  category    String   @default("text")
  tags        String[]
  votes       Int      @default(0)
  author      String   @default("Anonymous")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Testing
```bash
npm test
```
