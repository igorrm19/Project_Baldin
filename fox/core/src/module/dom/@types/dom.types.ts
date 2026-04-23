export interface ActionItem {
    button?: string | HTMLElement;
    div?: string | HTMLElement;
    id: string;
    class: string;
    style: CSSStyleDeclaration | string;
    children: HTMLCollection;
    parent: HTMLElement | null;
    onClick?: string | null;
    text?: string | null;
    value?: string | null;
    placeholder?: string | null;
    name?: string | null;
    type?: string | null;
    action?: string | null;
}
