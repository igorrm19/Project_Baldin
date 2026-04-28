# Project Baldim

## Overview
Project Baldim is a frontend SPA built with TypeScript and Vite, using a custom runtime called Fox Framework to render components directly into the DOM. The application is organized around a router, reusable UI components, login/registration features, and a service layer that consumes an external API.

## Architecture
This repository separates application concerns into the following layers:
- **Entry point**: `index.html` and `src/main.ts`
- **Routing**: `FoxRouter`
- **Page layer**: pages such as `MainPage`, `AboutPage`, `CadastroPage`, and `HomePage`
- **Feature layer**: login and registration modules
- **Service layer**: `LoginServices` for API communication
- **Framework core**: `BaseModel`, `Main`, and DOM helpers
- **Quality pipeline**: TypeScript checks, linting, HTML validation, accessibility, and dependency auditing

![Architecture UML](docs/architecture.svg)

## What this project includes
- A custom component rendering engine with safe template interpolation.
- A client-side router using the history API.
- Feature pages with login and registration flows.
- A service client for `/users` calls, including CSRF handling.
- A CI pipeline for type safety and quality.

## Quick start
```bash
npm install
npm run dev
```

### Build for production
```bash
npm run build
```

### Run tests
```bash
npm run test
```

### Run lint and quality checks
```bash
npm run lint
npm run lint:english
npm run html:validate
npm run a11y
```

## Detailed documentation
For a full architecture breakdown and design notes, see `docs/architecture.md`.

## Project structure
```text
fox/
├── core/
│   └── src/
│       └── module/
│           ├── router/     (Navigation Engine)
│           ├── utils/      (Base Engines & Interfaces)
│           └── dom/        (DOM Abstractions)
src/
├── App/            (Feature Implementation)
├── action.stack.ts (Decoupled State Management)
└── main.ts         (Entry Point)
```

## English-only policy
All production code, tests, documentation, and user-facing strings must be in English. The `npm run lint:english` script enforces this policy. Do not add Portuguese strings or temporary spellcheck exceptions to bypass the check.

## CI and quality pipeline
The repository includes a GitHub Actions workflow that executes:
- TypeScript type checking
- ESLint validation
- build verification
- unit tests and coverage
- HTML validation
- accessibility checks
- bundle size validation
- dependency audit
