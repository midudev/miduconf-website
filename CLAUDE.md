# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun dev` - Start development server with Turbopack for fast development
- `bun run build` - Build the application for production 
- `bun start` - Start production server
- `bun run lint` - Run ESLint with neostandard config
- `bun install` - Install dependencies (uses bun.lockb)

## Architecture Overview

This is a Next.js conference website for miduConf using the Pages Router architecture:

### Core Structure
- **Pages Router**: Uses `/src/pages/` with `_app.jsx` and `_document.jsx`
- **Sections-based Layout**: Main page composed of reusable sections in `/src/sections/`
- **Component Library**: Shared components in `/src/components/` with organized subdirectories
- **Supabase Integration**: Authentication and data storage using Supabase auth helpers

### Key Architectural Patterns
- **Section-based Homepage**: Home page (`/src/pages/index.jsx`) renders sequential sections (Hero, Speakers, Sponsors, etc.)
- **Supabase Auth Context**: App wrapped in `SessionContextProvider` for authentication state
- **Ticket System**: Dynamic ticket generation with user data from Supabase
- **State Management**: Zustand store in `/src/store/` for client-side state
- **Styling**: Tailwind CSS with custom animations (`@midudev/tailwind-animations`)

### Component Organization
- `/components/icons/` - SVG icon components organized by category (languages, sponsors, stickers)
- `/components/magicui/` - Reusable UI components with animations
- `/sections/` - Page sections that compose the main layout
- `/flavors/` - Ticket customization data

### Key Dependencies
- Next.js 15 with React 19
- Supabase for auth and database
- Tailwind CSS for styling with custom plugins
- TypeScript for type safety
- Canvas Confetti for animations
- Matter.js for physics effects
- @vercel/og for dynamic OG image generation

## Ticket System Architecture (2025)

### Overview
The ticket system allows users to create, customize, and share personalized conference tickets with intelligent ownership detection and responsive design.

### Routes Structure
- **`/ticket/[...params].tsx`** - Smart catch-all route handling both owner editor and public sharing
- **`/ticket.tsx`** - Legacy editor (kept for compatibility, requires login)
- **`/api/og/ticket.tsx`** - Dynamic OG image generation endpoint

### Ticket Flow Logic
```
/ticket/username → Intelligent Detection:
├── User IS owner → Full editor with customization panels
├── User NOT owner → Clean public view (Vercel Ship style)  
└── Username doesn't exist → Redirect to home (/)
```

### Database Schema (Supabase)
**Table**: `ticket-2025` (PostgreSQL)
```sql
- id: UUID (user ID)
- user_name: string (GitHub username) 
- user_fullname: string (display name)
- ticket_number: serial (auto-increment)
- hologram: string (customization option)
- twitch_tier: string (subscription level)
- created_at: timestamp
- image: string (generated ticket image URL)
```

**Storage**: `ticket-2025` bucket for generated ticket images

### Key Features

#### 1. Smart Ownership Detection
- **Server-side detection**: Compares session username with ticket username
- **Dual rendering**: Owner sees editor, visitors see public view
- **Auto-creation**: Creates ticket on first owner visit

#### 2. Dynamic OG Images  
- **API Endpoint**: `/api/og/ticket?username=X&ticketNumber=Y&fullname=Z`
- **Technology**: @vercel/og with custom styling
- **Dimensions**: 1200x630 (standard social media)
- **Features**: User info, ticket number, branded design

#### 3. Responsive Design
- **Mobile-first**: Stacked layout on small screens
- **Desktop**: 3-column grid (Share | Ticket | Customize)
- **Public view**: Centered ticket with CTA button

#### 4. Customization System
- **Hologram selection**: Different visual effects
- **Sticker system**: Twitch tier-based unlock system
- **Coming soon overlay**: Future features with "Muy pronto" indicator

### URL Patterns
- `/ticket/username` - Main ticket route (owner editor or public view)
- `/ticket/username/hash` - Legacy format (hash ignored, still works)
- `/api/og/ticket` - OG image generation
- Non-existent usernames redirect to home page

### Integration Points
- **Hero button**: Links to `/ticket/${username}` instead of separate `/my-ticket`
- **Share functionality**: Generates URLs with proper OG metadata
- **Auth flow**: Seamless login integration with ticket creation