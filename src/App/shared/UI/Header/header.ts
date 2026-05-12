import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"
import template from "./header.html?raw"

export class HeaderComponent extends BaseModel {

    constructor() {
        const rawTemplate = template as string | { default: string };
        const finalTemplate = typeof rawTemplate === 'string' ? rawTemplate : (rawTemplate?.default || "<header></header>");
        super("div", finalTemplate);
        return;
    }

    override mount(parent: HTMLElement): void {
        super.mount(parent);
        this.onMount();
        return;
    }

    onMount(): void {
        console.log("[HeaderComponent] Header component mounted");
        return;
    }
}