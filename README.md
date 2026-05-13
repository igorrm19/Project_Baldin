# 🚀 Project Baldim

[![Quality Pipeline](https://github.com/igorrm23/Project_Baldim/actions/workflows/ci.yml/badge.svg)](https://github.com/igorrm23/Project_Baldim/actions)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Framework](https://img.shields.io/badge/Framework-Fox-orange.svg)](./fox)
[![npm version](https://img.shields.io/npm/v/fox-framework.svg)](https://www.npmjs.com/package/fox-framework)

Project Baldim is a state-of-the-art full-stack application featuring a custom-built frontend engine, a robust Express-based backend, and a dedicated core library. Built with performance, security, and scalability in mind.

---

## 🏛️ Architecture & Ecosystem

The project is organized as an **npm workspace**, ensuring seamless integration between the frontend, backend, and core libraries.

### 📦 Workspace Modules

| Module | Responsibility | Technology |
| :--- | :--- | :--- |
| **`fox/`** | [Fox Framework](https://www.npmjs.com/package/fox-framework) - Available on npm as `fox-framework`. | TypeScript, Vite |
| **`backEnd/`** | Serverless-ready API handling authentication and data persistence. | Express, Mongoose, Zod |
| **`src/`** | The main application implementation using the Fox Framework. | TypeScript, HTML5, CSS3 |

---

## ✨ Key Features

- **Custom Component Engine**: High-performance DOM rendering with safe template interpolation.
- **Client-Side Routing**: A sophisticated history-based router built into the Fox core.
- **Secure Backend**: JWT-based authentication, rate limiting, and request validation with Zod.
- **Full-Stack Type Safety**: End-to-end TypeScript integration.
- **Quality Pipeline**: Integrated CI with linting, testing, accessibility checks, and English-only policy enforcement.

---

## 🛠️ Tech Stack

- **Frontend**: Vite, TypeScript, Fox Framework (Custom)
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Validation**: Zod (Backend), HTML-Validate (Frontend)
- **Testing**: Jest, Playwright (E2E)
- **Quality**: ESLint, CSpell, Pa11y (Accessibility)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

```bash
# Install dependencies for the entire workspace
npm install

# Or install the Fox Framework separately in your own project
npm install fox-framework
```

> [!TIP]
> Check out the [**Fox Framework Usage Guide**](./fox/docs/getting-started/usage.md) for detailed instructions on building components and routing.

### Development

To start the frontend and backend in development mode:

```bash
# Start frontend (Vite)
npm run dev

# Start backend (requires separate terminal)
cd backEnd && npm run dev
```

---

## 🧪 Quality & Testing

We maintain a strict quality pipeline to ensure code stability and accessibility.

| Command | Description |
| :--- | :--- |
| `npm run typecheck` | Run TypeScript compiler checks across all workspaces. |
| `npm run test` | Execute unit tests with coverage reporting. |
| `npm run lint` | Run ESLint for code style and security patterns. |
| `npm run lint:english` | Enforce the English-only documentation and code policy. |
| `npm run a11y` | Run accessibility audits using Pa11y. |
| `npm run test:e2e` | Execute Playwright E2E smoke tests. |

---

## 📂 Project Structure

```text
.
├── backEnd/           # Express API & Serverless Functions
├── fox/               # Custom Framework Core (Router, DOM, Utils)
├── src/               # Application Features & UI Components
│   ├── App/           # Business Logic & Pages
│   └── main.ts        # Frontend Entry Point
├── tests/             # E2E Test Suites
├── vercel.json        # Production Deployment Config
└── package.json       # Workspace Definition
```

---

## 📜 English-Only Policy

This project follows a strict **English-only** policy for all code, comments, and documentation. This is enforced via automated linting (`npm run lint:english`).

---

## 🛡️ Security

For information on security practices and reporting vulnerabilities, please refer to [SECURITY.md](./SECURITY.md).
