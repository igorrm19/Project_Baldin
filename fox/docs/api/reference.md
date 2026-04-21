# Referência da API

Este documento detalha as classes e métodos principais do Fox Framework.

## Classe `BaseModel`

A espinha dorsal de qualquer componente no Fox.

### Construtor
`constructor(element: string, template: string)`
- `element`: O nome da tag HTML que envolverá o componente (ex: `'div'`, `'section'`).
- `template`: A string HTML que define o conteúdo do componente.

### Métodos Públicos

- `addProps(context: Record<string, unknown>)`: Mescla novas propriedades ao contexto do componente.
- `addComponent(axe: ComponentMap)`: Adiciona componentes filhos ao mapa de substituição.
- `getHTML()`: Retorna o HTML compilado (processando chaves e tags Axe).
- `mount(parent: HTMLElement)`: Compila o template e anexa o elemento ao nó pai fornecido.

## Classe `Main<P>`

Um wrapper genérico para instâncias de `IBaseModel`.

### Construtor
`constructor(baseModel: IBaseModel, props: P)`
- `baseModel`: Uma instância de algo que implemente `IBaseModel`.
- `props`: O objeto inicial de propriedades para o modelo.

### Métodos
Replica os métodos de `IBaseModel` delegando a execução para a instância de `baseModel` interna.
