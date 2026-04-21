# Estrutura do Projeto

O diretório `fox/` contém o código-fonte principal e os módulos que compõem o Fox Framework.

## Visão Geral da Árvore de Diretórios

- `fox/`: Raiz do framework.
    - `main.ts`: Ponto de entrada e definição da classe `Main`.
    - `core/`: Núcleo do sistema.
        - `src/@types/`: Interfaces fundamentais (ex: `IBaseModel`).
        - `src/module/`: Funcionalidades modulares.
            - `dom/`: Utilitários para criação e manipulação de elementos DOM (ex: `parseButton`, `parseDiv`).
            - `router/`: Lógica de roteamento para aplicações SPA.
            - `utils/`: Implementações base (ex: `BaseModel`).

## Finalidade do Projeto

O projeto visa fornecer uma base sólida e flexível para o desenvolvimento de aplicações web sem a necessidade de frameworks externos massivos. Ele foca na separação de preocupações entre template e lógica, utilizando um sistema de tipos extensível via TypeScript.
