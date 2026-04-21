# Introdução ao Fox Framework

O **Fox** é um framework leve e modular para construção de interfaces web, focado em simplicidade e performance. Ele utiliza um sistema de templates baseado em tags personalizadas (`<Axe>`) e interpolação de dados (`{{ }}`).

## Principais Objetivos

- **Leveza**: Sem dependências pesadas, focado no essencial.
- **Componentização**: Facilidade para compor interfaces usando a tag `<Axe>`.
- **Reatividade Simples**: Renderização baseada em propriedades (props).

## Como Funciona?

O framework gira em torno do conceito de `Models`. Cada componente é uma instância de um `Model` que gerencia seu próprio HTML, propriedades e lógica de montagem no DOM.
