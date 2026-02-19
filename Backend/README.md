# Almigo — AI Mentor Backend

Node.js/Express/TypeScript backend for Almigo, an AI mentoring platform.

## Features

- **AI Mentor Chat** — Streaming responses via SSE with conversation memory
- **Learning Roadmap Generator** — Structured JSON roadmaps via Groq (Llama 3.3 70B)
- **Session Summarizer** — Extract summaries, takeaways, and action items
- **Semantic Mentor Search** — Embedding-based mentor discovery via Qdrant

## Tech Stack

| Layer | Technology |
|----------|-----------|
| Runtime | Node.js 20+ |
| Framework | Express |
| Language | TypeScript (strict mode) |
| ORM | Prisma with Accelerate |
| Database | PostgreSQL |
| LLM | Groq SDK (Llama 3.3 70B) |
| Embeddings | HuggingFace (sentence-transformers/all-MiniLM-L6-v2) |
| Vector DB | Qdrant |
| Cache | Redis (optional) |
| Container | Docker |

## Prerequisites

- Node.js ≥ 20
- PostgreSQL 16+
- Groq API key (free tier)
- HuggingFace API key (free tier)
- Qdrant running locally or via Docker
- Redis (optional)
- Docker & Docker Compose (optional)

## Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd Backend
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your actual keys
```

### 3. Database Setup

**Option A — Docker (recommended)**
```bash
docker-compose up -d postgres redis qdrant
```

**Option B — Local PostgreSQL**
Update `DIRECT_DATABASE_URL` in `.env` to point to your local instance.

### 4. Run Migrations & Generate Client

```bash
npx prisma migrate dev --name init
npm run prisma:generate
```

### 5. Seed Mentors

```bash
npm run seed
```

### 6. Generate Mentor Embeddings

```bash
npm run embed-mentors
```

### 7. Start Development Server

```bash
npm run dev
```

Server starts at `http://localhost:3000`.

## API Endpoints

### Health Check

```
GET /health
```

### AI Chat (Streaming SSE)

```
POST /api/ai/chat
Content-Type: application/json

{
  "conversationId": "<conversation-id>",
  "message": "How do I transition into a senior engineering role?"
}
```

### Learning Roadmap

```
POST /api/ai/roadmap
Content-Type: application/json

{
  "goal": "Become a full-stack developer",
  "currentSkills": ["HTML", "CSS", "JavaScript"],
  "timeline": "6 months"
}
```

### Session Summarizer

```
POST /api/ai/summarize
Content-Type: application/json

{
  "transcript": "Mentor: Let's talk about your career goals..."
}
```

### Semantic Mentor Search

```
POST /api/ai/search-mentors
Content-Type: application/json

{
  "query": "machine learning expert who can help with NLP",
  "topK": 5
}
```

## Project Structure

```
src/
├── config/          # Environment, Groq, Qdrant, Prisma, Redis clients
├── controllers/     # Request handlers
├── middleware/       # Error handler, rate limiter, validation
├── routes/          # Express route definitions
├── services/        # Business logic (AI, embeddings, mentor search)
├── scripts/         # Seed & embed-mentors scripts
├── utils/           # Logger utility
├── app.ts           # Express app factory
└── server.ts        # Entry point with graceful shutdown
```

## Docker

### Full Stack

```bash
docker-compose up --build
```

### Production Build

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run production build |
| `npm run seed` | Seed 10 mentor profiles |
| `npm run embed-mentors` | Generate & upsert mentor embeddings |
| `npm run prisma:generate` | Regenerate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run typecheck` | TypeScript type checking |

## License

MIT
