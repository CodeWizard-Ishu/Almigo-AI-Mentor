# Almigo — AI Mentor Frontend

A modern, production-quality frontend for the Almigo AI Mentor platform. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Features

- 💬 **Almigo Chat** — ChatGPT-like streaming conversation with markdown rendering
- 🗺️ **Learning Roadmap Generator** — AI-powered personalized learning plans
- 📝 **Session Summarizer** — Extract key takeaways and action items from transcripts
- 🔍 **Semantic Mentor Search** — Find mentors by skills and expertise using AI search
- 🌓 **Dark Mode** — System-aware with manual toggle
- 📱 **Responsive** — Mobile-first design with sidebar navigation

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| TypeScript | Type safety |
| Vite 7 | Build tool & dev server |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui | Reusable component library |
| React Query | Server state management |
| Zustand | Client state (chat) |
| React Router | Routing |
| Framer Motion | Animations |
| Lucide React | Icons |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Backend server running (see `../Backend/README.md`)

### Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Copy environment config
cp .env.example .env

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3000` | Backend API base URL |

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── chat/              # Chat feature components
│   │   ├── ChatInput.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── StreamingBubble.tsx
│   │   └── TypingIndicator.tsx
│   ├── layout/            # App layout
│   │   ├── Layout.tsx
│   │   └── Sidebar.tsx
│   └── ui/                # Reusable UI (shadcn + custom)
│       ├── CopyButton.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       ├── ThemeToggle.tsx
│       └── (shadcn components)
├── hooks/                 # Custom React hooks
│   ├── useChat.ts
│   ├── useMentorSearch.ts
│   ├── useRoadmap.ts
│   └── useSummarize.ts
├── lib/                   # Utilities (shadcn)
├── pages/                 # Route pages
│   ├── ChatPage.tsx
│   ├── RoadmapPage.tsx
│   ├── SearchPage.tsx
│   └── SummarizePage.tsx
├── services/              # API layer
│   └── api.ts
├── store/                 # Zustand stores
│   └── chatStore.ts
├── types/                 # TypeScript types
│   └── index.ts
├── App.tsx                # Root component
├── main.tsx               # Entry point
└── index.css              # Global styles + theme
```

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/ai/chat` | POST | Stream Almigo response (SSE) |
| `/api/ai/roadmap` | POST | Generate learning roadmap |
| `/api/ai/summarize` | POST | Summarize session transcript |
| `/api/ai/search-mentors` | POST | Semantic mentor search |

## Example API Responses

### Roadmap Response
```json
{
  "success": true,
  "data": {
    "title": "Full-Stack Developer Roadmap",
    "duration": "6 months",
    "phases": [
      {
        "phase": "Phase 1: Frontend Foundations",
        "topics": ["HTML/CSS", "JavaScript ES6+", "React Basics"],
        "resources": ["MDN Web Docs", "React Official Tutorial"]
      }
    ]
  }
}
```

### Summary Response
```json
{
  "success": true,
  "data": {
    "summary": "The session focused on career transition strategies...",
    "keyTakeaways": ["Focus on building portfolio projects", "Network actively"],
    "actionItems": ["Complete React course by end of month", "Update LinkedIn profile"]
  }
}
```

### Mentor Search Response
```json
{
  "success": true,
  "data": [
    {
      "mentor": {
        "id": "abc123",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "bio": "Senior ML Engineer...",
        "skills": ["Python", "TensorFlow", "MLOps"],
        "expertise": ["Machine Learning", "Data Science"]
      },
      "similarityScore": 0.92
    }
  ]
}
```
