import type { IBaseModel, ComponentMap } from "../../@types/base.model.interface"

export class BaseModel implements IBaseModel {
    private html: string
    private element: HTMLElement
    private context: Map<string, unknown> = new Map()
    private axe: Map<string, string> = new Map()
    private mounted = false

    constructor(element: string, template: string) {
        this.element = document.createElement(element)
        this.html = template
    }

    private escapeHtml(text: string): string {
        if (typeof text !== "string") return text;
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    private compileEngine(html: string): string {
        return html.replace(/{{\s*(.*?)\s*}}/g, (_, key: string) => {
            const value = this.context.get(key);
            const safeValue =
                typeof value === "string" ? value :
                typeof value === "number" || typeof value === "boolean" ? String(value) :
                "";
            return this.escapeHtml(safeValue);
        })
    }
    
    private compileChild(html: string): string {
        return html.replace(/<Axe\s+id="(.*?)"\s*><\/Axe>/g, (_, key: string) => {
            return this.axe.get(key) ?? ""
        })
    }

    private loadTemplate() {
        const html = this.compileChild(this.compileEngine(this.html));
        const documentFragment = new DOMParser().parseFromString(html, 'text/html').body;
        this.element.replaceChildren(...Array.from(documentFragment.childNodes));
    }


    public addProps(context: Record<string, unknown>) {
        Object.entries(context).forEach(([key, value]) => {
            this.context.set(key, value)
        })
    }

    public addComponent(axe: ComponentMap) {
        Object.entries(axe).forEach(([key, value]) => {
            this.axe.set(key, value)
        })
    }


    public getHTML(): string {
        let html = this.compileEngine(this.html)
        html = this.compileChild(html)
        return html
    }


    public mount(parent: HTMLElement) {
        if (this.mounted) {
            console.warn("[BaseModel] mount() was called more than once. Skipping duplicate render.");
            return;
        }
        this.mounted = true;
        this.loadTemplate();
        parent.appendChild(this.element.cloneNode(true));
    }
}