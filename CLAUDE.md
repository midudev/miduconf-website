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