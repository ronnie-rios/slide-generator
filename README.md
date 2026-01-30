# Slide Deck Generator

A Next.js application that generates AI-powered slide decks from text prompts.

## Features

- Enter a prompt to generate a slide deck
- Navigate slides with Next/Previous buttons or arrow keys
- Edit slide titles and content inline (click to edit)
- Regenerate deck with the same prompt
- Export to PowerPoint (.pptx)

## Prerequisites

- Node.js 18+ installed
- npm

## Getting Started

### Clone or unzip

```bash
# Clone
git clone <repo-url>
cd d-frontend-excercise

# Or unzip
unzip d-frontend-excercise.zip
cd d-frontend-excercise
```

### Install and run

```bash
# 1. Install dependencies
npm install

# 2. Create env file
cp .env.example .env.local
# Then fill in your API key in .env.local
```

`.env.local` should contain:
```
HEROKU_API_URL=your_api_url_here
HEROKU_API_KEY=your_api_key_here
```

```bash
# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production build

```bash
npm run build
npm start
```

## Architecture

### Folder Structure
```
app/
├── page.tsx              # Main page orchestrating all components
├── layout.tsx            # Root layout with metadata
├── globals.css           # Tailwind CSS with shadcn theme
└── api/generate-slides/  # API route proxying to Heroku
components/
├── ui/                   # shadcn/ui components
├── slides/               # Slide-related components
│   ├── slide-viewer.tsx  # Main viewer with header and navigation
│   ├── slide-card.tsx    # Individual slide with editable title
│   ├── slide-content.tsx # Editable bullets/paragraphs
│   └── slide-navigation.tsx
├── prompt-form.tsx       # Input form
├── loading-state.tsx     # Loading skeleton
└── error-state.tsx       # Error display with retry
hooks/
├── use-slides.ts         # State management (useReducer)
└── use-keyboard-navigation.ts
lib/
├── api.ts                # API client
├── export-pptx.ts        # PowerPoint export
└── utils.ts              # shadcn utilities
types/
└── slides.ts             # TypeScript interfaces
```

### Key Design Decisions

**State Management**: Using `useReducer` in a custom hook (`useSlides`) for predictable state transitions. Actions include generate, navigate, update, and reset.

**API Architecture**: Server-side API route proxies requests to Heroku, keeping the API key secure and handling CORS.

**Component Composition**: Modular components in `components/slides/` folder. Each component has a single responsibility.

**Inline Editing**: Click-to-edit pattern for title and content. Local state updates immediately, no persistence needed for prototype.

**Keyboard Navigation**: Custom hook listens for arrow keys when slide viewer is active.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- pptxgenjs (for PPTX export)
