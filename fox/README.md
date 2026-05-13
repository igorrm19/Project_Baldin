# 🦊 Fox Framework

A lightweight, high-performance component and routing engine for modern web applications.

## 📦 Installation

You can install the Fox Framework via npm:

```bash
npm install fox-framework
```

## ✨ Features

- **Component Engine**: Fast and secure DOM rendering with template interpolation.
- **Client-Side Router**: Built-in history-based routing for Single Page Applications (SPA).
- **Type-Safe**: Written entirely in TypeScript for a robust development experience.
- **Lightweight**: Zero external dependencies in production.

## 🚀 Quick Start

```typescript
import { FoxRouter } from 'fox-framework';
import { HomePage } from './pages/HomePage';

const routes = {
  "/": HomePage
};

const router = new FoxRouter(routes);
router.start();
```

---

## 📚 Documentation

For detailed guides and API references, check out our documentation:

- [**Usage Guide**](./docs/getting-started/usage.md) - Learn how to build components and handle routing.
- [Architecture Overview](../docs/architecture.md) - Understand the internal design of the framework.

## 📜 License

This project is licensed under the MIT License.
