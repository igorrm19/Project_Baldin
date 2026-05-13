import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"
import { InputHTML } from "../../components/input/input"
import template from "./header.html?raw"

export class HeaderComponent extends BaseModel {
    protected override axe: Map<string, string> = new Map();

    constructor() {
        const rawTemplate = template as string | { default: string };
        const finalTemplate = typeof rawTemplate === 'string' ? rawTemplate : (rawTemplate?.default || "<header></header>");
        super("div", finalTemplate);
        return;
    }

    override mount(parent: HTMLElement): void {
        const inputSearch = new InputHTML("search-input", "text", "Search", "", "w-full px-7 py-4 rounded-lg focus:outline-none border-none placeholder-gray-500 bg-transparent text-[#1e1e1e]");
        this.addComponent({
            primary_component: inputSearch.getHTML()
        })
        super.mount(parent);
        this.onMount();
        return;
    }

    onMount(): void {
        console.log("[HeaderComponent] Header component mounted");
        return;
    }
}