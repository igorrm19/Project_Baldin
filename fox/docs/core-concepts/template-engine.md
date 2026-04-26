# Template Engine (Axe Engine)

Fox uses a proprietary template engine (Axe Engine) that processes HTML strings to inject data and components.

## Data Interpolation

To inject dynamic values into model properties, use double curly braces `{{ }}`:

```html
<div>Hello, {{ name }}!</div>
```

The engine will look for the key `name` in the model's context object (props). If the value does not exist, an empty string will be returned.

### HTML Escaping

For security, all values interpolated via `{{ }}` are automatically escaped to prevent XSS attacks.

## Component Injection (Axe Tags)

To insert other models (components) within a template, use the `<Axe>` tag:

```html
<div class="container">
    <Axe id="my-component"></Axe>
</div>
```

The engine will replace `<Axe id="key"></Axe>` with the HTML content provided via `addComponent({ "key": "..." })`.
