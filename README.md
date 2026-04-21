# Fox Framework - Project Baldim

## Overview
Fox Framework is a lightweight, component-based TypeScript frontend framework designed for building modular web applications. It features a custom directive system, a centralized router, and an action stack for state management and DOM interaction. This project follows a structured architecture to ensure scalability and maintainability.

## Project Structure
The project is organized into several key modules:
- **fox/core**: Contains the framework logic, including the DOM parser, component base classes, and routing mechanism.
- **src/App**: Contains the application-specific components, features, and pages.
- **src/shared**: Global components and utilities used across the application.
- **public**: Static assets and public resources.

## Core Components
### BaseModel
The `BaseModel` class is the foundation for all components. It handles template compilation, variable interpolation, and component mounting.
- `addProps(context)`: Adds data context to the component for interpolation.
- `addComponent(component)`: Registers sub-components (Axes) within the component.
- `mount(parent)`: Attaches the component to the DOM.

### FoxRouter
Integrated routing system that manages navigation and page mounting.
- `navigate(path)`: Navigates to a specific route.
- `start()`: Initializes the router based on the current URL.

### Action Stack
A centralized stack used for tracking and managing user actions and DOM events during the parsing process.

## Getting Started
### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
To start the development server with Vite:
```bash
npm run dev
```

### Production Build
To build the project for production:
```bash
npm run build
```

## Implementation Details
The framework utilizes a custom parsing engine that identifies specific tags (e.g., `<Axe />`) and replaces them with component instances. It also supports double-curly brace interpolation `{{ variable }}` for dynamic content.

## License
This project is proprietary. All rights reserved.
