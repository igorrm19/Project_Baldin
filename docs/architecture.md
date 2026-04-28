# Project Architecture and System Design

## Overview
This document describes the architecture of Project Baldim, including the custom Fox Framework, the application page flow, service layer, build tooling, and quality enforcement.

![Architecture UML](./architecture.svg)

## Project Summary
Project Baldim is a client-side SPA built with TypeScript and Vite, powered by a custom framework called Fox Framework. It uses a direct DOM rendering model rather than a virtual DOM, and it separates application-level pages from core rendering and routing logic.

## System Layers
- **Browser SPA entry**: `index.html` loads `src/main.ts`, creates the router, and mounts the app into `#app`.
- **Routing layer**: `FoxRouter` handles internal navigation with `history.pushState`, `popstate`, and link interception.
- **Page layer**: `MainPage`, `AboutPage`, `CadastroPage`, and `HomePage` manage UI assembly and lifecycle.
- **Feature layer**: login and registration logic is implemented in `Login`, `Cadastro`, and `CardLogin`.
- **Service layer**: `LoginServices` communicates with the backend API using `fetch`.
- **Core framework**: `BaseModel`, `Main`, and DOM parsing helpers implement the rendering and template logic.
- **Quality layer**: CI jobs enforce TypeScript, linting, HTML validation, accessibility, bundle size, and dependency audit.

## Application Architecture
### Entry point
- `index.html`: contains the app root and a CSRF token meta tag.
- `src/main.ts`: bootstraps the app and defines route mappings.

### Router
- `fox/core/src/module/router/router.ts`
- Handles page creation and cleanup.
- Uses `window.location.pathname` and intercepts clicks on internal links.
- Resets the `actionStack` on route changes.

### Pages
Pages are responsible for:
- creating container elements,
- mounting UI components,
- binding event handlers,
- unmounting when navigation changes.

### UI Components
Reusable component classes exist for:
- `TextHTML`
- `ButtonHTML`
- `InputHTML`
- `ImageHTML`

Each component uses `BaseModel` to compile templates and render DOM fragments.

### Login / Registration Feature
- `Login`: login form behavior, validation, API requested via `putUser()`.
- `Cadastro`: registration form behavior, validation, API requested via `postUser()`.
- `CardLogin`: composes login and registration templates into the main page.
- `LoginServices`: performs GET/POST/PUT/DELETE requests to `/users`, with CSRF token handling and `credentials: 'include'`.

## Fox Framework Core
### BaseModel
- Implements `{{ key }}` interpolation.
- Escapes HTML values to reduce XSS risk.
- Supports `<Axe id="..."></Axe>` for nested component insertion.
- Renders templates using `DOMParser`.

### Main wrapper
- `fox/main.ts` provides a generic wrapper around `IBaseModel` instances.
- It delegates `addProps`, `addComponent`, `getHTML`, and `mount()` to the underlying base model.

### DOM Helpers
- `parseButton`: binds `button` elements to functions declared in code.
- `parseInput`: attaches `input` event listeners and reports values.
- `parserDiv`: parses HTML strings into `ActionItem` objects.

### Event bus
- `fox/action.stack.ts` is a lightweight event stack.
- It stores action history and notifies subscribers.

## Build and CI
The project includes a strong quality pipeline:
- `npm run typecheck`
- `npm run lint`
- `npm run html:validate`
- `npm run a11y`
- `npm run build`
- `npm run test:ci`
- `npm audit --audit-level=high`

GitHub Actions is configured to run these checks automatically for pulls and pushes to `main`.

## Recommended learning path for interns
1. Start with `index.html` and `src/main.ts`.
2. Understand `FoxRouter` and how `PopState` works.
3. Read `BaseModel` to understand template rendering.
4. Explore `Login`, `Cadastro`, and `LoginServices` to follow feature flow.
5. Review `fox/action.stack.ts` for event handling.
6. Inspect CI workflow in `.github/workflows/ci.yml`.

## File structure
```text
fox/
├── core/
│   └── src/
│       └── module/
│           ├── router/
│           ├── utils/
│           └── dom/
src/
├── App/
│   ├── shared/
│   │   ├── components/
│   │   ├── features/login/
│   │   └── pages/
├── convert.stringtoobject.ts
└── main.ts
```

## Notes
- This repository is a frontend-only SPA; the backend API is expected to exist separately.
- Keep all strings in English to satisfy the `lint:english` policy.
- Use the diagram above to explain the flow to new team members.
