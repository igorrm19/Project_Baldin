# Motor de Templates (Axe Engine)

O Fox utiliza um motor de templates proprietário (Axe Engine) que processa strings HTML para injetar dados e componentes.

## Interpolação de Dados

Para injetar valores dinâmicos nas propriedades do modelo, utilize chaves duplas `{{ }}`:

```html
<div>Olá, {{ nome }}!</div>
```

O motor buscará o valor da chave `nome` no objeto de contexto (props) do modelo. Se o valor não existir, uma string vazia será retornada.

### Escape de HTML

Por segurança, todos os valores interpolados via `{{ }}` são escapados automaticamente para evitar ataques XSS.

## Injeção de Componentes (Tags Axe)

Para inserir outros modelos (componentes) dentro de um template, utilize a tag `<Axe>`:

```html
<div class="container">
    <Axe id="meu-componente"></Axe>
</div>
```

O motor substituirá `<Axe id="key"></Axe>` pelo conteúdo HTML fornecido via `addComponent({ "key": "..." })`.
