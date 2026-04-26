# Arquitetura do Fox

A arquitetura do Fox é baseada na interface `IBaseModel` e na classe `BaseModel`, que juntas formam o núcleo do framework.

## IBaseModel

A interface `IBaseModel` define o contrato que todos os modelos devem seguir:

```typescript
export interface IBaseModel {
    addProps<P extends Record<string, unknown>>(props: P): void;
    addComponent(component: ComponentMap): void;
    getHTML(): string;
    mount?(parent: HTMLElement): void;
}
```

## BaseModel

O `BaseModel` é a implementação padrão desse contrato. Ele é responsável por:

1. **Gerenciamento de Estado**: Armazena propriedades (`props`) e componentes filhos (`axe`).
2. **Compilação**: Processa o HTML e substitui tokens pelos valores correspondentes.
3. **Manipulação do DOM**: Cria o elemento root e lida com a montagem no parent.

## O Wrapper Main

A classe `Main` atua como um wrapper para um `BaseModel`. Ela permite encapsular lógica adicional mantendo a compatibilidade com a interface `IBaseModel`. Um ponto crucial é que `Main` não pode receber a si mesma como base para evitar recursão infinita.