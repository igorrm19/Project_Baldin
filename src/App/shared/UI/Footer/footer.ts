import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model";
import template from "./footer.html?raw"

export class FooterComponent extends BaseModel {
    protected override axe: Map<string, string> = new Map();
    private mounting = false;

    constructor() {
        const rawTemplate = template as string | { default: string };
        /* istanbul ignore next */
        const finalTemplate = typeof rawTemplate === 'string' ? rawTemplate : (rawTemplate?.default || "<footer></footer>");
        super("footer", finalTemplate);
        return;
    }

    override mount(parent: HTMLElement): void {
        this.mounting = true;
        super.mount(parent);
        return;
    }

    override unmount(): void {
        this.mounting = false;
        super.unmount()
    }
}

