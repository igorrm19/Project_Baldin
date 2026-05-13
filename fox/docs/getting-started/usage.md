# 🦊 Fox Framework Usage Guide

Welcome to the Fox Framework usage guide. This document covers everything you need to know to build modern, high-performance web applications using Fox.

## 🚀 Getting Started

### Installation

Install the framework via npm:

```bash
npm install fox-framework
```

---

## 🏗️ Core Concepts

### 1. Models and Components
In Fox, everything is a **Model**. A component is a class that manages its own HTML, properties (props), and lifecycle.

#### Basic Component Structure
To create a component, extend the `Main` class or use `BaseModel` directly.

```typescript
import { Main, IBaseModel } from 'fox-framework';

export class MyComponent extends Main<MyProps> {
    constructor(baseModel: IBaseModel, props: MyProps) {
        super(baseModel, props);
    }

    // Custom logic for your component
}
```

### 2. Properties (Props)
Props are used to pass data into components. They are type-safe and can be accessed within the component logic.

```typescript
const props = {
    title: "Hello Fox!",
    showButton: true
};

const myComponent = new MyComponent(new BaseModel("div", template), props);
```

### 3. Template Interpolation
Fox uses a simple interpolation system. Use `{{ key }}` in your HTML templates to bind data from props.

```html
<!-- template.html -->
<div class="card">
    <h1>{{ title }}</h1>
    <p>Welcome to the framework.</p>
</div>
```

---

## 🛣️ Routing

Fox includes a built-in Client-Side Router (`FoxRouter`) for Single Page Applications (SPA).

### Defining Routes
Routes map URLs to component classes.

```typescript
import { FoxRouter } from 'fox-framework';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

const routes = {
    "/": HomePage,
    "/about": AboutPage,
    "/dashboard": { page: DashboardPage, private: true }
};

const router = new FoxRouter(routes);
router.start();
```

---

## ⚡ Event Handling

### ActionStack
The `ActionStack` is a centralized event bus for handling global actions like clicks or state changes.

```typescript
import { actionStack } from 'fox-framework';

actionStack.subscribe((item) => {
    if (item.action === 'click') {
        console.log(`Clicked on ${item.tagName} with ID: ${item.id}`);
    }
});
```

---

## 🛠️ Advanced Usage

### Manual Mounting
You can manually mount components to any DOM element.

```typescript
const container = document.getElementById('app');
const component = new MyComponent(new BaseModel("div", html), {});

component.mount(container);
```

### Dynamic Component Composition
Add children components dynamically using `addComponent`.

```typescript
parentComponent.addComponent({
    sidebar: sidebarHTML,
    footer: footerHTML
});
```
