import type { IBaseModel, ComponentMap } from "../../@types/base.model.interface"

export class BaseModel implements IBaseModel {
    private html: string
    private element: HTMLElement
    private context: Record<string, unknown> = {}
    private axe: ComponentMap = {}
    private mounted = false

    constructor(element: string, template: string) {
        this.element = document.createElement(element)
        this.html = template
    }

    private escapeHtml(text: string): string {
        if (typeof text !== 'string') return text;
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    private compileEngine(html: string): string {
        return html.replace(/{{\s*(.*?)\s*}}/g, (_, key) => {
            const value = this.context[key] ?? "";
            return this.escapeHtml(String(value));
        })
    }

    private compileChild(html: string): string {
        return html.replace(/<Axe\s+id="(.*?)"\s*><\/Axe>/g, (_, key) => {
            return this.axe[key] ?? ""
        })

    }

    private loadTemplate() {
        let html = this.element.innerHTML = this.compileEngine(this.html)  // template = ``
        html = this.compileChild(html)
        this.element.innerHTML = html
    }


    public addProps(context: Record<string, unknown>) {
        this.context = { ...this.context, ...context }
    }

    public addComponent(axe: ComponentMap) {
        this.axe = { ...this.axe, ...axe }
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