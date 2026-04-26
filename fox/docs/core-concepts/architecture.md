# Fox Architecture

The Fox architecture is based on the `IBaseModel` interface and the `BaseModel` class, which together form the core of the framework.

## IBaseModel

The `IBaseModel` interface defines the contract that all models must follow:

```typescript
export interface IBaseModel {
    addProps<P extends Record<string, unknown>>(props: P): void;
    addComponent(component: ComponentMap): void;
    getHTML(): string;
    mount?(parent: HTMLElement): void;
}
```

## BaseModel

The `BaseModel` is the default implementation of this contract. It is responsible for:

1. **State Management**: Stores properties (`props`) and child components (`axe`).
2. **Compilation**: Processes HTML and replaces tokens with corresponding values.
3. **DOM Manipulation**: Creates the root element and handles mounting to the parent.

## The Main Wrapper

The `Main` class acts as a wrapper for a `BaseModel`. It allows encapsulating additional logic while maintaining compatibility with the `IBaseModel` interface. A crucial point is that `Main` cannot receive itself as a base to avoid infinite recursion.
