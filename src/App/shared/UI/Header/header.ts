import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"
import template from "./header.html?raw"

export class HeaderComponent extends BaseModel {
    containerHeader: HTMLElement;

    constructor() {
        const rawTemplate = template as string | { default: string };
        const finalTemplate = typeof rawTemplate === 'string' ? rawTemplate : (rawTemplate?.default || "<header></header>");
        super("header", finalTemplate);
        this.containerHeader = document.createElement("div");
        return;
    }

    override mount(parent: HTMLElement): void {

        const html = this.getHTML()
        // eslint-disable-next-line no-unsanitized/property
        this.containerHeader.innerHTML = html
        this.onMount()

        parent.appendChild(this.containerHeader)
        return;
    }

    onMount(): void {
        console.log("[HeaderComponent] Header component mounted");
        return;
    }
}