# CLAUDE.md

This file provides guidance to Claude Code when working with the CashbackClient project.

## Project Overview

**CashbackCheck** is a React 18 PWA for tracking cashback offers across Russian banks. Users authenticate, add their cards, and view/manage cashback categories by bank.

- **Live app:** https://arkadychakhalyan.github.io/cashbackClient
- **Stack:** React 18 + TypeScript + Vite + Redux Toolkit + Material-UI v6
- **API:** REST backend configured via `VITE_API_URL` environment variable

## Development Commands

```bash
yarn dev        # Start dev server on port 3000
yarn build      # Type-check + Vite build to /dist
yarn lint       # Run ESLint
yarn preview    # Preview the production build locally
```

## Architecture

```
src/
├── app/            # Root App component and routing
├── auth/           # Auth context, provider, and types
├── components/     # Feature components (cashbacks, header, modal, etc.)
├── customHooks/    # Shared React hooks
├── pages/          # Page-level route components
├── router/         # Route enum (Route.DASHBOARD, Route.LOGIN) + ProtectedRoute
├── selectors/      # Redux selectors
├── store/          # Redux store + RTK Query API slices (userApi, cashbackApi, cardApi)
├── style/          # MUI theme and theme extensions
├── constants.ts    # Bank definitions and cashback data (~1955 lines)
└── types.ts        # Global shared types
```

### Key Patterns

- **State management:** Redux Toolkit with RTK Query for all API calls — do not use local fetch or axios.
- **Routing:** `react-router-dom` v6. Routes are defined as enum values in `src/router/types.ts`. Protected routes use `<ProtectedRoute>`.
- **Auth:** Bearer token stored and provided via `AuthContext` (`src/auth/authContext.tsx`). API slices inject the token via `prepareHeaders`.
- **UI components:** Always use MUI components. Theme overrides live in `src/style/theme.ts`.
- **Notifications:** Use `notistack` via the `snackbarStack` component — do not use `alert()` or custom toast solutions.
- **Bank/cashback data:** Centralized in `src/constants.ts`. The `Bank` type and cashback category structures are defined in `src/types.ts`.
- **Drag and drop:** `@hello-pangea/dnd` is the project's DnD library.
- **Offline support:** The app is a PWA with service worker via `vite-plugin-pwa`. The offline page is `src/pages/offlinePage`.

## TypeScript

- Strict mode is **on** but `strictNullChecks` is **off**.
- Target: ES2020, module resolution: `bundler`.
- Do not add `// @ts-ignore` or `any` types without a comment explaining why.

## Code Style

- Functional components only — no class components.
- Use named exports for components, not default exports (prefer consistency with the existing codebase).
- Co-locate component-specific types, constants, and helpers inside the component's directory.
- Keep `src/constants.ts` and `src/types.ts` for truly global, shared data only.
- File naming: `camelCase.ts` / `camelCase.tsx`.

## No Testing Framework

There are currently no tests. When writing new logic, keep it in pure functions where possible to make future testing easier. Do not add a testing framework without discussion.

## Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL for the backend REST API |

## Deployment

- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`) — pushes to `main` trigger a build and deploy to GitHub Pages.
- **Base path:** `/cashbackClient/` (configured in `vite.config.ts`).
- Docker support is available via `Dockerfile` (Node 18 Alpine).

---

## MCP Tools — Context7

**Always use the Context7 MCP when you need documentation for any library used in this project.**

Context7 provides up-to-date, version-accurate documentation for libraries. Using it prevents mistakes caused by outdated training data or API changes.

### When to use Context7

Use Context7 whenever you are about to:

- Write or modify code that uses a library API (MUI, RTK Query, React Router, notistack, hello-pangea/dnd, Vite, vite-plugin-pwa, etc.)
- Check the correct props, hook signatures, or configuration options for any dependency
- Troubleshoot unexpected behavior that could be caused by a version difference
- Implement a feature you haven't used recently in the exact version present in this project

### How to use Context7

1. Call the `resolve-library-id` tool with the library name to get its Context7 ID.
2. Call `get-library-docs` with that ID (and an optional `topic`) to retrieve targeted documentation.

**Example workflow:**

```
# Before implementing a new RTK Query endpoint:
resolve-library-id("@reduxjs/toolkit")
get-library-docs("/reduxjs/redux-toolkit", topic="RTK Query createApi")

# Before adding a new MUI component:
resolve-library-id("@mui/material")
get-library-docs("/mui/material-ui", topic="Autocomplete")

# Before configuring PWA options:
resolve-library-id("vite-plugin-pwa")
get-library-docs("/vite-pwa/vite-plugin-pwa", topic="manifest options")
```

### Key libraries to always look up via Context7

| Library | Package name to resolve |
|---|---|
| Material-UI components | `@mui/material` |
| Redux Toolkit / RTK Query | `@reduxjs/toolkit` |
| React Router v6 | `react-router-dom` |
| Vite | `vite` |
| Vite PWA plugin | `vite-plugin-pwa` |
| notistack | `notistack` |
| hello-pangea/dnd | `@hello-pangea/dnd` |
| React | `react` |

> **Rule:** If you are uncertain about an API signature, a configuration option, or a prop name — look it up in Context7 first. Do not guess or rely solely on training data for library-specific details.
