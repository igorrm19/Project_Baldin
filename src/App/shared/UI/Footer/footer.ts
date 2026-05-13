import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model";
import template from "./footer.html?raw"

export class FooterComponent extends BaseModel {
    protected override axe: Map<string, string> = new Map();

    constructor() {
        const rawTemplate = template as string | { default: string };
        const finalTemplate = typeof rawTemplate === 'string' ? rawTemplate : (rawTemplate?.default || "<footer></footer>");
        super("footer", finalTemplate);
        return;
    }

    override mount(parent: HTMLElement): void {
        super.mount(parent);
        this.onMount();
        return;
    }

    onMount(): void {
        console.log("[FooterComponent] Footer component mounted");
        return;
    }
}

